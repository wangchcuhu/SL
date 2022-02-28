// 系统编码
import axios from '@/axios';
const BASE = '/api';
// 验证账号名密码
export const verifyAccount = (data) => axios({
  method: 'POST',
  url: BASE + `/login/auth/get`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
;
// 验证用户的按钮和显隐的权限
export const storeAuthority = (data) => axios({
  method: 'GET',
  url: BASE + `/systemAuthority/queryBtnByUserId/${data}`,
  headers: {
    'Content-Type': 'application/json'
  }
})
;

// 查询用户基础数据
export const getuserBaseInfo = () => axios({
  method: 'GET',
  url: BASE + `/sysuser/getUserConfig`,
  headers: {
    'Content-Type': 'application/json'
  }
});


