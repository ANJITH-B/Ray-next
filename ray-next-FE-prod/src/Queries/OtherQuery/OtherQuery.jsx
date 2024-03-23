import { useMutation, useQuery } from "react-query";

import { getID } from "./otherUrl";

const useGetID = (data) => {
  return useQuery(["ssd", data], () => getID(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// const useAddInvoice = () => {
//   return useMutation((userData) => addInvoice(userData), {
//     onSuccess: (data) => {
//       return data;
//     },
//     onError: (data) => {
//       return data;
//     },
//   });
// };


export {
  useGetID
};
