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
import {
  GetUserTask,
  CountProjectEmp,
  PriorityProjects,
  TOTALPROJECT,
  ProgressProjects,
  GetClientCount,
  TotalEmployee,
  CountProjectsCompletion,
  CostProjects,
} from "./api/endpoints";
import axios from "axios";
import styles1 from "../styles/Project.module.css";

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

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [countProjects, setCountProjects] = useState([]);
  const [priorityProjects, setPriorityProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [countProjectsCompletion, setCountProjectsCompletion] = useState([]);
  const [progressProjects, setProgressProjects] = useState([]);
  const [costProjects, setCostProjects] = useState([]);

  useEffect(() => {
    setRole(cookieCutter.get("role"));
    setUsername(cookieCutter.get("username"));
  }, [username]);

  useEffect(() => {
    if (role === "Employee") {
      axios(GetUserTask + username, {
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
    }
  }, [username]);

  useEffect(() => {
    if (role === "Employee") {
      axios(CountProjectEmp + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setCountProjects(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (role === "Project Manager") {
      axios(PriorityProjects, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setPriorityProjects(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios(TOTALPROJECT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setTotalProjects(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios(GetClientCount, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setTotalClients(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios(TotalEmployee, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setTotalEmployees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios(TotalEmployee, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setTotalEmployees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios(CountProjectsCompletion, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setCountProjectsCompletion(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios(ProgressProjects, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setProgressProjects(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios(CostProjects, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookieCutter.get("jwt"),
        },
      })
        .then((response) => {
          setCostProjects(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [username]);

  const employeeCompleted = {
    labels: ["Not Completed Projects", "Completed Projects"],
    datasets: [
      {
        data: [
          countProjects["completedProjects"],
          countProjects["workingProjects"],
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const projectCompletion = {
    labels: ["Completed Projects", "Working Projects"],
    datasets: [
      {
        data: [
          countProjectsCompletion["completedProjects"],
          countProjectsCompletion["workingProjects"],
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const progressProject = {
    labels: progressProjects[0],
    datasets: [
      {
        label: "Progress of Projects",
        data: progressProjects[1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(186, 255, 74, 0.2)",
          "rgba(255, 228, 74, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(186, 255, 74, 1)",
          "rgba(255, 228, 74, 1)",
        ],
        borderWidth: 1,
        options: {
          maintainAspectRatio: false,
        },
      },
    ],
  };

  const costProject = {
    labels: costProjects[0],
    datasets: [
      {
        label: "Cost of Projects",
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
        data: costProjects[1],
      },
    ],
  };
  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectBase}>
        {role === "Project Manager" ? (
          <div>
            <div className={styles.dashboardCount}>
              <div className={styles.countupWrap}>
                <p className={styles.title}>Count of Projects</p>{" "}
                <AiFillProject size={20} />{" "}
                <CountUp
                  end={totalProjects}
                  className={styles.countup}
                  duration={2.75}
                />{" "}
              </div>
              <div className={styles.countupWrap}>
                {" "}
                <p className={styles.title}>Count of Clients</p>{" "}
                <FaUserTie size={20} />{" "}
                <CountUp
                  end={totalClients}
                  className={styles.countup}
                  duration={2.75}
                />
              </div>
              <div className={styles.countupWrap}>
                <p className={styles.title}>Count of Employees</p>{" "}
                <HiUserGroup size={20} />{" "}
                <CountUp
                  end={totalEmployees}
                  className={styles.countup}
                  duration={2.75}
                />
              </div>
            </div>
            <div className={styles.graph}>
              <div
                style={{
                  height: "400px",
                  backgroundColor: "rgba(253, 251, 251, 0.884)",
                  padding: "20px",
                  marginTop: "40px",
                  borderRadius: "20px",
                  boxShadow: "1px 5px 12px rgba(46, 45, 45, 0.61)",
                }}
              >
                <Bar
                  data={progressProject}
                  width={600}
                  height={400}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              <div className={styles.showDeadline}>
                High Priority Projects
                {priorityProjects.map((i) => (
                  <div key={i} className={styles.showProject}>
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.graph}>
              <div
                style={{
                  height: "400px",
                  backgroundColor: "rgba(253, 251, 251, 0.884)",
                  padding: "20px",
                  marginTop: "40px",
                  borderRadius: "20px",
                  boxShadow: "1px 5px 12px rgba(46, 45, 45, 0.61)",
                }}
              >
                <Line data={costProject} width={350} height={300} />
              </div>
              <div
                style={{
                  height: "400px",
                  backgroundColor: "rgba(253, 251, 251, 0.884)",
                  padding: "20px",
                  marginTop: "40px",
                  borderRadius: "20px",
                  boxShadow: "1px 5px 12px rgba(46, 45, 45, 0.61)",
                }}
              >
                <Doughnut data={projectCompletion} width={350} height={300} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <table className={styles.tableDetails} >
              <tbody>
                <tr>
                  <td className={styles.tableRow} width="60%">
              
                    <tr>
                  <td className={styles.tableRow}>
                    <div className={styles.doughnut}>
                      <Doughnut
                        data={employeeCompleted}
                        width={300}
                        height={300}
                      />
                    </div>
                  </td>
                  <td className={styles.tableRow} width="40%">
                    <iframe
                      src="https://feed.mikle.com/widget/v2/154245/?preloader-text=Loading"
                      height="302px"
                      width="120%"
                      className={styles.iframe}
                      scrolling="no"
                      frameBorder="0"
                    ></iframe>
                  
                  </td>
                </tr>
            
                {tasks === [] ? (
                      " "
                    ) : (
                      <table className={styles1.tasks}>
                        <tbody className={styles.iframe}>
                          <tr className={styles1.taskRow}>
                            <th className={styles1.taskRow}>Title</th>
                            <th className={styles1.taskRow}>
                              Your Pending Task
                            </th>
                            <th className={styles1.taskRow}>Assigned On</th>
                          </tr>
                {tasks.map((i) => (
                            <tr className={styles1.taskRow} key={i.taskId}>
                              <td className={styles1.taskRow}>
                                <div className={styles1.task}>{i.title}</div>
                              </td>
                              <td className={styles1.taskRow}>
                                <div className={styles1.taskGiven}>
                                  {i.task}
                                </div>
                              </td>
                              <td className={styles1.taskRow}>
                                <div className={styles1.taskDisplay}>
                                  {i.assigned_on}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
