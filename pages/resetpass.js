import React from "react";
import styles from "../styles/Home.module.css";
import image from "../public/Vias-Logo.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { validPassword } from "../component/Regex";
import ReactTooltip from 'react-tooltip';
import { variableName } from "./getuser";
import { useRouter } from "next/router";
import { RESETPASS } from "./api/endpoints";
import axios  from "./api/hello";

function resetpass() {
  const headers = {
    "Content-Type": "application/json",
  };
  const [passerror, setPassError] = useState(true);
  const [passwordFields, setPasswordFields] = useState('');
  const [repasserror, setrePassError] = useState(true);
  const [mount, setMount] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMount(true);
  });
  const Formvalidation = (e) =>{
    setPasswordFields(e.target.value);
  
    if( validPassword.test(e.target.value)){
      setPassError(true);
    }else{
      setPassError(false);
    }
  }

  const ReFormvalidation = (e) =>{
    
    if(passwordFields === e.target.value){
      setrePassError(true);
    }else{
      setrePassError(false);
    }
  }

  const handlePassSubmit = (e) =>{

    passwordFields !== '' &&  passerror && repasserror ? ResetPasseord() : console.log("false")
  }

  const ResetPasseord = async () =>{
    if (passwordFields !== '' &&  passerror && repasserror) {
      try {
        const response = await axios.post(
          RESETPASS,
          {
            username: variableName,
            password: passwordFields
          },
          { headers: headers }
        );
        response.data ?
        router.push("/") : toast.error("Please verify all fields");
        
      } catch (error) {
        toast.error("Please verify fields");
        console.log(error,variableName,passwordFields);
      }
      
    } else {
      toast.error("Please verify all fields");
    }
  }

  return (
    <div>
      <form className="w-full">
        <div className={styles.LoginPage}>
          <div className={styles.loginbox}>
            <div className={styles.loginlogo}>
              {/* Login */}
              <Image src={image} />
            </div>

            <div className={styles.loginContainer}>
              <div className={styles.loginText}>Reset your password</div>
              <div className={styles.usernameBox}>
                <div className={styles.passwordBox}>
                  <span className={styles.LabelPassword}>
                    <RiLockPasswordFill />
                  </span>
                  <input
                    className={
                      passerror ? styles.TextPassword : styles.errorline
                    }
                    type="password"
                    placeholder="Enter password"
                    onChange={Formvalidation}
                    autoComplete="off"
                   
                    data-tip="Should contain Uppercase, <br>
                    Lowercase, digit, special character,  <br>
                     8 character long"
                  />
                </div>
                {passerror ? "" : <p className={styles.error}>Password is Invalid</p>}
                {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }
                <div className={styles.passwordBox}>
                  <span className={styles.LabelPassword}>
                    <RiLockPasswordFill />
                  </span>
                  <input
                    className={
                      passerror ? styles.TextPassword : styles.errorline
                    }
                    type="password"
                    placeholder="Re enter password"
                    onChange={ReFormvalidation}
                    autoComplete="off"
                    required
                  />
                 
                </div>
              </div>

              {repasserror ?  '' : <p className={styles.error}>Your Password is not matching</p> }
              <div className={styles.Loginbutton}>
                <span>
                  <input
                    className={styles.loginBtn}
                    type="button"
                    value="Submit"
                    onClick={handlePassSubmit}
                  />
                </span>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                
              </div>
              <div className={styles.forgot}>
                <span className={styles.forgotText}>Back to Login</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default resetpass;
