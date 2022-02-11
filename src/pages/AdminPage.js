import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import fireDB from '../fireconfig';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AdminPage() {

  const[products, setProducts] = useState([]);  
  const[loading, setLoading] = useState(false)
  const [product, setProduct] = useState({
      name: "",
      price: 0,
      imageURL: "",
      category: ""
  });

  const[show, setShow] = useState(false)
  const[add, setAdd] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    getData()
  },[]);

  async function getData(){
    
    try{
      setLoading(true)
      const users = await getDocs(collection(fireDB, "products"))
      const productsArray = [];
      users.forEach((doc) => {
        
        const obj = {
          id:doc.id, 
          ...doc.data(),
        }
        productsArray.push(obj);
        setLoading(false)
      });
      setProducts(productsArray);
    }catch(error){
      console.log(error);
      setLoading(false)
    }
  }

  const editHandler = (item) => {
      setProduct(item)

      setShow(true)
  }

  const updateProduct = async() => {
      try{
        setLoading(true)
        await setDoc(doc(fireDB, "products", product.id) , product) 
        handleClose()
        toast.success("product updated successfully")
        window.location.reload()
      }catch(error){
        toast.error("product update failed")
        setLoading(false)
      }        
  }

  const addProduct = async() => {
    try{
        setLoading(true)
        await addDoc(collection(fireDB, "products") , product) 
        handleClose()
        toast.success("product added successfully")
        window.location.reload()
      }catch(error){
        toast.error("addition of product failed")
        setLoading(false)
      }  
  }

  const deleteProduct = async(item) => {
        try{
         setLoading(true)   
         await deleteDoc(doc(fireDB, "products", item.id));  
         toast.success("product deleted successfully") 
         getData()
        }catch(error){
         toast.error("deletion of product failed")
         setLoading(false);
        }
  }

  const addHandler = () => {
      setAdd(true)
      handleShow()
  }

  return (
    <Layout loading={loading}>
        <div className='d-flex justify-content-between'>
            <h3>Product's List</h3>
            <button onClick={addHandler}>ADD PRODUCTS</button>
        </div>
        <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item)=>{
              return<tr>
                <td><img src={item.imageURL} alt='' height='80' width='80'/></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                    <FaTrash color='red' size={20} onClick={()=>{deleteProduct(item)}}/>
                    <FaEdit onClick={()=>editHandler(item)} color='blue' size={20}/>    
                </td>
              </tr>
          }
         )}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{add===true ? 'Add Product' : 'Edit Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {" "}
            <div className='register-form'>
                <input type='text' value={product.name} className='form-control' placeholder='name' onChange={(e)=> setProduct({...product, name: e.target.value})} />
                <input type='text' value={product.imageURL} className='form-control' placeholder='image' onChange={(e)=> setProduct({...product, imageURL: e.target.value})} />
                <input type='text' value={product.price} className='form-control' placeholder='price' onChange={(e)=> setProduct({...product, price: e.target.value})} />    
                <input type='text' value={product.category} className='form-control' placeholder='category' onChange={(e)=> setProduct({...product, category: e.target.value})} />
            <hr/>
            </div> 
        </Modal.Body>
        <Modal.Footer>
            <button>CLOSE</button>
            {add ? (<button onClick={addProduct}>SAVE</button>) : <button onClick={updateProduct}>SAVE</button>}
        </Modal.Footer>
       </Modal>
    </Layout>
  )
}

export default AdminPage