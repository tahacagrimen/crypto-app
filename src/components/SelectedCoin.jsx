import React from "react";
import Search from "./Search";
import styles from "../styles/SelectedCoin.module.scss";
import { useQuery } from "react-query";

const SelectedCoin = ({ id }) => {
  const fetchCoin = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}
      `
    );
    return response.json();
  };

  const { data: coin, status } = useQuery(["coin"], fetchCoin);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.container__hr}></div>
      <div>{coin.name}</div>
    </div>
  );
};

export default SelectedCoin;
