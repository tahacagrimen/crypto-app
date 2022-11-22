import React, { useContext } from "react";
import CoinContext from "../../contexts/coinContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../../styles/Portfolio.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = () => {
  const { portfolio, apiData, portCoins } = useContext(CoinContext);

  const data = {
    labels: portfolio.map((coin) => {
      if (coin.amount !== 0) {
        return coin.id;
      } else {
        return null;
      }
    }),
    datasets: [
      {
        label: "Holdings",
        data: portfolio.map((coin) => {
          if (coin.amount !== 0) {
            return coin.amount * coin.price;
          } else {
            return null;
          }
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(235, 99, 132, 0.2)",
          "rgba(24, 162, 235, 0.2)",
          "rgba(215, 206, 86, 0.2)",
          "rgba(71, 192, 192, 0.2)",
          "rgba(151, 102, 255, 0.2)",
          "rgba(256, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(235, 99, 132, 1)",
          "rgba(24, 162, 235, 1)",
          "rgba(215, 206, 86, 1)",
          "rgba(71, 192, 192, 1)",
          "rgba(151, 102, 255, 1)",
          "rgba(256, 159, 64, 1)",
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div className={styles.pie}>
      <Doughnut data={data} options={{ skipNull: true }} />
    </div>
  );
};

export default Pie;
