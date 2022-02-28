// 系统编码
import axios from '@/axios';
const BASE = '/api';
// 新增任务信息
export const editPassword = (data) => axios({
  method: 'POST',
  url: BASE + `/login/addPwdRecord`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
// 修改锁屏时间
export const lockScreen = (data) => axios({
  method: 'POST',
  url: BASE + `/login/update/lockTime`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
