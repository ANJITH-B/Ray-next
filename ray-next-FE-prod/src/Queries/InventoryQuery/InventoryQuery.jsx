import { useMutation, useQuery, useQueryClient } from "react-query";
import { addBrand, addCategory, addInventory, addUnits, getBrands, getCategories, getInventory, getUnits, updateUnit, deleteUnit,
  deleteBrand,
  updateBrand,
  updateCategory,
  deleteCategory,
  deleteInventory,  
  updateInventory,
  getLowStock,
  getNegativeStock
 } from "./inventoryUrls";

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
const useGetLowStock = (data) => {
  return useQuery(["get_low_stock", data], () => getLowStock(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useGetNegativeStock = (data) => {
  return useQuery(["get_negative_stock", data], () => getNegativeStock(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateInventory(id, data), {
    onSuccess: () => queryClient.invalidateQueries("get_inventory"),
  });
};

const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteInventory, {
    onSuccess: () => queryClient.invalidateQueries("get_inventory"),
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

const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateUnit(id, data), {
    onSuccess: () => queryClient.invalidateQueries("get_units"),
  });
};

const useDeleteUnit = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUnit, {
    onSuccess: () => queryClient.invalidateQueries("get_units"),
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

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateCategory(id, data), {
    onSuccess: () => queryClient.invalidateQueries("get_category"),
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries("get_category"),
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
const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBrand, {
    onSuccess: () => queryClient.invalidateQueries("get_brands"),
  });
};

const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateBrand(id, data), {
    onSuccess: () => queryClient.invalidateQueries("get_brands"),
  });
};

export { useAddInventory, useGetInventory, useAddUnits, useGetUnits, useGetBrands, useAddBrand, useAddCategory,
   useGetCategories, useUpdateUnit, useDeleteUnit, useDeleteBrand, useUpdateBrand, useUpdateCategory, useDeleteCategory, 
   useDeleteInventory, useUpdateInventory, useGetLowStock, useGetNegativeStock };
