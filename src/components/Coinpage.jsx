import React from "react";
import { useParams } from "react-router-dom";
import SelectedCoin from "./SelectedCoin";
import Sidebar from "./Sidebar";
import styles from "../styles/Coinpage.module.scss";

const Coinpage = () => {
  let { id } = useParams();

  return (
    <div className={styles.app}>
      <Sidebar />
      <SelectedCoin id={id} />
    </div>
  );
};

export default Coinpage;
