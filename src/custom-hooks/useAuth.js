import  {useState , useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'

const useAuth = () => {
    useEffect(()=>{
        onAuthStateChanged(auth , (user)=>{
            if(user){
                setcurrentUser(user)
            }else{
                setcurrentUser(null)
            }
        })
    })
    const [currentUser , setcurrentUser]=useState({})
  return {
    currentUser,
}
  
}

export default useAuth