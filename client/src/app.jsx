import React from "react";
import axios from "axios";
import styles from "./assets/styles.css";
import SelectionPane from "./components/selectionpane.jsx";
import TaskDashBoard from "./components/taskdashboard.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTaskDescription: null,
      currentTaskDifficulty: null,
      currentTaskPrice: null,
      currentTaskType: null,

      rejectedTasks: [], 
      acceptedTasks: []
    }
    this.getNextTask = this.getNextTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentWillMount() {
    axios.get("/api/acceptedTasks")
    .then(result => {
      this.setState({
        acceptedTasks : result.data.filter((data) => data.accepted === true).map((data) => data.description),
        rejectedTasks : result.data.filter((data) => data.accepted !== true).map((data) => data.description)
      })
      
    })
  }

  getNextTask() {
    axios.get("https://www.boredapi.com/api/activity/")
    .then(result => {
      this.setState({
        currentTaskDescription: result.data.activity,
        currentTaskDifficulty: result.data.accessibility * 10,
        currentTaskPrice: result.data.price * 10,
        currentTaskType: result.data.type,
      })
    })
  }

  addTask(accepted) {
    axios.post('/api/acceptedTasks', {
      description: this.state.currentTaskDescription,
      difficullty: this.state.currentTaskDifficulty,
      price:       this.state.currentTaskPrice,
      type:        this.state.currentTaskType,
      accepted: accepted
    })
    .then(result => {
      if (accepted) {
        this.setState((prevState) => ({
         acceptedTasks : prevState.acceptedTasks.concat(this.state.currentTaskDescription)
        }))
      } else {
        this.setState((prevState) => ({
          rejectedTasks : prevState.rejectedTasks.concat(this.state.currentTaskDescription)
        }))    
      }
    })
  }

  deleteTask(event,accepted) {
    console.log(event.target.innerHTML);
  }

  render() {
    return (
      <div>
        <div><img src={require('./robot.png')} className = {styles.image}></img></div>
        <SelectionPane 
          addTask = {this.addTask}
          getNextTask = {this.getNextTask} 
          currentTaskDescription = {this.state.currentTaskDescription}
          currentTaskDifficulty = {this.state.currentTaskDifficulty}
          currentTaskPrice = {this.state.currentTaskPrice} 
        />
        <TaskDashBoard
          acceptedTasks = {this.state.acceptedTasks}
          rejectedTasks = {this.state.rejectedTasks}
          deleteTask = {this.deleteTask}
        />
      </div>
    )
  }
}

export default App;