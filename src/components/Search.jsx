import React, { useContext, useState } from "react";
import CoinContext from "../contexts/coinContext";
import styles from "../styles/Search.module.scss";
import {
  HiOutlineSearch,
  HiMenuAlt3,
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
  HiX,
} from "react-icons/hi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const Search = () => {
  const {
    page,
    setPage,
    perPage,
    currency,
    setPerPage,
    setCurrency,
    isSidebarOpen,
    setSidebarOpen,
    setSearchData,
    searchData,
  } = useContext(CoinContext);

  const [isSearch, setIsSearch] = useState(false);

  let navigate = useNavigate();

  const searchCoins = async ({}) => {
    if (searchData !== "") {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${searchData}`
      );
      return response.json();
    } else {
      return;
    }
  };

  const { data: coins, status } = useQuery(
    ["searchdata", isSearch],
    searchCoins
  );

  const handleClick = (coin) => {
    setIsSearch(false);
    setSearchData("");
    navigate(`/overview/${coin.id}`);
  };

  if (status === "loading") {
    return (
      <div>
        <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
        .
      </div>
    );
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className={styles.search}>
      <div className={styles.search1}>
        <input
          onChange={(e) => setSearchData(e.target.value)}
          type="text"
          placeholder="Search coins..."
          value={searchData}
        />
        {!isSearch ? (
          <HiOutlineSearch
            onClick={() => {
              if (searchData !== "") {
                setIsSearch(true);
              }
            }}
          />
        ) : (
          <HiX
            onClick={() => {
              setIsSearch(false);
              setSearchData("");
            }}
          />
        )}

        {/*  */}
        {/* DROPDOWN MENU */}
        {coins ? (
          <div
            className={`${
              isSearch ? styles["dropdown--open"] : styles["dropdown--close"]
            }`}
          >
            {coins.coins.slice(0, 5).map((coin) => (
              <div
                className={styles.coin}
                key={coin.id}
                onClick={() => handleClick(coin)}
              >
                <img src={coin.large} alt="" />
                <h1>{coin.name}</h1>
              </div>
            ))}
          </div>
        ) : null}
        {/* DROPDOWN MENU */}
        {/*  */}
      </div>
      <div className={styles.search2}>
        <HiMenuAlt3 onClick={() => setSidebarOpen((prev) => !prev)} />
      </div>
    </div>
  );
};

export default Search;
