import  { useEffect, useState } from 'react'
import {db} from "../firebase.config"
import { collection , onSnapshot } from 'firebase/firestore'

const useGetData = (collectionName) => {
    const [data , setdata]=useState([])
    const [loading , setloading]=useState(true)
    const collectionRef=collection(db , collectionName)

    useEffect(()=>{
        const getData=async()=>{
          // firebase firestore realtime data update //
             await onSnapshot(collectionRef , (snapshot)=>{
              setdata(snapshot.docs.map((doc)=>({...doc.data() , id:doc.id})))
              setloading(false)

             } )

        }

        getData()

    },[])
  return (
    {
        data , loading
    }
  )
}

export default useGetData