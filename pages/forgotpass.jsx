import React, { useState, useCallback } from "react";
import ReactCodeInput from "react-verification-code-input";
import styles from "../styles/Home.module.css";
import image from "../public/Vias-Logo.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { SEND_OTP } from "../pages/api/endpoints";
import { variableName } from "./getuser";
import { useRouter } from "next/router";

function forgotpass() {
  const headers = {
    "Content-Type": "application/json",
  };
  const [passerror, setPassError] = useState(false);
  const [codeFields, setCodeFields] = useState("");
  const router = useRouter();
  const verifyOTP = async () => {
    if (passerror) {
      try {
        // const response = await axios.post(
        //   SEND_OTP,
        //   {
        //     username: variableName,
        //     OTPcode: codeFields
        //   },
        //   { headers: headers }
        // );
        
        router.push("/resetpass");
      } catch (error) {
        toast.error("Invalid Code");
      }
    } else {
      toast.error("Enter valid code");
    }
  };

  const handlePinChange = (codeFields) => {
    setCodeFields(codeFields);

    if (codeFields.length != 6) {
      setPassError(false);
    } else {
      setPassError(true);
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
              <div className={styles.loginText}>
                Verify to reset your password
              </div>

              <div className={styles.usernameBox}>
                <span className={styles.LabelUsername}>
                  <p>Enter Code Here</p>
                </span>
                <ReactCodeInput
                  type="number"
                  value={codeFields}
                  onChange={handlePinChange}
                />
              </div>

              {passerror ? "" : <p className={styles.error}>Code is Invalid</p>}
              <div className={styles.Loginbutton}>
                <span>
                  <input
                    className={styles.loginBtn}
                    type="button"
                    value="Verify"
                    onClick={verifyOTP}
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
                <span className={styles.forgotText}> <Link href="/"><a>Back to Login</a></Link></span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default forgotpass;
