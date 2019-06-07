import React, { Component } from 'react';

class createToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    };

    //As these functions are dealing with the component State object
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.setState({
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }); //reset fields

    //need to submit to backend here
  }
  render() {
    return <div>Create To Do</div>;
  }
}

export default createToDo;
