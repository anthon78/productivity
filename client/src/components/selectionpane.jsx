import React from "react";
import styles from "../assets/selectionpane.css";

const SelectionPane = (props) => {
  return (
    <div className={styles.main}>
      <button className={styles.button} onClick = {props.getNextTask}>I have too much free time</button>
      <p className={styles.description}>{props.currentTaskDescription}</p>
      <p className={styles.difficulty}>Difficulty Level: {props.currentTaskDifficulty} / 10</p>
      <p className = {styles.cost}>Estimated Cost: {props.currentTaskPrice} / 10</p>
      <div className={styles.buttonContainer}>
        <button className={styles.acceptButton}>Accept</button>
        <button className={styles.rejectButton}>Reject</button>
      </div>
    </div>
  )
}

export default SelectionPane;