// 数据管理
import axios from '@/axios';
const BASE = '/api';
// 手动备份
export const backUpData = (data) => axios({
  method: 'POST',
  url: BASE + `/dataManagement/backUpData`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
// 数据库表恢复
export const databaseTableRecovery = (data) => axios({
  method: 'POST',
  url: BASE + `/dataManagement/databaseTableRecovery`,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: data
})
;

// 数据恢复
export const reductionOfData = (data) => axios({
  method: 'POST',
  url: BASE + `/dataManagement/reductionOfData`,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: data
})
;

// 恢复
export const timingBackUpBaseConfig = (data) => axios({
  method: 'POST',
  url: BASE + `/dataManagement/timingBackUpBaseConfig`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
;


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
// 查询自动备份时间
export const queryBackUpBaseConfig = () => axios({
  method: 'GET',
  url: BASE + `/dataManagement/queryBackUpBaseConfig`,
  headers: {
    'Content-Type': 'application/json'
  }
});
