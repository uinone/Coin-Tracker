import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Coin-Tracker/:coinId/*" element={<Coin />}></Route>
        <Route path="/Coin-Tracker/" element={<Coins />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
