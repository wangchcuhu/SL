import axios from '@/axios.js';
const BASE = '/api';

// 初始化
export const initList = (currentPage, pageSize, data) => axios({
  method: 'POST',
  url: BASE + `/systemLoginRecord/${currentPage}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(data)
})

// 导出
export const exportData = (type, exportData) => axios({
  method: 'POST',
  url: BASE + `/systemLoginRecord/deriveExcelOrPdf/${type}`,

  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(exportData)
})
// 新增
export const loginApproval = (addObj, result) => axios({
  method: 'POST',
  url: BASE + `/systemLoginRecord`,
  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(addObj, result)
})


