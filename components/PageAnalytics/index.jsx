import React, { useState, useContext } from "react";
import cn from "classnames";

import LineChart from "../Charts/LineChart";
import styles from "./PageAnalytics.module.sass";
import { SalesData } from "../../constants/chartData";
import CreateLendContext from "../../context/LendContext";

const PageAnalytics = () => {
  const { graphPrompt, setGraphPrompt } = useContext(CreateLendContext);
  const allSalesData = SalesData.map((data) => data["Sales USD"]);
  const [isPrompt, setIsPrompt] = useState(false);

  let salesXaxis = [];

  for (let i = 1; i <= 30; i++) {
    salesXaxis.push(i);
  }
  console.log(salesXaxis);

  const [graphData, setGraphData] = useState({
    labels: salesXaxis,
    datasets: [
      {
        label: "User Gained",
        data: allSalesData,
        borderColor: "#E45F35",
        tension: 0.1,
        fill: false,
      },
    ],
  });

  const handlePrompt = () => {
    setIsPrompt(true);
  };

  return (
    <div className={styles.main} style={{ marginTop: "-45px" }}>
      <div className={cn("container", styles.container)}>
        <p className={styles.heading}>Analytics</p>

        <div className={styles.promptDiv}>
          <p>Enter your prompt</p>
          <textarea
            cols='30'
            rows='10'
            placeholder='Enter prompt to generate graph'
            onChange={(e) => setGraphPrompt(e.target.value)}
          />

          <button
            className={cn("button-stroke button-sm", styles.buttonHome)}
            style={{
              borderColor: "#E45F35",
              color: "#fff",
              backgroundColor: "#1F2127",
            }}
            onClick={() => handlePrompt()}
          >
            Submit
          </button>
        </div>

        {isPrompt && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "1000px",
                // background: "#fff",
                border: "2px solid #353945",
                borderRadius: "10px",
                padding: "30px",
              }}
            >
              <LineChart chartData={graphData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageAnalytics;
