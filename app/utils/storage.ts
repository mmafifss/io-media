import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";

export const setToken = (key: any, value: any) => {
  if (value) {
    setCookie(key, value, { maxAge: 86400 });
  } else {
    setCookie(key, JSON.stringify(value));
  }
};

export const hasToken = (key: any, value: any) => {
  hasCookie(key, value);
};

export const getToken = (key: any) => {
  const data: any = getCookie(key);
  return data;
};

export const deleteToken = (key: any) => deleteCookie(key);
