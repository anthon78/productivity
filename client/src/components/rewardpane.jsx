import React from "react";
import styles from "../assets/rewardpane.css";

const RewardPane = (props) => (
  <button 
    className={styles.rewardpane} 
    onClick={props.removeReward}
  >
    <p className = {styles.levelup}>Level Up!</p>
    <div className = {styles.reward}>
      {props.choices[Math.floor(Math.random()*props.choices.length)]}
    </div>
  </button>
)

export default RewardPane;