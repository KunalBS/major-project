import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function Login() {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[cpassword, setCpassword] = useState('');
  const[loading, setLoading] = useState(false);
  const auth = getAuth();

  const Login = async() => {

    try{
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('currentUser', JSON.stringify(result))
      setLoading(false)
      toast.success('Login Successful')
      window.location.href='/'
    }catch(error){
      console.log(error);
      toast.error('Login failed')
      setLoading(false)
    }

  }

  return (
    <div className='Login-parent'>
      {
        loading && (<Loader/>)
      }
      
      <div className='row justify-content-center'>

      <div className='col-md-4 z1'>
            <div className='Login-form'>
              <h2>Login</h2>
              <hr/>
              <input type='text' className='form-control' placeholder='email' value={email} 
              onChange={(e)=>{setEmail(e.target.value)}}/>
              <input type='text' className='form-control' placeholder='password' value={password} 
              onChange={(e)=>{setPassword(e.target.value)}}/>
              <button className='my-3' onClick={Login}>Login</button>
              <hr/>
              <Link to='/register'>Click here to Register</Link>
            </div>
          </div>

          <div className='col-md-5 z1'>
       
          <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_skfh9odt.json"  background="transparent"  speed="1" loop autoplay></lottie-player>

          </div>

      </div>
         <div className='Login-bottom'>

         </div>
    </div>
  );
}

export default Login;
