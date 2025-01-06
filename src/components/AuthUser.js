import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../services/cartServices';

export default function AuthUser(){

    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) =>{

        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const logout = () =>{   
        sessionStorage.clear();
        navigate('/');
    }

    const http = axios.create({
        baseURL:"https://api-app-e2241cc691d2.herokuapp.com/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    
    
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http, 
        logout
    }
 }