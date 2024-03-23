import { useMutation, useQuery, useQueryClient } from "react-query";
import { addInventory, getInventory } from "./inventoryUrls";

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
  return useQuery(["get_inventory",data], () => getInventory(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

};
export { useAddInventory,useGetInventory };
