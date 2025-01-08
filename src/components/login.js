import { useState } from "react";
import AuthUser from "./AuthUser";
import { Helmet } from "react-helmet";
import swal from 'sweetalert';

export default function Login() {
    const { http, setToken } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const alertUser = () => swal("Incorrect email or password");

    const submitForm = () => {
        http.post('/login', { email: email, password: password })
            .then((res) => {
                setToken(res.data.user, res.data.access_token);
            }).catch(() => {
                alertUser();
            });
    }

    return (
        <div className="row justify-content-center pt-5">
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Accede a tu cuenta para realizar compras y disfrutar de los beneficios de las energías renovables." />
            </Helmet>
            <div className="col-sm-6">
                <div className="card p-4 bg-dark shadow-lg rounded" style={{ backgroundColor: '#004d40', color: '#e0f2f1' }}>
                    <h3 className="text-center text-light mb-4">Iniciar sesión</h3>
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
                            id="pwd" 
                            placeholder="Introduce tu contraseña" 
                            onChange={e => setPassword(e.target.value)} 
                            name="pswd" 
                            style={{ borderRadius: '0.5rem' }}
                        />
                    </div>
                    <button 
                        type="button" 
                        onClick={submitForm} 
                        className="btn btn-success w-100 mt-3" 
                        style={{ backgroundColor: '#80cbc4', borderColor: '#80cbc4' }} 
                        onMouseOver={e => e.target.style.backgroundColor = '#4db6ac'} 
                        onMouseOut={e => e.target.style.backgroundColor = '#80cbc4'}
                    >
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </div>
    )
}
