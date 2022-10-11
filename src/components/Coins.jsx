import React from "react";
import { useState, useContext } from "react";
import { useQuery } from "react-query";
import CoinContext from "../contexts/coinContext";
import Coin from "./Coin";
import styles from "../styles/Coins.module.scss";

const Coins = () => {
  const { page, setPage, perPage, currency, setPerPage, setCurrency } =
    useContext(CoinContext);

  const fetchCoins = async ({ queryKey }) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${queryKey[1]}&sparkline=false`
    );

    return response.json();
  };

  const { data, status, isPreviousData } = useQuery(
    ["coins", page],
    fetchCoins,
    {
      keepPreviousData: true,
    }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(page);

  return (
    <div className={styles.container}>
      <div className={styles.container__search}>
        <input type="text" />
      </div>
      <div className={styles.container__coins}>
        {data.map((coin) => (
          <Coin coin={coin} />
        ))}
      </div>
      <div className={styles.pageindicator}>
        <h1>Sayfa : {page}</h1>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Coins;
