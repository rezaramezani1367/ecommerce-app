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
      payload: { data: [{ ...data }], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: loadingType,
      payload: { data: [], error: error.message, loading: false },
    });
  }
};
export const createUser =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: loadingType,
      payload: { ...getState().products, loading: true, user: {} },
    });
    try {
      const { data } = name.length
        ? await axios.post(`${IpApi}/api/users`, {
            name,
            password,
            email,
          })
        : {};

      dispatch({
        type: loadingType,
        payload: {
          ...getState().products,
          loading: false,
          user: data,
        },
      });
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch ({ response: { data } }) {
      dispatch({
        type: loadingType,
        payload: {
          ...getState().products,
          error: data.message,
          loading: false,
          user: {},
        },
      });
    }
  };
