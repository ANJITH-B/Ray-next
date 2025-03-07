import { axiosInstance } from "../../Services/axiosInstance";

const getSystemLogs = async (data) => {
  try {
    const response = await axiosInstance.get(`/logs?period=${data?.date}`);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

export { getSystemLogs };
