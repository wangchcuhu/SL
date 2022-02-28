import axios from '@/axios';
const BASE = '/api';
// 分页
export const fetchList = (currentPag = 1, pageSize = 10, data) => axios({
  method: 'POST',
  url: BASE + `/sysuser/page/${currentPag}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 新增
//
export const addUser = (data) => axios({
  method: 'POST',
  url: BASE + `/sysuser/addUser`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 验证用户
export const verifyAccount = (data) => axios({
  method: 'POST',
  url: BASE + `/sysuser/verifyAccount`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 编辑
export const editUser = (data) => axios({
  method: 'PUT',
  url: BASE + `/sysuser/updateUser`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 角色分页
export const roleList = (rolePage, data) => axios({
  method: 'POST',
  url: BASE + `/sysrole/page/${rolePage.currentPage}/${rolePage.pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 角色id 查询
//
export const getUserInfo = (id) => axios({
  method: 'GET',
  url: BASE + `/sysuser/selectById/${id}`,
  headers: {
    'Content-Type': 'application/json'
  }

});
// 删除用户
export const delUSer = (data) => axios({
  method: 'DELETE',
  url: BASE + `/sysuser/deleteUser`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)

});
// 禁用/启用用户
export const changeUSerState = (data, type) => axios({
  method: 'PUT',
  url: BASE + `/sysuser/updateUserstates/${type}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)

});

// 修改密码
export const changePwds = (data) => axios({
  method: 'POST',
  url: BASE + `/sysuser/updatePwd`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
// 刷新refreshToken
export const refreshToken = (refreshToken) => axios({
  method: 'GET',
  url: BASE + `/login/auth/token/refresh`,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {refreshToken}
})

//重置密码
export const resetPassword = (data) => axios({
  method: 'POST',
  url: BASE + `/sysuser/resetPassword`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})


