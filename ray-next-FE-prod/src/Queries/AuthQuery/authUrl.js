import axios from "axios";

const signup = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}user/register`,
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

const emailVerify = async (data) => {
  try {
    const response = await axios.post(

      `${process.env.REACT_APP_API_URL}user/verify`,

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

const verifySecret = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}user/verifysecret`,
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
const signin = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}user/login`,
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

export { signup ,emailVerify,verifySecret,signin};
