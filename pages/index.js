
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import {FaUserTie} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import cookieCutter from 'cookie-cutter';
import axios from './api/hello';
import { ToastContainer, toast } from 'react-nextjs-toast';
import { useRouter } from 'next/router';

const headers = {
  'Content-Type': 'application/json'
}
export default function Home() {
  
  const LOGIN_URL = "/authenticate";
 
  const [usernameFields, setUsernameFields] = useState('');
  const [passwordFields, setPasswordFields] = useState('');
  const router = useRouter();

   function changing(){
    usernameFields && passwordFields !== '' ? handleSubmit()  : 
    toast.notify( "Please fill all fields", { type: "error" } )
   }
    
    const handleSubmit= async()=>{
    console.log(usernameFields,passwordFields);
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
      toast.notify( "Invalid Username or Password.", { type: "error" } )
    }
  }
  return (
    <div className={styles.LoginPage}>
        <div className={styles.loginbox}>
            <div className={styles.loginlogo}>
                Login
            </div>
         
            <div className={styles.loginContainer}>
            <div className={styles.loginText}>Log in to your account</div>
            <div className={styles.usernameBox}>
                <span className={styles.LabelUsername}><FaUserTie  /> </span>
                <input className={styles.TextUsername} autoComplete='off' type="text" onChange={e=> setUsernameFields(e.target.value)} />
            </div>
            <div className={styles.passwordBox}>
                <span className={styles.LabelPassword}><RiLockPasswordFill /></span>
                 <input className={styles.TextPassword}
                            type="password" 
                            onChange={s=> setPasswordFields(s.target.value)} 
                            autoComplete="off"
                            required
                            />
            </div>
            <div className={styles.Loginbutton}>
                <span><input onClick={changing }  className={styles.loginBtn} type="button" value="Login"/></span>
                <ToastContainer />
            </div>
            <div className={styles.forgot}>
                <span className={styles.forgotText}>Forgot Password?</span>
            </div>
            </div>
        </div>
    </div>
  )
}
