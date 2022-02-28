<template>
<div>
  <button
    @click="m1"
    class="ee-button"
   :class='[size? "ee-button--"+ size:""]'
    size>11111111111</button>
  <el-button  type="small"
  ></el-button>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    m1 (event) {
      this.$emit(event)
      // this.$parent.k1();
      // this.$emit('kkk', 2222)
      // console.log(this);
      // this.$parent.k1(22222)
      // console.log(this.$emit);
      // this._events['kkk'][0](333)
    }
  }
}
</script>

<style>
.ee-button{
     /*同时具备块元素和行内元素的特性 */
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /*outline不占据空间，绘制于元素内容周围 */
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: 5.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.ee-button:hover{
  background: yellow;
}
.ee-button--medium{
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
}

.ee-button--small{
   font-size: 12px;
    border-radius: 3px;
    padding: 9px 15px;
}
</style>
