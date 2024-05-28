import { axiosInstance } from "../../Services/axiosInstance";

const addCompany = async (data) => {
  try {
    const response = await axiosInstance.post(`company`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};
const getCompany = async (data) => {
  try {
    const response = await axiosInstance.get(
      `company?${data.search ? "search=" + data.search : ""}`
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

export { addCompany, getCompany };
