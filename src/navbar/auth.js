import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import Dashboard from '../components/dashboard';
import AuthUser from '../components/AuthUser';
import logo from '../assets/logo.png';
import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import ProductCart from '../components/producs/productCart';
import ProducList from '../components/producs/producList';
import ProductDetail from '../components/producs/productDetail';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Auth() {
  const { token, logout } = AuthUser();

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  }

  return (
    <>
      
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#004d40', padding: '10px' }}>
        <div className="container-fluid">
          
          <Link to="/">
            <img src={logo} width={130} alt="logo" className="ms-3" />
          </Link>

          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
          </button>

          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item mx-2">
                <Link 
                  to="/list"  
                  className="nav-link fs-5" 
                  style={{ color: '#e0f2f1', transition: '0.3s' }}
                >
                  Productos
                </Link>
              </li>

              
              <Nav className="nav-item mx-2">
                <NavDropdown title="Cuenta" id="basic-nav-dropdown" style={{ color: '#e0f2f1' }}>
                  <NavDropdown.Item as={Link} to="/dashboard">Perfil</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutUser}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              
              <Nav.Link as={Link} to="/cart" className="nav-link fs-5 me-3" style={{ color: '#e0f2f1' }}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
            </ul>
          </div>
        </div>
      </nav>

      
      <div className="container mt-4">
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
