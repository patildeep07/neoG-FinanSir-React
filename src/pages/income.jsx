import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomeData } from "../actions/actions";
import { IncomeExpenseForm } from "../components/incomeExpenseForm";

export const Income = () => {
  const income = useSelector((state) => state.income);
  // console.log({ income });

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIncomeData());
  }, [dispatch]);

  const totalIncome = income.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  // Filtering data

  const availableCategories = income.reduce(
    (acc, curr) =>
      acc.includes(curr.category) ? acc : [...acc, curr.category],
    []
  );

  const [filterSettings, setFilterSettings] = useState({
    selectedCategory: "All",
    priceRange: 0
  });

  const applyFilters = (income) => {
    const filterByCategory =
      filterSettings.selectedCategory === "All"
        ? income
        : income.filter(
            ({ category }) =>
              category.toLowerCase() ===
              filterSettings.selectedCategory.toLowerCase()
          );

    const filterByPrice = filterByCategory.filter(
      ({ amount }) => amount >= filterSettings.priceRange
    );

    return filterByPrice;
  };

  const filteredIncome = applyFilters(income);

  return (
    <div>
      <h1>Income</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}

      {income.length === 0 && !loading && (
        <h4>
          No income details available at the moment. Proceed to add a new entry
        </h4>
      )}

      {!loading && !error && (
        <div>
          <h4>Filter methods:</h4>
          <h4>Available categories:</h4>
          <select
            onChange={(e) =>
              setFilterSettings({
                ...filterSettings,
                selectedCategory: e.target.value
              })
            }
          >
            <option value="All">All</option>
            {availableCategories.map((item, idx) => {
              return (
                <option key={idx} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <h4>By price</h4>
          <div className="radio">
            <input
              type="radio"
              name="priceFilter"
              onChange={(e) =>
                setFilterSettings({
                  ...filterSettings,
                  priceRange: e.target.value
                })
              }
              defaultChecked
              // checked={filterSettings.priceRange === 0 ? true : false}
              value={0}
            />
            <label>All</label>
          </div>

          <div className="radio">
            <input
              type="radio"
              name="priceFilter"
              onChange={(e) =>
                setFilterSettings({
                  ...filterSettings,
                  priceRange: e.target.value
                })
              }
              // checked={filterSettings.priceRange === 1000 ? true : false}
              value={25000}
            />
            <label>Above 25000</label>
          </div>

          <div className="radio">
            <input
              type="radio"
              name="priceFilter"
              onChange={(e) =>
                setFilterSettings({
                  ...filterSettings,
                  priceRange: e.target.value
                })
              }
              // checked={filterSettings.priceRange === 10000 ? true : false}
              value={50000}
            />
            <label>Above 50000</label>
          </div>

          <div className="radio">
            <input
              type="radio"
              name="priceFilter"
              onChange={(e) =>
                setFilterSettings({
                  ...filterSettings,
                  priceRange: e.target.value
                })
              }
              // checked={filterSettings.priceRange === 25000 ? true : false}
              value={75000}
            />
            <label>Above 75000</label>
          </div>

          {/* List income */}
          <ul>
            {filteredIncome.length < 1 && (
              <h4>No listings available for this filter</h4>
            )}
            {filteredIncome.map(({ _id, description, amount, category }) => {
              return (
                <li key={_id}>
                  {description} - {category} - Rs. {amount}
                </li>
              );
            })}
          </ul>
          <h3>Summary</h3>
          <p>Total income: Rs. {totalIncome}</p>
        </div>
      )}

      <h2>New entry</h2>
      <IncomeExpenseForm entryType="income" />
    </div>
  );
};
