import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class editToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount(props) {
    const id = this.props.id;
    axios
      .get('http://localhost:4000/todos/' + id)
      .then(res => {
        this.setState({
          todo_description: res.data.todo_description,
          todo_responsible: res.data.todo_responsible,
          todo_priority: res.data.todo_priority,
          todo_completed: res.data.todo_completed
        });
      })
      .catch(err => console.log(err));
  }

  onChangeTodoDescription(e) {
    this.setState({ todo_description: e.target.value });
  }

  onChangeTodoResponsible(e) {
    this.setState({ todo_responsible: e.target.value });
  }

  onChangeTodoPriority(e) {
    this.setState({ todo_priority: e.target.value });
  }

  onChangeTodoCompleted(e) {
    this.setState({ todo_completed: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault(); //default html behaviour is prevented
    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };
    axios
      .post('http://localhost:4000/todos/update/' + this.props.id, newTodo)
      .then(res => console.log(res.status + ' ' + res.data));

    this.toggle();
    this.props.changed();
  }
  render() {
    return (
      <div>
        <Button color='danger' onClick={this.toggle}>
          Edit
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Update To Do</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label>Description: </label>
              <input
                type='text'
                className='form-control'
                value={this.state.todo_description}
                onChange={this.onChangeTodoDescription}
              />
            </div>
            <div className='form-group'>
              <label>Responsible: </label>
              <input
                type='text'
                className='form-control'
                value={this.state.todo_responsible}
                onChange={this.onChangeTodoResponsible}
              />
            </div>
            <div className='form-group'>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='priorityOptions'
                  id='priorityLow'
                  value='Low'
                  checked={this.state.todo_priority === 'Low'}
                  onChange={this.onChangeTodoPriority}
                />
                <label className='form-check-label'>Low</label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='priorityOptions'
                  id='priorityMedium'
                  value='Medium'
                  checked={this.state.todo_priority === 'Medium'}
                  onChange={this.onChangeTodoPriority}
                />
                <label className='form-check-label'>Medium</label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='priorityOptions' //radio buttons with same name, only one can be selected (grouped by name)
                  id='priorityHigh'
                  value='High'
                  checked={this.state.todo_priority === 'High'}
                  onChange={this.onChangeTodoPriority}
                />
                <label className='form-check-label'>High</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.onSubmit}>
              Save
            </Button>{' '}
            <Button color='secondary' onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default withRouter(editToDo);
