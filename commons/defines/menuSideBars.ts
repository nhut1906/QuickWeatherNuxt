
export default [
  {
    title: 'Tài khoản',
    icon: 'UserFilled',
    permission: ['2', '3'],
    items: [
      {
        name: 'Thông tin tài khoản',
        pathName: 'account-profile', permission: ['2', '3'],
      },
      {
        name: 'Đổi mật khẩu',
        pathName: 'change-password', permission: ['2', '3'],
      },
    ],
  },
]
