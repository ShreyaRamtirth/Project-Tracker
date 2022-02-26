
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import {FaUserTie} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import cookieCutter from 'cookie-cutter';
import axios from './api/hello';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { validEmail } from '../component/Regex';
import image from '../public/Vias-Logo.png';
import Image from 'next/image';
const headers = {
  'Content-Type': 'application/json'
}
export default function Home() {
  
  const LOGIN_URL = "/authenticate";
  const [usererror, setError] = useState(true);
  const [passerror, setPassError] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);
  const [usernameFields, setUsernameFields] = useState('');
  const [passwordFields, setPasswordFields] = useState('');

  const router = useRouter();

   function changing(){
    submitForm ? handleSubmit()  : 
    toast.error('Please Enter the valid fields!');
    
   }
  
   const Formvalidation=()=>{
    
    if(validEmail.test(usernameFields)){
      setError(true);
     }
    else {
      setError(false); 
    }

    if((passwordFields !== ''))
      setPassError(true);
    else
      setPassError(false);

    if(usererror && passerror){
      setSubmitForm(true);
    }
    else{
      setSubmitForm(false);
    }
  
  }

    const handleSubmit= async()=>{
    
    try {
        const response = await axios.post( LOGIN_URL,
            {
                "username": usernameFields,
                "password": passwordFields
            },
            {headers: headers}
            
            );
            cookieCutter.set('jwt', response.data);
            router.push("/dashboard");
           
    } catch (error) {
      toast.error('Invalid Username or Password');
    }
  }
  return (
    <form className="w-full" >
    <div className={styles.LoginPage}>
        <div className={styles.loginbox}>
            <div className={styles.loginlogo}>
                {/* Login */}
                <Image src={image} />
            </div>
         
            <div className={styles.loginContainer}>
            <div className={styles.loginText}>Log in to your account</div>
            <div className={styles.usernameBox}>
                <span className={styles.LabelUsername}><FaUserTie  /> </span>
                <input className={usererror ? styles.TextUsername: styles.errorline} autoComplete='off' type="text" onChange={e=> {setUsernameFields(e.target.value) , Formvalidation() }   } />
            </div>
            {usererror ?  '' : <p className={styles.error}>Username is Invalid</p> }
            <div className={styles.passwordBox}>
                <span className={styles.LabelPassword}><RiLockPasswordFill /></span>
                 <input className={passerror ? styles.TextPassword : styles.errorline}
                            type="password" 
                            onChange={s=> {setPasswordFields(s.target.value) , Formvalidation()  }} 
                            autoComplete="off"
                            required
                            />
            </div>
            {passerror ?  '' : <p className={styles.error}>Your Password is invalid</p> }
            <div className={styles.Loginbutton}>
                <span><input   className={styles.loginBtn} onClick={changing}  type="button" value="Login"/></span>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    <ToastContainer />
            </div>
            <div className={styles.forgot}>
                <span className={styles.forgotText}>Forgot Password?</span>
            </div>
            </div>
        </div>
    </div>
    </form>
  )
}
