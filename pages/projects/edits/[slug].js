import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import "react-toastify/dist/ReactToastify.css";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { GETPROJECTDETAILS, UpdateProject } from "../../api/endpoints";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Toggle from "react-toggle";
import "react-toggle/style.css";
function Edits() {
  const router = useRouter();
  const pname = router.query;
  const [data, setData] = useState("");
  const [date, setDate] = useState();
  const [pno, setPno] = useState(undefined);
  const [newTask, setNewTask] = useState();
  const [newTaskArr, setNewTaskArr] = useState([]);
  const [mergeArr, setMergeArr] = useState([]);
  const [addTask, setAddTask] = useState();
  const [interns, setInterns] = useState();
  const [phase, setPhase] = useState();
  const [description, setDescription] = useState();
  const [completed, setCompleted] = useState("Not Completed");
  const [lengthArray, setLengthArray] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const currentDate = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    if (!router.isReady) return;

    if (pname.slug !== undefined) {
      setPno(pname.slug);
      console.log(pno);
      axios(GETPROJECTDETAILS + pname.slug, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setData(response.data);
          setAddTask(data["taskInfoList"]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);

  const handleAdd = () => {

    if (newTaskArr.length === 0) {
      setNewTaskArr([
        {
          task: newTask,
          username: "",
          assigned_on: currentDate,
          completed: false,
          completed_on: new Date()
        },
      ]);
    } else {
      setNewTaskArr([
        ...newTaskArr,
        {
          task: newTask,
          username: "",
          assigned_on: currentDate,
          completed: false,
          completed_on: new Date()
        },
      ]);
     
    }
    setMergeArr(data["taskInfoList"].concat(newTaskArr));
    console.log("newtask",newTaskArr);
    console.log("lengthArray",lengthArray);
  };

  const handleProjectEdit = async () => {
    try {
      setMergeArr(data["taskInfoList"].concat(newTaskArr));
      
      console.log("mergeArr", mergeArr);
      if( mergeArr.length === 0) {
        setSelectedStatus(true);   
      }
      const response = await axios.post(
        UpdateProject,
        {
            pid: pno,
            description: description,
            deadline: date,
            taskInfoList: mergeArr,
            phaseName: phase
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieCutter.get("jwt"),
          },
        }
      );
    } catch (error) {
      console.log(mergeArr);
      toast.error("Invalid Details");
      console.log(error);
    }
  };
  if (pno !== undefined && data) {
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
                {data["project"]["technologies"].split(",").map((i) => (
                  <div className={styles.Badges} key={i}>
                    {i}
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

              <div className={styles.deadline}>
                Phase 
                <select
                  className={styles.deadlinePicker}
                  onClick={(e) => {
                    setPhase(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option value="Initiation"  >Initiation</option>
                  <option value="Definition">Definition</option>
                  <option value="Design">Design</option>
                  <option value="Development" >Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Deployment">Deployment</option>
                  <option value="Completed">Completed</option>
                  </select>

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
                    Enter New Task {"  "}
                    <input
                      type="text"
                      className={styles.taskInput}
                      onChange={(e) => {
                        setNewTask(e.target.value);
                      }}
                    />
                    <input
                      type="button"
                      value="Add"
                      className={styles.addBtn}
                      onClick={handleAdd}
                    />
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
                            <div className={styles.task}>{i.task}</div>
                          </td>
                          <td className={styles.taskRow}>
                            <div className={styles.taskGiven}>{i.username}</div>
                          </td>
                          <td className={styles.taskRow}>
                            <div className={styles.taskDisplay}>
                              {i.completed}
                              <Toggle
                                id="status"
                                defaultChecked={i.completed}
                                onChange={(e) => {
                                  i.completed = !i.completed;
                               i.completed_on = currentDate ;
                                  console.log(i.completed);
                                }}
                              />
                            </div>
                          </td>
                          <td className={styles.taskRow}> {i.assigned_on} </td>
                        </tr>
                      ))}
                      {newTaskArr.map((i) => (
                        <tr key={i.task} className={styles.taskRow}>
                          <td className={styles.taskRow}>
                            {/* {console.log(newTask)} */}
                            {i.task}
                          </td>
                          <td className={styles.taskRow}>
                            <select
                              onClick={(e) => {
                                i.username = e.target.value;
                                console.log("username", i.username);
                              }}
                            >
                              <option value="" disabled selected>Select Intern</option>
                              {data["interns"].map((j) => (
                                <option key={j.username} value={j.username}>
                                  {j.username}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className={styles.taskRow}>
                            <Toggle
                              id="Newstatus"
                              defaultChecked={i.completed}
                              onChange={(e) => {
                                i.completed = !i.completed;
                                i.completed ? i.completed_on = currentDate: i.completed_on = null;
                              }}
                            />
                          </td>
                          <td className={styles.taskRow}>{currentDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={styles.submitContainer}>
              <input
                type="submit"
                className={styles.addBtn}
                onClick={handleProjectEdit}
              />
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
