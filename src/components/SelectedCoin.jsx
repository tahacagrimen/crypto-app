import React, { useContext } from "react";
import Search from "./Search";
import styles from "../styles/SelectedCoin.module.scss";
import { useQuery } from "react-query";
import CoinContext from "../contexts/coinContext";

const SelectedCoin = ({ id }) => {
  const { currency } = useContext(CoinContext);

  const fetchCoin = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}
      `
    );
    return response.json();
  };

  const { data: coin, status } = useQuery(["coin"], fetchCoin);

  console.log(coin);

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
      <div className={styles.container__info}>
        <div className={styles.row1}>
          <div className={styles.row1__col1}>
            <div className={styles.img}>
              <img src={coin.image.large} alt="" />
            </div>
            <div className={styles.coininfo}>
              <div className={styles.coininfo__1}>
                <h1>{coin.name}</h1>
                <h2>{coin.symbol.toUpperCase()}</h2>
              </div>
              <div className={styles.coininfo__2}>
                <h2>Rank #{coin.market_cap_rank}</h2>
                <h2>{coin.hashing_algorithm}</h2>
              </div>
            </div>
          </div>
          <div className={styles.row1__col2}>
            <h2>
              {coin.name} Price ({coin.symbol.toUpperCase()})
            </h2>
            <div>
              <h1>
                {coin.market_data.current_price[currency]}{" "}
                {currency.toUpperCase()}
              </h1>
              <h2
                className={`${styles.percentage} ${
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ] > 0
                    ? styles["percentage--positive"]
                    : styles["percentage--negative"]
                } `}
              >
                {
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ]
                }{" "}
                %
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.row2__col1}></div>
          <div className={styles.row2__col2}></div>
          <div className={styles.row2__col3}></div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCoin;
