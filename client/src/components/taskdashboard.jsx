import React from "react";
import styles from "../assets/taskdashboard.css";

const TaskDashBoard = (props) => {
  return (
    <div className = {styles.dashboard}>
      <ul className = {styles.acceptedTasks}>
        {props.acceptedTasks.map((description,index) => 
        <li key = {index}>
          <button className={styles.acceptedTaskButton} onClick={() => props.deleteTask(event,true)}>{description}</button>
        </li>)}
      </ul>

      <ul className = {styles.rejectedTasks}>
        {props.rejectedTasks.map((description,index) => 
          <li key = {index}>
            <button className={styles.rejectedTaskButton} onClick={() => props.deleteTask(event,false)}>{description}</button>
          </li> 
        )}        
      </ul>
    </div>
  )
}

export default TaskDashBoard;