export enum ResponseCode {
  Success = 0,
  SystemError = 1,
  NotFound = 2,
  Invalid = 3,
  UnAuthorized = 4,
}

export enum UploadImage {
  Avatar = "Avatar",
}

export enum DATA_TYPE {
  DATE = "DATE",
  DATE_TIME = "DATE_TIME",
  NUMBER = "NUMBER",
}

export enum ACC_TYPE {
  SYS_ADMIN = 1,
  ADMIN = 2,
  USER = 3,
}

export enum COOKIE_KEY {
  ACCESS_TOKEN = "auth.access_token",
  REFRESH_TOKEN = "auth.refresh_token",
  AUTH_INFO = "auth.info",
}

export enum IMPORT_TYPE {
  WITHOUT_DATA = 1,
  WITH_DATA = 2,
}

export enum MESSAGE {
  LOGOUT_CONFIRM_TITLE = "Đăng xuất",
  LOGOUT_CONFIRM_MESSAGE = "Kết thúc phiên đăng nhập. Vui lòng xác nhận .",

  DELETE_CONFIRM = "Xóa thông tin hồ sơ cư dân. cái này tốt không. ",
  UPLOAD_CONFIRM = "Bạn có chắc muốn cập nhật không? ",

  E_NO_FILE_UPLOAD = "Hãy chọn file mẫu.",
  E_API_RESPONSE = "Đã xảy ra lỗi. Vui lòng thử lại sau. ",
}

export enum SCREEN_CODE {
  COMMON = "Common",
  BL001 = "BL001",
}

export enum POPUP_TYPE {
  VIEW = "VIEW",
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export enum ROLE_NAME {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_HR = "ROLE_HR",
  ROLE_LEAD = "ROLE_LEAD",
  ROLE_MANAGER = "ROLE_MANAGER",
  ROLE_USER = "ROLE_USER",
}

export const ERROR_TEXT = "error";
export const LIMITED_TIME = 3600000; //  1 * 60 * 60 * 1000
export const DEFAULT_SAVE = "0";
export const DEFAULT_SEND = "1";

export const colorsRating = ["#99A9BF", "#F7BA2A", "#FF9900"];

export const ORDER_STATUS = {
  PROCESSING: 13,
  CONFIRMED: 14,
  SHIPPING: 15,
  DELIVERED: 16,
  CANCELLED: 17,
  RETURNED: 18,
};

export const PAYMENT_METHODS = {
  COD: 19,
  CREDIT_CARD: 20,
  BANK_TRANSFER: 21,
  E_WALLET: 22,
  PAYPAL: 23,
};

export const PRODUCT_POST_STATUS = {
  PENDING_APPROVAL: 2,
  APPROVED: 3,
  REJECTED: 4,
  SOLD: 5,
  REMOVED: 6,
  ARCHIVED: 7,
};

export const PRODUCT_INTRO_STATUS = {
  PENDING_APPROVAL: 9,
  APPROVED: 10,
  REJECTED: 11,
  PUBLISHED: 12,
};

export enum MASTER_CODE {
  PRODUCT_STATUS = "PRODUCT_STATUS",
  POST_STATUS = "POST_STATUS",
  ORDER_STATUS = "ORDER_STATUS",
  PAYMENT_METHOD = "PAYMENT_METHOD",
  REPORT_STATUS = "REPORT_STATUS",
  VIOLATION_TYPE = "VIOLATION_TYPE",
}
export const CURRENT_POSITION_DEFAULT = {
  name: "Hà Nội",
  code_name: "ha-noi",
};

export const FEATURED_PROVINCED = [
  CURRENT_POSITION_DEFAULT,
  { name: "Bà Rịa - Vũng Tàu", code_name: "ba-ria-vung-tau" },
  { name: "Hồ Chí Minh", code_name: "ho-chi-minh" },
  { name: "Khánh Hòa", code_name: "khanh-hoa" },
  { name: "Bình Định", code_name: "binh-dinh" },
  { name: "Quảng Nam", code_name: "quang-nam" },
  { name: "Đà Nẵng", code_name: "da-nang" },
  { name: "Huế", code_name: "hue" },
  { name: "Ninh Bình", code_name: "ninh-binh" },
  { name: "Hải Phòng", code_name: "hai-phong" },
  { name: "Cần Thơ", code_name: "can-tho" },
  { name: "Lào Cai", code_name: "lao-cai" },
];
