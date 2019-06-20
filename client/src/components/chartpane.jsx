import React from "react";
import styles from "../assets/chartpane.css";
let DoughnutChart = require("react-chartjs").Doughnut;

const ChartPane = (props) => {
  return (
    <div className={styles.chartcontainer}>
      <DoughnutChart 
      data ={[{value : props.rejectedTasks, color : "lightcoral"},{value : props.completedTasks, color : "lightgreen"}]}
      options = {{
        animateRotate : true,
        animateScale: true,
        animationSteps: 150,
        segmentStrokeColor : "#ggg",
      }}
      width={350}
      height={350}
      />
    </div>    
  )
}

export default ChartPane;