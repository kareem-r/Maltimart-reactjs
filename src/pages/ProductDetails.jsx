import React , {useState , useRef , useEffect} from 'react'
import { Container , Row , Col } from 'reactstrap'
import { useParams  } from 'react-router-dom'
import products from '../assets/data/products'
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommonSection"
import "../styles/product_details.css"
import { motion } from 'framer-motion'
import ProductList from "../components/UI/ProductsList"
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'
//import { db } from '../firebase.config'
//import { doc , getDoc } from 'firebase/firestore'
//import useGetData from '../custom-hooks/useGetData'
const ProductDetails = () => {
 //const [product , setProduct]=(useState)({})
  const [tab,settab]=useState('desc')
  const [rating , setrating]=useState(null)
  const reviewUser=useRef('');
  const reviewMsg=useRef('');
  const dispatch=useDispatch();
  const{id}=useParams();
  //const {data : products } = useGetData('products')
  const product=products.find(item=>item.id === id)
 //const docRef=doc(db , 'products' , id)
 /*useEffect(()=>{
  const getProduct=async()=>{
    const docSnap=await getDoc(docRef)
    if(docSnap.exists()){
      setProduct(docSnap.data)
    }
    else{
      console.log('no')
    }
  }
  getProduct()
 },[]) */
 const {imgUrl , productName , price , avgRating , reviews , description, category , shortDesc}=product
  const relatedProducts=products.filter(item=>item.category===category)
  const submitHandler=(e)=>{
    e.preventDefault()
    const reviewUserName=reviewUser.current.value
    const reviewUserMsg=reviewMsg.current.value
    const reviewObj={
      userName : reviewUserName,
      text : reviewUserMsg,
      rating
    }
    console.log(reviewObj)
    toast.success("Review Submitted")
  }
  const addToCart=()=>{
    dispatch(cartActions.addItem({
      id,
      image:imgUrl,
      productName,
      price})
       )
       toast.success('Product added successfully')
  }
  useEffect(()=>{
    window.scrollTo(0,0)
  },[product])
  return (
    <Helmet  title={productName}>
      <CommonSection title={productName} />

      <section className='pt-0 '>
<Container>
  <Row>
    <Col lg='6'>
      <img src={imgUrl} alt="" />
    </Col>
    <Col lg='6'>
      <div className="product_details">
        <h2>{productName}</h2>
        <div className='product_rating d-flex align-items-center gap-5 mb-3'> 
<div>
  <span >
  <i class="ri-star-s-fill"></i>
  </span>
  <span >
  <i class="ri-star-s-fill"></i>
  </span>
  <span >
  <i class="ri-star-s-fill"></i>
  </span>
  <span >
  <i class="ri-star-s-fill"></i>
  </span>
  <span >
  <i class="ri-star-half-s-fill"></i>
  </span>
</div>

<p>(<span>{avgRating}</span>ratings)</p>
        </div>
        <div className='d-flex align-items-center gap-5'>
        <span className='product_price'>${price}</span>
        <span>Category : {category}</span>
        </div>
        <p className='mt-3'>{shortDesc}</p>

        <motion.button whileTap={{scale:1.2}} className="buy_btn" onClick={addToCart}>Add to Cart</motion.button>
      </div>
    </Col>
  </Row>
</Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <div className="tab_wrapper d-flex align-items-center gap-5">
              <h6 className={`${tab==='desc'?'active_tab': ''}`} onClick={()=>settab('desc')}>Description</h6>
              <h6 className={`${tab==='rev'?'active_tab': ''}`} onClick={()=>settab('rev')}>Reviews({reviews.length})</h6>
            </div>
            {
              tab === 'desc' ? <div className="tab_content mt-5">
              <p>{description}</p>
            </div>
 :<div className='product_review mt-5' >
  <div className="review_wrapper">
    <ul>
      {
        reviews?.map((item , index)=>(
          <li key={index} className='mb-4'>
            <h6>Jhon Doe</h6>
            <span>{item.rating} (rating)  </span>
          <p>{item.text}</p>
          </li>
        ))
      }
    </ul>
    <div className="review_form">
      <h4>Leave your experience</h4>
<form action="" onSubmit={submitHandler}>
  <div className="form_group">
    <input type="text" placeholder='Enter name' ref={reviewUser} required />
  </div>
  <div className="form_group d-flex align-items-center gap-5 rating_group">
    <motion.span whileTap={{scale:1.2}} onClick={()=>setrating(1)}>1  <i class="ri-star-s-fill"></i></motion.span>
    <motion.span whileTap={{scale:1.2}} onClick={()=>setrating(2)}>2  <i class="ri-star-s-fill"></i></motion.span>
    <motion.span whileTap={{scale:1.2}} onClick={()=>setrating(3)}>3  <i class="ri-star-s-fill"></i></motion.span>
    <motion.span whileTap={{scale:1.2}} onClick={()=>setrating(4)}>4  <i class="ri-star-s-fill"></i></motion.span>
    <motion.span whileTap={{scale:1.2}} onClick={()=>setrating(5)}>5  <i class="ri-star-s-fill"></i></motion.span>
  </div>
  <div className="form_group">
    <textarea rows={4} type="text" placeholder='Review Message...'  ref={reviewMsg} required/>
  </div>
  <motion.button whileTap={{scale:1.2}} type='submit' className="buy_btn">
    Submit
  </motion.button>
</form>
    </div>
  </div>
 </div>
            }
                       </Col>
                       <Col lg='12' className='mt-5'>
                       <h2 className='related_title'>You might also like</h2>
                       </Col>
                       <ProductList data={relatedProducts} />
                       
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails