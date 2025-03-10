import { axiosInstance } from "../../Services/axiosInstance";


const addReceipt = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/receipts/add",
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

  
export {
    addReceipt,
  };
  