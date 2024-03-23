import { axiosInstance } from "../../Services/axiosInstance";

const addCustomer = async (data) => {
  try {
    const response = await axiosInstance.post(
      "sales/customer",
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

const getCustomer = async (data) => {
  try {
    const response = await axiosInstance.get(
      `sales/customer?page=${data.pageNo}&perpageitems=${data.pageCount}`
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

export { addCustomer, getCustomer };
