import axios from '@/axios';
const BASE = '/api';
// 分页
// export const fetchList = (data = {}) => axios({
//   method: 'POST',
//   url: BASE + `/pathManage/queryAllByLimit/1/10`,
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   data: JSON.stringify(data)
// });
// 编辑
export const editPath = (data) => axios({
  method: 'POST',
  url: BASE + `/pathManage/update`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 查询
// /pathManage/query
export const fetchList = () => axios({
  method: 'GET',
  url: BASE + `/pathManage/query`,
  headers: {
    'Content-Type': 'application/json'
  }
  // data: JSON.stringify(data)
});

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
export const verify = (data) => axios({
  method: 'POST',
  url: BASE + `/pathManage/checkPath`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
