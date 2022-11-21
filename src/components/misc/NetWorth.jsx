import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import CoinContext from "../../contexts/coinContext";

const NetWorth = () => {
  const { portfolio, apiData, portCoins } = useContext(CoinContext);

  const [netWorth, setNetWorth] = useState(0);

  const [invesment, setInvesment] = useState(0);

  const [percentage, setPercentage] = useState(0);

  const handleTotal = async () => {
    setTimeout(() => {
      portfolio.map((coin) => {
        setInvesment(
          (prev) => prev + Number(coin.amount) * Number(coin.average)
        );
        setNetWorth((prev) => prev + Number(coin.amount) * Number(coin.price));
      });
      setPercentage(Number(netWorth) / Number(invesment));
      setPercentage(Number(invesment) / Number(netWorth));
    }, 500);
  };

  useEffect(() => {
    handleTotal();
  }, [portfolio]);

  if (invesment === 0 || netWorth === 0) {
    return (
      <div>
        {" "}
        <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Total Invesment</h2>
        <h1>{invesment} USD</h1>
      </div>
      <div>
        <h2>Net Worth</h2>
        <h1>{netWorth}</h1>
      </div>
      <div>{percentage && <h1>{percentage} %</h1>}</div>
    </div>
  );
};

export default NetWorth;
