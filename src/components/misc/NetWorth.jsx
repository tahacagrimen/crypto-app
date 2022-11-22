import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import CoinContext from "../../contexts/coinContext";
import styles from "../../styles/Portfolio.module.scss";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const NetWorth = () => {
  const { portfolio, apiData, portCoins } = useContext(CoinContext);

  const [netWorth, setNetWorth] = useState(0);

  const [invesment, setInvesment] = useState(0);

  const handleTotal = async () => {
    setTimeout(() => {
      portfolio.map((coin) => {
        if (coin.amount !== 0) {
          setInvesment(
            (prev) => prev + Number(coin.amount) * Number(coin.average)
          );
          setNetWorth(
            (prev) => prev + Number(coin.amount) * Number(coin.price)
          );
        } else {
          return;
        }
      });
    }, 500);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const percentageCalculator = (invesment, netWorth) => {
    if (invesment > netWorth) {
      return (100 - (100 * netWorth) / invesment).toFixed(1);
    } else {
      return (100 - (100 * invesment) / netWorth).toFixed(1);
    }
  };

  useEffect(() => {
    handleTotal();
  }, [portfolio]);

  if (invesment === 0 || netWorth === 0) {
    return (
      <div className={styles.ring}>
        <h1>You dont have any invesment</h1>
        <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <div className={styles.networth}>
      <div className={styles.networth__total}>
        <h2>Total Invesment</h2>
        <h1>
          {numberWithCommas(invesment.toFixed(2))}{" "}
          <span className={styles.usd}>USD</span>
        </h1>
      </div>
      <div className={styles.networth__net}>
        <h2>Net Worth</h2>
        <h1>
          {numberWithCommas(netWorth.toFixed(2))}{" "}
          <span className={styles.usd}>USD</span>
          <span
            className={`${
              invesment > netWorth
                ? styles["pernegative"]
                : styles["perpositive"]
            }`}
          >
            {" "}
            {invesment > netWorth ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
            {percentageCalculator(invesment, netWorth)} %
          </span>
        </h1>
      </div>
    </div>
  );
};

export default NetWorth;
