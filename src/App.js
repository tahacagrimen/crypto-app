import { QueryClientProvider, QueryClient } from "react-query";
import { CoinProvider } from "./contexts/coinContext";
import { FirebaseProvider } from "./contexts/firebaseContext";
import styles from "./styles/App.module.scss";
import Mainpage from "./components/Mainpage";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./components/Loginpage";
import Coinpage from "./components/Coinpage";
import Portfoliopage from "./components/Portfoliopage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className={styles.app}>
      <FirebaseProvider>
        <CoinProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route exact path="/" element={<Loginpage />} />
              <Route path="/overview" element={<Mainpage />} />
              <Route path="/overview/:id" element={<Coinpage />} />
              <Route path="/portfolio" element={<Portfoliopage />} />
            </Routes>
          </QueryClientProvider>
        </CoinProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
