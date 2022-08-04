import {
  legacy_createStore as creatStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { products, user, orders, cart } from "./reducer";
const cartLS = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const userLS = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : [];

const initialState = {
  cart: {
    data: [...cartLS],
    loading: false,
    error: "",

  },
  user: {
    user: {...userLS},
    loading: false,
    error: "",
  },
};
const middleWare = [thunk];
const reducers = combineReducers({ products, user, orders, cart });
const store = creatStore(
  reducers,
  initialState,
  applyMiddleware(...middleWare)
);
export default store;
