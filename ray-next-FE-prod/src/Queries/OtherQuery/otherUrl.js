import { axiosInstance } from "../../Services/axiosInstance";

const getID = async (data) => {
  try {
    const response = await axiosInstance.get(
      `${data.section}/id-generator?module=${data.module}`
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
  getID,
 
};
