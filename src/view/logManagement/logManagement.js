import axios from '@/axios.js';
const BASE = '/api';
// 查询日志信息
export const getTable = (currentPage, pageSize, data) => axios({
  method: 'POST',
  url: BASE + `/sysRecord/page/${currentPage}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})

// 初始化
export const initList = (currentPage, pageSize, data) => axios({
  method: 'POST',
  url: BASE + `/record/${currentPage}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(data)
})

// 导出
export const exportData = (type, exportData) => axios({
  method: 'POST',
  url: BASE + `/record/deriveExcelOrPdf/${type}`,

  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(exportData)
})

export const queryDetail = (recordId) => axios({
  method: 'GET',
  url: BASE + `/record/${recordId}`,
  headers: {
    'Content-Type': 'application/json'
  }

})
// 登录日志
export const loginApproval = (addObj) => axios({
  method: 'POST',
  url: BASE + `/systemLoginRecord`,
  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(addObj)
})
// 初始化
export const getColumn = (moduleCode) => axios({
  method: 'GET',
  url: BASE + `/syscfg/cfg/${moduleCode}`,
  headers: {
    'Content-Type': 'application/json'
  }

})
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

