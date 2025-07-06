export const GET_LIST_USERS = '/user/list';
export const GET_USER_BY_ID = (id_user: string) => `/user/${id_user}`;
export const GET_LIST_POTENTIAL_USERS = '/user/potential';
export const GET_POTENTIAL_USER_BY_ID = (id_user: string) =>
  `/user/potential/${id_user}`;
export const GET_USER_ACTIVITIES = '/user/activity';
export const GET_USER_POSTS = (id_user: string) => `/user/posts/${id_user}`;
export const HANDLE_SEND_WARNING_USER = '/user/send-warning';

export const GET_LIST_ITEM_UNITS = '/master/list-unit';
export const GET_ITEM_UNIT_BY_ID = (id: string) => `/master/unit/${id}`;
export const ADD_UNIT = '/master/unit';
export const UPDATE_UNIT = (id: string) => `/master/unit/${id}`;
export const DELETE_UNIT = (id: string) => `/master/delete-unit/${id}`;

export const GET_LIST_ALL_SERVICE = '/master/list-all-service';
export const GET_SERVICE_BY_ID = (id: string) => `/master/service/${id}`;
export const ADD_SERVICE = '/master/service';
export const UPDATE_SERVICE = (id: string) => `/master/service/${id}`;
export const DELETE_SERVICE = (id: string) => `/master/delete-service/${id}`;

export const GET_LIST_COUNTRY = '/master/list-country';
export const GET_COUNTRY_BY_ID = (id: string) => `/master/country/${id}`;
export const ADD_COUNTRY = '/master/country';
export const UPDATE_COUNTRY = (id: string) => `/master/country/${id}`;
export const DELETE_COUNTRY = (id: string) => `/master/delete-country/${id}`;

export const GET_LIST_PROVINCE = (id?: string) => `/master/list-province/${id}`;
export const GET_PROVINCE_BY_ID = (id?: string) => `/master/province/${id}`;
export const ADD_PROVINCE = '/master/add-province';
export const UPDATE_PROVINCE = (id: string) => `/master/province/${id}`;
export const DELETE_PROVINCE = (id: string) => `/master/delete-province/${id}`;

export const GET_LIST_CITY = (id?: string) => `/master/list-city/${id}`;
export const GET_CITY_BY_ID = (id: string) => `/master/city/${id}`;
export const ADD_CITY = '/master/add-city';
export const DELETE_CITY = (id: string) => `/master/delete-city/${id}`;

export const GET_LIST_PERMISSION = `/master/show-list-permission`;
export const GET_PERMISSION_BY_ID = (id: string) => `/master/permission/${id}`;
export const ADD_PERMISSION = `/master/permission`;
export const DELETE_PERMISSION = (id: string) =>
  `/master/delete-permission/${id}`;
export const UPDATE_PERMISSION = (id: string) => `/master/permission/${id}`;

export const GET_LIST_INVITATION = '/employee/list-invitation';
