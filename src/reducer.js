import {
  loadingType,
  errorType,
  successType,
  loadingUser,
  successUser,
  errorUser,
  loadingOrders,
  successOrders,
  errorOrders,
  loadingCart,
  errorCart,
  successCart,
} from "./constans";

export const products = (
  state = { loading: false, data: [], error: "" },
  { type, payload }
) => {
  switch (type) {
    case loadingType:
      return payload;
    case successType:
      return payload;
    case errorType:
      return payload;

    default:
      return state;
  }
};
export const user = (
  state = { loading: false, user: {}, error: "" },
  { type, payload }
) => {
  switch (type) {
    case loadingUser:
      return payload;
    case successUser:
      return payload;
    case errorUser:
      return payload;

    default:
      return state;
  }
};
export const orders = (
  state = { loading: false, orders: {}, error: "" },
  { type, payload }
) => {
  switch (type) {
    case loadingOrders:
      return payload;
    case successOrders:
      return payload;
    case errorOrders:
      return payload;

    default:
      return state;
  }
};
export const cart = (
  state = {
    loading: false,
    data:[],
    error: "",
  },
  { type, payload }
) => {
  switch (type) {
    case loadingCart:
      return payload;
    case successCart:
      return payload;
    case errorCart:
      return payload;

    default:
      return state;
  }
};
