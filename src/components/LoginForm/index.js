import React, { useState, useEffect } from "react";
import "./index.css"
import { Link ,useNavigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLogin] = useState(false);
  const {login} = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus) {
      navigate('/', { replace: true });
    }
  }, [loginStatus,navigate]);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // async function handleLogin(e){
  //   e.preventDefault()
  //   try{
  //     await login(email,password)
  //     alert("Login Successfull")
  //     setLogin(true)
  //   }catch(error){
  //     alert(error.message)
  //   }
  // }

  const handleLogin = (event) => {
    event.preventDefault();
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        alert("Login Succesfull")
        setLogin(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              onChange={handleEmail}
              required
              type="email"
              id="username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handlePassword}
              required
              type="password"
              id="password"
            />
          </div>
          <button type="submit">Login</button>
          <p className="para" style={{ textAlign: "center" }}>
            If you are not a user please click here to{" "}
            <Link className="para-link" to="/signup">sign up</Link>
          </p>
          <p className="para" style={{ textAlign: "center" }}>
            <Link className="para-link" to="/forgot-password">forgot password</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;