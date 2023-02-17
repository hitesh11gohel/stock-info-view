// import Drawer from "./components/drawer";
import Dashboard from "./pages/Dashboard/dashboard.component";
import Login from "./auth/login/login.component";
import Register from "./auth/register/register.component";
import StockDetail from "./pages/StockDetail/stockdetail.component";
import { Routes, Route } from "react-router-dom";
import Buy from "./pages/Buy/Buy";
import Sell from "./pages/Sell/Sell";
import AppbarComp from "./components/AppBar/appBar";

function App() {
  return (
    <div>
      <AppbarComp />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/:code/:id" element={<StockDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </div>
  );
}

export default App;
