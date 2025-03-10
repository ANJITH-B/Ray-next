import { useMutation, useQuery } from "react-query";
import {
  addInvoice,
  addSalesOrder,
  addSalesQuotation,
  addSalesReturn,
  getInvoice,
  getOrders,
  getSalesQuotation,
  getSalesReturn,
  getSingleInvoice,
  getCustomerInvoice
} from "./salesUrl";

const useGetInvoice = (data) => {
  return useQuery(["getInvoice", data], () => getInvoice(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetCustomerInvoice = (customerId) => {
  return useQuery(
    ["getCustomerInvoice", customerId],
    () => getCustomerInvoice(customerId),
    {
      enabled: !!customerId, // Only fetch when customerId is available
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
const useGetReturn = (data) => {
  return useQuery(["getReturn", data], () => getSalesReturn(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useGetQuotation = (data) => {
  return useQuery(["getQuot", data], () => getSalesQuotation(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useGetOrder = (data) => {
  return useQuery(["getSorder", data], () => getOrders(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useGetSingleInvoice = () => {
  return useQuery(["ssd"], () => getSingleInvoice(), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useAddInvoice = () => {
  return useMutation((userData) => addInvoice(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useAddQuatation = () => {
  return useMutation((userData) => addSalesQuotation(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useAddSalesOrder = () => {
  return useMutation((userData) => addSalesOrder(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useAddSalesReturn = () => {
  return useMutation((userData) => addSalesReturn(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};


export {
  useGetInvoice,
  useGetReturn,
  useGetQuotation,
  useAddInvoice,
  useGetSingleInvoice,
  useAddSalesOrder,
  useGetOrder,
  useAddQuatation,
  useAddSalesReturn,
  useGetCustomerInvoice 
};
