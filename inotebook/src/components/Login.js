import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:'',password:''});
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login/', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password}),
        });
        const json = await response.json();
        if(json.success){
            //Save auth token and redirect
            localStorage.setItem('token',json.authToken);//Saving token here
            navigate('/');
            props.showAlert("LoggedIn Successfully","success");

        }
        else{
            props.showAlert(json.error,"danger");
        }

    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]: e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" name='email' autoComplete="current-password" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' autoComplete="current-password"/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login