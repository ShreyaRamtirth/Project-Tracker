import React, { useState, useEffect } from "react";
import styles from "../styles/Employee.module.css";
import ReactTooltip from "react-tooltip";
import {
  validFname,
  ValidAddress,
  ValidPhno,
  ValidUsername,
  ValidClientName,
  ValidEmailAddress,
  validPassword,
} from "../component/Regex";
import "@pathofdev/react-tag-input/build/index.css";
import { CreateClient } from "./api/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import cookieCutter from "cookie-cutter";

const currentDate = new Date().toISOString().slice(0, 10);
function CreateNewClient() {
  const [fnameErr, setFnameError] = useState(true);
  const [lnameErr, setLnameError] = useState(true);
  const [phnoErr, setPhnoError] = useState(true);
  const [addressErr, setAddressError] = useState(true);

  const [emailErr, setEmailError] = useState(true);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phno, setPhno] = useState();
  const [address, setAddress] = useState();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [submitForm, setSubmitForm] = useState(false);
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  });

  const handleSubmit = async () => {
    if (fnameErr && lnameErr && phnoErr && addressErr && emailErr) {
      try {
        const response = await axios.post(
          CreateClient,
          {
            clientName: fname,
            representative: lname,
            address: address,
            phoneNo: phno,
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookieCutter.get("jwt"),
            },
          }
        );
        response.data
          ? toast.success("Information Added Succesfully.")
          : toast.error("not valid.");
      } catch (error) {
        toast.error("Invalid Details");
        console.log(error);
      }
    } else {
      toast.error("Invalid Information");
    }
  };

  const fnameValidation = (e) => {
    setFname(e.target.value);
    if (ValidClientName.test(e.target.value)) setFnameError(true);
    else setFnameError(false);

    console.log(fname);
    console.log(validFname.test(e.target.value));
  };
  const lnameValidation = (e) => {
    setLname(e.target.value);
    if (ValidClientName.test(e.target.value)) setLnameError(true);
    else setLnameError(false);
  };
  const currentDate = new Date();

  const EmailValidation = (e) => {
    setEmail(e.target.value);
    if (ValidEmailAddress.test(e.target.value)) setEmailError(true);
    else setEmailError(false);
    console.log(ValidEmailAddress.test(e.target.value));
  };
  const PhnoValidation = (e) => {
    setPhno(e.target.value);
    if (ValidPhno.test(e.target.value)) setPhnoError(true);
    else setPhnoError(false);
  };
  const AddressValidation = (e) => {
    setAddress(e.target.value);
    if (ValidAddress.test(e.target.value)) setAddressError(true);
    else setAddressError(false);
  };
  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectMaxContainer}>
        <ToastContainer />
        <div className={styles.projectBase}>

          <div className={styles.projectHeading}>
            Client Info <hr />
          </div>

          <div className={styles.projectTitle}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Enter Company Name </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={styles.projectInput}
                      size="42"
                      data-tip="Should contain only charaters"
                      onChange={fnameValidation}
                    />
                    {fnameErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Company Name</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Enter Representative Name</td>
                  <td>
                    <input
                      type="text"
                      className={styles.projectInput}
                      data-tip="Should contain only charaters"
                      size="42"
                      onChange={lnameValidation}
                    />
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                    {lnameErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Name</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Enter Email </label>
                  </td>
                  <td>
                    <input
                      size="42"
                      type="email"
                      className={styles.projectInput}
                      data-tip="example@any.com"
                      onChange={EmailValidation}
                    />
                    {emailErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Email</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Enter Phone Number </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      size="42"
                      className={styles.projectInput}
                      data-tip="Should be 10 digit"
                      onChange={PhnoValidation}
                    />
                    {phnoErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Phone Number</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Enter Address </label>
                  </td>
                  <td>
                    <textarea
                      type="passsword"
                      cols={70}
                      rows={5}
                      className={styles.projectInput}
                      data-tip="Should contain characters and numbers only"
                      onChange={AddressValidation}
                    />
                    {addressErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Address</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* </div> */}
          <div className={styles.projectSubmit}>
            <input
              type="button"
              className={styles.projectButton}
              value="SUBMIT"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewClient;
