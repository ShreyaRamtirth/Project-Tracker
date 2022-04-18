import React,{useEffect, useState} from 'react'
import styles from '../styles/profileInfo.module.css';
import Avatar from 'react-avatar';
import { FcNext, FcPhone, FcBusinesswoman, FcReadingEbook, FcTabletAndroid , FcCalendar} from "react-icons/fc";

import {MdLocationOn , MdEmail} from "react-icons/md";
import cookieCutter from "cookie-cutter";
import { GetUserInfo } from "../pages/api/endpoints";
import axios from 'axios';
function profileInfo() {
    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
        
        useEffect(() => {
            setUsername(cookieCutter.get("username"));
            if ( username !== "" && username !== undefined ){
             
            axios(GetUserInfo + username, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookieCutter.get("jwt"),
              },
            })
              .then((response) => {
                setData(response.data);
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
            }
      }, [username]);
  return (
    <div className={styles.projectContainer}>
        <div className={styles.projectBase}>
            { data  === undefined ? " " :
            <div className={styles.profileContainer}>
            <div className={styles.personalInfoWrapper}>

            <div className={styles.personalInfo}>Personal Info</div>
            <div className={styles.personalInfoAvatar}><Avatar color={Avatar.getRandomColor( ['red' , 'cyan'])} name={username} round={true} size="90"/></div>
            <div className={styles.informationContainer}>
              
                <div className={styles.information}> <div className={styles.informationLabel}> </div> </div>
                <div className={styles.information}> <div className={styles.informationLabel}> <MdEmail className={styles.qualification} /> </div> <div className={styles.informationLabel1}>{data["email"]}</div> </div>
                <div className={styles.information}> <div className={styles.informationLabel}> <FcCalendar className={styles.qualification} /> </div> <div className={styles.informationLabel1}>{data["dob"]}</div> </div>
                <div className={styles.information}> <div className={styles.informationLabel}> <MdLocationOn className={styles.qualification} /> </div> <div className={styles.informationLabel1}>{data["address"]}</div> </div>
                {/* <div className={styles.information}> <div className={styles.informationLabel}>Phone No</div> <div className={styles.informationLabel1}>{data["phoneNo"]}</div> </div> */}
            </div>
            </div>
            <div className={styles.aboutContainer}>
            <div className={styles.aboutMe}>About Me</div>
            <div className={styles.techContainer}>
            <div className={styles.tech}>Information</div>
            <div className={styles.techs}><FcReadingEbook className={styles.qualification} /> {data["firstName"] +" "+ data["lastName"] } </div>
            <div className={styles.techs}><FcPhone className={styles.phone} /> {data["phoneNo"]}</div>
            <div className={styles.techs}><FcBusinesswoman className={styles.qualification} /> {data["qualification"]}</div>
            
                <div className={styles.tech}>Working  Projects</div>
                <div className={styles.projects}><FcNext /> Random Project</div>
            </div>
            </div>
            </div>
            }
        </div>
    </div>
  )
}

export default profileInfo