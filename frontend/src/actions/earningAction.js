import axios from "axios";
import {
  ALL_EARNING_FAIL,
  ALL_EARNING_SUCCESS,
  CLEAR_ERRORS,
  CREATE_EARNING_FAILURE,
  CREATE_EARNING_REQUEST,
  CREATE_EARNING_SUCCESS,
  USER_EARNINGS_FAIL,
  USER_EARNINGS_REQUEST,
  USER_EARNINGS_SUCCESS,
} from "../constants/earningConstant";
import { ALL_BIDS_REQUEST } from "../constants/bidConstant";


// Create Payment
export const createEarning = (amount, userId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EARNING_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/earnings",
      { amount, userId },
      config
    );

    dispatch({
      type: CREATE_EARNING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_EARNING_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Get All Erning - Admin
export const getAllEarnings = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BIDS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/earning");

    dispatch({
      type: ALL_EARNING_SUCCESS,
      payload: data.earning,
    });
  } catch (error) {
    dispatch({
      type: ALL_EARNING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Account Analytics
export const fetchEarnings = () => async (dispatch) => {
  dispatch({ type: USER_EARNINGS_REQUEST });

  try {
    // Fetch user earnings from the API
    const response = await axios.get(`/api/v1/user/earning`);

    // Dispatch success action with the earnings data
    dispatch({
      type: USER_EARNINGS_SUCCESS,
      payload: response.data.earnings,
    });
  } catch (error) {
    // Dispatch failure action with error message
    dispatch({
      type: USER_EARNINGS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
