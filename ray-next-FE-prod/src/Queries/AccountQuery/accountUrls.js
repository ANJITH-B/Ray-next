import { axiosInstance } from "../../Services/axiosInstance";

const getJournalId = async () => {
  try {
    const response = await axiosInstance.get("journal/idgen");
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getAllRegularAccounts = async (data) => {
  try {
    const response = await axiosInstance.get(`coa/regular-account?page=${data?.pageNo}&perpageitems=${data?.pageCount}`);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getControllAccounts = async (data) => {
  try {
    const response = await axiosInstance.get(`coa/control-account?page=${data?.pageNo}&perpageitems=${data?.pageCount}`);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const addJournal = async (data) => {
  try {
    const response = await axiosInstance.post(`journal`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const addRegularAccount = async (data) => {
  try {
    const response = await axiosInstance.post(`coa/regular-account`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const addControlledAccount = async (data) => {
  try {
    const response = await axiosInstance.post(`coa/control-account`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const addAccountGroup= async (data) => {
  try {
    const response = await axiosInstance.post(`coa/account-group`, data);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};

const getAccountGroup= async (data) => {
  try {
    const response = await axiosInstance.get(`coa/account-group?page=${data?.pageNo}&perpageitems=${data?.pageCount}`);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    } else {
      throw error.response.data;
    }
  }
};


const getAccountBook= async (data) => {
  try {
    const response = await axiosInstance.get(`/account-book?account=${data?.account}&period=${data?.date}`);
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
  getJournalId,
  getAllRegularAccounts,
  addJournal,
  addRegularAccount,
  addControlledAccount,
  getControllAccounts,
  addAccountGroup,
  getAccountGroup,
  getAccountBook
};
