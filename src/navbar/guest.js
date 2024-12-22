import {Routes, Route, Link} from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import logo from '../assets/logo.png';
import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import ProducList from '../components/producs/producList';
import ProductDetail from '../components/producs/productDetail';




function Guest() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <Link to="/"><img src={logo} width={130} alt="logo"/></Link>
          <ul className="navbar-nav align-items-center mx-3">
            <Link to="/list"  className="navbar-nav align-items-center ml-auto fs-4">Producs</Link> 
            <Nav className="ml-auto nav-link text-light fs-4 me-2">
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/list" element={<ProducList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default Guest;
