import React, { useContext } from "react";
import CoinContext from "../contexts/coinContext";
import styles from "../styles/Coin.module.scss";

const Coin = ({ coin }) => {
  const { currency } = useContext(CoinContext);

  const { market_cap_change_percentage_24h } = coin;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img className={styles.image} src={coin.image} alt="" />
      </div>
      <div id="coin_name">
        <h3>{coin.name}</h3>
        <h5>
          {coin.symbol.toUpperCase()}/{currency.toUpperCase()}
        </h5>
      </div>
      <div>
        <h5>{market_cap_change_percentage_24h.toFixed(2)}%</h5>
        <h5>
          {numberWithCommas(coin.market_cap)} {currency.toUpperCase()}
        </h5>
        <h5>
          {coin.current_price.toFixed(2)} {currency.toUpperCase()}
        </h5>
      </div>
    </div>
  );
};

export default Coin;
