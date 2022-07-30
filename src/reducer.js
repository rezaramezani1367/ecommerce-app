import {
  loadingType,
  errorType,
  successType,
  loadingUser,
  successUser,
  errorUser,

} from "./constans";

export const products = (
  state = { loading: true, data: [], error: "" },
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
