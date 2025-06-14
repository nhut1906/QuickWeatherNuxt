export const FUNC_NAME = "provinces";

// ========================== PATH API =============================
export const API = {
  LOCATIONS: `/${FUNC_NAME}/locations`,
  PROVINCES: `/${FUNC_NAME}`,
  DISTRICTS_BY_PROVINCE_CODE: (province_code: string) =>
    `/${FUNC_NAME}/district-by-province-code/${province_code}`,
  WARDS_BY_DISTRICT_CODE: (district_code: string) =>
    `/${FUNC_NAME}/ward-by-district-code/${district_code}`,
  PROFILE_PROVINCE: (province_name: string) =>
    `/${FUNC_NAME}/profile-province/${province_name}`,
};