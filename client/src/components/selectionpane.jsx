import React from "react";
import styles from "../assets/selectionpane.css";

const SelectionPane = (props) => {
  return (
    <div>
      <button className={styles.button} onClick = {props.getNextTask}>I have too much free time</button>
      <p>{props.currentTaskDescription}</p>
      <p>Difficulty Level: {props.currentTaskDifficulty} / 10</p>
      <p>Estimated Cost: {props.currentTaskPrice} / 10</p>
    </div>
  )
}

export default SelectionPane;