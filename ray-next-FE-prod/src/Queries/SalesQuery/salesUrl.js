import { axiosInstance } from "../../Services/axiosInstance";

const getInvoice = async (data) => {
  try {
    const response = await axiosInstance.get(
      `sales/invoice?page=${data.pageNo}&perpageitems=${data.pageCount}`
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
const addInvoice = async (data) => {
  try {
    const response = await axiosInstance.post(
      "sales/invoice/",
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

const getSalesReturn = async (data) => {
  try {
    const response = await axiosInstance.get(
      `sales/sales-return?page=${data.pageNo}&perpageitems=${data.pageCount}`
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
const addSalesReturn = async (data) => {
  try {
    const response = await axiosInstance.post(
      "sales/sales-return/",
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

const getSalesQuotation = async (data) => {
  try {
    const response = await axiosInstance.get(
      `sales/quotation?page=${data.pageNo}&perpageitems=${data.pageCount}`
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

const addSalesQuotation = async (data) => {
  try {
    const response = await axiosInstance.post(
      "sales/quotation/",
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

const getSalesOrder = async ({data}) => {
  try {
    const response = await axiosInstance.get(
      `sales/sales-orderquotation?page=${data.pageNo}&perpageitems=${data.pageCount}`
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

const addSalesOrder = async (data) => {
  try {
    const response = await axiosInstance.post(
      "sales/order/",
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
const getCustomer = async () => {
  try {
    const response = await axiosInstance.get(
      "sales/customer"
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

const getSingleInvoice = async () => {
  try {
    const response = await axiosInstance.get(
      `sales/invoice/1000/`
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

const getSingleSalesRetuen = async ({ id }) => {
  try {
    const response = await axiosInstance.get(
      `sales/invoice/${id}`
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

const getOrders = async () => {
  try {
    const response = await axiosInstance.get(
      `sales/order`
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
  getOrders,
  getSingleSalesRetuen,
  getSingleInvoice,
  addCustomer,
  getCustomer,
  addSalesOrder,
  getSalesOrder,
  addSalesQuotation,
  getSalesQuotation,
  addSalesReturn,
  getSalesReturn,
  addInvoice,
  getInvoice,
};
