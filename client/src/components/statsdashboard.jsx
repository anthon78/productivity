import React from "react";
import styles from "../assets/statsdashboard.css";

const StatsDashboard = (props) => {
  return (
    <div className = {styles.statsdashboard}>
      <p className = {styles.level}>Level: {props.level}</p>
      <p className = {styles.xp}>Total xp: {props.xp}</p>
      <p className = {styles.neededXp}>level up in: {10 - (props.xp % 10)}xp</p>
    </div>
  )
}

export default StatsDashboard;