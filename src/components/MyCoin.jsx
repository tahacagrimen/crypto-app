import { async } from "@firebase/util";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../contexts/firebaseContext";
import styles from "../styles/MyCoin.module.scss";

const MyCoin = ({ id, data }) => {
  const [amount, setAmount] = useState(0);
  const [buy, setBuy] = useState(0);
  const [avarage, setAvarage] = useState(0);
  const [coins, setCoins] = useState([]);

  const { uid } = useContext(FirebaseContext);

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
  };

  useEffect(() => {
    handleData();
    handleCoin();
  }, [data]);

  return (
    <div className={styles.container} onClick={() => handleClick()}>
      <div className={styles.container__start}>
        <div className={styles.image_container}>
          {/* <img className={styles.image} src={data.image} alt="" /> */}
        </div>
        <div className={styles.container__start__name}>
          <h3>{data.coin_name}</h3>
          <h5>{data.coin_symbol}/USD</h5>
        </div>
      </div>
      <div className={styles.last}>
        <div className={styles.last__change24p}>
          <h3>Amount</h3>
          <h1>{amount}</h1>
        </div>
        <div className={styles.last__change24}>
          <h3>Avarage Buying Price</h3>
        </div>
        <div className={styles.last__marketcap}>
          <h3>Current Price</h3>
        </div>
        <div className={styles.last__price}>
          <h3>Change</h3>
        </div>
      </div>
    </div>
  );
};

export default MyCoin;
