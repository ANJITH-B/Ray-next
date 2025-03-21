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
const updateInventory = async (id, data) => {
  try {
    const response = await axiosInstance.put(`inventory/${id}`, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
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

const getLowStock = async (data) => {
  try {
    const response = await axiosInstance.get(`inventory/low-stock?${data.search ? "search=" + data.search : ""}`);
    console.log("response123", response);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


const getNegativeStock = async (data) => {
  try {
    const response = await axiosInstance.get(`inventory/negative-stock?${data.search ? "search=" + data.search : ""}`);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }

};
const deleteInventory = async (id) => {
  try {
    await axiosInstance.delete(`inventory/${id}`);
  } catch (error) {
    throw error.response ? error.response.data : error;
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
const updateUnit = async (id, data) => {
  try {
    const response = await axiosInstance.put(`inventory/unit/${id}`, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const deleteUnit = async (id) => {
  try {
    await axiosInstance.delete(`inventory/unit/${id}`);
  } catch (error) {
    throw error.response ? error.response.data : error;
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
const updateCategory = async (id, data) => {
  try {
    const response = await axiosInstance.put(`inventory/categories/${id}`, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const deleteCategory = async (id) => {
  try {
    await axiosInstance.delete(`inventory/categories/${id}`);
  } catch (error) {
    throw error.response ? error.response.data : error;
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
const updateBrand = async (id, data) => {
  try {
    const response = await axiosInstance.put(`inventory/brands/${id}`, data);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const deleteBrand = async (id) => {
  try {
    await axiosInstance.delete(`inventory/brands/${id}`);
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};  

 

export { addInventory, getInventory, addUnits, getUnits, addCategory, getCategories, addBrand,
   getBrands, updateUnit, deleteUnit, updateBrand, deleteBrand, updateCategory, deleteCategory, 
   deleteInventory, updateInventory, getLowStock, getNegativeStock };
