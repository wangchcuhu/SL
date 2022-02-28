// 系统编码
import axios from '@/axios';
const BASE = '/api';
// 新增任务信息
export const addTask = (data) => axios({
  method: 'PUT',
  url: BASE + `/taskInfo`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
// 编辑任务信息
export const editTask = (data) => axios({
  method: 'POST',
  url: BASE + `/taskInfo`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
})
;
// 查询任务信息
export const getTable = (currentPage, pageSize, data) => axios({
  method: 'POST',
  url: BASE + `/taskInfo/queryTaskInfo/${currentPage}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});


// 删除任务信息
export const detelTable = (data) => axios({
  method: 'DELETE',
  url: BASE + `/taskInfo`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});

// 验证稳健状态
export const verifyTaskInfo = (data) => axios({
  method: 'POST',
  url: BASE + `/openTask/verifyTaskInfo`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});

// 作废
export const Rework = (data) => axios({
  method: 'POST',
  url: BASE + `/taskInfo/rework`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});


// 测试lim
export const testLims = (data) => axios({
  method: 'POST',
  url: BASE + `/openTask/verifyTaskInfo2`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});

// 新增日志
export const loginApproval = (addObj, result) => axios({
  method: 'POST',
  url: BASE + `/systemLoginRecord`,
  headers: {
    'Content-Type': 'application/json'
  },
  // params:  currentPage,pageSize ,
  data: JSON.stringify(addObj, result)
})

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

// 报道
export const report = (data) => axios({
  method: 'GET',
  url: BASE + `/systemAuthority/valid/user/auth`,
  headers: {
    'Content-Type': 'application/json'
  },
  params: data
});

// 报道
export const testBtn = (data) => axios({
  method: 'POST',
  url: BASE + `/record/testBtn`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify(data)
});
// 报道
export const getpicture = () => axios({
  method: 'GET',
  url: BASE + `/pathManage/findPicture`,
  headers: {
    'Content-Type': 'application/json'
  }
});




