export const ALL_MODULES = {
  DASHBOARD: "/dashboard",
  NOTIFICATIONS: "/notifications",
  USERS: "/users",
  INVENTARIS: "/invetaris",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  POST: "/post",
  AUTH: "/auth",
  MANAGE: "/manage",
  ASSISTANCE: "/assistance",
  PROFILE: "/profile",
};

export const ROUTES_PROFILE = {
  HI_FELLA: `${ROUTES.PROFILE}/hi-fella`,
  MY_PROFILE: `${ROUTES.PROFILE}/my-profile`,
  SIGN_OUT: `${ROUTES.PROFILE}/sign-out`,
};

export const ROUTES_AUTH = {
  RESET_PASSWORD: `${ROUTES.AUTH}/reset-password`,
};
// routes untuk sidebar menu manage
//routes menu sidebar manage/*
export const ROUTES_MANAGE = {
  USERS: `${ROUTES.MANAGE}/users`,
  POTENTIAL_USERS: `${ROUTES.MANAGE}/potential-users`,
  COMPANY_PAGES: `${ROUTES.MANAGE}/company`,
  PAYMENTS: `${ROUTES.MANAGE}/payment`,
  EXPORT_IMPORT: `${ROUTES.MANAGE}/export-import`,
  PACKAGE_PREMIUM: `${ROUTES.MANAGE}/package-premium`,
  DIGITAL_MARKETING: `${ROUTES.MANAGE}/digital-marketing`,
  MARKETING: `${ROUTES.MANAGE}/marketing-intelligence`,
  MASTER_DATA: `${ROUTES.MANAGE}/master-data`,
  TRIBE: `${ROUTES.MANAGE}/tribe`,
  WARNING_ISSUES: `${ROUTES.MANAGE}/warning-issues`,
};

//routes detail user manage/users/*
export const ROUTES_DETAIL_USERS = {
  PROFILE: `${ROUTES_MANAGE.USERS}/profile`,
  PREMIUM_PAYMENT_HISTORY: `${ROUTES_MANAGE.USERS}/premium-payment-history`,
  ACTIVITY_LOG: `${ROUTES_MANAGE.USERS}/activity-log`,
  WARNING_HISTORY: `${ROUTES_MANAGE.USERS}/warning-history`,
  MARKETING_INTELLIGENCE: `${ROUTES_MANAGE.USERS}/marketing-intelligence`,
};

export const ROUTES_DETAIL_COMPANY = {
  PROFILE: `${ROUTES_MANAGE.COMPANY_PAGES}/profile`,
  POST_LIST: `${ROUTES_MANAGE.COMPANY_PAGES}/post-list`,
  EMPLOYEES: `${ROUTES_MANAGE.COMPANY_PAGES}/employees`,
  PRODUCT_LIST: `${ROUTES_MANAGE.COMPANY_PAGES}/product-list`,
  ACTIVITY_LOG: `${ROUTES_MANAGE.COMPANY_PAGES}/activity-log`,
  WARNING_HISTORY: `${ROUTES_MANAGE.COMPANY_PAGES}/warning-history`,
};

export const ROUTES_MASTER_DATA = {
  MANAGE_LOCATIONS: `${ROUTES_MANAGE.MASTER_DATA}/manage-locations`,
  GENERAL_SETTINGS: `${ROUTES_MANAGE.MASTER_DATA}/general-settings`,
  PRICING: `${ROUTES_MANAGE.MASTER_DATA}/pricing`,
  ITEM_UNITS: `${ROUTES_MANAGE.MASTER_DATA}/item-units`,
  PRIVACY_POLICY: `${ROUTES_MANAGE.MASTER_DATA}/privacy-policy`,
  TERMS_OF_SERVICE: `${ROUTES_MANAGE.MASTER_DATA}/terms-of-service`,
  X_RULES: `${ROUTES_MANAGE.MASTER_DATA}/x-rules`,
  ADMIN_PERMISSION: `${ROUTES_MANAGE.MASTER_DATA}/admin-permission`,
  NOTIFICATION_CATEGORY: `${ROUTES_MANAGE.MASTER_DATA}/notification-category`,
  EVENT: `${ROUTES_MANAGE.MASTER_DATA}/event`,
  EVENT_ONLINE_EXHIBITION: `${ROUTES_MANAGE.MASTER_DATA}/event-online-exhibition`,
  DATABASE: `${ROUTES_MANAGE.MASTER_DATA}/database`,
  DIGITAL_MARKETING_PACKAGE: `${ROUTES_MANAGE.MASTER_DATA}/digital-marketing-package`,
  PREMIUM_PACKAGE: `${ROUTES_MANAGE.MASTER_DATA}/premium-package`,
  EXPORT_IMPORT_REGULATORY: `${ROUTES_MANAGE.MASTER_DATA}/export-import-regulatory`,
};

export const ROUTES_DETAIL_HI_FELLA = {
  ALL_EMPLOYEE: `${ROUTES_PROFILE.HI_FELLA}/all-employee`,
  ALL_INVITATION: `${ROUTES_PROFILE.HI_FELLA}/all-invitation`,
};

export const ROUTES_DETAIL_WARNING_ISSUES = {
  COMMENT: `${ROUTES_MANAGE.WARNING_ISSUES}/comment`,
  POST: `${ROUTES_MANAGE.WARNING_ISSUES}/post`,
};

//routes untuk sidebar menu assitance
export const ROUTES_ASSISTANCE = {
  HELP_CENTRE: `${ROUTES.ASSISTANCE}/help-centre`,
  MESSAGES: `${ROUTES.ASSISTANCE}/messages`,
};

export const ROUTES_DETAIL_HELP_CENTRE = {
  REPORTED_USER: `${ROUTES_ASSISTANCE.HELP_CENTRE}/reported-user-account`,
  REPORTED_COMPANY: `${ROUTES_ASSISTANCE.HELP_CENTRE}/reported-company-pages`,
  REPORTED_POSTS: `${ROUTES_ASSISTANCE.HELP_CENTRE}/reported-posts`,
  REPORTED_COMMENTS: `${ROUTES_ASSISTANCE.HELP_CENTRE}/reported-comments`,
  REPORTED_TEAMS: `${ROUTES_ASSISTANCE.HELP_CENTRE}/reported-team`,
  COMPANY_VERIFICATION: `${ROUTES_ASSISTANCE.HELP_CENTRE}/company-page-verification`,
  ENROLL_EXHIBITION: `${ROUTES_ASSISTANCE.HELP_CENTRE}/enroll-exhibition-verification`,
  SESSION_REQUEST: `${ROUTES_ASSISTANCE.HELP_CENTRE}/session-request-verification`,
  PREMUIM_ISSUE: `${ROUTES_ASSISTANCE.HELP_CENTRE}/premium-issues`,
  CLOSE_ACCOUNT: `${ROUTES_ASSISTANCE.HELP_CENTRE}/close-account`,
  PAYMENT_CANCEL_AND_REFUND: `${ROUTES_ASSISTANCE.HELP_CENTRE}/payment-cancel-and-refund`,
  OTHER_FEEDBACK: `${ROUTES_ASSISTANCE.HELP_CENTRE}/other-feedback`,
};
