import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavingsData } from "../actions/actions";
import { IncomeExpenseForm } from "../components/incomeExpenseForm";

export const Savings = () => {
  const savings = useSelector((state) => state.savings);

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavingsData());
  }, [dispatch]);

  const totalSavings = savings.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  // Filtering data

  const availableCategories = savings.reduce(
    (acc, curr) =>
      acc.includes(curr.category) ? acc : [...acc, curr.category],
    []
  );

  const [filterSettings, setFilterSettings] = useState({
    selectedCategory: "All",
    priceRange: 0
  });

  const applyFilters = (savings) => {
    const filterByCategory =
      filterSettings.selectedCategory === "All"
        ? savings
        : savings.filter(
            ({ category }) =>
              category.toLowerCase() ===
              filterSettings.selectedCategory.toLowerCase()
          );

    const filterByPrice = filterByCategory.filter(
      ({ amount }) => amount >= filterSettings.priceRange
    );

    return filterByPrice;
  };

  const filteredSavings = applyFilters(savings);

  // End
  return (
    <div>
      <h1>Savings</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}

      {savings.length === 0 && !loading && (
        <h4>
          No savings details available at the moment. Proceed to add a new entry
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
              value={1000}
            />
            <label>Above 1000</label>
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
              value={5000}
            />
            <label>Above 5000</label>
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
              value={10000}
            />
            <label>Above 10000</label>
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
              value={20000}
            />
            <label>Above 20000</label>
          </div>

          {/* List savings */}
          <ul>
            {filteredSavings.length < 1 && (
              <h4>No listings available for this filter</h4>
            )}
            {filteredSavings.map(({ _id, description, amount }) => {
              return (
                <li key={_id}>
                  {description} - Rs. {amount}
                </li>
              );
            })}
          </ul>
          <h3>Summary</h3>
          <p>Total savings: Rs. {totalSavings}</p>
        </div>
      )}

      <h2>New entry</h2>
      <IncomeExpenseForm entryType="savings" />

      {/* End */}
    </div>
  );
};
