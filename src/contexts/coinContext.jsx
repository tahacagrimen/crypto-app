import { useState } from "react";
import { createContext } from "react";

const CoinContext = createContext();

export function CoinProvider({ children }) {
  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(20);

  const [currency, setCurrency] = useState("usd");

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [searchData, setSearchData] = useState("");

  const [myCoins, setMyCoins] = useState([]);

  const [notes, setNotes] = useState([]);

  const [portCoins, setPortCoins] = useState([]);

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
        searchData,
        setSearchData,
        myCoins,
        setMyCoins,
        notes,
        setNotes,
        portCoins,
        setPortCoins,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
}

export default CoinContext;
