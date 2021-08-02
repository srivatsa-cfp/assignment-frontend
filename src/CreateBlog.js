import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { uuid } from 'uuidv4';


async function createBlog(credentials, token) {

 return fetch('http://localhost:9090/v1/blog/create', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.text())

}

function CreateBlog({token}) {
  
  const [blogTitle, setBlogTitle] = useState();
  const [content, setContent] = useState();
  const [message, setMessage] = useState();
  const [blogId, setBlogId] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
    if(blogTitle === '' || blogTitle === null) {
      setMessage('Blog Title cannot be blank');
    } else {
      const id = uuid();
      setBlogId(id);
      const response = await createBlog({
      blogId: id,
      blogTitle: blogTitle,
      content: content
    } , token);
    if(response == 'success')
     setMessage('Blog Created with id : ' + id);
    else 
     setMessage('Failed to create the Blog');
    }
    
  }
  
  const styles = {
  margin: 'auto',
  width: '800px',
  height: '400px',
  border: '1px grey',
  padding: '10px'
  }

  const styleP = {
   color : 'red'
  }
  return (
  <div style= {styles}>
    <div className="wrapper">
     <div className="row">
       <div className="col-md-6">
      
      <h1>Create Blog</h1>
      <p style={styleP}>{message} </p>
    <form onSubmit={handleSubmit}>
     <label>
        <p>Blog Title</p>
        <input type="text" onChange={e => setBlogTitle(e.target.value)} />
      </label>
       <label>
        <p>Content</p>
        <textarea type="text" onChange={e => setContent(e.target.value)} />
      </label>
      <div>
        <br/>
        <button type="submit">Create Blog</button>
      </div>
      </form>
      </div>
    </div>
    
    </div>
    </div>
    
  );
}

CreateBlog.propTypes = {
  token: PropTypes.string.isRequired
}

export default CreateBlog;
