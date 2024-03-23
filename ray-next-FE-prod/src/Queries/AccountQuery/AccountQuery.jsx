import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addAccountGroup,
  addControlledAccount,
  addJournal,
  addRegularAccount,
  getAccountBook,
  getAccountGroup,
  getAllRegularAccounts,
  getControllAccounts,
  getJournalId,
} from "./accountUrls";

const useGetJournalId = () => {
  return useQuery(["get_journal_id"], () => getJournalId(), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetRegularAccount = () => {
  return useQuery(["get_regular_account"], () => getAllRegularAccounts(), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
const useGetAccountGroup = () => {
  return useQuery(["get_group_account"], () => getAccountGroup(), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetControlAccount = () => {
  return useQuery(["get_controll_account"], () => getControllAccounts(), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useGetAccountBook = (data) => {
  return useQuery(["get_account_book", data], () => getAccountBook(data), {
    // staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

const useAddJournal = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addJournal(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_Journal");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useAddRegularAccount = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addRegularAccount(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_regular_account");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useAddControlledAccount = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addControlledAccount(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_controll_account");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useAddAccountGroup = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addAccountGroup(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_group_account");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
export {
  useGetJournalId,
  useGetRegularAccount,
  useAddJournal,
  useAddRegularAccount,
  useAddControlledAccount,
  useGetControlAccount,
  useAddAccountGroup,
  useGetAccountGroup,
  useGetAccountBook
};
