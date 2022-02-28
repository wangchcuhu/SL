// 系统编码
import axios from '@/axios';
// const BASE = '/api';
// /systemAuthority/query/menu/{userId}
// 获取模块数据
export const getSystemAuthority = (userId) => axios({
  method: 'GET',
  url: `api/systemAuthority/query/menu/${userId}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: {}
})
;
