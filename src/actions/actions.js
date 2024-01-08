import axios from "axios";

// Fetch income data

export const fetchIncomeData = () => async (dispatch) => {
  try {
    dispatch({ type: "SET_DATA_LOADING" });

    const response = await axios.get(
      "https://neog-finansir.onrender.com/income"
    );

    dispatch({ type: "SET_INCOME_SUCCESS", payload: response.data.incomeData });
  } catch (error) {
    dispatch({ type: "SET_INCOME_FAILURE" });
  }
};

// Fetch expenses data

export const fetchExpensesData = () => async (dispatch) => {
  try {
    dispatch({ type: "SET_DATA_LOADING" });

    const response = await axios.get(
      "https://neog-finansir.onrender.com/expenses"
    );

    dispatch({
      type: "SET_EXPENSE_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: "SET_EXPENSE_FAILURE" });
  }
};

// Fetch savings data

export const fetchSavingsData = () => async (dispatch) => {
  try {
    dispatch({ type: "SET_DATA_LOADING" });

    const response = await axios.get(
      "https://neog-finansir.onrender.com/savings"
    );

    dispatch({
      type: "SET_SAVINGS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: "SET_SAVINGS_FAILURE" });
  }
};

// Add new entries

export const addEntry = (entryData) => async (dispatch) => {
  try {
    const { entryType } = entryData;

    const response = await axios.post(
      `https://neog-finansir.onrender.com/add-${entryType}`,
      entryData
    );

    const data = response.data.data;

    dispatch({
      type: "ADD_ENTRY",
      payload: { data, entryType },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_ENTRY_FAILURE" });
  }
};
