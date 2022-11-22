# Crypto Tracker App

In this project i inspired famous old
Blockfolio app.

## Tech Stack

**Client:** React, Context API, Sass, React Query, React Router DOM, ChartJs

**Backend:** Firestore Database

## Demo

https://crypto-app-xi.vercel.app/overview

![App Screenshot](https://github.com/tahacagrimen/crypto-app/blob/master/src/gifs/1.gif?raw=true)

## Summary

- First i created an interface for see the crypto currencies with some level of information. In mainpage we get the data from Coingecko API. I wanted to scroll to load more data but not want to request GET more from API.

  Get Request with React Query

  ```
    const fetchCoins = async ({ queryKey }) => {
        const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false      `
        );
        return response.json();
    };

    const { data, status, isPreviousData } = useQuery(
    ["coins", currency, perPage],
    fetchCoins,
    {
      keepPreviousData: true,
    }
  );

  ```

  After we get all the data we are slicing the data for load more on scroll to bottom.

  ```
          {data.slice(0, perPage).map((coin) => (
          <Coin key={coin.id} coin={coin} />
        ))}
  ```

  useEffect for scroll to bottom action

  ```
  useEffect(() => {
      window.addEventListener("scroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setPerPage((prev) => prev + 20);
      }
      });
  }, []);
  ```

- When we clicked a specific coin to see more information we are sending another get request from another Coingecko API for more detail information about coin. In selected coin page we can see more detailed market data information, buy or sell order section and a line chart for Price/Market Data/Volume data for 1/7/30 days.

  ```
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

  ```

- When a user login the app, a firestore database collection created with users uid. So every user has a uniq collection. And everytime user make an order for buy or sell a document created with the coins name and details. With that users can track their invesments.

  ![Firebase Screenshot](https://github.com/tahacagrimen/crypto-app/blob/master/src/gifs/firebase_collection.PNG?raw=true)

- Portfolio page has enough information for users to see their invesment, their lost and gains. Every coin's buy or sell orders calculated so users can see their average buying price for coins. After getting all the coins market data while in mainpage, we are declaring a state from the data given with using Context API. Thats how while we are in portfolio page current prices of coins doesn't need another request. That's important because Coingecko API has a request limit per minute.

  ![Firebase Screenshot](https://github.com/tahacagrimen/crypto-app/blob/master/src/gifs/3.gif?raw=true)

- Except loading spinner and toast notify every UI element written with Sass.

  ![Firebase Screenshot](https://github.com/tahacagrimen/crypto-app/blob/master/src/gifs/2.gif?raw=true)

  Responsive desing with Sass. Making element's classnames conditional.

  ```
  const { isSidebarOpen, setSidebarOpen } = useContext(CoinContext);

  <div
      className={`${styles.container} ${
        isSidebarOpen ? styles["container--open"] : styles["container--close"]
      } `}
    >
  ```

  ```
    &--open {
    z-index: 999;
    display: block;
    min-width: 100%;
    position: relative;
    top: 0;
    left: 0;
    padding: 2rem;
  }
  &--close {
    min-width: 250px;
    max-width: 20%;
  }
  ```

  Using breakpoint variables

  ```
  $smallBP: 500px;
  $mediumBP: 870px;
  $largeBP: 1080px;
  $wideBP: 1200px;

  @mixin breakpoint($point) {
    @if $point == mediumBP {
      @media (max-width: $mediumBP) {
        @content;
      }
    }
  }

  ```

- Fetching market data

```
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

```

- Using data with ChartJS

```
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
/>;
```
