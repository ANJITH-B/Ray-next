import { useMutation, useQuery, useQueryClient } from "react-query";
import { addCompany, getCompany } from "./CompanyUrls";

const useAddCompany = () => {
   const queryClient = useQueryClient();

   return useMutation((data) => addCompany(data), {
      onSuccess: (data) => {
         queryClient.invalidateQueries('get_company')
         return data;
      },
      onError: (data) => {
         return data;
      },
   });
};
const useGetCompany = (data) => {
   return useQuery(["get_company", data], () => getCompany(data), {
      // staleTime: 30000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
   });

};
export { useAddCompany, useGetCompany };
