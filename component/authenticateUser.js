import { VALIDATE_URL } from '../pages/api/endpoints';
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter';



export function authenticateUser(){
    
    const router = useRouter();       
      try {
       if (  cookieCutter.get('jwt') === undefined) {  router.push("/"); return false} 
      } catch (error) {
          console.log(error);
      } 
}