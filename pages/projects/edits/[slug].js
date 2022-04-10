import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { GETPROJECTDETAILS, UpdateProject } from "../../api/endpoints";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Toggle from 'react-toggle'
import "react-toggle/style.css"
function Edits() {
  const router = useRouter();
  const pname = router.query;
  const [data, setData] = useState("");
  const [date, setDate] = useState();
  const [pno, setPno] = useState(undefined);
  const [newTask, setNewTask] = useState();
  const [newTaskArr, setNewTaskArr] = useState([]);
  const [mergeArr, setMergeArr] = useState([]);
  const [addTask, setAddTask] = useState([]);
  const [interns, setInterns] = useState();
  const [assignedIntern, setAssignedIntern] = useState();
  const [description, setDescription] = useState();
  const [completed, setCompleted] = useState("Not Completed");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  useEffect(() => {
    setPno(pname.slug);
    if (!router.isReady) return;

    if (pname.slug !== undefined) {
      axios(GETPROJECTDETAILS + pname.slug, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setData(response.data);
          // setTech(data["project"]["technologies"]);
          setAddTask(data["taskInfoList"]);
          // setInterns(data["interns"]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);
  const currentDate = new Date().toISOString().slice(0, 10);
  

  const handleProjectEdit = async() => {
    // console.log(data["taskInfoList"]);
    // console.log("newTaskArr" , newTaskArr);
    // setMergeArr( ...data["taskInfoList"], ...newTaskArr  );
    setMergeArr( data["taskInfoList"].concat(newTaskArr) );
    // console.log("mergeTaskArr" , mergeArr);
    // console.log("pno", pno);
    // console.log("description", description);
    // console.log("deadline", date);
    // console.log("tasks", addTask);
    // console.log("assigned_on", currentDate);
    // console.log("interns", selectedOption);
    // console.log("completed", completed);

    try {
      const response = await axios.post(
        UpdateProject,
        {
          pId: pno,
          description: description,
          deadline: date,
          tasks: mergeArr
         

        },
        { headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        } }
      );

    } catch (error) {
    toast.error("Invalid Details");
    console.log(error);
    }
  }

  if (pno !== undefined && data) 
  {
    return (
      <div className={styles.projectContainer}>
        <div className={styles.projectMaxContainer}>
          <div className={styles.projectBase}>
            <div className={styles.projectTitle}>
              <h4>{data["project"]["title"]}</h4>
              <div className={styles.projectDate}>
                Added on {data["project"]["dateAdded"]}
              </div>
              <div className={styles.projectBadges}>
                {data["project"]["technologies"].map((i) => (
                  <div className={styles.Badges} key={i.tid}>
                    {i.technologyName}
                  </div>
                ))}
              </div>
              <div className={styles.projectDesc}>
                <textarea
                  cols="30"
                  rows="5"
                  defaultValue={data["project"]["description"]}
                  className={styles.textAreaContainer}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <hr />
              <div className={styles.deadline}>
                Deadline =
                <input
                  type="date"
                  defaultValue={data["project"]["deadline"]}
                  className={styles.deadlinePicker}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>

              <div className={styles.tasksContainer}>
                <div>
                  <div className={styles.task}>
                    Enter New Task { "  "}
                    <input
                      type="text"
                      className={styles.taskInput}
                      onChange={(e) => {
                        setNewTask(e.target.value);
                        
                      }}
                    />
                    <input type="button" value="Add" className={styles.addBtn} onClick={(e) => {
                        setNewTaskArr([...newTaskArr,  {task : newTask, username : "", assigned_on: currentDate, completed: false }]);
                        // console.log(newTaskArr)
                        
                      }} />
                  </div>

                  <table className={styles.tasks}>
                    <tbody>
                    <tr className={styles.taskRow}>
                      <th className={styles.taskRow}>Task</th>
                      <th className={styles.taskRow}>Intern</th>
                      <th className={styles.taskRow}>Status</th>
                      <th className={styles.taskRow}>Assigned Date</th>
                    </tr>
                    {data["taskInfoList"].map((i) => (
                      <tr className={styles.taskRow} key={i.taskId}>
                        <td className={styles.taskRow}>
                          <div className={styles.task} >
                            {i.task}
                          </div>
                        </td>
                        <td className={styles.taskRow}>
                          <div className={styles.taskGiven}>{i.username}</div>
                        </td>
                        <td className={styles.taskRow}>
                          <div className={styles.taskDisplay}>
                           { i.completed }
                           <Toggle
                            id='status'
                            defaultChecked={i.completed}
                            onChange={(e)=> { i.completed = ! i.completed; console.log(i.completed) }  } />
                          </div>
                        </td>
                        <td className={styles.taskRow}> {i.assigned_on} </td>
                      </tr>
                    ))}
                    {newTaskArr.map((i)=>(
                    <tr key={i.task} className={styles.taskRow}>
                    <td className={styles.taskRow}>
                      {console.log(newTask)}
                    {i.task}
                    </td>
                    <td className={styles.taskRow}>
                    <select onClick={(e)=>{ i.username = e.target.value; console.log("username",i.username) }} >
                      {data["interns"].map((j)=>(
                        <option key={j.username} value={j.username}   >{j.username}</option>
                      ))}
                    </select>
                    </td>
                    <td className={styles.taskRow}>
                    <Toggle
                            id='Newstatus'
                            defaultChecked={i.completed}
                            onChange={(e)=> { i.completed = ! i.completed; }  } />
                    </td>
                    <td className={styles.taskRow}>{currentDate}</td>
                  </tr>
                  )) }
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={styles.submitContainer} >
            <input type="submit" className={styles.addBtn} onClick={handleProjectEdit} />
            <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Fetching</h1>;
  }
}
export default Edits;
