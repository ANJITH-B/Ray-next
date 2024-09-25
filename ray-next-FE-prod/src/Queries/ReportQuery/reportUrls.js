import { axiosInstance } from "../../Services/axiosInstance";

const getProfitAndLoss = async (data) => {
  try {
    const response = await axiosInstance.get(
      `profit-loss?page=${data?.pageNo}&perpageitems=${data?.pageCount}`
    );
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getBalanceSheet = async (data) => {
  try {
    const response = await axiosInstance.get(
      `balance-sheet?page=${data?.pageNo}&perpageitems=${data?.pageCount}`
    );
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getCashFlow = async (data) => {
  try {
    const response = await axiosInstance.get(
      `cash-flow?page=${data?.pageNo}&perpageitems=${data?.pageCount}`
    );
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getTrialBalance = async (data) => {
  try {
    const response = await axiosInstance.get(
      `trial-balance?page=${data?.pageNo}&perpageitems=${data?.pageCount}`
    );
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

export { getProfitAndLoss, getBalanceSheet, getCashFlow, getTrialBalance };
