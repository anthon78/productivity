import React from "react";
import axios from "axios";
import styles from "./assets/styles.css";
import SelectionPane from "./components/selectionpane.jsx";
import TaskDashBoard from "./components/taskdashboard.jsx";
import StatsDashboard from "./components/statsdashboard.jsx";
import RewardPane from "./components/rewardpane.jsx";
import RejectPane from "./components/rejectpane.jsx";
import ChartPane from "./components/chartpane.jsx";
import Confetti from "react-confetti";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTaskDescription: null,
      currentTaskDifficulty: null,
      currentTaskPrice: null,
      currentTaskType: null,
      leveledUp : false,
      rejectUp: false,
      rejects : 0,
      tasksCompleted: 0,

      rejectedTasks: [], 
      acceptedTasks: [],
      xp : 0,
      level: 0,
      rewards: ["buy a beer", "go to the bar", "go to the pool",
                "play some vdeo games", "go out to eat"],
      punishments: ["read a short book", "do 100 pushups", "run a mile",
                    "healthy food for a week"]
    }
    this.getNextTask = this.getNextTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.removeReward = this.removeReward.bind(this);
    this.removeReject = this.removeReject.bind(this);
  }

  componentWillMount() {
    axios.get("/api/acceptedTasks")
    .then(result => {
      this.setState({
        acceptedTasks : result.data.filter((data) => data.accepted === true).map((data) => data.description),
        rejectedTasks : result.data.filter((data) => data.accepted !== true).map((data) => data.description)
      })
    })
    .then(() => {
      axios.get('/api/stats')
      .then((result) => {
        console.log("result",result.data);
        this.setState({
          xp: result.data.xp,
          level : Math.floor((result.data.xp) / 10),
          rejects : result.data.rejects,
          tasksCompleted : result.data.tasksCompleted
        })
      })
    })
  }

  getNextTask() {
    axios.get("https://www.boredapi.com/api/activity/")
    .then(result => {
      this.setState({
        currentTaskDescription: result.data.activity + ` |${result.data.accessibility * 10}`,
        currentTaskDifficulty: result.data.accessibility * 10,
        currentTaskPrice: result.data.price * 10,
        currentTaskType: result.data.type,
      })
    })
  }

  addTask(accepted) {
    if (this.state.currentTaskDescription === null) return;
    if (accepted) {
      if (this.state.acceptedTasks.indexOf(this.state.currentTaskDescription) >= 0) {
        return;
      }
    }
    if (accepted === false) {
      if (this.state.rejectedTasks.indexOf(this.state.currentTaskDescription) >= 0) {
        return;
      }      
    }
    
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
    console.log((event.target.innerHTML.split("|")[1]))
    let difficulty = Number(event.target.innerHTML.split("|")[1]);
    let description = event.target.innerHTML
    axios.post("/api/deleteTask", {
      description: description
    })
    .then(() => {
      if (accepted === true) {
        this.setState((prevState) => ({
          acceptedTasks: prevState.acceptedTasks.filter((desc) => desc !== description),
          tasksCompleted: prevState.tasksCompleted + 1
        }))
      } else {
        this.setState((prevState) => ({
          rejects: prevState.rejects + 1,
          rejectUp : ((prevState.rejects + 1) % 5 === 0) ? true : false,
          rejectedTasks: prevState.rejectedTasks.filter((desc) => desc !== description)
        }))
      }
    })
    .then(() => {
      //update db
      if (accepted) {
        axios.post('/api/stats', {
          xp: difficulty,
          rejects: 0
        })
      } else {
        axios.post('/api/stats' , {
          xp : 0,
          rejects: 1
        })
      }
    })
    .then(() => {
      //set state
      if (accepted) {
        let lastLevel = this.state.level;
        this.setState((prevState) => ({
          xp : Number((prevState.xp + difficulty).toFixed(1)),
          level : Math.floor((prevState.xp + difficulty) / 10)
        }), () => {
          if (this.state.level > lastLevel) {
            this.setState({
              leveledUp : true
            })
          }
        })
      }
    })
  }

  removeReward() {
    this.setState({
      leveledUp: false,
    })
  }

  removeReject() {
    this.setState({
      rejectUp: false,
    })
  }

  render() {
    return (
      <div>
        {this.state.leveledUp === true &&
          <>
          <Confetti 
            height={1200}
            numberOfPieces = {600}
            wind={0.01}
            onClick = {this.removeReward}
          />
          </>
        }
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
        <StatsDashboard
          level = {this.state.level} 
          xp = {this.state.xp}
          rejects = {this.state.rejects}
        />
        {this.state.leveledUp === true &&
          <RewardPane 
            choices = {this.state.rewards}
            removeReward = {this.removeReward}
          />
        }
        {this.state.rejectUp === true &&
          <RejectPane
            choices = {this.state.punishments}
            removeReject = {this.removeReject}
          />
        }
        <ChartPane
         rejectedTasks = {this.state.rejects}
         completedTasks = {this.state.tasksCompleted}
         />

      </div>
    )
  }
}

export default App;