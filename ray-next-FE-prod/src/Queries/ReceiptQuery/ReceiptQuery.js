import { useMutation, useQueryClient } from "react-query";

import {
    addReceipt,
  } from "./receiptUrl";

const useAddReceipt  = () => {
    return useMutation((receiptData) => addReceipt(receiptData), {
      onSuccess: (data) => {
        return data;
      },
      onError: (data) => {
        return data;
      },
    });
  };

  export {
    useAddReceipt,
  };