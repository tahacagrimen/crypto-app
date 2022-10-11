import { useState } from "react";
import { createContext } from "react";

const CoinContext = createContext();

export function CoinProvider({ children }) {
  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(20);

  const [currency, setCurrency] = useState("usd");

  return (
    <CoinContext.Provider
      value={{ page, setPage, perPage, setPerPage, currency, setCurrency }}
    >
      {children}
    </CoinContext.Provider>
  );
}

export default CoinContext;
