import { useState } from "react";
import { fetcher } from "../utils/fetcher";
import { getToken, setToken } from "../utils/storage";
import toastMessage from "../components/toast";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    try {
      const request = {
        method: "post",
        data,
      };
      const res = await fetcher(`/auth/login`, request);

      if (res) {
        const data = res?.data?.result;

        console.log(data);
        const access_token = data?.token?.accessToken,
          refresh_token = data?.token?.refreshToken;

        setToken("access_token", access_token);
        setToken("refresh_token", refresh_token);

        toastMessage(res?.data?.message, "success");

        if (res.status === 200 && getToken("access_token"))
          router.replace("/users");
        else {
          router.push("reset-password");
        }
      }
    } catch (error: any) {
      toastMessage(JSON.parse(error?.data).message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
  };
};
