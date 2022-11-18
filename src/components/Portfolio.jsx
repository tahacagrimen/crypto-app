import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import CoinContext from "../contexts/coinContext";
import FirebaseContext from "../contexts/firebaseContext";
import styles from "../styles/Portfolio.module.scss";
import Search from "./Search";
import { db } from "../firebase";
import MyCoin from "./MyCoin";

const Portfolio = () => {
  const {
    currency,
    isSidebarOpen,
    myCoins,
    setMyCoins,
    notes,
    setNotes,
    portCoins,
    setPortCoins,
  } = useContext(CoinContext);
  const { handleSetDoc, uid } = useContext(FirebaseContext);

  useEffect(() => {
    if (uid) {
      const colRef = collection(db, uid);
      const q = query(colRef);
      onSnapshot(q, (snapshot) => {
        setPortCoins(snapshot.docs.map((doc) => doc.id));
        setMyCoins(snapshot.docs.map((doc) => doc.data()));
        console.log(myCoins);
        console.log(portCoins);
      });
    } else {
      return;
    }
  }, [uid]);

  return (
    <div
      className={`${
        isSidebarOpen ? styles["containerclose"] : styles["container"]
      }`}
    >
      <Search />
      <div className={styles.container__hr}></div>
      {myCoins.map((coin) => (
        <MyCoin id={coin.id} data={coin.data()} key={coin.id} />
      ))}
    </div>
  );
};

export default Portfolio;
