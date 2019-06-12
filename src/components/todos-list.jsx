import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Edit from './edit-todo';

class toDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };

    this.onChange = this.onChange.bind(this);
    this.getTable = this.getTable.bind(this);
  }

  getData() {
    axios
      .get('http://localhost:4000/todos/')
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  onChange() {
    this.getData();
  }

  getTable() {
    return this.state.todos.map((todo, i) => {
      return (
        <tr key={i}>
          <td className={todo.todo_completed ? 'completed' : ''}>
            {todo.todo_description}
          </td>
          <td className={todo.todo_completed ? 'completed' : ''}>
            {todo.todo_responsible}
          </td>
          <td className={todo.todo_completed ? 'completed' : ''}>
            {todo.todo_priority}
          </td>
          <td>{todo.todo_completed ? 'Yes' : 'No'}</td>
          <td>
            <Edit id={todo._id} changed={this.onChange} />
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
