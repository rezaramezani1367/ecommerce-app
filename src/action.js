import axios from "axios";
import {
  loadingType,
  errorType,
  successType,
  IpApi,
  loadingUser,
  successUser,
  errorUser,
} from "./constans";

export const getProducts = () => async (dispatch, getState) => {
  dispatch({
    type: loadingType,
    payload: { ...getState().products, loading: true },
  });
  try {
    const { data } = await axios(`${IpApi}/api/products`);
    dispatch({
      type: successType,
      payload: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: errorType,
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
      type: successType,
      payload: { data: [{ ...data }], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: errorType,
      payload: { data: [], error: error.message, loading: false },
    });
  }
};
export const createUser =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: loadingUser,
      payload: { ...getState().user, loading: true },
    });
    try {
      const { data } = await axios.post(`${IpApi}/api/users`, {
        name,
        password,
        email,
      });

      dispatch({
        type: successUser,
        payload: {
          error: "",
          loading: false,
          user: {...data},
        },
      });
      console.log(getState().user);
      localStorage.setItem("user", JSON.stringify(data));
    } catch ({ response: { data } }) {
      dispatch({
        type: errorUser,
        payload: {
          error: data.message,
          loading: false,
          user: {},
        },
      });
    }
    console.log(getState().user);
  };
export const EmptyUser = () => async (dispatch, getState) => {
  dispatch({
    type: successUser,
    payload: {
      error: "",
      loading: false,
      user: {},
    },
  });
};
