import { useState } from "react";
import AuthUser from "./AuthUser";
import {Helmet} from "react-helmet";
import swal from 'sweetalert';

export default function Login() {

    const {http, setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const alertUser = () => swal("Incorrect email or password");

    const submitForm = () =>{
        http.post('/login', {email:email, password: password}).then((res)=>{
            setToken(res.data.user, res.data.access_token);
        }).catch(() => {
            alertUser();
          });
    }

    return(
        <div className="row justify-content-center pt-5">
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="col-sm-6">
                <div className="card p-4 bg-dark shadow">
                    <div className="mb-3">
                        <label className="form-label text-light">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} name="email"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Password:</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} name="pswd"/>
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary my-3">Login</button>
                </div>
            </div>
        </div>
    )
}