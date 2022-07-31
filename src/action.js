import axios from "axios";
import {
  loadingType,
  errorType,
  successType,
  IpApi,
  loadingUser,
  successUser,
  errorUser,
  loadingOrders,
  successOrders,
  errorOrders,
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
          user: { ...data },
        },
      });
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
export const loginUser = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: loadingUser,
    payload: { ...getState().user, loading: true },
  });
  try {
    const { data } = await axios.post(`${IpApi}/api/users/login `, {
      password,
      email,
    });

    dispatch({
      type: successUser,
      payload: {
        error: "",
        loading: false,
        user: { ...data },
      },
    });
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
};
export const getProfile = (token) => async (dispatch, getState) => {
  dispatch({
    type: loadingUser,
    payload: { ...getState().user, loading: true },
  });
  try {
    const { data } = await axios.get(`${IpApi}/api/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: successUser,
      payload: {
        error: "",
        loading: false,
        user: { ...data },
      },
    });
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
};
export const changeProfile =
  (name, email, password, token) => async (dispatch, getState) => {
    dispatch({
      type: loadingUser,
      payload: { ...getState().user, loading: true },
    });
    try {
      const { data } = await axios.put(
        `${IpApi}/api/users/profile `,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: successUser,
        payload: {
          error: "",
          loading: false,
          user: { ...data },
        },
      });
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
  };
export const setOrders = (orders, token) => async (dispatch, getState) => {
  console.log(orders);
  dispatch({
    type: loadingOrders,
    payload: { ...getState().orders, loading: true },
  });
  try {
    const { data } = await axios.post(
      `${IpApi}/api/orders `,
      {
        ...orders,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: successOrders,
      payload: {
        error: "",
        loading: false,
        orders: { ...data },
      },
    });
    console.log(getState().orders);
  } catch ({ response: { data } }) {
    dispatch({
      type: errorOrders,
      payload: {
        error: data.message,
        loading: false,
        orders: {},
      },
    });
    console.log(getState().orders);
  }
};
export const getMyOrders = (token) => async (dispatch, getState) => {
  dispatch({
    type: loadingOrders,
    payload: { ...getState().orders, loading: true },
  });
  try {
    const { data } = await axios.get(`${IpApi}/api/orders/myorders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: successOrders,
      payload: {
        error: "",
        loading: false,
        orders: { ...data },
      },
    });
    console.log(getState().orders);

  } catch ({ response: { data } }) {
    dispatch({
      type: errorOrders,
      payload: {
        error: data.message,
        loading: false,
        orders: {},
      },
    });
  }
};
