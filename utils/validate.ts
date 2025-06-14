export default {
  required: (value: any, name: string) => {    
    return !!value || `${name} không được để trống.`
  },
  requiredRadioRule: (value: any, name: string) => {
    return value !== null || `Vui lòng lựa chọn ${name}.`
  },
  minLengthRule: (value: any, name: string, min: number) => {
    return value?.length >= min || `${name} phải có ít nhất ${min} kí tự.`
  },
  maxLengthRule: (value: any, name: string, max: number) => {
    if (!value) return true
    return value.length <= max || `${name} có nhiều nhất ${max} kí tự.`
  },
  lengthRule: (value: any, name: string, length: number) => {
    return value?.length === length || 'ValidateLength'
  },
  emailRule: (value: any, name: string) => {
    if (!value) return true
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || `${name} không hợp lệ.`
  },
  dateRule: (value: any, name: string) => {
    return (
      /^([12]\d{3})[-](((0[13456789]|1[0-2])[-](0[1-9]|[12][0-9]|3[01]))|02[-](0[1-9]|[12][0-9]))$/.test(
        value
      ) || `${name} không hợp lệ.`
    )
  },
  phoneNumberRule: (value: any, name: string) => {
    if (!value) return true
    return /^[+0-9][./0-9]{8,19}$/.test(value) || `${name} không hợp lệ.`
  },
  checkPassword: (value: any, newVal: any, name: string) => {
    return value === newVal || 'OtherPassWord'
  }
}
