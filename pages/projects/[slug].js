import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Project.module.css";
import { FaPencilAlt } from "react-icons/fa";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { GETPROJECTDETAILS } from "../api/endpoints";
import Link from "next/link";
const Post = () => {
  const router = useRouter();
  const pname = router.query;
  const [data, setData] = useState('');
  const [pno, setPno] = useState(undefined);
  const [tech, setTech] = useState(undefined);
  const [task, setTask] = useState(undefined);
  const [getrole, setGetRole] = useState("");
  useEffect(() => {
    setPno(pname.slug);
    if(!router.isReady) return;
    setGetRole(cookieCutter.get("role"));
  if(pname.slug !== undefined ){
     axios(GETPROJECTDETAILS +pname.slug, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setData(response.data);
          setTech(data["project"]["technologies"]);
          setTask(data["taskInfoList"]);
        })
        .catch((error) => {
          console.log(error);
        });
      }
  },[router.isReady]);
 

  if (pno!== undefined && data)
  {
    return (
   
      <div className={styles.projectContainer}>
   {/* { setTech(data["project"]["technologies"])}      */}
        <div className={styles.projectMaxContainer}>
          <div className={styles.projectBase}>
            { getrole === "Employee" ? " " :
            <div className={styles.projectEdit}>
              <Link href={"/projects/edits/" + pname.slug}><a>
                <FaPencilAlt className={styles.pencil} />
              </a></Link>
            </div>
            }
            
             <div className={styles.projectTitle}>
              <h4>{data["project"]["title"]}</h4>
            </div>
            <div className={styles.projectDate}>
              Added on {data["project"]["dateAdded"]}
            </div>
            <div className={styles.projectBadges}>
              
                  {data["project"]["technologies"].split(',').map((i) => (
                    <div className={styles.Badges} key={i}>
                      {i}
                    </div>
                  ))}
                </div>
                <div className={styles.projectDesc}>
                  <p>{data["project"]["description"]}</p>
                </div>
                <hr />
              
                 <div className={styles.deadline} >
                   Deadline = {data["project"]["deadline"]}
                 </div>
                
                 <div className={styles.tasksContainer} >
                
  { data["taskInfoList"] === null ? " " : 
                 <table className={styles.tasks}>
                   <tbody>
                 <tr className={styles.taskRow}>
    <th className={styles.taskRow}>Task</th>
    <th className={styles.taskRow}>Intern</th>
    <th className={styles.taskRow}>Status</th>
  </tr>
                { data["taskInfoList"].map((i) => (
                   <tr className={styles.taskRow} ><td className={styles.taskRow}> 
                    <div className={styles.task} key={i.taskId}>
                      {i.task}
                      </div>
                      </td>
                      <td className={styles.taskRow}>
                      <div className={styles.taskGiven} >
                      {i.username}
                    </div></td>
                    <td className={styles.taskRow}>
                    <div className={styles.taskDisplay} >
                      { i.completed ? 'Completed' : 'Not Completed' }
                    </div>
                    </td>
                    
                    </tr>
                  ))} 
                  </tbody>
                  </table> }
                  </div>
          </div>
        </div>
      </div>
    );
  } else{
    return <h1>Fetching</h1>
  }
  
};

export default Post;
