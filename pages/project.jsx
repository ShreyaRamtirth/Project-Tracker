import React, { useEffect, useState } from "react";
import styles from "../styles/Project.module.css";
import { FcSearch } from "react-icons/fc";
import { HiFolderAdd } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { GETPROJECT , TOTALPROJECT } from "./api/endpoints";
import cookieCutter from 'cookie-cutter';



function project() {
 
  const [mount, setMount] = useState(false);
  const [filter, setFilter] = useState('');
  const [stopEffect, setStopEffect] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [countProject, setCountProject] = useState();
  useEffect(() => {
    setMount(true);
    setStopEffect(true);
    axios(GETPROJECT + "/" +filter , {
      method: "GET",
      headers: { 'Content-Type': 'application/json' ,
      'Authorization': 'Bearer ' + cookieCutter.get('jwt') },
    
    }).then(response => {
      setData(response.data);
      console.log(response.data);
    }).catch(error => {
      
      console.log(error);
    }) 
    

    axios(TOTALPROJECT, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' ,
      'Authorization': 'Bearer ' + cookieCutter.get('jwt') },
    }).then(response => {
      setCountProject(Math.ceil(response.data  / 2));  // divide by 2 means 2 post on 1 page
    }).catch(error => {
      console.log(error);
    }) 


  }, [filter] );

  const searchProject = (e) =>{
    setFilter(e.target.value);
    console.log(filter);
  }


  return (
    <div className={styles.projectContainer}  >
      <div className={styles.menuProject}>
        <div className={styles.menuProjectItem}>
          <input
            type="search"
            className={styles.searchMenu}
            placeholder="Search Project"
            onChange={e => searchProject(e) }
          />

          <FcSearch className={styles.searchSubmit} />
        </div>
        <div className={styles.menuProjectItem}>
          <button className={styles.inputAddBtn} data-tip="Create">
            {" "}
            <HiFolderAdd />{" "}
            {mount && (
              <ReactTooltip place="bottom" type="dark" effect="solid" />
            )}{" "}
          </button>
        </div>
      </div>
      <div className={styles.projectPostContainer}>
       {/* { console.log("ithalache ",data) } */}
        {  data.map((n) => (
          <div className={styles.projectMaxContainer} key={n.pid}>
            <div className={styles.projectBase}>
              <div className={styles.projectProgress}>
                <ProgressBar completed={n.progress} bgColor="#0384fc" />
              </div>
              <Link href={"/projects/" + n}>
                <a>
                  <div className={styles.projectTitle}>
                    <h4>{n.title}</h4>
                  </div>
                </a>
              </Link>
              <div className={styles.projectEdit}>
                <Link href={"#"}>
                  <a>
                    <FaPencilAlt className={styles.pencil} />
                  </a>
                </Link>
              </div>
              <div className={styles.projectBadges}>
                
              { n.technologies.map((i) =>
                <div
                  className={styles.Badges} key={i.tid}
                >
                  {i.technologyName}
                </div>
               ) }
              </div>
              <div className={styles.projectDesc}>
                <LinesEllipsis
                  text= {n.description}
                  maxLine={3}
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
          <ul className={styles.pagination}>
            
          {[...Array(countProject)].map((x, i) =>
    <li key={i} onClick={(i) => { console.log(i.target.outerText) }}  >{i+1}</li> 
  )}
          
          </ul>
      </div>
    </div>
  );
}

export default project;
