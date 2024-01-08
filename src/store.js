import { createStore, applyMiddleware } from "redux";
import { FinanceReducer } from "./reducer";
import thunk from "redux-thunk";

const store = createStore(FinanceReducer, applyMiddleware(thunk));

export default store;
