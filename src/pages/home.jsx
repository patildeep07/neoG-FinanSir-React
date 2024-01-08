import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchExpensesData,
  fetchIncomeData,
  fetchSavingsData
} from "../actions/actions";

export const Home = () => {
  const [reportType, setReportType] = useState("incomeVsExpense");

  const [genReport, setGenReport] = useState("");

  const expenses = useSelector((state) => state.expenses);
  const income = useSelector((state) => state.income);
  const savings = useSelector((state) => state.savings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpensesData());
    dispatch(fetchIncomeData());
    dispatch(fetchSavingsData());
  }, [dispatch]);

  const totalIncome = income.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const totalExpense = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const totalSavings = savings.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const sortedExpenses = expenses.sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return (
    <div>
      <h1>Financial Reports</h1>

      <h3>Report type:</h3>
      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
      >
        <option value="incomeVsExpense">Income vs. Expenses</option>
        <option value="expenseBreakdown">Expense Breakdown</option>
        <option value="">Clear</option>
      </select>

      <button onClick={() => setGenReport(reportType)}>Generate report</button>

      {genReport === "incomeVsExpense" && (
        <div>
          <h3>Income vs. Expenses</h3>
          <p>Total recorded income: Rs. {totalIncome}</p>
          <p>Total recorded expenses: Rs. {totalExpense}</p>
          <p>Total recorded savings: Rs. {totalSavings}</p>
        </div>
      )}

      {genReport === "expenseBreakdown" && (
        <div>
          <h3>Expense Breakdown</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map(({ _id, description, amount, category }) => {
                return (
                  <tr key={_id}>
                    <th>{description}</th>
                    <th>Rs. {amount}</th>
                    <th>{category}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
