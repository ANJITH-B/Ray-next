import { axiosInstance } from "../../Services/axiosInstance";

const addInventory = async (data) => {
  try {
    const response = await axiosInstance.post(`inventory`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};
const getInventory = async (data) => {
  try {
    const response = await axiosInstance.get(
      `inventory?${data.search ? "search=" + data.search : ""}`
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

export { addInventory, getInventory };
