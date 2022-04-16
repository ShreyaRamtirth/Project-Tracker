import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import authenticateUser from "../component/authenticateUser";
const Sidebarmenus = dynamic(() => import("../component/Sidebarmenu"));
import styles from "../styles/Dashboard.module.css";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import CountUp from "react-countup";
import { AiFillProject } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import cookieCutter from "cookie-cutter";
import { GetUserTask } from "./api/endpoints";
import axios from "axios";
import  styles1 from "../styles/Project.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import Chart from "chart.js/auto";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      options: {
        maintainAspectRatio: false,
      },
    },
  ],
};

const data1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};
const data2 = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setRole(cookieCutter.get("role"));
    setUsername(cookieCutter.get("username"));
    
    axios(GetUserTask + username , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookieCutter.get("jwt"),
      },
    })
      .then((response) => {
        setTasks(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
    
  },[username]);
    return (
      <div className={styles.projectContainer}>
        <div className={styles.projectBase}>

         { role === "Project Manager" ?   <div>
           <div className={styles.dashboardCount}>
          <div className={styles.countupWrap} ><p className={styles.title} >Count of Projects</p> <AiFillProject size={20} /> <CountUp end={100} className={styles.countup}  duration={2.75} /> </div>
          <div className={styles.countupWrap}> <p className={styles.title}>Count of Clients</p> <FaUserTie size={20}  /> <CountUp end={100} className={styles.countup}  duration={2.75} /></div>
          <div className={styles.countupWrap}><p className={styles.title}>Count of Employees</p>  <HiUserGroup size={20}  /> <CountUp end={100} className={styles.countup}  duration={2.75} /></div>
        </div>
        <div className={styles.graph}>
        <div style={{height: '400px', backgroundColor: "rgba(253, 251, 251, 0.884)", padding: "20px", marginTop: "40px", borderRadius: "20px" , boxShadow: "1px 5px 12px rgba(46, 45, 45, 0.61)" }}>  
        <Bar
          data={data}
          width={600}
          height={400}
          options={{
            maintainAspectRatio: false
          }}
        /></div>
        <div className={styles.showDeadline}>
          High Priority Projects 
        <div className={styles.showProject}>
          Demo Project
        </div>  
        
        <div className={styles.showProject}>
          Demo2 Project
        </div>  
        </div>
  </div>
  <div className={styles.graph}>
  <div style={{ height: "400px" , backgroundColor: "rgba(253, 251, 251, 0.884)", padding: "20px", marginTop: "40px", borderRadius: "20px" , boxShadow: "1px 5px 12px rgba(46, 45, 45, 0.61)" }} > 
  <Line
      data={data1}
      width={350}
      height={300}
    />
  </div>
  <div style={{ height: "400px" , backgroundColor: "rgba(253, 251, 251, 0.884)", padding: "20px", marginTop: "40px", borderRadius: "20px" , boxShadow: "1px 5px 12px rgba(46, 45, 45, 0.61)" }} >
  <Doughnut
     data={data2}
     width={350}
     height={300}
  />
  </div>
  </div> 
</div>
: 
          <div>
            <table className={styles.tableDetails} >
              <tbody>
                <tr><td className={styles.tableRow} width="60%">
                    <iframe className={styles.iframe}
                      src="https://feed.mikle.com/widget/v2/154246/?preloader-text=Loading"
                      height="252px"
                      width="100%"
                      scrolling="no"
                      frameBorder="0"
                    ></iframe>
                  </td>
                  <td className={styles.tableRow} rowSpan={2} width="40%">
                    <iframe
                      src="https://w.bookcdn.com/weather/picture/1_2119_1_1_137AE9_207_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=124&domid=w209&anc_id=81847"
                      height="115px"
                      width="212px"
                      className={styles.iframe1}
                    />
                    <iframe
                      src="https://feed.mikle.com/widget/v2/154245/?preloader-text=Loading"
                      height="302px"
                      width="100%"
                      className={styles.iframe}
                      scrolling="no"
                      frameBorder="0"
                    ></iframe>
                  </td></tr>
                <tr><td className={styles.tableRow}>
                { tasks === [] ? " " : 
                 <table className={styles1.tasks}>
                   <tbody className={styles.iframe}>
                 <tr className={styles1.taskRow}>
    <th className={styles1.taskRow}>Title</th>
    <th className={styles1.taskRow}>Your Pending Task</th>
    <th className={styles1.taskRow}>Assigned On</th>
  </tr>
                { tasks.map((i) => (
                   <tr className={styles1.taskRow} key={i.taskId} ><td className={styles1.taskRow}> 
                    <div className={styles1.task} >
                      {i.title}
                      </div>
                      </td>
                      <td className={styles1.taskRow}>
                      <div className={styles1.taskGiven} >
                      {i.task}
                    </div></td>
                    <td className={styles1.taskRow}>
                    <div className={styles1.taskDisplay} >
                    {i.assigned_on}
                    </div>
                    </td>
                    </tr>
                  ))} 
                  </tbody>
                  </table> }
                  </td></tr>
              </tbody>
            </table>
          </div>
}
        </div>
      </div>
    );
  

}
export default Dashboard;
