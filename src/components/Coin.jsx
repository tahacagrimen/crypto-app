import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoinContext from "../contexts/coinContext";
import styles from "../styles/Coin.module.scss";

const Coin = ({ coin }) => {
  const { currency } = useContext(CoinContext);

  const { market_cap_change_percentage_24h } = coin;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let navigate = useNavigate();

  function handleClick() {
    navigate(`/overview/${coin.id}`);
  }

  return (
    <div className={styles.container} onClick={() => handleClick()}>
      <div className={styles.container__start}>
        <div className={styles.image_container}>
          <img className={styles.image} src={coin.image} alt="" />
        </div>
        <div className={styles.container__start__name}>
          <h3>{coin.name}</h3>
          <h5>
            {coin.symbol.toUpperCase()}/{currency.toUpperCase()}
          </h5>
        </div>
      </div>
      <div className={styles.last}>
        <div className={styles.last__change24}>
          <h3>Change 24h</h3>
          <h5
            className={`${styles.percentage} ${
              market_cap_change_percentage_24h > 0
                ? styles["percentage--positive"]
                : styles["percentage--negative"]
            } `}
          >
            {market_cap_change_percentage_24h.toFixed(2)}%
          </h5>
        </div>
        <div className={styles.last__marketcap}>
          <h3>Market Cap</h3>
          <h5>
            {numberWithCommas(coin.market_cap)} {currency.toUpperCase()}
          </h5>
        </div>
        <div className={styles.last__price}>
          <h3>Price</h3>
          <h5>
            {numberWithCommas(coin.current_price.toFixed(2))}{" "}
            {currency.toUpperCase()}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Coin;
