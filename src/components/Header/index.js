import "./index.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Corrected this line

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      alert("Failed to log out");
    }
  }

  return (
    <header className="header">
      <div className="logo">Nandhi Farms</div>
      <div className="nav-logout-container">
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/orders">orders</a>
          <a href="/about">About<span>_</span>us</a>
          <a href="/contact">Contact</a>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;