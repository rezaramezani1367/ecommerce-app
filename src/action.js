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
  loadingCart,
  successCart,
  errorCart,
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
    const errors = error.response.data ? error.response.data : error;

    dispatch({
      type: errorType,
      payload: { data: [], error: errors.message, loading: false },
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
    const errors = error.response.data ? error.response.data : error;

    dispatch({
      type: errorType,
      payload: { data: [], error: errors.message, loading: false },
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
      localStorage.setItem("user", JSON.stringify({ ...data, password }));
    } catch (error) {
      const errors = error.response.data ? error.response.data : error;

      dispatch({
        type: errorUser,
        payload: {
          error: errors.message,
          loading: false,
          user: {},
        },
      });
    }
  };
export const exitUser = () => async (dispatch, getState) => {
  dispatch({
    type: successUser,
    payload: {
      error: "",
      loading: false,
      user: {},
    },
  });
  localStorage.removeItem("user");
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
        user: { ...data, password },
      },
    });
    localStorage.setItem("user", JSON.stringify({ ...data, password }));
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;
    

    dispatch({
      type: errorUser,
      payload: {
        error: errors.message,
        loading: false,
        user: {},
      },
    });
  }
};
export const getProfile = () => async (dispatch, getState) => {
  dispatch({
    type: loadingUser,
    payload: { ...getState().user, loading: true },
  });
  try {
    const { token, password } = { ...getState().user.user };
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
        user: { ...data, password, token },
      },
    });
    console.log(getState().user)
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;
    dispatch({
      type: errorUser,
      payload: {
        error: errors.message,
        loading: false,
        user: {},
      },
    });
    console.log(getState().user)

  }
};
export const changeProfile = (password) => async (dispatch, getState) => {
  dispatch({
    type: loadingUser,
    payload: { ...getState().user, loading: true },
  });
  try {
    const {
      user: { name, email, token },
    } = { ...getState().user };

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
        user: { ...data, password },
      },
    });
    localStorage.setItem("user", JSON.stringify({ ...data, password }));
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;
    
    dispatch({
      type: errorUser,
      payload: {
        error: errors.message,
        loading: false,
        user: {},
      },
    });
  }
};
export const setOrders = (orders, token) => async (dispatch, getState) => {
  
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
    // remove cart
    dispatch({
      type: successCart,
      payload: {
        error: "",
        loading: false,
        data: [],
      },
    });
    localStorage.removeItem("cart");
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;

    dispatch({
      type: errorOrders,
      payload: {
        error: errors.message,
        loading: false,
        orders: {},
      },
    });
   
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
    
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;
    dispatch({
      type: errorOrders,
      payload: {
        error: errors.message,
        loading: false,
        orders: {},
      },
    });
  }
};
export const getDetailsOrder = (id, token) => async (dispatch, getState) => {
  dispatch({
    type: loadingOrders,
    payload: { ...getState().orders, orders: {}, loading: true },
  });
  try {
    const { data } = await axios.get(`${IpApi}/api/orders/${id}`, {
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
    
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;

    dispatch({
      type: errorOrders,
      payload: {
        error: errors.message,
        loading: false,
        orders: {},
      },
    });
  }
};

export const AddTocartLS = (index) => (dispatch, getState) => {
  dispatch({
    type: loadingCart,
    payload: { ...getState().cart, loading: true },
  });
  try {
    const { data } = { ...getState().cart };
    const item = { ...data[index] };
    item.count =
      item.count < data[index].product.countInStock
        ? item.count + 1
        : data[index].product.countInStock;
    data[index] = { ...item };

    dispatch({
      type: successCart,
      payload: {
        error: "",
        loading: false,
        data: [...data],
      },
    });
    localStorage.setItem("cart", JSON.stringify([...data]));
   
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;
    dispatch({
      type: errorCart,
      payload: {
        error: errors.message,
        loading: false,
        data: {},
      },
    });
  }
};
export const minusTocartLS = (index) => (dispatch, getState) => {
  dispatch({
    type: loadingCart,
    payload: { ...getState().cart, loading: true },
  });
  try {
    const { data } = { ...getState().cart };
    const item = { ...data[index] };
    item.count = item.count > 0 ? item.count - 1 : 0;
    data[index] = { ...item };

    dispatch({
      type: successCart,
      payload: {
        error: "",
        loading: false,
        data: [...data],
      },
    });
    localStorage.setItem("cart", JSON.stringify([...data]));
    
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;
    dispatch({
      type: errorCart,
      payload: {
        error: errors.message,
        loading: false,
        data: {},
      },
    });
  }
};
export const removeFromcartLS = (index) => (dispatch, getState) => {
  dispatch({
    type: loadingCart,
    payload: { ...getState().cart, loading: true },
  });
  try {
    const { data } = { ...getState().cart };
    data.splice(index, 1);

    dispatch({
      type: successCart,
      payload: {
        error: "",
        loading: false,
        data: [...data],
      },
    });
    data.length
      ? localStorage.setItem("cart", JSON.stringify([...data]))
      : localStorage.removeItem("cart");
    
  } catch (error) {
    const errors = error.response.data ? error.response.data : error;
    dispatch({
      type: errorCart,
      payload: {
        error: errors.message,
        loading: false,
        data: {},
      },
    });
  }
};
export const addProductTocartLS =
  (productItem, indexCart) => (dispatch, getState) => {
    dispatch({
      type: loadingCart,
      payload: { ...getState().cart, loading: true },
    });
    try {
      
      const { data } = { ...getState().cart };
      if (indexCart > -1) {
        const item = { ...data[indexCart] };
        item.count =
          item.count < item.product.countInStock
            ? item.count + 1
            : item.product.countInStock;
        data[indexCart] = { ...item };
        dispatch({
          type: successCart,
          payload: {
            error: "",
            loading: false,
            data: [...data],
          },
        });
        localStorage.setItem("cart", JSON.stringify([...data]));
      } else if (indexCart === -1) {
        
        dispatch({
          type: successCart,
          payload: {
            error: "",
            loading: false,
            data: [...data, { product: { ...productItem }, count: 1 }],
          },
        });
        localStorage.setItem(
          "cart",
          JSON.stringify([...data, { product: { ...productItem }, count: 1 }])
        );
      }
    } catch (error) {
      const errors = error.response.data ? error.response.data : error;
      dispatch({
        type: errorCart,
        payload: {
          error: errors.message,
          loading: false,

          data: {},
        },
      });
    }
  };
