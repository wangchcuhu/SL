<template>
  <div class="contents">
    <div class="CRUD">
      <!-- 查询 -->
      <div class="crudHeader">
        <el-form ref="queryForm"
                 :model="queryFormData"
                 label-width="200px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="日志模块 / OperateModule">
                <el-input v-model="queryFormData.operateModule"
                          style="width:200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="日志类型 / OperateType">
                <el-select v-model="queryFormData.operateType"
                           placeholder="请选择日志类型"
                           clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in operateTypeOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.value"
                             :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="操作者 / OperateUser">
                <el-input v-model="queryFormData.operateUser"
                          style="width:200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作时间 / operateTime">
                <el-date-picker v-model="queryFormData.operateTimeArr"
                                type="datetimerange"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :range-separator="$t('logManagement.to')"
                                :start-placeholder="$t('logManagement.startTime')"
                                :end-placeholder="$t('logManagement.endTime')">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-button type="primary"
                         @click="queryLog()">搜索 / Search</el-button>
              <el-button type="primary"
                         style="margin-left: 30px"
                         @click="exportVisible = true">导出 / Exports</el-button>
                           <!-- 导出审计追踪 -->
                          <!-- <el-button type="primary"
                         style="margin-left: 30px"
                         @click="exportVisible = true">导出审计追踪</el-button> -->
                         <!-- 创建审计追踪备份 -->
                          <!-- <el-button type="primary"
                         style="margin-left: 30px"
                         @click="exportVisible = true">创建审计追踪备份</el-button> -->
                         <!-- 打印审计追踪 -->
                          <!-- <el-button type="primary"
                         style="margin-left: 30px"
                         @click="exportVisible = true">打印审计追踪</el-button> -->
            </el-col>

          </el-row>
        </el-form>
      </div>
    </div>
    <el-table id="table-content"
              :data="tableData"
              style="width: 100%"
              border>
               <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column type="index"
                       width="70"
                       :label="$t('Public.index')"
                       align="center">
      </el-table-column>
      <!-- 表格栏呈现信息 -->
      <el-table-column v-for="(item, index) in checkeds"
                       :key="`col_${index}`"
                       :prop="item.value"
                       :label="item.label"
                       align="center">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page.currentPage"
                     :page-sizes="[10, 20, 30, 40,50,100]"
                     :page-size="page.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="page.total"></el-pagination>
    </div>
    <!-- 导出 -->
    <el-dialog :title="$t('Public.export')"
               :visible.sync="exportVisible"
               width="30%">
      <el-form ref="elForm"
               size="medium"
               label-width="120px"
               label-position="right">
        <el-col :span="24">
          <el-form-item :label="$t('logManagement.reportFormate')"
                        prop="modifyReason">
            <el-radio-group v-model="exportFormat"
                            size="medium"
                            style="padding-left:30px">
              <el-radio v-model="exportFormat"
                        :label="0">Excel</el-radio>
              <el-radio v-model="exportFormat"
                        :label="1">PDF</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="exportVisible = false">{{$t('Public.cancel')}}</el-button>
        <el-button type="primary"
                   @click="exportSave">{{$t('Public.submit')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 转成Excel所需依赖
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
// 转成PDF所需依赖
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

import { getTable } from './logManagement.js'

export default {
  name: 'logMangement',
  data () {
    return {
      queryFormData: {
        operateModule: '',
        operateType: '',
        operateUser: '',
        operateTimeArr: ''
      },
      //   { value: 'operateModule', label: '日志模块 /OperateModule' },
      // { value: 'operateType', label: '日志类型 /operateType' },
      // { value: 'afterData', label: '修改前数据 /afterData' },
      // { value: 'afterData', label: '修改后数据 /afterData' },
      // { value: 'modifyReason', label: '修改原因 /modifyReason' },
      // { value: 'operateUser', label: '操作者 /operateUser' }
      checkeds: [
        { value: 'operateModule', label: '日志模块 / OperateModule' },
        { value: 'operateType', label: '日志类型 / OperateType' },
        { value: 'beforeData', label: '修改前数据 / beforeData' },
        { value: 'afterData', label: '修改后数据 / AfterData' },
        { value: 'modifyReason', label: '修改原因 / ModifyReason' },
        { value: 'operateUser', label: '操作者 / OperateUser' }
      ],
      tableData: [],
      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: undefined
      },
      exportVisible: false, // 导出窗口
      exportFormat: 0, // 导出格式
      // 下拉选项 固定
      operateTypeOptions: [
        {
          label: this.$t('Public.add'),
          value: 0
        },
        {
          label: this.$t('Public.modify'),
          value: 1
        },
        {
          label: this.$t('Public.delete'),
          value: 2
        },
        {
          label: this.$t('Public.print'),
          value: 3
        },
        {
          label: '审核',
          value: 4
        },
        {
          label: '登录',
          value: 5
        }

      ]
    }
  },
  created () {
    this.initList();
  },
  mounted () {

  },
  methods: {
    initList () {
      // 获取初始化数据
      this.getData();
    },
    // 更改分页条数
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getData(this.page.currentPage, val, {})
    },
    // 跳转分页
    handleCurrentChange (val) {
      console.log(val);
      this.page.currentPage = val
      // 分页查询的第二页的功能后端没有做
      this.getData(val, this.page.pageSize, {})
    },
    // 获取初始数据
    getData (currentPage = 1, pageSize = 10, queryData = {}) {
      const data = getTable(currentPage, pageSize, queryData)
      Promise.all([data]).then((dataArr) => {
        // 不使用async和await的语法糖
        const data = dataArr[0].data
        if (data.code == 20000) {
          // this.$message.success(data.message)
          this.tableData = data.data.results
          // 日志模型信息的数据的转化，显示对应的字符串
          for (var i = 0; i < this.tableData.length; i++) {
            const operateTypeText = this.tableData[i];
            if (operateTypeText.operateType == 0) {
              operateTypeText.operateType = this.$t('Public.add');
            } else if (operateTypeText.operateType == 1) {
              operateTypeText.operateType = this.$t('Public.modify');
            } else if (operateTypeText.operateType == 2) {
              operateTypeText.operateType = this.$t('Public.delete');
            } else if (operateTypeText.operateType == 3) {
              operateTypeText.operateType = this.$t('Public.print');
            } else if (operateTypeText.operateType == 4) {
              operateTypeText.operateType = '审核';
            } else if (operateTypeText.operateType == 5) {
              operateTypeText.operateType = '登录';
            }
          }


          this.page.total = data.data.total
          this.page.currentPage = currentPage
          this.page.pageSize = pageSize
        } else {
          this.$message.error(data.message)
        }
      })
        .catch((err) => { console.log(err); console.log('后端服务断开'); })
    },
    // 查询日志
    queryLog (currentPage = 1, pageSize = 10, queryData = this.queryFormData) {
    // 这里比较恶心的是后端一定要将operateTime一个字段去掉
      var data
      if (this.queryFormData.operateTimeArr[0]) {
        const startTime = this.queryFormData.operateTimeArr[0]
        const endTime = this.queryFormData.operateTimeArr[0]
        data = getTable(currentPage, pageSize, {...queryData, startTime, endTime})
      } else {
        data = getTable(currentPage, pageSize, queryData)
      }


      Promise.all([data]).then((dataArr) => {
        const data = dataArr[0].data
        if (data.code == 20000) {
          // this.$message.success(data.message)
          this.tableData = data.data.results
          // 日志模型信息的数据的转化，显示对应的字符串
          for (var i = 0; i < this.tableData.length; i++) {
            const operateTypeText = this.tableData[i];
            if (operateTypeText.operateType == 0) {
              operateTypeText.operateType = this.$t('Public.add');
            } else if (operateTypeText.operateType == 1) {
              operateTypeText.operateType = this.$t('Public.modify');
            } else if (operateTypeText.operateType == 2) {
              operateTypeText.operateType = this.$t('Public.delete');
            } else {
              operateTypeText.operateType = this.$t('Public.print');
            }
          }


          this.page.total = data.data.total
          this.page.currentPage = currentPage
          this.page.pageSize = pageSize
        } else {
          this.$message.error(data.message)
        }
      })
        .catch((err) => { console.log(err); console.log('后端服务断开'); })
    },
    // 提交导出格式
    exportSave () {
      if (this.exportFormat == 0) {
        this.exportExcel();
      } else {
        let ele = document.getElementById('table-content');
        this.exportPDF(ele);
      }
    },
    // 导出Excel格式
    exportExcel () {
      let et = XLSX.utils.table_to_book(document.getElementById('table-content'));
      let etout = XLSX.write(et, {
        bookType: 'xlsx', bookSST: true, type: 'array'
      });
      try {
        FileSaver.saveAs(new Blob([etout], {
          type: 'application/octet-stream'
        }), '日志管理.xlsx');
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    exportPDF (ele, logRecord) {
      let eleW = ele.offsetWidth;// 获得该容器的宽
      let eleH = ele.offsetHeight;// 获得该容器的高
      let eleOffsetTop = ele.offsetTop; // 获得该容器到文档顶部的距离
      let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离

      var canvas = document.createElement('canvas');
      var abs = 0;

      let winIn = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
      let winOut = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

      if (winOut > winIn) {
        // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
        abs = (winOut - winIn) / 2; // 获得滚动条宽度的一半
        // console.log(a, '新abs');
      }
      canvas.width = eleW * 2; // 将画布宽&&高放大两倍
      canvas.height = eleH * 2;

      var context = canvas.getContext('2d');
      context.scale(2, 2);
      context.translate(-eleOffsetLeft - abs, -eleOffsetTop);
      // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
      // translate的时候，要把这个差值去掉

      // html2canvas(element).then( (canvas)=>{ //报错
      // html2canvas(element[0]).then( (canvas)=>{
      html2canvas(ele, {
        dpi: 300,
        // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
        useCORS: true // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
      }).then((canvas) => {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        // 未生成pdf的html页面高度
        var leftHeight = contentHeight;
        // 页面偏移
        var position = 0;
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 595.28 / contentWidth * contentHeight;
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        var pdf = new JsPDF('', 'pt', 'a4');
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
          // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
        } else { // 分页
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        // 可动态生成
        pdf.save('日志文件.pdf');
      })
    }
  }
}
</script>
<style lang="scss" scoped >
.contents {
  background-color: white;
}
.CRUD {
  background-color: white;
  padding: 15px 0px;
}
.block {
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
}
</style>
