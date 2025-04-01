import { combineReducers } from "redux";
import productsReducer from "./roductsReducer";

export default combineReducers({
  products: productsReducer
});

