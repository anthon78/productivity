import React from "react";
import styles from "../assets/taskdashboard.css";

const TaskDashBoard = (props) => {
  return (
    <div className = {styles.dashboard}>
      <p className = {styles.acceptedTasks}>Accepted</p>
      <p className = {styles.rejectedTasks}>Rejected</p>
    </div>
  )
}

export default TaskDashBoard;