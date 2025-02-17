import { useMutation, useQuery, useQueryClient } from "react-query";
import { addBrand, addCategory, addInventory, addUnits, getBrands, getCategories, getInventory, getUnits } from "./inventoryUrls";

const useAddInventory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addInventory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get_inventory')
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useGetInventory = (data) => {
  return useQuery(["get_inventory", data], () => getInventory(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useAddUnits = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addUnits(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get_units')
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useGetUnits = (data) => {
  return useQuery(["get_units", data], () => getUnits(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetCategories = (data) => {
  return useQuery(["get_category", data], () => getCategories(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addCategory(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get_category')
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useGetBrands = (data) => {
  return useQuery(["get_brands", data], () => getBrands(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useAddBrand = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addBrand(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get_brands')
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

export { useAddInventory, useGetInventory, useAddUnits, useGetUnits, useGetBrands, useAddBrand, useAddCategory, useGetCategories };
