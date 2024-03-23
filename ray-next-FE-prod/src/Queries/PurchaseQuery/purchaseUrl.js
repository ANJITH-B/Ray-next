import { axiosInstance } from "../../Services/axiosInstance";

const addSupplier = async ( data ) => {
  try {
    const response = await axiosInstance.post(
      `purchase/supplier/`,
      data
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

const getSupplier = async ( data ) => {
  try {
    const response = await axiosInstance.get(
      `purchase/supplier?page${data.pageNo}`,
      data
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
const addBill = async ( data ) => {
  try {
    const response = await axiosInstance.post(
      `purchase/bill`,
      data
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
const getBill = async (data) => {
  try {
    const response = await axiosInstance.get(
      `purchase/bill?page=${data.pageNo}&perpageitems=${data.pageCount}`
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

const addPurchaseReturn = async (data ) => {
  try {
    const response = await axiosInstance.post(
      `purchase/return`,
      data
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

const getPurchaseReturn = async (data) => {
  try {
    const response = await axiosInstance.get(
      `purchase/return?page=${data.pageNo}&perpageitems=${data.pageCount}`
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

const addPurchaseOrder = async ( data ) => {
  try {
    const response = await axiosInstance.post(
      `purchase/order`,
      data
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

const getPurchaseOrder = async (data) => {
  try {
    const response = await axiosInstance.get(
      `purchase/order?page=${data.pageNo}&perpageitems=${data.pageCount}`
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

export {
  addSupplier,
  getSupplier,
  addBill,
  getBill,
  addPurchaseReturn,
  getPurchaseReturn,
  addPurchaseOrder,
  getPurchaseOrder
};
