import { async } from "@firebase/util";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoinContext from "../contexts/coinContext";
import FirebaseContext from "../contexts/firebaseContext";
import styles from "../styles/MyCoin.module.scss";

const MyCoin = ({ id, data }) => {
  const [amount, setAmount] = useState(0);
  const [buy, setBuy] = useState(0);
  const [average, setAverage] = useState(0);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState();
  const [change, setChange] = useState(0);
  const [holdings, setHoldings] = useState(0);

  const { uid } = useContext(FirebaseContext);

  const { apiData } = useContext(CoinContext);

  let navigate = useNavigate();

  function handleClick() {
    navigate(`/overview/${id}`);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleData = () => {
    let values = Object.values(data);
    values.map(async (coin) => setCoins((prev) => [...prev, coin]));
  };

  const handleCoin = () => {
    coins.map((coin) => {
      setAmount((prev) => prev + Number(coin.buying_amount));
    });
    setPrice(apiData.find((coin) => coins[0].id === coin));
    console.log(price);
  };

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    handleCoin();
  }, [coins]);

  console.log(coins);

  return (
    <>
      {amount !== 0 ? (
        <div className={styles.container} onClick={() => handleClick()}>
          <div className={styles.container__start}>
            <div className={styles.image_container}>
              <img className={styles.image} src={coins[0].coin_img} alt="" />
            </div>
            <div className={styles.container__start__name}>
              <h3>{coins[0].coin_name}</h3>
              <h5>{coins[0].coin_symbol}/USD</h5>
            </div>
          </div>
          <div className={styles.last}>
            <div className={styles.last__average}>
              <h3>Average</h3>
              <h5>{average} USD</h5>
            </div>
            <div className={styles.last__price}>
              <h3>Price</h3>
              <h5>{price} USD</h5>
            </div>
            <div className={styles.last__24h}>
              <h3>Change 24h</h3>
              <h5>{change} %</h5>
            </div>
            <div className={styles.last__holdings}>
              <h3>Holdings</h3>
              <h5>
                {holdings} / {amount} {coins[0].coin_symbol}
              </h5>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MyCoin;
