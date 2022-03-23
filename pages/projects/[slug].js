import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Project.module.css";
import { FaPencilAlt } from "react-icons/fa";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { GETPROJECTDETAILS } from "../api/endpoints";

const Post = () => {
  const router = useRouter();
  const pname = router.query;

  useEffect(() => {
    {
      axios(GETPROJECTDETAILS + pname.slug, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
const n = ['Bruce', 'Clark', 'Diana'];
  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectMaxContainer}>
        <div className={styles.projectBase}>
          <div className={styles.projectEdit}>
            <a>
              <FaPencilAlt className={styles.pencil} />
            </a>
          </div>
          <div className={styles.projectTitle}>
            <h4>TITLE</h4>
          </div>
          <div className={styles.projectDate}>
            Added on 12/09/2021
          </div>
          <div className={styles.projectBadges}>
                {n.map((i) => (
                  <div className={styles.Badges} key={i.tid}>
                    {i}
                  </div>
                ))}
              </div>
              <div className={styles.projectDesc}>
                <p>lorem ipsimhsdgfsyh sghdvfyhsdfs ghsdvfhdsbfhsdf dysgfyusgg</p>
              </div>
              {n.map((i) => (
              <div className={styles.projectEmployee} key={i.tid}>
                Employees/ Interns
                {i}
              </div>
               ))}
               <div className={styles.deadline} >
                 dadline = 26 jan 2022
               </div>
               <div className={styles.tasksContainer} >
               <div className={styles.tasks} >
                  <p>tasks</p>
                  <p>tasks</p> 
                  <p>tasks</p>
                </div>
             
               </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
