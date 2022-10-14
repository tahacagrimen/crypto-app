import React from "react";
import { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import CoinContext from "../contexts/coinContext";
import Coin from "./Coin";
import styles from "../styles/Coins.module.scss";
import {
  HiOutlineSearch,
  HiMenuAlt3,
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";

const Coins = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const {
    page,
    setPage,
    perPage,
    currency,
    setPerPage,
    setCurrency,
    isSidebarOpen,
    setSidebarOpen,
  } = useContext(CoinContext);
  //
  // fetch with react query

  const fetchCoins = async ({ queryKey }) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${queryKey[1]}&sparkline=false`
    );

    return response.json();
  };

  const { data, status, isPreviousData } = useQuery(
    ["coins", page, currency],
    fetchCoins,
    {
      keepPreviousData: true,
    }
  );
  // fetch with react query
  //

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(isSidebarOpen);

  return (
    <div className={styles.container}>
      <div className={styles.container__search}>
        <div className={styles.search1}>
          <input type="text" placeholder="Search coins..." />
          <HiOutlineSearch />
        </div>
        <div className={styles.search2}>
          <HiMenuAlt3 onClick={() => setSidebarOpen((prev) => !prev)} />
        </div>
      </div>
      <div className={styles.container__hr}></div>
      <div className={styles.container__coins}>
        <div className={styles.currency}>
          <div>
            <h1>Live Market</h1>
          </div>
          <div className={styles.dropdown}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`${styles.dropdown__button} ${
                isDropdownOpen
                  ? styles["dropdown__button--open"]
                  : styles["dropdown__button--close"]
              } `}
            >
              {currency.toUpperCase()}
            </button>
            <div
              className={`${styles.dropdown__content} ${
                isDropdownOpen
                  ? styles["dropdown__content--open"]
                  : styles["dropdown__content--close"]
              } `}
            >
              <button
                onClick={(e) => {
                  setCurrency(e.target.value);
                  setDropdownOpen(false);
                }}
                value="try"
              >
                TRY
              </button>
              <button
                value="usd"
                onClick={(e) => {
                  setCurrency(e.target.value);
                  setDropdownOpen(false);
                }}
              >
                USD
              </button>
              <button
                value="eur"
                onClick={(e) => {
                  setCurrency(e.target.value);
                  setDropdownOpen(false);
                }}
              >
                EURO
              </button>
            </div>
          </div>
        </div>
        {data.map((coin) => (
          <Coin coin={coin} />
        ))}
      </div>
      <div className={styles.pageindicator}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <HiOutlineArrowCircleLeft />
        </button>
        <h1>{page}</h1>
        <button onClick={() => setPage((prev) => prev + 1)}>
          <HiOutlineArrowCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Coins;
