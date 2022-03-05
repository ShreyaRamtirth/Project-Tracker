import React from "react";
import styles from "../styles/Home.module.css";
import image from "../public/Vias-Logo.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";

function resetpass() {
  const [passerror, setPassError] = useState(true);
  const [passwordFields, setPasswordFields] = useState("");

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
                    onChange={(s) => {
                      setPasswordFields(s.target.value), Formvalidation();
                    }}
                    autoComplete="off"
                    required
                  />
                </div>

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
                    onChange={(s) => {
                      setPasswordFields(s.target.value), Formvalidation();
                    }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              {/* {passerror ?  '' : <p className={styles.error}>Your Password is invalid</p> } */}
              <div className={styles.Loginbutton}>
                <span>
                  <input
                    className={styles.loginBtn}
                    type="button"
                    value="Submit"
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
                <ToastContainer />
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
