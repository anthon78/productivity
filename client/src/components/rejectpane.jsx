import React from "react";
import styles from "../assets/rejectpane.css"

const RejectPane = (props) => {
  return (
    <button 
      className={styles.rejectpane} 
      onClick={props.removeReject}
    >
    <p className = {styles.rejectup}>Uh Oh!</p>
    <div className = {styles.reject}>
      {props.choices[Math.floor(Math.random()*props.choices.length)]}
    </div>
  </button>
  )
}

export default RejectPane;