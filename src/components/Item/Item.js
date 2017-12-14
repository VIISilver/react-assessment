import React, { Component } from 'react';
import { getAllTasks, addTask, resetWizard, deleteTask, markCompleted,getTask } from './../../ducks/reducer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Item.css';

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInfo: ''
    }
  }

  render() {
    const task = this.props.task;
    const oneTask = task.map((item, i) => {
      return (
        <div key={i}>
              <p>{task[i].title}</p>
              <button onClick={() => {
                if (task[i].completed === false) {
                  this.props.markCompleted(task[i].id)
                }
              }}>Complete</button>
              <button onClick={() => this.props.deleteTask(task.id)}>X</button>
        </div>
      )
    });
    return (
      <div>
        <h1>Item</h1>
        <Link to={'/'}>
          <h6>&lt; Back to List</h6>
        </Link>
        {oneTask}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    taskObject: state.taskObject,
    task: state.task
  }
}

const mapDispatchToProps = { getAllTasks, addTask, resetWizard, deleteTask, markCompleted, getTask }

export default connect(mapStateToProps, mapDispatchToProps)(Item);