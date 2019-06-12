import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodosList from './components/todos-list';
import EditTodo from './components/edit-todo';
import CreateTodo from './components/create-todo';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link to='/' className='navbar-brand'>
            MERN-Stack Todo App
          </Link>
          <div className='collpase navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='navbar-item'>
                <Link to='/' className='nav-link'>
                  Todos
                </Link>
              </li>
              <li className='navbar-item'>
                <Link to='/create' className='nav-link'>
                  Create Todo
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Switch>
          <Route path='/' exact component={TodosList} />
          <Route path='/edit/:id' component={EditTodo} />
          <Route path='/create' component={CreateTodo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
