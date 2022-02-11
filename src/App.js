import './App.css';
import './stylesheets/layout.css';
import './stylesheets/products.css';
import './stylesheets/auth.css';
import HomePage from './pages/HomePage';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductInfo';
import CartPage from './pages/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderPage from './pages/OrderPage';
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>

            <Route path='/' exact element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
            <Route path='/productinfo/:productid' exact element={<ProtectedRoutes><ProductPage/></ProtectedRoutes>}/>
            <Route path='/cart' exact element={<ProtectedRoutes><CartPage/></ProtectedRoutes>}/>
            <Route path='/orders' exact element={<ProtectedRoutes><OrderPage/></ProtectedRoutes>}/>
            <Route path='/admin' exact element={<ProtectedRoutes><AdminPage/></ProtectedRoutes>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({children}) => {
  if(localStorage.getItem('currentUser')){
    return children
  }
  else{
    return <Navigate to='/login'/>
  }
}