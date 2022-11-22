# Crypto Tracker App

In this project i inspired famous old
Blockfolio app.

## Tech Stack

**Client:** React, Context API, Sass, React Query, React Router DOM, ChartJs

**Backend:** Firestore Database

## Demo

https://crypto-app-xi.vercel.app/overview

![App Screenshot](https://github.com/tahacagrimen/crypto-app/blob/master/src/gifs/1.gif?raw=true)

## Roadmap

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

-
