import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { deleteToken, getToken, setToken } from "./storage";
import toastMessage from "../components/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
type CustomAxiosRequestConfig = AxiosRequestConfig & {
  headers?: any;
  _retry?: boolean;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 120000,
  withCredentials: false,
  transformResponse: [(data: any) => data],
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const refreshToken = async (): Promise<string | null> => {
  const refresh_token = getToken("refresh_token");

  if (!refresh_token) {
    return null;
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.result;

    setToken("access_token", accessToken);
    setToken("refresh_token", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

const axiosInterceptor = () => {
  axiosInstance.interceptors.request.use(
    (config: any) => {
      if (!config.headers?.Authorization) {
        const token = getToken("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      config.headers = {
        "Content-Type": "application/json",
        ...config.headers,
      };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      const token = getToken("access_token");

      if (!error.response) {
        toastMessage(
          `Network Error: Please check your internet connection`,
          "error"
        );
        return Promise.reject(error);
      }

      if (!token && error.response.status === 401) {
        deleteToken("access_token");
        deleteToken("refresh_token");
        toastMessage("You have been logged out.", "success");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              }
              return Promise.reject(error);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshToken();

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return axiosInstance(originalRequest);
          } else {
            processQueue(error, null);
            deleteToken("access_token");
            deleteToken("refresh_token");
            toastMessage("Session expired. Please login again.", "error");
            window.location.href = "/auth/login";
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          deleteToken("access_token");
          deleteToken("refresh_token");
          toastMessage("Session expired. Please login again.", "error");
          window.location.href = "/auth/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response.status === 401 && originalRequest._retry) {
        toastMessage(
          `Request Failed: make sure you have permission to access`,
          "error"
        );
      } else if (error.response.status === 503) {
        window.location.href = "/maintenance";
      }

      return Promise.reject(error);
    }
  );
};

export const fetcher = async (url: string, config?: any) => {
  const requestConfig: any = {
    ...config,
    url,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  };

  try {
    axiosInterceptor();
    const res: AxiosResponse<any> = await axiosInstance.request(requestConfig);
    return { ...res, data: JSON.parse(res.data) };
  } catch (error: any) {
    throw error?.response || error;
  }
};
