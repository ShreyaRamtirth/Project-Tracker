import React, { useEffect , useState } from 'react'
import styles from "../styles/Employee.module.css";
import ReactTooltip from "react-tooltip";
import { FaPencilAlt, FaUserTie, FaCalendar } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { ImLocation } from "react-icons/im";
import "@pathofdev/react-tag-input/build/index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";
import { ImUserPlus } from "react-icons/im";
import LinesEllipsis from "react-lines-ellipsis";
import { GetClientInfo, GetClientByName, GetClientCount } from "./api/endpoints";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
function Client() {
    const [userErr, setUserError] = useState(true);
    const [passErr, setPassError] = useState(true);
    const [rePassErr, setRePassError] = useState(true);
    const [fnameErr, setFnameError] = useState(true);
    const [lnameErr, setLnameError] = useState(true);
    const [phnoErr, setPhnoError] = useState(true);
    const [addressErr, setAddressError] = useState(true);
    const [dobErr, setDobError] = useState(true);
    const [emailErr, setEmailError] = useState(true);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState();
    const [phno, setPhno] = useState();
    const [address, setAddress] = useState();
    const [dob, setDob] = useState();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Employee");
    const [mount, setMount] = useState(false);
    const [getrole, setGetRole] = useState("");
    const [projects, setProjects] = useState([]);
    const [usernameField, setUsernameField] = useState("");
    const [disabledValue, setDisabledValue] = useState(true);
    const [filter, setFilter] = useState("");
    const [stopEffect, setStopEffect] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState([]);
    const [countProject, setCountProject] = useState();
    const [postPage, setPostPage] = useState(1);


    useEffect(() => {
        setMount(true);
        setStopEffect(true);
        
        if ( filter !== "" && filter !== undefined ){
         
        axios(GetClientByName + filter, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieCutter.get("jwt"),
          },
        })
          .then((response) => {
            setData(response.data);
            setProjects(response.data.projects);
          })
          .catch((error) => {
            console.log(error);
          });
        }
       
        axios(GetClientCount + "/" + filter, {
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
          axios(GetClientInfo + postPage, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookieCutter.get("jwt"),
            },
          })
            .then((response) => {
              setData(response.data);
              setProjects(response.data.projects);
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
      <div className={styles.projectMaxContainer}>
        <ToastContainer />
        <div className={styles.projectBase}>
          <div className={styles.projectHeading}>
            Client Info <hr />
          </div>
         

  
<div>
<div className={styles.menuProjectItem}>
  <div>
         <input
           type="search"
           className={styles.searchMenu}
           size={42}
           placeholder="Search Client"
           onChange={(e) => searchProject(e)}
         />

         <FcSearch className={styles.searchSubmit} />
       </div>

      
       {/* <div className={styles.menuProjectItem}> */}
         <button className={styles.inputAddBtn} data-tip="Add" onClick={()=>router.push("/createclient")} >
           <ImUserPlus />
           {mount && (
             <ReactTooltip place="bottom" type="dark" effect="solid" />
           )}
         </button>
       </div>
     
            <div className={styles.projectMaxPostContainer} > 
     <div className={styles.projectPostContainer}>
    
       {data.map((n) => (
         <div className={styles.projectMaxContainer} key={n.uid}>
           <div className={styles.projectBase}>
                 <div className={styles.projectTitle}>
                   <h4>{n.clientName}</h4>
                 </div>

                 <div className={styles.projectTitle}>
                
                 <label  className={styles.projectIcon} ><FaUserTie  /> </label>
                  <label>{n.representative}</label>
                  </div>

                  <div className={styles.projectTitle}>
                  <label className={styles.projectIcon} ><BsFillTelephoneFill  /> </label>
                  <label>{n.phoneNo}</label>
                  </div>
               
                  <div className={styles.projectTitle}>
                  <label className={styles.projectIcon}><MdEmail  /> </label>
                  <label>{n.email}</label>
                  </div>

                  <div className={styles.projectTitle}>
                  <label className={styles.projectIcon}><FaCalendar  /> </label>
                  { 
                  n.projects.map((x)=>(
                
                    <label key={x.pid} className={styles.projectDisplay} >{x.title} { ", "}  </label> 
                  ))
       }
                  </div>

             <div className={styles.projectDesc}>
               <label className={styles.projectIcon}><ImLocation /></label>
               <LinesEllipsis
                 text={n.address}
                 maxLine={3}
                 ellipsis="..."
                 trimRight
                 basedOn="letters"
                 className={styles.projectLine}
               />
             </div>
           </div>
         </div>
       ))}
     </div>
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
     </div>
     </div>
     </div>

  )
}

export default Client;