import React from "react";
import axios from "axios";
import styles from "./assets/styles.css";
import SelectionPane from "./components/selectionpane.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTaskDescription: null,
      currentTaskDifficulty: null,
      currentTaskPrice: null,
      currentTaskType: null,
    }
    this.getNextTask = this.getNextTask.bind(this);
    this.addTask = this.addTask.bind(this);
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

  addTask() {
    axios.post('/api/acceptedTasks', {
      description: this.state.currentTaskDescription,
      difficullty: this.state.currentTaskDifficulty,
      price:       this.state.currentTaskPrice,
      type:        this.state.currentTaskType
    })
    .then(result => {
      console.log(result);
    })

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
      </div>
    )
  }
}

export default App;