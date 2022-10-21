import { useEffect, useState } from "react";
import React from "react";
import styles from "../../styles/Coins.module.scss";

const SearchDropdown = ({ coins, isSearch }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(coins);
    console.log(data);
  }, [isSearch]);

  console.log(data);

  return (
    <div
      className={`${
        isSearch ? styles["dropdown--open"] : styles["dropdown--close"]
      }`}
    >
      {data ? (
        <div>
          <img src={data.coins.large} alt={data.coins.id} />
          <h1>{data.coins.name}</h1>
        </div>
      ) : null}
    </div>
  );
};

export default SearchDropdown;
