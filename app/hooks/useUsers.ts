"use client";

import { useState } from "react";
import { fetcher } from "../utils/fetcher";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listUsers, setListUsers] = useState<any>([]);

  const getListAllUsers = async (params?: any) => {
    setIsLoading(true);
    try {
      const request = {
        method: "get",
        params: params,
      };
      const res = await fetcher("users", request);

      if (res) {
        const data = res?.data.result;
        setListUsers(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getListAllUsers, listUsers, isLoading };
};
