import axios from '@/axios';
const BASE = '/api';
// 分页
export const fetchList = (currentPag = 1, pageSize = 10, data) => axios({
  method: 'POST',
  url: BASE + `/sysrole/page/${currentPag}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 新增角色
export const addRole = (data) => axios({
  method: 'POST',
  url: BASE + `/sysrole/addRole`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});

// 查询所有的角色授权
export const queryPowerById = () => axios({
  method: 'GET',
  url: BASE + `/systemAuthority/queryAll/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 查询所有的角色授权的id
export const getIds = (id) => axios({
  method: 'GET',
  url: BASE + `/sysrole/selectAllById/${id}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 编辑
export const editRole = (data) => axios({
  method: 'PUT',
  url: BASE + `/sysrole/updateRole`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});

// 删除角色
export const delRole = (data) => axios({
  method: 'Delete',
  url: BASE + `/sysrole/deleteRole`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});

// 获取二级的按钮数据
export const getButton = (data) => axios({
  method: 'POST',
  url: BASE + `/systemAuthority/queryByParentId`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});

// 新增日志
export const loginApproval = (addObj, result) => axios({
  method: 'POST',
  url: BASE + `/systemLoginRecord`,
  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(addObj, result)
})

// 验证用户权限
// 验证用户
export const verifyAccount = (data) => axios({
  method: 'GET',
  url: BASE + `/systemAuthority/valid/user/auth`,
  headers: {
    'Content-Type': 'application/json'
  },
  params: data
});








