export const LOCALSTORAGE_KEY = {
  TOKEN: 'token',
  IS_ADMIN: 'isadmin',
};

export const TOGGLE = {
  ACTIVE: 'active',
  NONACTIVE: 'nonactive',
};

export const REGEX = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
  NO_TELP: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
  // eslint-disable-next-line max-len
  URL: /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
  NUMBER: /^\d+$/,
};

export const API = {
  VERSION: 'v1.0',
  ADMIN: 'admin',
};

export const TICKET = {
  NEW_TICKET: 'New Ticket',
  PROGRESS_TICKET: 'Ticket In Progress',
  RESOLVED_TICKET: 'Ticket Resolved',
  DECLINE_TICKET: 'Ticket Decline',
};
