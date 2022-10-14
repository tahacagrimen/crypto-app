import React from "react";
import styles from "../styles/Mainpage.module.scss";
import Coins from "./Coins";
import Sidebar from "./Sidebar";

const Mainpage = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Coins />
    </div>
  );
};

export default Mainpage;
