import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CoinContext from "../../contexts/coinContext";
import FirebaseContext from "../../contexts/firebaseContext";
import styles from "../../styles/SelectedCoin.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToPort = ({ coin }) => {
  const { currency, isSidebarOpen } = useContext(CoinContext);
  const { handleSetDoc, uid } = useContext(FirebaseContext);

  const [buyingprice, setBuyingPrice] = useState(
    coin.market_data.current_price.usd
  );
  const [buyingamount, setBuyingAmount] = useState(0);

  let time = Date.now().toString();

  const [isbuy, setIsBuy] = useState(true);

  return (
    <div className={styles.add}>
      <div className={styles.adding}>
        <ToastContainer
          className={styles.toast}
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <div className={styles.adding__amount}>
          <h2>Amount</h2>
          <input
            onChange={(e) => setBuyingAmount(e.target.value)}
            value={buyingamount}
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
      <div className={styles.add__header}>
        <div
          className={styles.add__heading}
          onClick={() => {
            handleSetDoc(
              uid,
              coin,
              coin.id,
              coin.image.large,
              buyingprice,
              buyingamount,
              time,
              isbuy
            );
            setBuyingAmount(0);
            toast.success("Your transaction has been successfully completed", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }}
        >
          <h1>Buy {coin.name}</h1>
        </div>
        <div
          className={styles.add__heading2}
          onClick={() => {
            handleSetDoc(
              uid,
              coin,
              coin.id,
              coin.image.large,
              buyingprice,
              buyingamount,
              time,
              !isbuy
            );
            setBuyingAmount(0);
            toast.success("Your transaction has been successfully completed", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }}
        >
          <h1>Sell {coin.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default AddToPort;
