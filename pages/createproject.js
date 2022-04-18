import React, { useState, useEffect } from "react";
import styles from "../styles/Createproject.module.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import CurrencyFormat from "react-currency-format";
import "@pathofdev/react-tag-input/build/index.css";
import { GetClient, CreateProject } from "./api/endpoints";
import { ToastContainer, toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import { validFname, ValidAddress } from "../component/Regex";

import cookieCutter from "cookie-cutter";
import axios from "axios";

function createproject() {
  const [fnameErr, setFnameError] = useState(true);
  const [lnameErr, setLnameError] = useState(true);
  const [deadlineErr, setDeadlineError] = useState(true);
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");

  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState();
  const [cost, setCost] = useState(0);

  const [tags, setTags] = useState([]);
  const [clientNames, setClientNames] = useState([]);

  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  });

  useEffect(() => {
    axios(GetClient, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookieCutter.get("jwt"),
      },
    })
      .then((response) => {
        setClientNames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async () => {
    console.log("client", client);
    try {
      const response = await axios.post(
        CreateProject,
        {
          title: title,
          dateAdded: currentDate,
          deadline: deadline,
          cost: cost,
          clientName: client,
          description: desc,
          technologies: tags.join(","),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieCutter.get("jwt"),
          },
        }
      );
      response.data
        ? toast.success("Information Added Succefully.")
        : toast.error("not valid.");
    } catch (error) {
      toast.error("Invalid Details");
      console.log(error);
    }
  };

  const fnameValidation = (e) => {
    setTitle(e.target.value);
    if (ValidAddress.test(e.target.value)) setFnameError(true);
    else setFnameError(false);
    console.log(title);
    console.log(validFname.test(e.target.value));
  };

  const lnameValidation = (e) => {
    setDesc(e.target.value);
    if (ValidAddress.test(e.target.value)) setLnameError(true);
    else setLnameError(false);
  };
  const currentDate = new Date();
  const dateValidation = (e) => {
    setDeadline(e.target.value);
    const myDate = new Date(e.target.value);
    if (myDate > currentDate) setDeadlineError(true);
    else setDeadlineError(false);
  };

  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectMaxContainer}>
        <ToastContainer />
        <div className={styles.projectBase}>
          <div className={styles.projectHeading}>
            Create Project
            <hr />
          </div>
          <div className={styles.projectTitle}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Enter Title </label>{" "}
                  </td>
                  <td>
                    {" "}
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
                  </td>{" "}
                </tr>

                <tr>
                  <td>
                    <label className={styles.techLabels}>Technologies</label>{" "}
                  </td>
                  <td>
                    <ReactTagInput
                      tags={tags}
                      onChange={(newTags) => setTags(newTags)}
                      placeholder="Type and press enter"
                      maxTags={10}
                      editable={true}
                      readOnly={false}
                      removeOnBackspace={true}
                      size="42"
                      className={styles.projectInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.projectDescTitle}>
                      Description{" "}
                    </label>
                  </td>
                  <td>
                    <textarea
                      cols="100"
                      rows="5"
                      className={styles.projectInput}
                      data-tip="Should contain only charaters and numbers"
                      onChange={lnameValidation}
                    />
                    {lnameErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Description Name</p>
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
                    <label className={styles.deadlineLabel}>Deadline</label>{" "}
                  </td>{" "}
                  <td>
                    <input
                      type="date"
                      size="42"
                      className={styles.projectInput}
                      data-tip="Date should be in future"
                      onChange={dateValidation}
                    />
                    {deadlineErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Date</p>
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
                    <label className={styles.deadlineLabel}>Client</label>{" "}
                  </td>{" "}
                  <td>
                    <select
                      className={styles.projectInput}
                      onClick={(e) => {
                        setClient(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      {clientNames.map((i) => (
                        <option value={i}>{i}</option>
                      ))}

                      {/* <option value="vegetable">Vegetable</option>
        <option value="meat">Meat</option> */}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label className={styles.projectCost}>Cost</label>
                  </td>{" "}
                  <td>
                    <CurrencyFormat
                      className={styles.projectInput}
                      thousandSeparator={true}
                      prefix={"₹"}
                      size="42"
                      onChange={(e) => {
                        setCost(
                          Number(e.target.value.replace(/[^0-9.-]+/g, ""))
                        );
                      }}
                    />{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default createproject;
