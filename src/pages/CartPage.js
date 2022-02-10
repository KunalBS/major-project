import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore'
import fireDB from '../fireconfig';
import { toast } from 'react-toastify';


function CartPage() {
  const {cartItems} = useSelector((state) => state.cartReducer)

  const[totalAmount, setTotalAmount] = useState(0)

  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[name, setName] = useState('')
  const[address, setAddress] = useState('')
  const[pincode, setPincode] = useState('')
  const[phoneNo, setPhoneNo] = useState('')
  const[loading, setLoading] = useState(false);
  
  useEffect(()=>{
    let temp=0;
    cartItems.forEach((cartItem)=>{
      temp = temp+cartItem.price
    })
    setTotalAmount(temp)
  },[cartItems])

  useEffect(()=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },[cartItems])

  const deleteCart= (product) =>{
    dispatch({type:'DELETE_FORM_CART', payload:product});
  };

  const placeOrder = async() => {
    const addressUser = {
      name,
      address,
      pincode,
      phoneNo
    }
    console.log(addressUser)

    const orderInfo = {
      cartItems,
      addressUser,
      email : JSON.parse(localStorage.getItem('currentUser')).user.email,
      userid : JSON.parse(localStorage.getItem('currentUser')).user.uid
    }
    try{
      setLoading(true);
      const result = await addDoc(collection(fireDB, 'orders'), orderInfo)
      setLoading(false);
      toast.success('order placed Successfully')
      handleClose()
    }catch(error){
      setLoading(false);
      toast.error('cannot place your order')
    }
  }

  return (
    <Layout loading={loading}>

      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map(item=>{
              return<tr>
                <td><img src={item.imageURL} alt='' height='80' width='80'/></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td><FaTrash onClick={()=>deleteCart(item)}/></td>
              </tr>
          }
            )}
          
        </tbody>
      </table>

      <div className='d-flex justify-content-end'>
          <h1 className='total-amount'>Total Amount={totalAmount}</h1>
      </div>

      <div className='d-flex justify-content-end mt-3'>
          <button onClick={handleShow}>Place Order</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>



        <div className='register-form'>
              <h2>Shipping Details</h2>
              <hr/>
              <input type='text' className='form-control' placeholder='name' value={name} 
              onChange={(e)=>{setName(e.target.value)}}/>
              <textarea type='text' className='form-control' placeholder='Enter your address' value={address} 
              onChange={(e)=>{setAddress(e.target.value)}}/>
              <input type='number' className='form-control' placeholder='Enter your pincode' value={pincode} 
              onChange={(e)=>{setPincode(e.target.value)}}/>
              <input type='number' className='form-control' placeholder='Enter your Phone Number' value={phoneNo} 
              onChange={(e)=>{setPhoneNo(e.target.value)}}/>
              <hr/>
            </div>


        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={placeOrder}>
            Order now
          </button>
        </Modal.Footer>
      </Modal>
        
    </Layout>
  );
}

export default CartPage;
