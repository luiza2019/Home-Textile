import React, { useReducer } from "react";
import axios from "axios";
import { APImerch, APIsmerch } from "../helpers/config";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";

export const merchContext = React.createContext();
const INIT_STATE = {
  merch: [],
  merchCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).merch.length
    : 0,
  cart: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_MERCH":
      return { ...state, merch: action.payload };
    case "EDIT_SPECIFIC_MERCH":
      return { ...state, merch: action.payload };
    case "ADD_AND_DELETE_MERCH_IN_CART":
      return { ...state, merchCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const MerchContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createMerch = async (merch, category) => {
    try {
      const response = await axios.post(APImerch, merch);

      getItemsByCategory(category);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllMerch = async () => {
    try {
      let filter = window.location.search
      const response = await axios(`${APImerch}${filter}`);
      let action = {
        type: "GET_ALL_MERCH",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  const editSpecificMerch = async (id, merch, category) => {
    try {
      await axios.put(APImerch + id, merch);
      getItemsByCategory(category);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteMerch = async (id, category) => {
    try {
      await axios.delete(APImerch + id);
      getItemsByCategory(category);
    } catch (e) {
      console.log(e);
    }
  };

  const addAndDeleteMerchInCart = (merch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let product = {
      merch,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.merch.filter((item) => {
      return item.merch.id === merch.id;
    });
    if (checkArr.length === 0) {
      cart.merch.push(product);
    } else {
      cart.merch = cart.merch.filter((item) => {
        return item.merch.id !== merch.id;
      });
    }

    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_MERCH_IN_CART",
      payload: cart.merch.length,
    };
    dispatch(action);
  };

  const addAndDontDeleteMerchInCart = (merch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let product = {
      merch,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.merch.filter((item) => {
      return item.merch.id === merch.id;
    });
    if (checkArr.length === 0) {
      cart.merch.push(product);
    }

    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_MERCH_IN_CART",
      payload: cart.merch.length,
    };
    dispatch(action);
  };

  const deleteMerchInCart = (merch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let product = {
      merch,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.merch.filter((item) => {
      return item.merch.id === merch.id;
    });
    if (checkArr.length !== 0) {
      cart.merch = cart.merch.filter((item) => {
        return item.merch.id !== merch.id;
      });
    }

    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_MERCH_IN_CART",
      payload: cart.merch.length,
    };
    dispatch(action);
  };

  const checkMerchInCart = (id) => {
    // console.log(id);
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let checkArr = cart.merch.filter((item) => item.merch.id === id);
      // console.log(checkArr.length === 0);
      if (checkArr.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCountMerch = (count, id) => {
    if (count < 1) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.merch = cart.merch.map((item) => {
      if (item.merch.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const getItemsByCategory = async (category) => {
    try {
      console.log(category);
      if (category == "all") {
        getAllMerch();
      } else {
        let response = await axios(APIsmerch + "?category=" + category);
        let action = {
          type: "GET_ALL_MERCH",
          payload: response.data,
        };
        dispatch(action);
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <merchContext.Provider
      value={{
        createMerch,
        getAllMerch,
        editSpecificMerch,
        deleteMerch,
        addAndDeleteMerchInCart,
        checkMerchInCart,
        getCart: getCart,
        changeCountMerch,
        getItemsByCategory,
        deleteMerchInCart,
        addAndDontDeleteMerchInCart,
        merchCountInCart: state.merchCountInCart,
        merch: state.merch,
        cart: state.cart,
      }}
    >
      {props.children}
    </merchContext.Provider>
  );
};

export default MerchContextProvider;
