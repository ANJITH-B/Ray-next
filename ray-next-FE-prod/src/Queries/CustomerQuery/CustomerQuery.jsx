import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCustomer, getCustomer } from "./CustomerUrl";

const useGetCustomer = (data) => {
    return useQuery(["customer",data], () => getCustomer(data), {
      // staleTime: 30000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });

  };

  const useAddCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addCustomer(data), {
      onSuccess: (data) => {
        queryClient.invalidateQueries('customer')
        return data;
      },
      onError: (data) => {
        return data;
      },
    });
  };  


  export {
    useAddCustomer,
    useGetCustomer
  }