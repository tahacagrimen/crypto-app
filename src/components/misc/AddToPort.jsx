import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CoinContext from "../../contexts/coinContext";
import FirebaseContext from "../../contexts/firebaseContext";
import styles from "../../styles/SelectedCoin.module.scss";

const AddToPort = ({ coin }) => {
  const { currency, isSidebarOpen } = useContext(CoinContext);
  const { handleSetDoc, uid } = useContext(FirebaseContext);

  const [buyingprice, setBuyingPrice] = useState(
    coin.market_data.current_price.usd
  );
  const [buyingamount, setBuyingAmount] = useState(0);

  let time = Date.now().toString();

  const [isbuy, setIsBuy] = useState(true);

  console.log(coin);

  return (
    <div className={styles.add}>
      <div className={styles.adding}>
        <div className={styles.adding__amount}>
          <h2>Amount</h2>
          <input
            onChange={(e) => setBuyingAmount(e.target.value)}
            defaultValue={0}
            type="number"
          />
        </div>
        <div className={styles.adding__price}>
          <h2>Price (USD)</h2>
          <input
            onChange={(e) => setBuyingPrice(e.target.value)}
            defaultValue={coin.market_data.current_price.usd}
            type="number"
          />
        </div>
      </div>
      <div
        className={styles.add__heading}
        onClick={() =>
          handleSetDoc(
            uid,
            coin,
            coin.id,
            coin.image.large,
            buyingprice,
            buyingamount,
            time,
            isbuy
          )
        }
      >
        <h1>Add {coin.name} to your Portfolio</h1>
      </div>
    </div>
  );
};

export default AddToPort;
