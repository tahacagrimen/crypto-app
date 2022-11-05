import React from "react";
import Search from "./Search";
import styles from "../styles/SelectedCoin.module.scss";

const SelectedCoin = ({ id }) => {
  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.container__hr}></div>
      <div>SelectedCoin {id}</div>
    </div>
  );
};

export default SelectedCoin;
