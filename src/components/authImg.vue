
<template>
  <img ref="img" width="200px" height="200px"></img>
</template>
<script>
import { getpicture } from '@/view/TaskManagement/taskManagement.js';
export default {
  name: 'authImg',
  props: {
    authSrc: {
      type: String,
      required: false,
      default: ''
    }
  },
  async mounted () {
    Object.defineProperty(Image.prototype, 'authsrc', {
      writable: true,
      enumerable: true,
      configurable: true
    })
    let img = this.$refs.img
    const r = (await getpicture()).data
    console.log(window.URL);
    img.src = URL.createObjectURL(r);
    img.onload = () => {
      URL.revokeObjectURL(img.src);


    // let request = new XMLHttpRequest();
    // request.responseType = 'blob';
    // request.open('get', 'http://172.169.90.93:8080/api/pathManage/findPicture', true);
    // request.setRequestHeader('token', token);
    // request.onreadystatechange = e => {
    //   if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
    //     img.src = URL.createObjectURL(request.response);
    //     img.onload = () => {
    //       URL.revokeObjectURL(img.src);
    //     }
    //   }
    // };
    // request.send(null);
    }
  }
}
</script>
