const initialState = {
  savings: [],
  expenses: [],
  income: [],
  loading: false,
  error: null
};

export const FinanceReducer = (state = initialState, action) => {
  switch (action.type) {
    // Income

    case "SET_INCOME_SUCCESS":
      return {
        ...state,
        income: action.payload,
        loading: false,
        error: null
      };

    case "SET_INCOME_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error fetching income data"
      };
    case "SET_DATA_LOADING":
      return {
        ...state,
        loading: true
      };

    // Expenses

    case "SET_EXPENSE_SUCCESS":
      return {
        ...state,
        expenses: action.payload,
        loading: false,
        error: null
      };

    case "SET_EXPENSE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error fetching expenses data"
      };

    // Savings

    case "SET_SAVINGS_SUCCESS":
      return {
        ...state,
        savings: action.payload,
        loading: false,
        error: null
      };

    case "SET_SAVINGS_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error fetching savings data"
      };

    // Add entry

    case "ADD_ENTRY":
      if (action.payload.entryType === "income") {
        return {
          ...state,
          income: [...state.income, action.payload.data],
          loading: false,
          error: null
        };
      } else if (action.payload.entryType === "savings") {
        return {
          ...state,
          savings: [...state.savings, action.payload.data],
          loading: false,
          error: null
        };
      } else {
        return {
          ...state,
          expenses: [...state.expenses, action.payload.data],
          loading: false,
          error: null
        };
      }

    case "ADD_ENTRY_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error adding data"
      };

    // Default

    default:
      return state;
  }
};
