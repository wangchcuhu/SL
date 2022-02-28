import axios from '@/axios';
const BASE = '/api';
// 修改用户基础数据
export const edituserBaseInfo = (data = {}) => axios({
  method: 'POST',
  url: BASE + `sysuser/updateUserConfig`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 查询用户基础数据
export const getuserBaseInfo = () => axios({
  method: 'GET',
  url: BASE + `/sysuser/getUserConfig`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 验证用户
export const verifyAccount = (data) => axios({
  method: 'GET',
  url: BASE + `/systemAuthority/valid/user/auth`,
  headers: {
    'Content-Type': 'application/json'
  },
  params: data
});


