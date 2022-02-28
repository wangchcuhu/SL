// 系统编码
import axios from '@/axios';
const BASE = '/api';
// 报道
export const testBtn = (data) => axios({
  method: 'POST',
  url: BASE + `/record/testBtn`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
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
// 测试RFID
export const testRef = (data) => axios({
  method: 'POST',
  url: BASE + `/openTask/testRef`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
