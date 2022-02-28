// 修改锁屏时间
import axios from '@/axios';
const BASE = '/api';
export const signature = (data) => axios({
  method: 'GET',
  url: BASE + `/systemAuthority/valid/user/auth`,
  headers: {
    'Content-Type': 'application/json'
  },
  params: data
})
