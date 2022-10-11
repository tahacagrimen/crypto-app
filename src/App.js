import Coins from "./components/Coins";
import { QueryClientProvider, QueryClient } from "react-query";
import { CoinProvider } from "./contexts/coinContext";
import Sidebar from "./components/Sidebar";
import styles from "./styles/App.module.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <CoinProvider>
      <div className={styles.app}>
        <QueryClientProvider client={queryClient}>
          <Sidebar />
          <Coins />
        </QueryClientProvider>
      </div>
    </CoinProvider>
  );
}

export default App;
