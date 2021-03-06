import React,{ useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getDoc, doc } from 'firebase/firestore';
import fireDB from '../fireconfig';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ProductPage() {
  const[product, setProduct] = useState([]);
  const[loading, setLoading] = useState(false)
  const {cartItems} = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(()=>{
    getData()
  },[])

  async function getData(){
    try{
      setLoading(true)
      const productTemp = await getDoc(doc(fireDB, 'products', params.productid));
    
      setProduct(productTemp.data());
      setLoading(false)
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  const addToCart=(product)=>{
    dispatch({type:'ADD_TO_CART', payload:product})
  }

  useEffect(()=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },[cartItems])
  return (
    <Layout loading={loading}>
        <div className='container'>
          <div className='row justify-content-center'>
              <div className='col-md-8'>
                    {
                    product && (<div>
                    <p><b>{product.name}</b></p>
                    <img src={product.imageURL} alt='' className='product-info-img'/>
                    <hr/>
                    <p>{product.description}</p>
                    <div className='d-flex justify-content-end my-3'>
                    <button onClick={()=>addToCart(product)}>Add to Cart</button>
              </div>
            </div>
            )}
          </div>
          </div>
        </div>
    </Layout>
  );
}

export default ProductPage;
