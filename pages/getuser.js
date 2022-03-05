import React, { useState } from "react";
import { validEmail } from "../component/Regex";
import styles from "../styles/Home.module.css";
import image from "../public/Vias-Logo.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserTie } from "react-icons/fa";
import { GET_USER_URL } from "../pages/api/endpoints";

function getuser() {
  const [usernameFields, setUsernameFields] = useState("");
  const [usererror, setError] = useState(false);

  const Formvalidation = (e) => {
    setUsernameFields(e.target.value);
    if (validEmail.test(e.target.value)) {
      setError(true);
    } else {
      setError(false);
    }
  };
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
              <div className={styles.loginText}>Enter your Username</div>

              <div className={styles.usernameBox}>
                <span className={styles.LabelUsername}>
                  <FaUserTie />{" "}
                </span>
                <input
                  className={usererror ? styles.TextUsername : styles.errorline}
                  autoComplete="off"
                  type="text"
                  value={usernameFields}
                  onChange={Formvalidation}
                />
              </div>

              {usererror ? (
                ""
              ) : (
                <p className={styles.error}>Username is Invalid</p>
              )}
              <div className={styles.Loginbutton}>
                <span>
                  <input
                    className={styles.loginBtn}
                    type="button"
                    value="Send OTP"
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

export default getuser;
