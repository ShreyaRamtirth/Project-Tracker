import React, { useState , useEffect } from "react";
import styles from "../styles/Employee.module.css";
import ReactTooltip from "react-tooltip";
import { FaPencilAlt, FaUserTie, FaCalendar } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { ImLocation } from "react-icons/im";

import { FcSearch } from "react-icons/fc";
import { ImUserPlus } from "react-icons/im";
import LinesEllipsis from "react-lines-ellipsis";
import { GetUserInfo, GetUsers, GetUsersbyName } from "./api/endpoints";
import { BsFillTelephoneFill, BsFillCaretRightFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import {
  validFname,
  ValidAddress,
  ValidPhno,
  ValidUsername,
  validLname,
  ValidEmailAddress,
  validPassword,
} from "../component/Regex";
import "@pathofdev/react-tag-input/build/index.css";
import { TotalEmployee, GetUserUpdate } from "./api/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
const currentDate = new Date().toISOString().slice(0, 10);

function Employee() {
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
  const [userInfo, getUserInfo] = useState([]);
  const [usernameField, setUsernameField] = useState("");
  const [disabledValue, setDisabledValue] = useState(true);
  const [filter, setFilter] = useState("");
  const [stopEffect, setStopEffect] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [countProject, setCountProject] = useState();
  const [postPage, setPostPage] = useState(1);
  const [designation, setDesignation] = useState("");
  const [designationError, setDesignationError] = useState(true);
  useEffect(() => {
    setGetRole(cookieCutter.get("role"));
    setUsernameField(cookieCutter.get("username"));
    axios(GetUserInfo + usernameField , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookieCutter.get("jwt"),
      },
    })
      .then((response) => {
        getUserInfo(response.data);
        console.log(userInfo);
      })
      .catch((error) => {
        console.log(error);
      });


  }, [usernameField]);
  // useEffect(() => {
  //   setMount(true);
  // });

  useEffect(() => {
    setMount(true);
    setStopEffect(true);
    
    if ( filter !== "" && filter !== undefined ){
     
    axios(GetUsersbyName + filter, {
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
   
    axios(TotalEmployee + "/" + filter, {
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
      axios(GetUsers + postPage, {
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


  // const handleSubmit = async () => {
  //   if (userErr && passErr) {
  //     try {
  //       const response = await axios.post(
  //         CreateEmployee,
  //         {
  //           firstName: fname,
  //           lastName: lname,
  //           username: username,
  //           password: password,
  //           address: address,
  //           phoneNo: phno,
  //           dob: dob,
  //           email: email,
  //           roles: role,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + cookieCutter.get("jwt"),
  //           },
  //         }
  //       );
  //       response.data
  //         ? toast.success("Information Added Succesfully.")
  //         : toast.error("not valid.");
  //     } catch (error) {
  //       toast.error("Invalid Details");
  //       console.log(error);
  //     }
  //   } else {
  //     toast.error("Invalid Information");
  //   }
  // };

  const handleEditSubmit = async () => {
    if (userErr && passErr) {
      try {
        const response = await axios.post(
          GetUserUpdate,
          {
            firstName: fname,
            lastName: lname,
            username: username,
            password: password,
            address: address,
            phoneNo: phno,
            dob: dob,
            email: email,
            roles: role,
            qualification: designation
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookieCutter.get("jwt"),
            },
          }
        );
        response.data
          ? toast.success("Information Added Succesfully.")
          : toast.error("not valid.");
      } catch (error) {
        toast.error("Invalid Details");
        console.log(error);
      }
    } else {
      toast.error("Invalid Information");
    }
  };




  const fnameValidation = (e) => {
    setFname(e.target.value);
    if (validFname.test(e.target.value)) setFnameError(true);
    else setFnameError(false);

    console.log(fname);
    console.log(validFname.test(e.target.value));
  };
  const lnameValidation = (e) => {
    setLname(e.target.value);
    if (validLname.test(e.target.value)) setLnameError(true);
    else setLnameError(false);
  };
  const UserValidation = (e) => {
    setUsername(e.target.value);
    if (ValidUsername.test(e.target.value)) setUserError(true);
    else setUserError(false);
  };
  const PassValidation = (e) => {
    setPassword(e.target.value);
    if (validPassword.test(e.target.value)) setPassError(true);
    else setPassError(false);
  };
  const rePassValidation = (e) => {
    // setRePassError(e.target.value);
    if (password === e.target.value) setRePassError(true);
    else setRePassError(false);
  };
  const currentDate = new Date();

  const dobValidation = (e) => {
    setDob(e.target.value);
    var birthDate = new Date(e.target.value);
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age > 18) setDobError(true);
    else setDobError(false);
  };
  const EmailValidation = (e) => {
    setEmail(e.target.value);
    if (ValidEmailAddress.test(e.target.value)) setEmailError(true);
    else setEmailError(false);
    console.log(ValidEmailAddress.test(e.target.value));
  };
  const PhnoValidation = (e) => {
    setPhno(e.target.value);
    if (ValidPhno.test(e.target.value)) setPhnoError(true);
    else setPhnoError(false);
  };
  const AddressValidation = (e) => {
    setAddress(e.target.value);
    if (ValidAddress.test(e.target.value)) setAddressError(true);
    else setAddressError(false);
  };
  const designationValidation = (e) => {
    setDesignation(e.target.value);
    if (ValidAddress.test(e.target.value)) setDesignationError(true);
    else setDesignationError(false);
  };

  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectMaxContainer}>
        <ToastContainer />
        <div className={styles.projectBase}>
          <div className={styles.projectHeading}>
            Employee Info <hr />
          </div>
          { getrole === "Project Manager" ? 

  
<div>
<div className={styles.menuProjectItem}>
  <div>
         <input
           type="search"
           className={styles.searchMenu}
           size={42}
           placeholder="Search Employee"
           onChange={(e) => searchProject(e)}
         />

         <FcSearch className={styles.searchSubmit} />
       </div>

      
       {/* <div className={styles.menuProjectItem}> */}
         <button className={styles.inputAddBtn} data-tip="Add" onClick={()=>router.push("/editEmployee")} >
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
                   <h3>{n.firstName + " " + n.lastName}</h3>
                 </div>

                 <div className={styles.projectTitle}>
                
                 <label  className={styles.projectIcon} ><FaUserTie  /> </label>
                  <label>{n.username}</label>
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
                  <label>{n.dob}</label>
                  </div>

                  <div className={styles.projectTitle}>
                  <label className={styles.projectIcon}><GrCertificate  /> </label>
                  <label>{n.qualification}</label>
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
          :
   
           <div className={styles.projectTitle}>
             <div className={styles.edit}>
              <FaPencilAlt data-tip="Edit"  onClick={()=>setDisabledValue(false) }  className={styles.pencil} />
            
              </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>First Name </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={styles.projectInput}
                      size="42"
                      defaultValue={userInfo["firstName"]}
                      disabled={disabledValue}
                      data-tip="Should contain only charaters"
                      onChange={fnameValidation}
                    />
                    {fnameErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid First Name</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td>Last Name</td>
                  <td>
                    <input
                      type="text"
                      className={styles.projectInput}
                      defaultValue={userInfo["lastName"]}
                      disabled={disabledValue}
                      data-tip="Should contain only charaters"
                      size="42"
                      onChange={lnameValidation}
                    />
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                    {lnameErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Last Name</p>
                    )}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td>
                    <label>username </label>{" "}
                  </td>
                  <td>
                    <input
                      type="text"
                      className={styles.projectInput}
                      size="42"
                      value={ userInfo["username"] }
                      disabled={disabledValue}
                      data-tip="You do not have permission <br> to edit this"
                      onChange={UserValidation}
                    />
                    {userErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Username</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Password</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      className={styles.projectInput}
                    data-tip="Should contain Uppercase, <br>
            Lowercase, digit, special character,  <br>
             8 character long"
                      onChange={PassValidation}
                      size="42"
                      defaultValue={ userInfo["username"] }
                      disabled={disabledValue}
                    />
                    {passErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Password</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
              <tr>
                  <td>
                    <label>Date of Birth </label>
                  </td><td>
                    <input
                      type="date"
                      size="50"
                      className={styles.projectInput}
                      data-tip="User should be 18 years old"
                      onChange={dobValidation}
                      defaultValue={ userInfo["dob"] }
                      disabled={disabledValue}
                    />
                    {dobErr ? "" : <p className={styles.error}>Invalid DOB</p>}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email </label>
                  </td>
                  <td>
                    <input
                      size="42"
                      type="email"
                      className={styles.projectInput}
                      data-tip="example@any.com"
                      onChange={EmailValidation}
                      defaultValue={ userInfo["email"] }
                      disabled={disabledValue}
                    />
                    {emailErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Email</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}</td>
                </tr><tr>
                  <td>
                    <label>Phone Number </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      size="42"
                      className={styles.projectInput}
                      data-tip="Should be 10 digit"
                      onChange={PhnoValidation}
                      defaultValue={ userInfo["phoneNo"] }
                      disabled={disabledValue}
                    />
                    {phnoErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Phone Number</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>role </label>
                  </td>
                  <td>
                    <div className={styles.projectRole}>
                      <input
                      type="text"
                      size="42"
                      className={styles.projectInput}
                      data-tip="You do not have permission <br> to edit this"
                      value={ userInfo["roles"] }
                      disabled={disabledValue}
                    />
                     {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                    </div>
                  </td>
                </tr>
                <tr>
          <td>Designation</td>
          <td>
        
            <input
              type="text"
              className={styles.projectInput}
              data-tip="Should contain only charaters and numbers"
              size="42"
              defaultValue={ userInfo["qualification"] }
              disabled={disabledValue}
              onChange={designationValidation}
            />
            {mount && (
              <ReactTooltip
                place="right"
                type="info"
                effect="float"
                multiline={true}
              />
            )}
            {designationError ? (
              ""
            ) : (
              <p className={styles.error}>Invalid Designation</p>
            )}
          </td>
        </tr>
                <tr>
                  <td>
                    <label>Address </label>
                  </td>
                  <td>
                    <textarea
                      cols={70}
                      rows={5}
                      className={styles.projectInput}
                      data-tip="Should contain characters and numbers only"
                      onChange={AddressValidation}
                      defaultValue={ userInfo["address"] }
                      disabled={disabledValue}
                    />
                    {addressErr ? (
                      ""
                    ) : (
                      <p className={styles.error}>Invalid Address</p>
                    )}
                    {mount && (
                      <ReactTooltip
                        place="right"
                        type="info"
                        effect="float"
                        multiline={true}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table> 
            {   disabledValue ?  "" :   
            <div className={styles.projectSubmit}>
            <input
              type="button"
              className={styles.projectButton}
              value="SUBMIT"
              onClick={handleEditSubmit}
            />
          </div>
           }
<hr />
<div className={styles.projectListTitle} >Worked on - </div>
             {   userInfo["projects"] === undefined ? <div>None</div> :
              userInfo["projects"].map((i)=>(
           <div  className={styles.projectList}> <BsFillCaretRightFill  /> {i.title}</div>
         ))}
             </div>            
}
        </div>
      </div>
    </div>
  );
}

export default Employee;
