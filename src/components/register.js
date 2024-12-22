import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import {Helmet} from "react-helmet";
import swal from 'sweetalert';

export default function Register() {
  

  const navigate = useNavigate();
  const {http} = AuthUser();
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState('');
  const [meter, setMeter] = useState(false);

  const atLeastOneUppercase = /[A-Z]/g;
  const atLeastOneLowercase = /[a-z]/g;
  const atLeastOneNumeric = /[0-9]/g;
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
  const eightCharsOrMore = /.{8,}/g;

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value,
  ).length;

  function passrestringer() {
    if ((passwordStrength < 5) === false) {
      return <div>
        <button type="button" onClick={submitForm} className="btn btn-primary mt-4 px-4">Register</button>
      </div>
    } else {
      return <div>
        <button type="button" onClick={alerta} className="btn btn-primary mt-4 px-5">Register</button>
      </div>
    }
  }
  const alerta = () => swal("Password does not meet requirements");

  const submitForm = () =>{
      http.post('/register', {name:name, email:email, password: password}).then((res)=>{
          navigate('/login')
      }).catch(() => {
        alertUser();
      });
  }

  const alertUser = () => swal("Please complete the required fields");

  

  return(
      <div className="row justify-content-center pt-4">
          <Helmet>
              <title>Register</title>
              <meta name="description" content="Helmet application" />
          </Helmet>
          <div className="col-sm-6">
              <div className="card p-4 bg-dark shadow">
                <div className="mb-3">
                    <label className="form-label text-light">Username:</label>
                    <input type="test" className="form-control" id="email" placeholder="Enter username" onChange={e=>setName(e.target.value)} name="name"/>
                </div>
                <div className="mb-3">
                    <label className="form-label text-light">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} name="email"/>
                </div>
                <div className="mb-3">
                  <label className="form-label text-light">Password:</label>
                  <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} onFocus={() => setMeter(true)} value={password} name="password"/>
                  {meter && (
                    <div>
                      <div className="text-light">
                        {passwordStrength < 5 && 'Required: '}
                        {!passwordTracker.uppercase && 'uppercase, '}
                        {!passwordTracker.lowercase && 'lowercase, '}
                        {!passwordTracker.specialChar && 'characters, '}
                        {!passwordTracker.number && 'numbers, '}
                        {!passwordTracker.eightCharsOrGreater && 'More than 8 characters'}
                      </div>
                    </div>
                  )}
                  </div>
                  <div className="d-flex justify-content-center">
                  {passrestringer()}
                  </div>
              </div>
        </div>
    </div>
  )
}