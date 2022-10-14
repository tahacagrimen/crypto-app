import { QueryClientProvider, QueryClient } from "react-query";
import { CoinProvider } from "./contexts/coinContext";
import styles from "./styles/App.module.scss";
import Mainpage from "./components/Mainpage";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./components/Loginpage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className={styles.app}>
      <CoinProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route exact path="/" element={<Loginpage />} />
            <Route path="/overview" element={<Mainpage />} />
          </Routes>
        </QueryClientProvider>
      </CoinProvider>
    </div>
  );
}

export default App;
