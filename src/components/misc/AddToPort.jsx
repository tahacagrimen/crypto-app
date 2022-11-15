import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CoinContext from "../../contexts/coinContext";
import FirebaseContext from "../../contexts/firebaseContext";
import styles from "../../styles/SelectedCoin.module.scss";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const AddToPort = ({ coin }) => {
  const { currency, isSidebarOpen } = useContext(CoinContext);
  const { handleSetDoc, uid } = useContext(FirebaseContext);

  const [buyingprice, setBuyingPrice] = useState(
    coin.market_data.current_price.usd
  );
  const [buyingamount, setBuyingAmount] = useState(0);

  let time = Date.now().toString();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (uid) {
      const colRef = collection(db, uid);
      const q = query(colRef);
      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setNotes(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [uid]);

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
          handleSetDoc(uid, coin.id, buyingprice, buyingamount, time)
        }
      >
        <h1>Add {coin.name} to your Portfolio</h1>
      </div>
    </div>
  );
};

export default AddToPort;
