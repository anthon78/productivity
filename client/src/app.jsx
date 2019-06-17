import React from "react";
import axios from "axios";
import styles from "./assets/styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    axios.get("http://www.boredapi.com/api/activity/")
    .then(result => {
      console.log(result.data);
    })
  }

  render() {
    return (
      <div className ={styles.main}>
        <div><img src={require('./robot.png')} className = {styles.image}></img></div>
       <button className={styles.button}>I have too much free time</button>
      </div>
    )
  }
}

export default App;