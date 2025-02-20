import { useMutation, useQuery, useQueryClient } from "react-query";
import { addWarehouse, getWarehouses, updateWarehouse, deleteWarehouse } from "./warehouseUrls";

const useAddWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addWarehouse(data), {
    onSuccess: () => queryClient.invalidateQueries("get_warehouses"),
  });
};  

const useGetWarehouses = () => {
  return useQuery("get_warehouses", () => getWarehouses(), {
    staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};  

const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateWarehouse(id, data), {
    onSuccess: () => queryClient.invalidateQueries("get_warehouses"),
  });
};  

const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteWarehouse, {
    onSuccess: () => queryClient.invalidateQueries("get_warehouses"),
  });
};  

export { useAddWarehouse, useGetWarehouses, useUpdateWarehouse, useDeleteWarehouse };   
