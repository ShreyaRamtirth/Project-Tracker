import React, { useState }  from 'react'
import axios from "../pages/api/hello";
import { GETPROJECT } from "../pages/api/endpoints";
import cookieCutter from 'cookie-cutter';
import { useRouter } from "next/router";

const RequestProject = async () =>{
  const router = useRouter();
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cookieCutter.get('jwt')
       }
      const response = await axios.get(
        GETPROJECT,
        {headers: headers}
        
      );
      module.exports = { projetData :response.data }
      router.push("/project");
    } catch (error) {
      // toast.error("Invalid Code");
      console.log(error);
    }
    }

export {RequestProject}