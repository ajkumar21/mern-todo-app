import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class toDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/todos/')
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTable() {
    return this.state.todos.map((todo, i) => {
      return (
        <tr key={i}>
          <td>{todo.todo_description}</td>
          <td>{todo.todo_responsible}</td>
          <td>{todo.todo_priority}</td>
          <td>{todo.todo_completed ? 'Yes' : 'No'}</td>
          <td>
            <Link to={'/edit/' + todo._id}>Edit</Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Owner</th>
            <th>Priority</th>
            <th>Completion Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{this.getTable()}</tbody>
      </Table>
    );
  }
}

export default toDo;
