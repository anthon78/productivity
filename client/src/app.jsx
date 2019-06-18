import React from "react";
import axios from "axios";
import styles from "./assets/styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTask: {},
    }
    this.getNextTask = this.getNextTask.bind(this);
  }

  getNextTask() {
    axios.get("https://www.boredapi.com/api/activity/")
    .then(result => {
      this.setState({
        currentTask: result.data,
      })
    })
  }

  render() {
    return (
      <div className ={styles.main}>
        <div><img src={require('./robot.png')} className = {styles.image}></img></div>
       <button className={styles.button} onClick = {this.getNextTask}>I have too much free time</button>
      </div>
    )
  }
}

export default App;