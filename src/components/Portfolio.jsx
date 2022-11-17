import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import CoinContext from "../contexts/coinContext";
import FirebaseContext from "../contexts/firebaseContext";
import styles from "../styles/Portfolio.module.scss";
import Search from "./Search";
import { db } from "../firebase";

const Portfolio = () => {
  const { currency, isSidebarOpen, myCoins, setMyCoins, notes, setNotes } =
    useContext(CoinContext);
  const { handleSetDoc, uid } = useContext(FirebaseContext);

  useEffect(() => {
    if (uid) {
      const colRef = collection(db, uid);
      const q = query(colRef);
      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setMyCoins(snapshot.docs.map((doc) => doc.data()));
      });
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
    </div>
  );
};

export default Portfolio;
