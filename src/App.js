import "./styles.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Income } from "./pages/income";
import { Expenses } from "./pages/expenses";
import { Savings } from "./pages/savings";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header>
        <h1 onClick={() => navigate("/")}>FinanSir</h1>
        <nav className="navBar">
          <li onClick={() => navigate("/")}>Report</li>
          <li onClick={() => navigate("/income")}>Income</li>
          <li onClick={() => navigate("/savings")}>Savings</li>
          <li onClick={() => navigate("/expenses")}>Expenses</li>
        </nav>
      </header>

      <div className="main-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/savings" element={<Savings />} />
        </Routes>
      </div>

      <br />
    </div>
  );
}
