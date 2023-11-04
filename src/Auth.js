import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword , onAuthStateChanged , signOut , signInWithEmailAndPassword } from "firebase/auth"
import auth from "./firebase.config"
const Authcontext = createContext();

const AuthProvider = ({children}) =>{
    const [currentuser ,setcureentuser]=useState()
    const [loading , setloading] =useState(true)
    const signup=( email , password)=>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        
return createUserWithEmailAndPassword(auth , email , password)
    }
    const logout=()=>{
    return signOut(auth)
    }
    const login=(email , password)=>{
      return  signInWithEmailAndPassword(auth , email , password)

    }
    useEffect(()=>{
     const unsubcribe= onAuthStateChanged(auth,(user,name)=>{
            setcureentuser(user)
            setloading(false)

        })
        return ()=>{
            unsubcribe()
        }
    },[])
    return <Authcontext.Provider value={{currentuser , signup , logout , login  }}>
{!loading && children }
    </Authcontext.Provider>
}

export default AuthProvider;
export const useAuth=()=>{
    return useContext(Authcontext)
}