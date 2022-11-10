import React, { useContext } from "react";
import CoinContext from "../../contexts/coinContext";
import styles from "../../styles/SelectedCoin.module.scss";

const AddToPort = ({ coin }) => {
  const { currency, isSidebarOpen } = useContext(CoinContext);

  console.log(coin.market_data.current_price.usd);

  return (
    <div className={styles.add}>
      <div className={styles.adding}>
        <div className={styles.adding__amount}>
          <h2>Amount</h2>
          <input defaultValue={0} type="number" />
        </div>
        <div className={styles.adding__price}>
          <h2>Price (USD)</h2>
          <input
            defaultValue={coin.market_data.current_price.usd}
            type="number"
          />
        </div>
      </div>
      <div className={styles.add__heading}>
        <h1>Add {coin.name} to your Portfolio</h1>
      </div>
    </div>
  );
};

export default AddToPort;
