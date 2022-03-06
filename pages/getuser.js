import React, { useState } from "react";
import { validEmail } from "../component/Regex";
import styles from "../styles/Home.module.css";
import image from "../public/Vias-Logo.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserTie } from "react-icons/fa";
import Link from "next/link";
import { GET_USER_URL } from "../pages/api/endpoints";
import { useRouter } from "next/router";
import axios from "./api/hello.js";

const headers = {
  "Content-Type": "application/json",
};
function getuser() {
  const [usernameFields, setUsernameFields] = useState("");
  const [usererror, setError] = useState(true);

  const router = useRouter();
  const Formvalidation = (e) => {
    setUsernameFields(e.target.value);
    if (validEmail.test(e.target.value)) setError(true);
    else setError(false);
  }

  const sendOtpHandler = () =>{
    usernameFields=== "" || usererror ? 
    sendUserName()
    : toast.error("Please Enter username!");  
  }

  const sendUserName = async () => {
    try {
      const response = await axios.post(
        GET_USER_URL,
        {
          username: usernameFields
        },
        { headers: headers }
      );
      // cookieCutter.set("jwt", response.data.jwt);
        console.log(response);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid Username or Password");
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
                    onClick={sendOtpHandler}
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
                <span className={styles.forgotText}><Link href="/"><a>Back to Login</a></Link></span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default getuser;
