import React , {useState} from 'react'
import Helmet from "../components/Helmet/Helmet"
 import { Container , Row , Col , Form , FormGroup } from 'reactstrap'
 import { Link } from 'react-router-dom'
 import "../styles/login.css"
 import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
 import { ref , uploadBytesResumable , getDownloadURL } from 'firebase/storage'
 import { setDoc , doc } from 'firebase/firestore'
 import { auth } from '../firebase.config'
 import { storage } from '../firebase.config'
 import { db } from '../firebase.config'
 import { toast } from 'react-toastify'
 import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [Username , setUsername]=useState("");
  const [email , setEmail]=useState("");
  const [password , setPassword]=useState("");
  const [file , setfile]=useState(null)
  const [loading , setloading]=useState(false)
  const navigate=useNavigate()
  const sign=async(e)=>{
    e.preventDefault()
    setloading(true)

    try{
      const userCredenrial= await createUserWithEmailAndPassword(auth , email , password)
      const user=userCredenrial.user

      const storageRef=ref(storage,`images/${file.name}`)
      const uploadTask= uploadBytesResumable(storageRef , file)
      uploadTask.on((error)=>{
        toast.error(error.message)
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
          //update user profile
       await updateProfile(user , {
            displayName:Username,
            photoURL:downloadURL,
          });

//store user data in firestore database
await setDoc(doc(db ,'users ', user.uid),{
  uid : user.uid,
  displayName: Username,
  photoURL : downloadURL,
  email,
  
});


        });
      })
      setloading(false)
      toast.success('Account created')
      navigate('/login')
    }catch(error){
     setloading(false)
      toast.error('Something went wrong')
    }
    
  }
  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
           {
            loading?(<Col lg='12' className='text-center'><h5 className='fw-bold'>Loading.....</h5></Col>):(
              <Col lg='6' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Signup</h3>
              <Form className='auth_form' onSubmit={sign}>
              <FormGroup className='form_group'>
                  <input type="text" placeholder='Username' value={Username} onChange={e=>setUsername(e.target.value)} />
                </FormGroup>

                <FormGroup className='form_group'>
                  <input type="email" placeholder='Enter your email'  value={email} onChange={e=>setEmail(e.target.value)} />
                </FormGroup>

                <FormGroup className='form_group'>
                  <input type="password" placeholder='Enter your password' autoComplete=''  value={password} onChange={e=>setPassword(e.target.value)} />
                </FormGroup>

                <FormGroup className='form_group'>
                  <input type="file" onChange={e=>setfile(e.target.files[0])} />
                </FormGroup>
                <button type='submit'  className="buy_btn auth_btn">Create an Account</button>
                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
              </Form>
            </Col>
            )
           }
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Signup