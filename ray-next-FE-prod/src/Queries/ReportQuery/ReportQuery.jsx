import { useQuery } from "react-query";
import {
  getBalanceSheet,
  getCashFlow,
  getProfitAndLoss,
  getTrialBalance,
} from "./reportUrls";

const useGetProfitAndLoss = (data) => {
  return useQuery(["get_profit_loss", data], () => getProfitAndLoss(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetBalanceSheet = (data) => {
  return useQuery(["get_balance_sheet", data], () => getBalanceSheet(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetCashFlow = (data) => {
  return useQuery(["get_cash_flow", data], () => getCashFlow(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetTrailBalance = (data) => {
  return useQuery(["get_trail_balance", data], () => getTrialBalance(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export {
  useGetProfitAndLoss,
  useGetBalanceSheet,
  useGetCashFlow,
  useGetTrailBalance,
};
