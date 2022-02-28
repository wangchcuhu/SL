import axios from '@/axios';
const BASE = '/api';


// 获得工位扩展属性的key清单
export const getstationKeyList = () => axios({
  method: 'get',
  url: BASE + `/builtin/select/attribute`,
  headers: {
    'Content-Type': 'application/json'
  }
  // data: JSON.stringify(data)
})
// 获得输入设备类型清单
export const getInputdeviceList = (style = 0) => axios({
  method: 'get',
  url: BASE + `/device/searchStyle/${style}`,
  headers: {
    'Content-Type': 'application/json'
  }
  // data: JSON.stringify(data)
})

