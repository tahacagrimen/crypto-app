import "./App.css";
import Coins from "./components/Coins";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Coins />
      </QueryClientProvider>
    </div>
  );
}

export default App;
