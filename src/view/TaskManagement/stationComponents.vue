<template>
    <div class="p3">
      <div style=" text-align: center;">
   <div >
      <img v-if="index==4" src="../../assets/station4.png" class="pgn">
<img v-if="index==5" src="../../assets/station5.png" class="pgn">
<img v-if="index==8" src="../../assets/station8.png" class="pgn">
      </div>
   <div class="p_t2">成功的数量 / Number of successes：890</div>
    <div class="p_t2">失败的数量 / Number of failures：1</div>
    </div>
    <div class="table" style="display:flex;     margin-bottom: 10px;
    border-right: 1px solid;border-top: 1px solid;border-bottom: 1px solid;border-left: 1px solid;">
<div    style="width:20%;" >
        <el-table cell-style="text-align: center;color:green;padding:0 !important"

      :data="data.successInfo"
       fit="false"
        :height='height'
      >
      <el-table-column
        prop="data"
        :label="index==4?'Successful TID':'Successful Kit ID'" class="success"
       >
      </el-table-column>
    </el-table>
    </div>

      <el-table  cell-style="text-align: center;color:red;font-size:8px;padding:0 !important"
      :data="data.failedInfo"
           :height='height'
     >
      <el-table-column
        prop="data" width="90"
       :label="index==4?'Failed TID':'Failed-'+' '+'Kit ID'"
       >
      </el-table-column>
         <el-table-column

        prop="reason"
        label="Reason Of Failure"
       >
      </el-table-column>
    </el-table>
    </div>
    </div>
</template>
<script>
export default {
  props: ['data', 'index', 'height'],
  data () {
    return {
    };
  },
  computed: {

  },
  created () {

  },
  mounted () {
  },
  watch: {

  },
  methods: {

  },
  components: {

  }
};
</script>

<style scoped lang="scss">
.table .el-table td, .el-table th {
  background: red !important;;
}
.contents{
  height: 100%;
  width: 100%;
  display: flex;

}
.left{
  width: 70%;
}
.right{
  width: 30%;
}
.p1{
  font-size: 40px;

}
.p3{
      font-size: 25px;
}
.p_t1{

    border: 1px solid black;
    background: #C0C0C0;
     color: red;
}
  .p_t2{
     font-size: 16px;
    line-height: 30px;
    color: #FF7F50;
   }


</style>
