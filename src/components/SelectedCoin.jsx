import React, { useContext, useState } from "react";
import Search from "./Search";
import styles from "../styles/SelectedCoin.module.scss";
import { useQuery } from "react-query";
import CoinContext from "../contexts/coinContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ColorRing } from "react-loader-spinner";
import AddToPort from "./misc/AddToPort";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SelectedCoin = ({ id }) => {
  const { currency, isSidebarOpen } = useContext(CoinContext);

  const [day, setDay] = useState(1);

  const [setting, setSetting] = useState("prices");

  // fetch the selected coin
  const fetchCoin = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}
      `
    );
    return response.json();
  };
  const { data: coin, status } = useQuery(["coin", id], fetchCoin);
  // fetch the selected coin

  // feth market chart data
  const fetchChartData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${day}
      `
    );
    return response.json();
  };
  const { data: chart, chartstatus } = useQuery(["chart", day], fetchChartData);
  // feth market chart data

  if (status === "loading" || chartstatus === "loading") {
    return (
      <div>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (status === "error" || chartstatus === "error") {
    return <div>Error</div>;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div
      className={`${
        isSidebarOpen ? styles["containerclose"] : styles["container"]
      }`}
    >
      <Search />
      <div className={styles.container__hr}></div>
      <div className={styles.container__info}>
        <div className={styles.row1}>
          <div className={styles.row1__col1}>
            <div className={styles.img}>
              <img src={coin.image.large} alt="" />
            </div>
            <div className={styles.coininfo}>
              <div className={styles.coininfo__1}>
                <h1>{coin.name}</h1>
                <h2>{coin.symbol.toUpperCase()}</h2>
              </div>
              <div className={styles.coininfo__2}>
                <h2>Rank #{coin.market_cap_rank}</h2>
                <h2>{coin.hashing_algorithm}</h2>
              </div>
            </div>
          </div>
          <div className={styles.row1__col2}>
            <h2>
              {coin.name} Price ({coin.symbol.toUpperCase()})
            </h2>
            <div>
              <h1>
                {coin.market_data.current_price[currency] > 1
                  ? numberWithCommas(coin.market_data.current_price[currency])
                  : coin.market_data.current_price[currency]}{" "}
                {currency.toUpperCase()}
              </h1>
              <h2
                className={`${styles.percentage} ${
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ] > 0
                    ? styles["percentage--positive"]
                    : styles["percentage--negative"]
                } `}
              >
                {
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ]
                }{" "}
                %
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.row2__col1}>
            <h2>Market Cap</h2>
            <h1>
              {numberWithCommas(coin.market_data.market_cap[currency])}{" "}
              {currency.toUpperCase()}
            </h1>
          </div>
          <div className={styles.row2__col2}>
            <h2>Circulating Supply</h2>
            <h1>{numberWithCommas(coin.market_data.circulating_supply)}</h1>
          </div>
          <div className={styles.row2__col3}>
            {" "}
            <h2>High 24h</h2>
            <h1>
              {numberWithCommas(coin.market_data.high_24h[currency])}{" "}
              {currency.toUpperCase()}
            </h1>
            <h2>Low 24h</h2>
            <h1>
              {numberWithCommas(coin.market_data.low_24h[currency])}{" "}
              {currency.toUpperCase()}
            </h1>
          </div>
          <div className={styles.row2__col4}>
            {" "}
            <h2>All Time High</h2>
            <h1>
              {numberWithCommas(coin.market_data.ath[currency])}{" "}
              {currency.toUpperCase()}
            </h1>
            <h2>All Time Low</h2>
            <h1>
              {numberWithCommas(coin.market_data.atl[currency])}{" "}
              {currency.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className={styles.row3}>
          <div className={styles.row3__col1}>
            {/* Chart */}
            {chart ? (
              <>
                <div className={styles.buttons}>
                  <div className={styles.buttons__1}>
                    <button
                      className={`${
                        setting === "prices"
                          ? styles["activesetting"]
                          : styles["deactivesetting"]
                      }`}
                      onClick={() => setSetting("prices")}
                    >
                      Prices
                    </button>
                    <button
                      className={`${
                        setting === "market_caps"
                          ? styles["activesetting"]
                          : styles["deactivesetting"]
                      }`}
                      onClick={() => setSetting("market_caps")}
                    >
                      Market Cap
                    </button>
                    <button
                      className={`${
                        setting === "total_volumes"
                          ? styles["activesetting"]
                          : styles["deactivesetting"]
                      }`}
                      onClick={() => setSetting("total_volumes")}
                    >
                      Volume
                    </button>
                  </div>
                  <div className={styles.buttons__2}>
                    <button
                      className={`${
                        day === 1 ? styles["activeday"] : styles["deactiveday"]
                      }`}
                      onClick={() => setDay(1)}
                    >
                      24H
                    </button>
                    <button
                      className={`${
                        day === 7 ? styles["activeday"] : styles["deactiveday"]
                      }`}
                      onClick={() => setDay(7)}
                    >
                      7D
                    </button>
                    <button
                      className={`${
                        day === 30 ? styles["activeday"] : styles["deactiveday"]
                      }`}
                      onClick={() => setDay(30)}
                    >
                      30D
                    </button>
                  </div>
                </div>
                <Line
                  data={{
                    labels: chart[setting].map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;

                      return day === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [
                      {
                        data: chart[setting].map((coin) => coin[1]),
                        label: `${setting} (${currency.toUpperCase()}) for past ${day} days`,
                        borderColor: "#DC7DA3",
                        pointRadius: 1,
                      },
                    ],
                  }}
                />
              </>
            ) : (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </div>
          <div className={styles.row3__col2}>
            <AddToPort coin={coin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCoin;
