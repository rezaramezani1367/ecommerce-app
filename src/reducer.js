import { loadingType, errorType, successType } from "./constans";

export const products = (
  state = { loading: true, data: [],user:{}, error: "" },
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
