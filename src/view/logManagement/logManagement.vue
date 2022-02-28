<template>
  <!-- 登录日志 -->
  <div class="contents">
    <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>
    <div class="CRUD">
      <div class="crudHeader">
        <div><el-button type="primary" icon="el-icon-edit"
                        @click.native="AuthorityData.electronicSignature.includes(5044)
                        ? CheckOpen(0):public(16,5042)"
                        v-if="AuthorityData.showHidden.includes(5044)"
        >打印审计追踪 / Print audit trail</el-button></div>
        <div class="operationBtn">
          <el-tooltip class="item" effect="dark" content="搜索 / Search" placement="top">
            <el-button icon="el-icon-search" circle @click.native="query" class="crudHeaderBtn"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出 / Export" placement="top">
            <el-button icon="el-icon-printer" circle @click.native="exports" class="crudHeaderBtn"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="显隐 / ShowHidden" placement="top">
            <el-button
              icon="el-icon-s-operation"
              circle
              @click.native="ShowHidden"
              class="crudHeaderBtn"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="刷新 / Filter" placement="top">
            <el-button
              icon="el-icon-refresh-left"
              circle
              @click.native="Filter"
              class="crudHeaderBtn"
            ></el-button>
          </el-tooltip>
        </div>
      </div>
      <!-- 数据表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%;cursor:pointer"
        @cell-click="openDetails"
        :key="tableKey"
        :header-cell-class-name="tableCellClassName"
      >
      <!-- 构建序号列 -->
      <el-table-column type="index"  style="float:left"></el-table-column>
        <template v-for="(item, index) in checkeds" >

          <el-table-column
            :key="`col_${index}`"
            :resizable="false"
            :show-overflow-tooltip="true"
            :prop="tableOptions[index].value"
            :label="tableOptions[index].label"
            v-if="['beforeData', 'afterData'].includes(tableOptions[index].value)"
          >
            <template slot-scope="scope">
              <span class="text-cotains">{{scope.row[tableOptions[index].value]}}</span>
            </template>
          </el-table-column>

          <el-table-column  v-else :key="`col_${index}`" :prop="tableOptions[index].value"
            :label="tableOptions[index].label"  >
            <template slot-scope="scope">
              <span v-if="tableOptions[index].value === 'operateType'" class="text-cotains" >{{toTransState(scope.row[tableOptions[index].value])}}</span>
              <span class="text-cotains" v-else>{{scope.row[tableOptions[index].value]}}</span>
            </template>
          </el-table-column>

        </template>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40,50,100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>

     <!-- 搜索 -->
      <!-- <el-dialog destroy-on-close  ref="searchBox" :visible.sync="queryBox" :width="dialogWidth" :before-close="offTipBeforeClose" :close-on-press-escape="isClose"
        :close-on-click-modal="false" :fullscreen="isFullscreen">
        <div slot="title">
          <span style="font-size:22px">搜索 / Search</span>
          <span v-if="queryIsEmpty" style="font-size:14px;color:red;margin-left:20px">请输入搜索条件 / Please enter your search criteria!</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i class="el-dialog__close el-icon-full-screen" style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(1)"></i>
          </span>
        </div>
        <el-row :span="24">
          <forms :formConfig="searchFormData" ref="searchForm" />
        </el-row>
        <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="querySure">提交 / Sumbit</el-button>
                  <el-button type="primary" @click="queryClean">清空 / Clear</el-button>
                  <el-button @click="$refs['searchBox'].handleClose()">关闭 / Close</el-button>
        </span>
      </el-dialog> -->


      <!-- 搜索 -->
      <el-dialog destroy-on-close
        :visible="queryBox"
        :width="dialogWidth"
        :before-close="beforeClose"
        :close-on-press-escape="isClose"
        :close-on-click-modal="false"
        :fullscreen="isFullscreen"
      >
        <div slot="title">
          <span style="font-size:22px">搜索 / Search</span>
          <span v-if="queryIsEmpty" style="font-size:14px;color:red;margin-left:20px">请输入搜索条件 / Please enter your search criteria!</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i
              class="el-dialog__close el-icon-full-screen"
              style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(1)"
            ></i>
          </span>
        </div>
        <el-row :span="24" :gutter="34" style="padding:0 0px">
          <el-form
            label-position="left"
            ref="queryForm"
            :model="queryFormData"
            size="medium"
            :rules="queryRules"
            label-width="240px"
          >
            <el-col :span="11" :offset="1">
              <el-form-item class="paddingLeft" label="日志模块 / Log module" prop="operateModule">
                <el-input
                  v-model="queryFormData.operateModule"
                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" >
              <el-form-item class="paddingLeft" label="唯一标识 / Uniquely identifies" prop="uniqueId">
                <el-input
                  v-model="queryFormData.uniqueId"
                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item class="paddingLeft" label="日志类型 / Log type" prop="operateType">
                <el-select
                  v-model="queryFormData.operateType"
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in operateTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" >
              <el-form-item class="paddingLeft" label="修改前数据 / DataBeforeModification" prop="beforeData">
                <el-input
                  v-model="queryFormData.beforeData"
                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- :offset="2" 调整间隔 -->
            <el-col :span="11" :offset="1">
              <el-form-item class="paddingLeft" label="修改后数据 / ModifiedData" prop="afterData">
                <el-input
                  v-model="queryFormData.afterData"
                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11" >
              <el-form-item class="paddingLeft" label="原因 / Reason" prop="reason">
                <el-input
                  v-model="queryFormData.reason"
                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item class="paddingLeft" label="操作者 / Operator" prop="userAccount">
                <el-input
                  v-model="queryFormData.userAccount"
                  clearable
                  :maxlength="20"
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11" >
              <el-form-item class="paddingLeft" label="时间 / Time" prop="operateTime">
                <el-date-picker
                  type="datetimerange"
                  v-model="queryFormData.operateTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :style="{width: '100%'}"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  range-separator="至"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="querySure">提交 / Sumbit</el-button>
                  <el-button type="primary" @click="queryClean">清空 / Clear</el-button>
                  <el-button @click="queryCancel">关闭 / Close</el-button>
                </span>
      </el-dialog>

      <!-- 详情 -->
      <el-dialog destroy-on-close
        ref="viewBox"
        :visible.sync="detailBox"
        width="70%"
        :before-close="offTipBeforeClose"
        :close-on-press-escape="isClose"
        :close-on-click-modal="false"
        :fullscreen="isFullscreen"
      >
        <div slot="title">
          <span style="font-size:22px">详情 / Details</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i
              class="el-dialog__close el-icon-full-screen"
              style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(22)"
            ></i>
          </span>
        </div>
        <el-row :span="24">
          <forms :formConfig="formData" ref="forms"/>

          <el-form
            label-position="left"
            ref="detailForm"
            :model="detailFormData"
            size="medium"
            label-width="220px"
          >
            <el-col :span="11">
              <el-form-item class="paddingLeft" label="日志模块 / log module" prop="operateModule">
                <el-input
                  v-model="detailFormData.operateModule"
                  :maxlength="20"
                  disabled
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item class="paddingLeft" label="日志类型 / log type" prop="operateType">
                <el-input
                  v-model="detailFormData.operateType"
                  :maxlength="20"
                  disabled
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item class="paddingLeft" label="操作者 / operator" prop="userAccount">
                <el-input
                  v-model="detailFormData.userAccount"
                  disabled
                  clearable
                  :maxlength="20"
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11" :offset="2">
              <el-form-item class="paddingLeft" label="操作时间 / operation time" prop="operateTime">
                <el-input
                  v-model="detailFormData.operateTime"
                  disabled
                  clearable
                  :maxlength="20"
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item class="paddingLeft" label="原因 / reason" prop="reason">
                <el-input
                  v-model="detailFormData.reason"
                  disabled
                  clearable
                  :maxlength="20"
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-col
            :span="12"
            class="formHeader"
            style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px; padding-left:10px; "
          >
            <el-col>
              <span style="font-size:22px">修改前数据</span>
            </el-col>
          </el-col>

          <el-col
            :span="12"
            class="formHeader"
            style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px;padding-left:40px; "
          >
            <el-col>
              <span style="font-size:22px">修改后数据</span>
            </el-col>
          </el-col>
          <el-col :span="11">
            <div class="grid-content bg-purple">
              <el-table :show-header="false" :data="beforeTableData" border style="width: 100%">
                <el-table-column :resizable="true" prop="recordKey"></el-table-column>
                <el-table-column :resizable="true" prop="recordValue"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="grid-content bg-purple-light">
              <el-table :show-header="false" :data="afterTableData" border style="width: 100%">
                <el-table-column :resizable="true" prop="recordKey"></el-table-column>
                <el-table-column :resizable="true" prop="recordValue"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button @click="$refs['viewBox'].handleClose()">{{$t('public_btn_name.close')}}</el-button>
        </span>
      </el-dialog>


      <el-dialog destroy-on-close  :visible.sync="showHiddenBox" :width="dialogWidth" :before-close="offTipBeforeClose" :close-on-press-escape="isClose"
        :close-on-click-modal="false" :fullscreen="isFullscreen">
        <div slot="title">
          <span style="font-size:22px">{{$t('public_btn_name.showHidden')}}</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i class="el-dialog__close el-icon-full-screen" style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(2)"></i>
          </span>
        </div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('public_label.allCheck')}}</el-checkbox>
        <div v-for="item in tableOption" :label="item" :key="item.id" style="display:inline-block;margin:0 10px">
          <el-checkbox v-model="item.isChecked" @change="handleCheckedCitiesChange(item)">{{item.label}}</el-checkbox>
        </div>
      </el-dialog>


      <!-- 导出 -->
      <el-dialog destroy-on-close
        :visible.sync="exportBox"
        ref="exportBox"
        width="60%"
        :before-close="offTipBeforeClose"
        :close-on-press-escape="isClose"
        :close-on-click-modal="false"
        :fullscreen="isFullscreen"
      >
        <div slot="title">
          <span style="font-size:22px">导出 / Export</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i
              class="el-dialog__close el-icon-full-screen"
              style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(22)"
            ></i>
          </span>
        </div>

        <el-row :span="24" class="export">
          <el-form ref="elForm" size="medium" label-width="260px" label-position="left">
            <el-col :span="24">
              <el-form-item label="选择报表格式 / Choose report format" prop="field101">
                <el-radio-group v-model="exportFormat" size="medium">
                  <el-radio v-model="exportFormat" :label="0">Excel</el-radio>
                  <el-radio v-model="exportFormat" :label="1">PDF</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exportSave">提交 / Submit</el-button>
          <el-button @click="$refs['exportBox'].handleClose()">关闭 / Close</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  initList,
  testBtn,
  verifyAccount,
  exportData,
  queryDetail,
  loginApproval// 初始化
} from './logManagement.js';
import signaturePublic from '@/components/signaturePublic.vue'
import { getDate } from '@/unit/time';
import {resultInitConfig} from './fakeData'
export default {
  components: {
    signaturePublic
  },
  data () {
    return {
      dataArr: [],
      AuthorityData: JSON.parse(sessionStorage.getItem('dataAuthority')),
      signPerson: {
        row: {}, // 存整个row
        rowId: '',
        dialogVisible: false,
        userId: '',
        reason: '', // 修改原因
        btnName: '', // 按钮字段
        password: '', // 用户密码
        userAccount: ''// 用户名称
      },
      dialogWidth: '60%',
      isFullscreen: false, // 是否全屏
      isClose: true, // 导出遮罩是否可关闭
      tableData: [], // 存放表格数据
      loading: false, // 加载效果
      page: {
        pageSize: 10, // 默认10条数据
        total: 0,
        currentPage: 1 // 当前页
      },
      // 构建表头
      tableTitles: [
        {
          label: '日志模块',
          value: 'operateModule',
          isChecked: true
        },
        // uniqueId
        {
          label: '唯一标识',
          value: 'uniqueId',
          isChecked: true
        },
        {
          label: '日志类型',
          value: 'operateType',
          isChecked: true
        },
        {
          label: '修改前数据',
          value: 'beforeData',
          isChecked: true
        },
        {
          label: '修改后数据',
          value: 'afterData',
          isChecked: true
        },
        {
          label: '修改原因',
          value: 'reason',
          isChecked: true
        },
        {
          label: '操作者',
          value: 'userAccount',
          isChecked: true
        },
        {
          label: '操作日期',
          value: 'operateTime',
          isChecked: true
        }
      ],
      // 模糊查询
      fuzzy: false,
      // 定义查询字段
      queryFormData: {
        operateModule: '', //  日志模块
        operateType: '', //  日志类型
        beforeData: '', //  修改前数据
        afterData: '', //  修改后数据
        reason: '', //  修改原因
        userAccount: '', //  操作者
        operateTime: '', //  操作时间
        startTime: '',
        uniqueId: ''
      },
      // 临时存储下数据
      queryFormDataCopy: {},
      // 定义查询规则
      queryRules: {},

      // 下拉选项 固定
      operateTypeOptions: [
        {
          label: '新增 / Add',
          value: 0
        },
        {
          label: '编辑 / Edit',
          value: 1
        },
        {
          label: '删除 / Delect',
          value: 2
        },
        {
          label: '打印 / Print',
          value: 3
        },
        {
          label: '数据备份 / DataBackup',
          value: 4
        }
      ],
      queryBox: false, // 搜索
      queryIsEmpty: false, // 搜索是否为空
      showHiddenBox: false, // 显隐
      exportBox: false, // 导出弹框
      detailBox: false, // 导出弹框
      exportFormat: 0, // 导出格式
      exportFileNamePrefix: '日志管理', // 导出文件名称前缀
      detailFormData: {
        operateModule: '',
        operateType: '',
        userAccount: '',
        operateTime: '',
        reason: ''
      },
      beforeTableData: [],
      afterTableData: [],

      // === 后续添加 ===
      formConfig: {},
      tableOption: [], // 控制显隐
      checkAll: false,
      isIndeterminate: true, // 半选状态
      checkeds: [], // 前端后续通过显隐控制数组
      tableOptions: [], // 控制表头
      searchFormData: {}, // 搜索查询表单数据
      formData: {}, // 详情表单
      tableKey: 0,


      addForms: [],
      searchForms: [],
      editForms: [],
      canUseForms: [],
      forbiddenForms: [],
      auditForms: [],
      viewForms: []

    };
  },
  methods: {

    // 打印审计追踪start===================================================
    // 公共处理结果的方法
    dealResult (result, fn) {
      if (result.code === 20000) {
        fn.call(this)
        // this.$message.success(result.message)
      } else {
        this.$message.error(result.message)
        this.signPerson = {
          row: {}, // 存整个row
          dialogVisible: false,
          rowId: '',
          userId: '',
          reason: '', // 修改原因
          btnName: '', // 按钮字段
          password: '', // 用户密码
          userAccount: ''// 用户名称
        }
      }
    },
    // 统一清空SignPerson字段
    clearSignPerson () {
      this.signPerson = {
        row: {}, // 存整个row
        dialogVisible: false,
        rowId: '',
        userId: '',
        reason: '', // 修改原因
        btnName: '', // 按钮字段
        password: '', // 用户密码
        userAccount: ''// 用户名称
      }
    },
    // 在这里触发所有需要电子签名的后续提交操作，新增和编辑写在了一起，然后是删除,要在结束的时候清空signPerson
    async authenticateUser () {
      if (this.signPerson.btnName == 'Log_Information_Audit_Trail') {
        this.add(14, 5044)
      }
    },
    CheckOpen (type) {
      const dataArr = [
        // 打印审计追踪 0
        'Log_Information_Audit_Trail'
      ]
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = dataArr[type]
    },
    // 公共的调接口名的方法
    async getResult (fn, args) {
      const result = await fn(args)
      Promise.all([result])
        .then(dataArr => {
          const data = dataArr[0].data;
          if (data.code === 20000) {
            this.$message.success(data.message);
            this.clearSignPerson()
            // 清空
          } else {
            this.$message.error(data.message);
            this.clearSignPerson()
          }
        })
    },
    async public (flag, num) {
      // 在这里执行代码(打印导出等功能)
      this.getResult(testBtn, {'type': flag,
        'person':
        // 有电子签就塞person没有就塞null
          (this.AuthorityData.electronicSignature.includes(num)
            ? this.signPerson
            : null)})
    },
    async add (flag, num) {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResult(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.public(flag, num)
      })
    },
    // 打印审计追踪end===================================================

    offTipBeforeClose () {
      let isChecked = false;
      this.checkeds.forEach((item, index) => {
        if (item.isChecked == true) {
          isChecked = true;
        }
      });
      if (isChecked == true) {
        this.detailBox = false;
        this.exportBox = false;
        this.isFullscreen = false;
        this.queryIsEmpty = false;
        this.exportFormat = 0;
        if (this.addBox == true) {
          this.addCancel();
        }
        if (this.queryBox == true) {
          this.queryBox = false;
          this.isFullscreen = false
          this.queryClean();
          this.isFullscreen = false;
        }
        // 关闭导出窗口
        this.exportBox = false;
        // 关闭删除窗口
        this.delBox = false;
        this.extension0 = '';
        this.extension1 = '';
        this.extension2 = '';
        this.extension3 = '';
        this.extension4 = '';
        if (this.$refs['delForm']) {
          this.$refs['delForm'].resetFields();
        }
        let isChecked = false;
        this.tableTitles.forEach((item, index) => {
          if (item.isChecked == true) {
            isChecked = true;
          }
        });
        if (isChecked == true) {
          this.showHiddenBox = false;
        } else {
          this.$message.error('必须选择一条');
        }
      } else {
        this.$message.error('必须选择一条');
      }
    },
    clearFormConfig () {
      this.$store.dispatch('setFormConfig', null)
    },
    tableCellClassName ({row, column, rowIndex, columnIndex}) {
      return columnIndex === 0 ? '' : 'allowDrag';
    },
    // 查看详情信息
    openDetails (row, column, event, cell) {
      this.viewForms.forEach((item, index) => {
        item.disabled = true
        item.placeholder = ''
      })
      this.$store.dispatch('setFormConfig', this.viewForms)



      this.detailFormData.operateModule = row.operateModule;

      if (row.operateType == 0) {
        this.detailFormData.operateType = '新增 / Add';
      } else if (row.operateType == 1) {
        this.detailFormData.operateType = '修改 / Edit';
      } else if (row.operateType == 2) {
        this.detailFormData.operateType = '删除 / Delete';
      } else if (row.operateType == 3) {
        this.detailFormData.operateType = '打印 / Print';
      } else if (row.operateType == 4) {
        this.detailFormData.operateType = '审核 / Audit';
      }
      this.detailFormData.userAccount = row.userAccount;
      this.detailFormData.operateTime = row.operateTime;
      this.detailFormData.reason = row.reason;
      this.detailFormData.uniqueId = row.uniqueId;
      this.formData = Object.assign({}, this.formData, this.detailFormData)
      console.log(`this.formData=> `, this.formData)

      // 修改前后数据赋值

      this.getDetail(row.id);
      this.detailBox = true;
    },

    async getDetail (recordId) {
      let detail = (await queryDetail(recordId)).data
      this.beforeTableData = detail.data.beforeDataList;
      this.afterTableData = detail.data.afterDataList;
    },
    // 导出
    exports () {
      // 导出必须前先搜索缩小范围
      if (Object.values(this.queryFormDataCopy).length > 0) {
        this.exportBox = true;
      } else {
        this.$message.error('请先搜索 / Please search first')
      }
    },

    // 导出保存
    async exportSave () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)'
      });
      let title = [];
      let arr = [];
      this.checkeds.forEach((item, index) => {
        if (item.isChecked == true) {
          if (item.nameId) {
            arr.push(item.nameId + ' _expand');
          } else if (item.value == 'operateType') {
            arr.push(item.value + '_dic');
          } else {
            arr.push(item.value);
          }
          title.push(item.label);
        }
      });
      let orderMap = {
        title: title,
        arr: arr
      };

      if (this.exportFormat == 0) {
        var data;
        if (this.fuzzy == false) {
          data = (await exportData(this.exportFormat, { orderMap })).data
          this.$message.success(data.message)
        } else if (this.fuzzy == true) {
          this.queryFormDataCopy.orderMap = orderMap;

          if (this.queryFormDataCopy.operateTime) {
            this.queryFormDataCopy.startTime = this.queryFormDataCopy.operateTime[0];
            this.queryFormDataCopy.endTime = this.queryFormDataCopy.operateTime[1];
            this.queryFormDataCopy.operateTime = ''
          }

          let inventoryManageVo = this.queryFormDataCopy;
          data = (await exportData(this.exportFormat, inventoryManageVo)).data
          this.$message.success(data.message)
        }

        // let url = window.URL.createObjectURL(data);
        // var a = document.createElement('a');
        // document.body.appendChild(a);
        // a.href = url;
        // let name = '日志管理' + getDate()
        // a.download = `${name}.xlsx`;
        // a.click();
        // window.URL.revokeObjectURL(url);
        this.exportFormat = 0;
        this.exportBox = false;
        loading.close()
      } else if (this.exportFormat == 1) {
        if (this.fuzzy == false) {
          data = (await exportData(this.exportFormat, { orderMap })).data
          this.$message.success(data.message)
        } else if (this.fuzzy == true) {
          this.queryFormDataCopy.orderMap = orderMap;
          if (this.queryFormDataCopy.operateTime) {
            this.queryFormDataCopy.startTime = this.queryFormDataCopy.operateTime[0];
            this.queryFormDataCopy.endTime = this.queryFormDataCopy.operateTime[1];
            this.queryFormDataCopy.operateTime = ''
          }
          let inventoryManageVo = this.queryFormDataCopy;
          data = (await exportData(this.exportFormat, inventoryManageVo)).data
          this.$message.success(data.message)
        }

        // let url = window.URL.createObjectURL(data);
        // // var a = document.createElement('a');
        // document.body.appendChild(a);
        // a.href = url;
        // let name = '日志管理' + getDate();
        // a.download = `${name}.pdf`;
        // a.click();
        // window.URL.revokeObjectURL(url);
        this.exportFormat = 0;
        this.exportBox = false;
        loading.close()
      } else if
      ((this.exportFormat == '')) {
      }
      this.isFullscreen = false;
    },

    // 导出取消
    exportCancel () {
      this.exportFormat = 0;
      this.exportBox = false;
      this.isFullscreen = false;
    },
    // 提交
    a () {
      console.log(11)
    },
    // 查询保存
    async querySure () {
      // 验证查询搜索是否都为空
      function validSearchFormisExists (formData) {
        if (!formData || typeof formData !== 'object') {
          return Promise.reject(new Error(`查询表单不是个对象 / The query form is not an object.`));
        }
        const isExists = Object.keys(formData).some(key => {
          const val = formData[key];
          return !['formDataConfig', 'rules'].includes(key) && ((typeof val === 'number' && parseInt(val) === 0) || !!val)
        })
        return Promise.resolve(isExists);
      }
      const isExists = await validSearchFormisExists(this.queryFormData) // 查询框是否有值

      if (!isExists) {
        this.queryIsEmpty = true;
      } else {
        this.fuzzy = true;
        this.queryIsEmpty = false;

        const searchFormDataCopy = JSON.parse(JSON.stringify(this.queryFormData));


        this.page.currentPage = 1;

        // const loading = this.getLoadingInstance();
        this.isFullscreen = false // 关闭窗口
        if (searchFormDataCopy.operateTime) {
          searchFormDataCopy.startTime = searchFormDataCopy.operateTime[0];
          searchFormDataCopy.endTime = searchFormDataCopy.operateTime[1];
          searchFormDataCopy.operateTime = ''
        }
        const data = (await initList(
          this.page.currentPage,
          this.page.pageSize,
          searchFormDataCopy
        )).data
        // this.$refs['searchForm'].cleanForm();
        this.queryClean();
        this.queryBox = false;
        this.isFullscreen = false;
        if (data.code == 20000) {
          this.tableData = data.data.rows;
          this.page.total = data.data.total;
          this.queryFormDataCopy = JSON.parse(JSON.stringify(searchFormDataCopy));
          this.$message.success(data.message);
        } else {
          this.$message.error(data.message);
        }
      }




      // if (this.queryFormData.operateTime) {
      //   this.queryFormData.startTime = this.queryFormData.operateTime[0];
      //   this.queryFormData.endTime = this.queryFormData.operateTime[1];
      //   this.queryFormData.operateTime = "";
      // }
      // // 打印下，顺序不对，无法校验

      // if (
      //   JSON.stringify(this.queryFormData) ==
      //   '{"operateModule":"","operateType":"","beforeData":"","afterData":"","reason":"","userAccount":"","operateTime":"","startTime":"","uniqueId":""}'
      // ) {
      //   this.queryIsEmpty = true;
      // } else {
      //   this.queryIsEmpty = false;
      //   this.$refs["forms"].validate(async (valid) => {
      //     if (valid) {
      //       this.fuzzy = true;
      //       const loading = this.$loading({
      //         lock: true,
      //         text: "Loading",
      //         spinner: "el-icon-loading",
      //         background: "rgba(255, 2555, 255, 0.5)",
      //       });
      //       this.queryFormDataCopy = JSON.parse(JSON.stringify(this.queryFormData));
      //       this.queryBox = false;
      this.isFullscreen = false
      //        this.page.currentPage=1;
      //       let data = await initList(
      //         this.page.currentPage,
      //         this.page.pageSize,
      //         this.queryFormData
      //       );

      //       this.queryFormData = {
      //         operateModule: "", //  日志模块
      //         operateType: "", //  日志类型
      //         beforeData: "", //  修改前数据
      //         afterData: "", //  修改后数据
      //         reason: "", //  修改原因
      //         userAccount: "", //  操作者
      //         operateTime: "", //  操作时间
      //         startTime: "",
      //         startTime: "",
      //         uniqueId:"",
      //       };
      //       if (data.code == 20000) {
      //         this.tableData = data.data.rows;
      //         loading.close();
      //         this.page.total = data.data.total;
      //         this.$message.success("查询成功");
      //       }
      //     }
      //   });
      // }
    },

    // 查询清空
    queryClean () {
      this.queryIsEmpty = false
      this.queryFormData = {
        operateModule: '', //  日志模块
        operateType: '', //  日志类型
        beforeData: '', //  修改前数据
        afterData: '', //  修改后数据
        reason: '', //  修改原因
        userAccount: '', //  操作者
        operateTime: '', //  操作时间
        startTime: '',
        uniqueId: ''
      }
    },

    // 查询取消
    queryCancel () {
      this.queryBox = false;
      this.isFullscreen = false
      this.queryClean();
      this.isFullscreen = false;
    },


    // 关闭界面
    closeDetail () {
      this.$refs['forms'].cleanForm();
      this.detailBox = false;
      this.isFullscreen = false;
    },

    query () {
      this.queryBox = true;
    },

    // 关闭前回调
    beforeClose (done) {
    //  this.clearFormConfig();

      this.$confirm('是否确认关闭 / Are you sure to close', '提示 / Hint', {
        confirmButtonText: '关闭 / Close',
        cancelButtonText: '取消 / Cancel',
        type: 'warning'
      })
        .then(() => {
          this.detailBox = false;
          this.exportBox = false;
          this.isFullscreen = false;
          this.queryIsEmpty = false;
          this.exportFormat = 0;
          if (this.addBox == true) {
            this.addCancel();
          }
          if (this.queryBox == true) {
            this.queryBox = false;
            this.isFullscreen = false
            this.queryClean();
            this.isFullscreen = false;
          }
          // 关闭导出窗口
          this.exportBox = false;
          // 关闭删除窗口
          this.delBox = false;
          this.extension0 = '';
          this.extension1 = '';
          this.extension2 = '';
          this.extension3 = '';
          this.extension4 = '';
          if (this.$refs['delForm']) {
            this.$refs['delForm'].resetFields();
          }
          let isChecked = false;
          this.tableTitles.forEach((item, index) => {
            if (item.isChecked == true) {
              isChecked = true;
            }
          });
          if (isChecked == true) {
            this.showHiddenBox = false;
          } else {
            this.$message.error('必须选择一条 / Must choose one');
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          });
        });
    },

    // 全屏
    handleScreen (index) {
      this.isFullscreen = !this.isFullscreen;
    },
    // 全选
    handleCheckAllChange (val) {
      this.checkeds = [];
      this.tableOption.forEach((item, index) => {
        if (val == true) {
          item.isChecked = true;
          this.isIndeterminate = false;
          this.checkAll = true;
          this.checkeds.push(item);
        } else {
          this.checkeds = [];
          item.isChecked = false;
          this.checkAll = false;
        }
      });
      this.tableOptions = JSON.parse(JSON.stringify(this.checkeds))
      // this.tableKey+=1

      // this.tableTitles = [];
      // this.tableOption.forEach((item, index) => {
      //   if (val == true) {
      //     item.isChecked = true;
      //     this.isIndeterminate = false;
      //     this.checkAll = true;
      //     this.tableTitles.push(item);
      //   } else {
      //     this.tableTitles = [];
      //     item.isChecked = false;
      //     this.checkAll = false;
      //   }
      // });
      // this.tableTitles = this.tableOption
    },

    // 单选
    handleCheckedCitiesChange (row) {
      if (row.isChecked == true) {
        if (this.checkeds.indexOf(row) == -1) {
          this.checkeds.push(row);
        }
      } else {
        this.checkeds.forEach((item, index) => {
          if (item.value == row.value) {
            this.checkeds.splice(index, 1);
          }
        });
      }
      let arr = [];
      this.checkeds.forEach((item, index) => {
        if (item.isChecked == true) {
          arr.push(item);
        }
      });
      if (arr.length == this.tableOption.length) {
        this.isIndeterminate = false;
        this.checkAll = true;
      } else if (arr.length > 0) {
        this.isIndeterminate = true;
        this.checkAll = false;
      } else if (arr.length == 0) {
        this.isIndeterminate = false;
        this.checkAll = false;
      }
      this.tableOptions = this.checkeds
    },

    //  转换状态
    toTransState (item, index) {
      if (item == 0) {
        return '新增 / Add';
      } else if (item === 1) {
        return '编辑 / Edit';
      } else if (item === 2) {
        return '删除 / Delete';
      } else if (item === 3) {
        return '打印 / Print';
      } else if (item === 4) {
        return '审核 / Audit';
      }
    },
    // 显隐
    ShowHidden () {
      this.showHiddenBox = true;
    },

    // 刷新
    Filter () {
      this.fuzzy = false
      this.queryFormDataCopy = {}
      this.page.currentPage = 1
      this.initList();
    },

    // 改变下拉每页数据条数变化处理
    async handleSizeChange (val) {
      this.page.pageSize = val;
      const loading = this.getLoadingInstance();
      if (this.fuzzy == true) {
        if (this.queryFormDataCopy.operateTime) {
          this.queryFormDataCopy.startTime = this.queryFormDataCopy.operateTime[0];
          this.queryFormDataCopy.endTime = this.queryFormDataCopy.operateTime[1];
          this.queryFormDataCopy.operateTime = ''
        }

        let data = (await initList(
          this.page.currentPage,
          val,
          this.queryFormDataCopy
        )).data
        loading.close();
        if (data.code == 20000) {
          this.page.total = data.data.total;
          this.tableData = data.data.rows;
        }
      } else {
        loading.close();
        let data = (await initList(this.page.currentPage, val, {})).data
        if (data.code == 20000) {
          this.page.total = data.data.total;
          this.tableData = data.data.rows;
        }
      }
    },

    // 翻页处理
    async handleCurrentChange (val) {
      this.page.currentPage = val;
      const loading = this.getLoadingInstance();
      if (this.fuzzy == true) {
        if (this.queryFormDataCopy.operateTime) {
          this.queryFormDataCopy.startTime = this.queryFormDataCopy.operateTime[0];
          this.queryFormDataCopy.endTime = this.queryFormDataCopy.operateTime[1];
          this.queryFormDataCopy.operateTime = ''
        }

        let data = (await initList(
          val,
          this.page.pageSize,
          this.queryFormDataCopy
        )).data
        loading.close();
        if (data.code == 20000) {
          this.page.total = data.data.total;
          this.tableData = data.data.rows;
        }
      } else {
        loading.close();
        let data = (await initList(val, this.page.pageSize, {})).data
        if (data.code == 20000) {
          this.page.total = data.data.total;
          this.tableData = data.data.rows;
        }
      }
    },

    // 获取loading实例
    getLoadingInstance () {
      return this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(255, 2555, 255, 0.5)' });
    },

    // 初始化列表数据
    async initList () {
      this.fuzzy = false;
      const loading = this.getLoadingInstance();
      let data = (await initList(this.page.currentPage, this.page.pageSize, {})).data
      if (data.code == 20000) {
        loading.close();
        this.page.total = data.data.total;
        this.tableData = data.data.rows;
      }
    },

    // 初始化配置
    async initConfig () {
      const res = resultInitConfig
      if (res.code !== 20000) {
        this.$message.error(res.message)
        return;
      }

      // 主页配置
      const { checkAll, checkeds, options, isIndeterminate, forms } = res.data;
      this.checkAll = checkAll
      this.isIndeterminate = isIndeterminate // 半选状态
      this.tableOption = options // 控制显隐
      this.checkeds = checkeds // 前端后续通过显隐控制数组， 列表列数量
      this.tableOptions = JSON.parse(JSON.stringify(checkeds)) // 全量表头

      const OPERATION_FORMS = ['addForms', 'searchForms', 'editForms', 'canUseForms', 'forbiddenForms', 'auditForms', 'viewForms']
      let _forms = JSON.parse(JSON.stringify(forms));
      _forms.forEach((form, index) => {
        if (Array.isArray(form) && !!form.length) {
          this[`${OPERATION_FORMS[index]}`] = form;
        }
      })
    }
  },
  computed: {
    // ...mapState({
    //   dialogWidth: (state) => state.dialogWidths.dialogWidth
    // })
  },
  // 页面进来时初始化的内容
  async mounted () {
    let login = {
      loginModule: '日志管理_日志信息 / Log Management_Log Information',
      loginResult: '0'
    };
    await loginApproval(login);

    this.initConfig(); // 初始化配置
    // this.$columnDrop(); // 拖拽表头，待测试
    this.initList();
  },
  beforeRouteLeave: function (to, from, next) {
    this.clearFormConfig();
    next()
  }
};
</script>

<style lang="scss" scoped>
.contents {
  border-radius: 10px;

  .CRUD {
    background: white;
    padding: 10px;
    border-radius: 15px;

    .crudHeader {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .addBtn {
        float: left;
      }

      .operationBtn {
        float: right;
      }

      .crudHeaderBtn {
        margin: 5px;
      }
    }

    .block {
      height: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.delInput>>>.el-input__inner {
  height: 70px;
}

.delForm>>>.el-form-item__label {
  line-height: 70px;
}

.delSignature {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.export {
  display: flex;
  justify-content: center;
}

>>>.el-autocomplete {
  width: 100%;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: white;
}

.bg-purple {
  background: white;
}

.bg-purple-light {
  background: white;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
