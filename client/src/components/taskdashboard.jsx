import React from "react";
import styles from "../assets/taskdashboard.css";

const TaskDashBoard = (props) => {
  return (
    <div className = {styles.dashboard}>
      <ul className = {styles.acceptedTasks}>
        {props.acceptedTasks.map((description,index) => 
        <li key = {index}>
          <button className={styles.acceptedTaskButton}>{description}</button>
        </li>)}
      </ul>

      <p className = {styles.rejectedTasks}>Rejected</p>
    </div>
  )
}

export default TaskDashBoard;