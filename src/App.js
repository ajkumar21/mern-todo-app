import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodosList from './components/todos-list';
import Create from './components/create-todo';
import { Navbar } from 'react-bootstrap';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href='/'>{'My to do list'}</Navbar.Brand>
          <br />
          <Create />
        </Navbar>

        <br />
        <Switch>
          <Route path='/' exact component={TodosList} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
