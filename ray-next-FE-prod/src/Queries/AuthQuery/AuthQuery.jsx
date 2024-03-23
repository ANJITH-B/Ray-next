import { useMutation } from "react-query";
import { emailVerify, signin, signup, verifySecret } from "./authUrl";

const useSignupQuery = () => {
  return useMutation((userData) => signup(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useEmailVerifyQuery = () => {
  return useMutation((userData) => emailVerify(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useVerifySecret = () => {
  return useMutation((userData) => verifySecret(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};
const useLogin = () => {
  return useMutation((userData) => signin(userData), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};


export { useSignupQuery, useEmailVerifyQuery, useVerifySecret ,useLogin};
