import React , {useState} from 'react'
import Helmet from "../components/Helmet/Helmet"
 import { Container , Row , Col , Form , FormGroup } from 'reactstrap'
 import { Link } from 'react-router-dom'
 import "../styles/login.css"
 import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email , setemail]=useState("");
  const [password , setpassword]=useState("");
  const [loading , setloading]=useState(false)
  const navigate=useNavigate()
const signIn=async(e)=>{
  e.preventDefault()
  setloading(true)
  try{
    const userCredenrial= await signInWithEmailAndPassword(auth , email , password)
    const user=userCredenrial.user
    console.log(user)
    setloading(false)
    toast.success('Successfully logged in')
    navigate('/checkout')
    

  }catch(error){
    setloading(false)
    toast.error(error.message)
  }
}
  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
          {
            loading?(<Col lg='12' className='text-center'><h5 className='fw-bold'>Loading.....</h5></Col>):(
              <Col lg='6' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Login</h3>
              <Form className='auth_form' onSubmit={signIn}>
                <FormGroup className='form_group'>
                  <input type="email" placeholder='Enter your email' value={email} onChange={e=>setemail(e.target.value)} />
                </FormGroup>

                <FormGroup className='form_group'>
                  <input type="password" placeholder='Enter your password' value={password} onChange={e=>setpassword(e.target.value)} />
                </FormGroup>
                <button type='submit' className="buy_btn auth_btn">Login</button>
                <p>Dont have an account? <Link to={'/signup'}>Create an account</Link></p>
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

export default Login