import { useState } from "react";
import { createContext } from "react";

const CoinContext = createContext();

export function CoinProvider({ children }) {
  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(20);

  const [currency, setCurrency] = useState("usd");

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CoinContext.Provider
      value={{
        page,
        setPage,
        perPage,
        setPerPage,
        currency,
        setCurrency,
        isSidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
}

export default CoinContext;
