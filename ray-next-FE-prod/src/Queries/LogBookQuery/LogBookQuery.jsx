import { useQuery } from "react-query";
import { getSystemLogs } from "./logBookUrls";


const useGetSystemLogs = (data) => {
    return useQuery(["get_system_logs", data], () => getSystemLogs(data), {
      // staleTime: 30000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });
  };

export { useGetSystemLogs };
