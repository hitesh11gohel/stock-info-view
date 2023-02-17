import axios from "axios";
import { getPurchasedSingleStock } from "../../service";

export const getAllStockDetails = (data) => {
  return {
    type: "GET_ALL_STOCK_DETAILS",
    payload: data,
  };
};

export const getSingleStockDetails = (data) => {
  return {
    type: "GET_SINGLE_STOCK_DETAILS",
    payload: data,
  };
};

export const addSinglePurchaseShare = (data) => {
  return {
    type: "ADD_SINGLE_PURCHASE_SHARE",
    payload: data,
  };
};

export const getAllStockData = async (dispatch) => {
  try {
    const res = await axios.get(getPurchasedSingleStock);
    dispatch({
      type: "GET_ALL_STOCK_DATA",
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_ALL_STOCK_DATA_ERROR",
      payload: console.log(err),
    });
  }
};
