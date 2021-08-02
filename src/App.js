import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import Login from './Login';
import ReadBlog from './ReadBlog';


function App() {

const styles = {
  margin: 'auto',
  width: '900px',
  height: '750px',
  border: '3px solid black',
  padding: '10px'
  }
  return (
    <div className="wrapper" style= {styles}>
      <h2>Blog Application</h2>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/read">
            <ReadBlog/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
