import React , {useState} from 'react'
import { Form , FormGroup , Container , Row , Col } from 'reactstrap' 
import { toast } from 'react-toastify';
import { db , storage } from '../firebase.config';
import { ref , uploadBytesResumable , getDownloadURL } from 'firebase/storage';
import { collection , addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const AddProducts = () => {
  const [enterTitle , setenterTitle]=useState('');
  const [enterShortDesc , setenterShortDesc]=useState('');
  const [enterDescription , setenterDescription]=useState('');
  const[enterPrice,setenterPrice] = useState('')
  const [enterCategory , setenterCategory]=useState('');
  const [enterProductImage , setenterProductImage]=useState(null);
  const [loading , setloading] = useState(false)
  const navigate=useNavigate()
  

  const addProduct=async(e)=>{
     e.preventDefault();
     setloading(true)
     try{
      const docRef=await collection(db,'products')
      const storageRef=ref(storage , `productImages/${enterProductImage.name}`)
      const uploadTask=uploadBytesResumable(storageRef,enterProductImage)
      uploadTask.on(()=>{
        toast.error('images not uploaded!')
      } , ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
          await addDoc(docRef ,{
            productName:enterTitle,
            shortDesc:enterShortDesc,
            description:enterDescription,
            category:enterCategory,
            price:enterPrice,
            imgUrl:downloadURL
           } )
        })
        
      })
      setloading(false)
      toast.success("product successfully added!")
      navigate('/dashboard/all-products')
     }catch(error){
      setloading(false)
      toast.error('product not added!')
     }
     
    
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
                     {
                      loading ? <h4 className='py-5'>Loading......</h4> : <>
                      <h4 className='mb-5'>Add Product</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className='form_group'>
                <span>Product title</span>
                <input type="text" placeholder='Double sofa' value={enterTitle} onChange={e=>setenterTitle(e.target.value)} required />
              </FormGroup>
              <FormGroup className='form_group'>
                <span>Short Description</span>
                <input type="text" placeholder='lorem......' value={enterShortDesc} onChange={e=>setenterShortDesc(e.target.value)} required />
              </FormGroup>
              <FormGroup className='form_group'>
                <span>Description</span>
                <input type="text" placeholder='Description.....' value={enterDescription} onChange={e=>setenterDescription(e.target.value)} required />
              </FormGroup>
              <div className='d-flex align-items-center justify-content-between gap-5'>
              <FormGroup className='form_group w-50' >
                <span>Price</span>
                <input type="text" placeholder='$100' value={enterPrice} onChange={e=>setenterPrice(e.target.value)} required />
              </FormGroup>
              <FormGroup className='form_group w-50'>
                <span>Caregory</span>
                <select className='w-100 p-2' value={enterCategory} onChange={e=>setenterCategory(e.target.value)} >
                  <option value="">Select Category</option>
                  <option value="chair">Chair</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </FormGroup>
              </div>

              <div>
                <FormGroup className='form_group'>
                 <span>Product Image</span>
                 <input type="file" onChange={(e)=>{setenterProductImage(e.target.files[0])}}  required />
                </FormGroup>
              </div>
              <button className="buy_btn" type='submit'>Add Product</button>
            </Form>
 
                      </>
                     }
                     </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts