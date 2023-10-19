import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) =>  {
  const [credentials, setcredentials] = useState({name:'',email:'',password:'',cpassword:''});
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
      
      const {name,email,password}=credentials;
      const response = await fetch('http://localhost:5000/api/auth/createuser/', {
       
          method: "POST", // *GET, POST, PUT, DELETE, etc.

          headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({name,email,password}),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
          //Save auth token and redirect
          localStorage.setItem('token',json.authToken);
          console.log(localStorage.getItem("token"))
      
          navigate('/');
            props.showAlert("SignedIn Successfully","success");
      }
      else{
          props.showAlert("User already exists","danger");
      }

  }
  const onChange=(e)=>{
      setcredentials({...credentials,[e.target.name]: e.target.value})
  }
  return (
      <div className='container'>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" name='name'  />
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" name='email' minLength={5} required autoComplete="current-password"/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' minLength={5} required autoComplete="current-password"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} id="cpassword" name='cpassword' minLength={5} required autoComplete="current-password"/>
              </div>

              <button type="submit" className="btn btn-primary" >Create User</button>
          </form>
      </div>
  )
}

export default Signup