import React from "react";
import styles from "../assets/statsdashboard.css";

const StatsDashboard = (props) => {
  return (
    <div className = {styles.statsdashboard}>
      <p className = {styles.level}>Level: {props.level}</p>
      <p className = {styles.xp}>Total xp: {props.xp}</p>
      <p className = {styles.neededXp}>level up in: {Number(10 - (props.xp % 10)).toFixed(1)}xp</p>
    </div>
  )
}

export default StatsDashboard;