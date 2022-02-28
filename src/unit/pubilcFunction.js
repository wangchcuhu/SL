
export function clearObject (obj) {
  console.log(typeof obj);
  // 清空对象里的值
  switch (typeof obj) {
    case 'object':
      for (let item in obj) {
        console.log(item);
        // obj[item] = undefined
      };
  }
}
