
import axios from '@/axios';
const BASE = '/api';
// 验证用户
export const verifyAccount = (data) => axios({
  method: 'GET',
  url: BASE + `/systemAuthority/valid/user/auth`,
  headers: {
    'Content-Type': 'application/json'
  },
  params: data
});
