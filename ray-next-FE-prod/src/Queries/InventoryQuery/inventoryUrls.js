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

const addUnits = async (data) => {
  try {
    const response = await axiosInstance.post(`inventory/unit`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getUnits = async (data) => {
  try {
    const response = await axiosInstance.get(
      `inventory/unit?${data.search ? "search=" + data.search : ""}`
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

const addCategory = async (data) => {
  try {
    const response = await axiosInstance.post(`inventory/categories`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getCategories = async (data) => {
  try {
    const response = await axiosInstance.get(
      `inventory/categories?${data.search ? "search=" + data.search : ""}`
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

const addBrand = async (data) => {
  try {
    const response = await axiosInstance.post(`inventory/brands`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getBrands = async (data) => {
  try {
    const response = await axiosInstance.get(
      `inventory/brands?${data.search ? "search=" + data.search : ""}`
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

export { addInventory, getInventory, addUnits, getUnits, addCategory, getCategories, addBrand, getBrands };
