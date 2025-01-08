import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { Helmet } from "react-helmet";
import swal from 'sweetalert';

export default function Register() {
  const navigate = useNavigate();
  const { http } = AuthUser();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
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
        <button type="button" onClick={submitForm} className="btn btn-success w-100 mt-4" style={{ backgroundColor: '#80cbc4', borderColor: '#80cbc4' }} onMouseOver={e => e.target.style.backgroundColor = '#4db6ac'} onMouseOut={e => e.target.style.backgroundColor = '#80cbc4'}>
          Registrar
        </button>
      </div>
    } else {
      return <div>
        <button type="button" onClick={alerta} className="btn btn-danger w-100 mt-4" style={{ backgroundColor: '#f44336', borderColor: '#f44336' }} onMouseOver={e => e.target.style.backgroundColor = '#e53935'} onMouseOut={e => e.target.style.backgroundColor = '#f44336'}>
          Registrar
        </button>
      </div>
    }
  }

  const alerta = () => swal("Password does not meet requirements");

  const submitForm = () => {
    http.post('/register', { name: name, email: email, password: password }).then((res) => {
      navigate('/login')
    }).catch(() => {
      alertUser();
    });
  }

  const alertUser = () => swal("Please complete the required fields");

  return (
    <div className="row justify-content-center pt-4">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Crea tu cuenta y disfruta de los beneficios de las energías renovables." />
      </Helmet>
      <div className="col-sm-6">
        <div className="card p-4 bg-dark shadow-lg rounded" style={{ backgroundColor: '#004d40', color: '#e0f2f1' }}>
          <h3 className="text-center text-light mb-4">Crear Cuenta</h3>
          <div className="mb-3">
            <label className="form-label text-light">Nombre de usuario:</label>
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              placeholder="Introduce tu nombre de usuario" 
              onChange={e => setName(e.target.value)} 
              name="name" 
              style={{ borderRadius: '0.5rem' }} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Email:</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Introduce tu correo electrónico" 
              onChange={e => setEmail(e.target.value)} 
              name="email" 
              style={{ borderRadius: '0.5rem' }} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Contraseña:</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Introduce tu contraseña" 
              onChange={e => setPassword(e.target.value)} 
              onFocus={() => setMeter(true)} 
              value={password} 
              name="password" 
              style={{ borderRadius: '0.5rem' }} 
            />
            {meter && (
              <div>
                <div className="text-light">
                  {passwordStrength < 5 && 'Requerido: '}
                  {!passwordTracker.uppercase && 'mayúsculas, '}
                  {!passwordTracker.lowercase && 'minúsculas, '}
                  {!passwordTracker.specialChar && 'caracteres especiales, '}
                  {!passwordTracker.number && 'números, '}
                  {!passwordTracker.eightCharsOrGreater && 'Más de 8 caracteres'}
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
