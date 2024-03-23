import { useMutation, useQuery, useQueryClient } from "react-query";
import { addBill, addPurchaseOrder, addPurchaseReturn, addSupplier, getBill, getPurchaseOrder, getPurchaseReturn, getSupplier } from "./purchaseUrl";


const useAddSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation((userData) => addSupplier(userData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('supplier')
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useGetSupplier = (data) => {
  return useQuery(["supplier", data], () => getSupplier(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useAddBill = () => {
  return useMutation((userData) => addBill(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useGetBill = (data) => {
  return useQuery(["bill", data], () => getBill(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};


const useAddPurchaseReturn = () => {
  return useMutation((userData) => addPurchaseReturn(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useGetPurchaseReturn = (data) => {
  return useQuery(["pReturn", data], () => getPurchaseReturn(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};


const useAddPurchaseOrder = () => {
  return useMutation((userData) => addPurchaseOrder(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useGetPurchaseOrder = (data) => {
  return useQuery(["pOrder", data], () => getPurchaseOrder(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
export {
  useAddSupplier,
  useGetSupplier,
  useAddBill,
  useGetBill,
  useAddPurchaseReturn,
  useGetPurchaseReturn,
  useAddPurchaseOrder,
  useGetPurchaseOrder
};
