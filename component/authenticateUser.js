import { VALIDATE_URL } from '../pages/api/endpoints';
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter';



export default function(){
    
    const router = useRouter();       
      try {
       if (  cookieCutter.get('jwt') === undefined) {  router.push("/"); return false} else  console.log('don go')
      } catch (error) {
          console.log(error);
      }
      return true;
    
    
}