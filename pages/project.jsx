import React, { useEffect, useState } from "react";
import styles from "../styles/Project.module.css";
import { FcSearch } from "react-icons/fc";
import { HiFolderAdd } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { GETPROJECT, TOTALPROJECT, GETPAGE } from "./api/endpoints";
import cookieCutter from "cookie-cutter";

function project() {
  const [mount, setMount] = useState(false);
  const [filter, setFilter] = useState("");
  const [stopEffect, setStopEffect] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [countProject, setCountProject] = useState();
  const [postPage, setPostPage] = useState(1);
  const [countArray, setCountArray] = useState(0);
  const router = useRouter();
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(cookieCutter.get("role"));
    
  }, []);
  useEffect(() => {
    setMount(true);
    setStopEffect(true);
    
    if ( filter !== "" && filter !== undefined ){
     
    axios(GETPROJECT + "/" + filter, {
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
   
    axios(TOTALPROJECT + "/" + filter, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookieCutter.get("jwt"),
      },
    })
      .then((response) => {
        setCountProject(Math.ceil(response.data / 4)); // divide by 2 means 2 post on 1 page
        
      })
      .catch((error) => {
        console.log(error);
      });

    if( filter === '' || filter === undefined ) {
    try {
      axios(GETPAGE + postPage, {
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
    } catch (error) {
      console.log(error);
    } 
  }
  }, [filter, pageNumber]);

  const searchProject = (e) => {
    setFilter(e.target.value);

  };

  return (
    <div className={styles.projectContainer}>
      <div className={styles.menuProject}>
        <div className={styles.menuProjectItem}>
          <input
            type="search"
            className={styles.searchMenu}
            size={42}
            placeholder="Search Project"
            onChange={(e) => searchProject(e)}
          />

          <FcSearch className={styles.searchSubmit} />
        </div>

        {  role === "Project Manager" ? 
        <div className={styles.menuProjectItem}>
          <button className={styles.inputAddBtn} data-tip="Create" onClick={()=>router.push("/createproject")} >
            <HiFolderAdd />
            {mount && (
              <ReactTooltip place="bottom" type="dark" effect="solid" />
            )}
          </button>
        </div>
        : ""
        }
      </div>
      <div className={styles.projectPostContainer}>
     
        {data.map((n) => (
          <div className={styles.projectMaxContainer} key={n.pid}>
            <div className={styles.projectBase}>
              <div className={styles.projectProgress}>
                <ProgressBar completed={n.progress} bgColor="#0384fc" />
              </div>
              <Link href={"/projects/" + n.pid}>
                <a>
                  <div className={styles.projectTitle}>
                    <h4>{n.title}</h4>
                  </div>
                </a>
              </Link>

              { role === "Project Manager" ?  
              <div className={styles.projectEdit}>
                <Link href={"projects/edits/" + n.pid}>
                  <a>
                    <FaPencilAlt className={styles.pencil} />
                  </a>
                </Link>
              </div> : "" }
              <div className={styles.projectBadges}>
                {n.technologies.split(",").map((i) => (
                  <div className={styles.Badges} key={i}>
                    {i}
                  </div>
                ))}
              </div>
              <div className={styles.projectDesc}>
                
                <LinesEllipsis
                  text={n.description}
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
      
      <div className={styles.paginationWrapper}>
        <ul className={styles.pagination}>
          <li
            className={styles.paginationbtn}
            onClick={() => {
              setPageNumber(pageNumber === 0 ? 0 : pageNumber - 1);
              setPostPage(pageNumber);
             
            }}
          >
            <AiOutlineDoubleLeft />
          </li>
          {[...Array(countProject)].map((x, i) => (
            <li
              key={i}
              onClick={() => {
                setPageNumber(i);
                setPostPage(i+1);
              }}
              className={pageNumber === i ? styles.ulActive : ""}
            >
              {i + 1}{" "}
            </li>
          ))}
          <li
            className={styles.paginationbtn}
            onClick={() => {
              setPageNumber(
                pageNumber >= countProject-1 ? countProject-1 : pageNumber + 1
              );
              setPostPage(pageNumber+2);
            }}
          >
            <AiOutlineDoubleRight />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default project;
