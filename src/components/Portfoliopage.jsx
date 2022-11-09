import React from "react";
import Sidebar from "./Sidebar";
import Portfolio from "./Portfolio";
import styles from "../styles/Portfoliopage.module.scss";

const Portfoliopage = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Portfolio />
    </div>
  );
};

export default Portfoliopage;
