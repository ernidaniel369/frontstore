import {Routes, Route, Link, Navigate} from 'react-router-dom';
import Home from '../components/home';
import Dashboard from '../components/dashboard';
import AuthUser from '../components/AuthUser';
import logo from '../assets/logo.png';
import React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import ProductCart from '../components/producs/productCart';

import ProducList from '../components/producs/producList';
import ProductDetail from '../components/producs/productDetail';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



function Auth() {

  const {token, logout} = AuthUser();

  const logoutUser = () =>{
    if (token !== undefined){
      logout();
    }
  }
  
  

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <Link to="/">
            <img src={logo} width={130} alt="logo" />
          </Link>
          <ul className="navbar-nav align-items-center mx-3">
          <Link to="/list"  className="navbar-nav align-items-center ml-auto fs-4">Producs</Link>
            <Nav className="ml-auto nav-link text-light fs-4 me-2">
              <NavDropdown title="Users" id="basic-nav-dropdown">
                
                <NavDropdown.Item href="/dashboard">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
              </NavDropdown>   
            </Nav>
            <Nav.Link as={Link} to="/cart" className="nav-link fs-4 me-2">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
          </ul>
        </div>
      </nav>



      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ProducList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default Auth;
