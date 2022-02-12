import React from 'react';
import { Link } from 'react-router-dom';
import {FaBars, FaCartPlus, FaUser} from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Header() {

  const {cartItems} = useSelector(state=>state.cartReducer)
  const {user} = JSON.parse(localStorage.getItem('currentUser'));

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }

  return (
    <div className='header'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand navh" to="/">Kharido.com</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><FaBars size={25} color='white'/></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          
            <FaUser/>{user.email.substring(0, user.email.length-10)
          }
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/orders">Orders</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart">
          <FaCartPlus/>{cartItems.length}
        </Link>
      </li>
    </ul>
  </div>
</nav>
    </div>
);
}

export default Header;
