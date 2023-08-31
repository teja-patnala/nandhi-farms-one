import { useEffect,useState } from "react";
import {TOTP} from "otpauth";

export default function useOTPGenerator(secretKey){
    const [otp,setOtp] = useState(0);
    useEffect(()=>{
        const totp = new TOTP({secret:secretKey,digits : 4});
        setOtp(totp.generate())
    },[secretKey]);

    return otp;
}

