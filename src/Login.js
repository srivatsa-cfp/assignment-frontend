import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateBlog from './CreateBlog';
import ReadBlog from './ReadBlog';

async function loginUser(credentials) {
 return fetch('http://localhost:8080/v1/user/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())

}

async function register(credentials) {
 return fetch('http://localhost:8080/v1/user/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.text())

}

function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [token, setToken] = useState();
  const [message, setMessage] = useState();
  const [state, setState] = useState('login');
  
  const handleSubmit = async e => {
    e.preventDefault();
     if(username === '' || username  === null || username  === undefined) {
       setMessage("UserName cannot be blank");
     } else if (password === '' || password  === null || password  === undefined){
        setMessage("Password cannot be blank");
     } else {
       const response = await loginUser({
      userid: username,
      password: password
    });
    
    console.log(response.message);
    if(response.message === 'Incorrect UserId/Password'){
      setMessage(response.message);
    } else {
    setToken(response.message);
    setMessage("Login successful");
    setState('createBlog');

    }
    }
    
  }
  
  const handleRegister = async e => {
    e.preventDefault();
    if(username === '' || username  === null || username  === undefined) {
       setMessage("UserName cannot be blank");
     } else if (password === '' || password  === null || password  === undefined){
        setMessage("Password cannot be blank");
     } else if (firstName === '' || firstName  === null || firstName  === undefined){
        setMessage("First Name cannot be blank");
     }else if (lastName === '' || lastName  === null || lastName  === undefined){
        setMessage("Last Name cannot be blank");
     }else{
    const response = await register({
      userid: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    setToken(response);
    setMessage("Registration Successful!!.. Please login to create your first blog");
    }
  }

  return (
  
  <div>
      {state === 'login' && (
        <div className="wrapper">
     <div className="row">
       <div className="col-md-6">
      <h3>Login</h3>
      <h5>{message}</h5>
      <form onSubmit={handleSubmit}>
           <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
       <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
      </label>
      <div>
        <br/>
        <button type="submit">Login</button>
      </div>
      </form>
      
      <hr/>
      <h4>Please sign up for creating the account</h4>
      <h3>Registration</h3>
      <form onSubmit={handleRegister}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
       <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}  />
      </label>
      <label>
        <p>First Name</p>
        <input type="text" onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        <p>Last Name</p>
        <input type="text" onChange={e => setLastName(e.target.value)} />
      </label>
      
      <div>
      <br/>
        <button type="submit">Register</button>  
      </div>
      </form>
      </div>
      </div>
    
    </div>
      )}
      {state === 'createBlog' && <CreateBlog token={token}/>}
      {state === 'readBlog' && <ReadBlog token={token}/>}
    </div>
    
  );
}

export default Login;
