import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { uuid } from 'uuidv4';
import {Card, Button} from 'react-bootstrap';

async function readBlog(blogId) {

 return fetch('http://localhost:9090/v1/blog/read?blogId='+blogId, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   }
 })
   .then(data => data.json())
}

async function createComment(credentials , token) {
 return fetch('http://localhost:9090/v1/comment/create', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.text())
}

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

function ReadBlog({authKey}) {
  const [message, setMessage] = useState();
  const [comment, setComment] = useState();
  
  const [blogId, setBlogId] = useState();
  const [blogTitle, setBlogTitle] = useState();
  const [content, setContent] = useState();
  const [comments, setComments] = useState();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(authKey);
  
  const [login, setLogin] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
    const query = window.location.search.substring(1);
    let vars = query.split("=");
    if(token === null || token === '' || token === undefined)  {
     setMessage('You need to login to comment');
     setLogin(true);
    } else {
     const response = await createComment({
      blogId: vars[1],
      comment: {
        description: comment,
        language: 'en'
      }
     } , token);
      setMessage(response.message);
    }
    
  }
  
   const handleRead = async (r) => {
    const query = window.location.search.substring(1);
    let vars = query.split("=")
    const response = await readBlog(vars[1]);
    let resp = response.data[0];
    setBlogId(resp.blogId);
    setBlogTitle(resp.blogTitle);
    setContent(resp.content);
    const listItems = resp.comments.map((i) =>
    <li>{i.description}</li>
    );
    setComments(listItems);
    setLogin(false);
  }
  
 
  const handleLogin = async e => {
    e.preventDefault();
    console.log('came here');
    if(username === '' || username  === null || username  === undefined) {
       setMessage("UserName cannot be blank");
     } else if (password === '' || password  === null || password  === undefined){
        setMessage("Password cannot be blank");
     } else {
       const response = await loginUser({
      userid: username,
      password: password
    });
    if(response.message === 'Incorrect UserId/Password'){
      setMessage(response.message);
    } else {
    setToken(response.message);
    setMessage("Login successful");
    setLogin(false);
    }
    }
  }
  
    useEffect(() => {
     handleRead('read')
   }, [blogId]);

  
  const styles = {
  margin: 'auto',
  width: '800px',
  height: '500px',
  border: '1px  grey',
  padding: '10px'
  }
  
  return (
  <div >
    <div style= {styles}>
    <div className="wrapper">
     <div className="row">
       <div className="col-md-6">
      <h2>{blogTitle}</h2>
      <hr/>
     <Card>
        <Card.Body>
        <Card.Text>
              {content}
        </Card.Text>
        <hr/>
        <h4>Comments</h4>
        <Card.Text>
              {comments}
        </Card.Text>
       </Card.Body>
      </Card>
    
     </div>
     <hr/>
     <form onSubmit={handleSubmit}>
     <label>
        <textarea type="text" onChange={e => setComment(e.target.value)} />
      </label>
      <br/>
      <br/>
      <div>
        <button type="submit">Enter your comments here</button>
        <br/>
        <p>{message}</p>
      </div>
      </form>
      
      {login && <form>
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
        <button type="submit" onClick={handleLogin}>Login</button>
      </div>
      </form>}
      </div>
    </div>
    
    </div>
    </div>
    
  );
}

ReadBlog.propTypes = {
  authKey: PropTypes.string
}

export default ReadBlog;
