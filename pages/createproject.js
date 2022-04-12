import React, { useState } from 'react';
import styles from "../styles/Createproject.module.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import CurrencyFormat from 'react-currency-format';
import "@pathofdev/react-tag-input/build/index.css";
import {CreateProject} from './api/endpoints';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

  const headers = {
    "Content-Type": "application/json",
  }
 
  const currentDate = new Date().toISOString().slice(0, 10);
  const  handleSubmit =  async () => {
    
    if (passerror) {
      try {
        const response = await axios.post(
          CreateProject,
          {
           
            title: title,
            dateAdded: currentDate,
            deadline: deadline,
            cost: cost,
            description: desc,
            technologies: tags

          },
          { headers: headers }
        );
        response.data ?
        router.push("/projects") : toast.error("not valid.");
        
      } catch (error) {
        toast.error("Invalid Details");
        console.log(error);
      }
    } else {
      toast.error("Invalid Information");
    }
  };



function createproject() {
  const [passerror, setPassError] = useState(false);
  const [codeFields, setCodeFields] = useState("");
  const [title, setTitle] = useState("");
  
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState();
  const [cost, setCost] = useState();
  const router = useRouter();
    const [tags, setTags] = useState([ ]);
  return (
    
    <div className={styles.projectContainer}>
    <div className={styles.projectMaxContainer}>
    <ToastContainer />
      <div className={styles.projectBase}>
        <div className={styles.projectHeading}>Create Project</div>
      <div className={styles.projectTitle}>
            <label>Enter Title </label> <input type="text" className={styles.projectInput}  onChange={(e)=> setTitle(e.target.value)} />
        </div>
        <div className={styles.projectBadges}>
            <label className={styles.techLabels}>Technologies</label> 
            <ReactTagInput 
      tags={tags} 
      onChange={(newTags) => setTags(newTags)}
      placeholder="Type and press enter"
      maxTags={10}
      editable={true}
      readOnly={false}
      removeOnBackspace={true}
      className={styles.projectTech}
    />
        </div>
        <div className={styles.projectDesc}>
        <label className={styles.projectDescTitle}>Description </label>
                <textarea
                  cols="100"
                  rows="5"
                  
                  className={styles.textAreaContainer}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></textarea>
              </div>

              <hr/>
              <div className={styles.deadline}>
                <label className={styles.deadlineLabel}>Deadline</label>
                <input
                  type="date"
                 
                  className={styles.deadlinePicker}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                  }}
                />
              </div>
              <div className={styles.projectCurrency}>
                <label className={styles.projectCost}>Cost</label>
                <CurrencyFormat className={styles.currency} thousandSeparator={true}  prefix={'₹'} 
                onChange={(e)=> setCost(e.target.value) }
                />
              </div>

              <div className={styles.projectSubmit}>
                <input type="button" className={styles.projectButton} value="SUBMIT" onClick={handleSubmit} />
              </div>
    </div>
    </div>
    </div>
  )
}

export default createproject;