import axios from "axios";
import { loadingType, errorType, successType, IpApi } from "./constans";

export const getProducts = () => async (dispatch, getState) => {
  dispatch({
    type: loadingType,
    payload: { ...getState().products, loading: true },
  });
  try {
    const { data } = await axios(`${IpApi}/api/products`);
    dispatch({
      type: loadingType,
      payload: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: loadingType,
      payload: { data: [], error: error.message, loading: false },
    });
  }
};
export const getProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: loadingType,
    payload: { ...getState().products, loading: true },
  });
  try {
    const { data } = await axios(`${IpApi}/api/products/${id}`);
    
    dispatch({
      type: loadingType,
      payload: { data: [{...data}], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: loadingType,
      payload: { data: [], error: error.message, loading: false },
    });
  }
};
