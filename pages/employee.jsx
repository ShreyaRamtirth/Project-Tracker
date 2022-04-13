import React, { useState, useEffect } from 'react';
import styles from "../styles/Employee.module.css";
import ReactTooltip from 'react-tooltip';
import { validFname, ValidAddress, ValidPhno, ValidUsername,validLname,  ValidEmailAddress,validPassword } from "../component/Regex";
import "@pathofdev/react-tag-input/build/index.css";
import {CreateEmployee} from './api/endpoints';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from 'axios';
import cookieCutter from "cookie-cutter";



const currentDate = new Date().toISOString().slice(0, 10);



function Employee() {
  const [userErr, setUserError] = useState(true);
  const [passErr, setPassError] = useState(true);
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
  const [submitForm, setSubmitForm] = useState(false);
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  });

  const  handleSubmit =  async () => {
  
    if (userErr && passErr ) {
      try {
        const response = await axios.post(
          CreateEmployee,
          {
           
            firstName: fname,
            lastName: lname,
            username: username,
            password: password,
            address: address,
            phoneNo: phno,
            dob: dob,
            email: email,
            roles: role
  
          },
          { headers : {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookieCutter.get("jwt")
          } }
        );
        response.data ?
        toast.success("Information Added Succesfully.") : toast.error("not valid.");
        
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
  const currentDate = new Date()
  
  
  const dobValidation = (e) => {
    setDob(e.target.value);
    var birthDate = new Date(e.target.value);
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
  }if( age > 18 ) setDobError(true);
    else setDobError(false);

  };
  const EmailValidation = (e) => {
    setEmail(e.target.value);
    if (ValidEmailAddress.test(e.target.value)) setEmailError(true);
    else setEmailError(false);
    console.log(ValidEmailAddress.test(e.target.value))
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
  return (
    
    <div className={styles.projectContainer}>
    <div className={styles.projectMaxContainer}>
    <ToastContainer />
      <div className={styles.projectBase}>
        <div className={styles.projectHeading}>Employee Info <hr /></div> 
      <div className={styles.projectTitle}>
            <label>Enter First Name </label> <input type="text" className={styles.projectInput}  
            data-tip="Should contain only charaters" onChange={fnameValidation} />
            {fnameErr ? "" : <p className={styles.error}>Invalid First Name</p>}    
            {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }
            <label>Enter Last Name </label> <input type="text" className={styles.projectInput} 
             data-tip="Should contain only charaters"
            onChange={lnameValidation} />
            {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }
            {lnameErr ? "" : <p className={styles.error}>Invalid Last Name</p>}    
        </div>
        
        <div className={styles.projectTitle}>
        <label>Enter username </label> <input type="text" className={styles.projectInput} 
        data-tip="Should not contain space and special characters"
        onChange={UserValidation} />
        {userErr ? "" : <p className={styles.error}>Invalid Username</p>}  
        {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }  
            <label>Enter Password </label> <input type="passsword" className={styles.projectInput} 
            data-tip="Should contain Uppercase, <br>
            Lowercase, digit, special character,  <br>
             8 character long"
            onChange={PassValidation} />          
            {passErr ? "" : <p className={styles.error}>Invalid Password</p>}   
            {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> } 
        </div>

        <div className={styles.projectTitle}>
          <label>Enter Date of Birth </label> <input type="date" className={styles.projectInput}
          data-tip="User should be 18 years old"
          onChange={dobValidation} />
          {dobErr ? "" : <p className={styles.error}>Invalid DOB</p>}    
          {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }
          <label>Enter Email </label> <input type="email" className={styles.projectInputEmail} 
          data-tip="example@any.com"
          onChange={EmailValidation} />
          {emailErr ? "" : <p className={styles.error}>Invalid Email</p>}    
          
          {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }
        </div>

        <div className={styles.projectTitle}>
          
        </div>
           

              <div className={styles.projectTitle}>

        <label>Enter Phone Number </label> <input type="text" className={styles.projectInput} 
         data-tip="Should be 10 digit"
        onChange={PhnoValidation} />
        {phnoErr ? "" : <p className={styles.error}>Invalid Phone Number</p>}  
        {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }
        <label>Enter role </label> <input type="radio"  name='role' value="Employee" className={styles.projectInput}  onChange={(e)=> setRole(e.target.value)} /> Employee
            <input type="radio" value="Project Manager" name='role' className={styles.projectInput}  onChange={(e)=> setRole(e.target.value)} />  Project Manager
        </div>
        
        <div className={styles.projectTitle}>
        <label>Enter Address </label> 
        <textarea type="passsword" cols={70} rows={5} className={styles.projectInput} 
        data-tip="Should contain characters and numbers only"
        onChange={AddressValidation} />          
        {addressErr ? "" : <p className={styles.error}>Invalid Address</p>}  
        {mount && <ReactTooltip place="right" type="info" effect="float" 
                multiline={true} 
                /> }
</div>


        <div className={styles.projectSubmit}>
                <input type="button" className={styles.projectButton} value="SUBMIT" onClick={handleSubmit} />
              </div>
    </div>
    </div>
    </div>
  )
  
}

export default Employee;




  




