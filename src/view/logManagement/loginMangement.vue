<template>
  <div class="contents">
    <div class="CRUD">
      <div class="crudHeader">
        <div class="operationBtn">
          <el-tooltip class="item" effect="dark" content="搜索 / Search"  placement="top">
            <el-button icon="el-icon-search" circle @click.native="query" class="crudHeaderBtn"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark"  content="导出 / Export" placement="top">
            <el-button icon="el-icon-printer" circle @click.native="exports" class="crudHeaderBtn"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="显隐 / ShowHidden"  placement="top">
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
      <el-table :data="tableData"  border style="width: 100%"
        :key="tableKey"
        :header-cell-class-name="tableCellClassName">
        <!-- 构建序号列 -->
        <el-table-column type="index"  style="float:left"></el-table-column>

        <template v-for="(item, index) in checkeds" >

            <el-table-column  :key="`col_${index}`" :prop="tableOptions[index].value"
              :label="tableOptions[index].label"  >
              <template slot-scope="scope">
                <span v-if="tableOptions[index].value === 'loginResult'">{{toTransState(scope.row[tableOptions[index].value])}}</span>
                <span v-else>{{scope.row[tableOptions[index].value]}}</span>
              </template>
            </el-table-column>
        </template>


        <!-- 构建表头信息 -->
        <!-- <template v-for="(item) in tableTitles">
          <el-table-column
            :resizable="true"
            :prop="item.value"
            :label="item.label"
            v-if="item.value=='loginResult'&&item.isChecked==true"
            :key="item.id"
          >
            <template slot-scope="scope">
              <span>{{toTransState(scope.row.loginResult,scope.$index)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :resizable="true"
            :prop="item.value"
            :label="item.label"
            v-else-if="item.isChecked&&item.value!='loginResult'"
            :key="item.id"
          ></el-table-column>
        </template> -->
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
      <!-- <el-dialog destroy-on-close  ref="searchBox" visible.sync="false" :width="dialogWidth" :before-close="offTipBeforeClose" :close-on-press-escape="isClose"
        :close-on-click-modal="false" :fullscreen="isFullscreen">
        <div slot="title">
          <span style="font-size:22px">{{$t('public_btn_name.query')}}</span>
          <span v-if="queryIsEmpty" style="font-size:14px;color:red;margin-left:20px">{{$t('public_dialog_title.searchTip')}}</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i class="el-dialog__close el-icon-full-screen" style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(1)"></i>
          </span>
        </div>
        <el-row :span="24">
          <forms :formConfig="searchFormData" ref="searchForm" />
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="querySure">{{$t('public_btn_name.submit')}}</el-button>
          <el-button type="primary" @click="queryClean">{{$t('public_btn_name.empty')}}</el-button>
          <el-button @click="$refs['searchBox'].handleClose()">{{$t('public_btn_name.close')}}</el-button>
        </span>
      </el-dialog> -->



      <!-- 搜索 -->
      <el-dialog destroy-on-close
        :visible.sync="queryBox"
        :width="dialogWidth"
        :before-close="beforeClose"
        :close-on-press-escape="isClose"
        :close-on-click-modal="false"
        :fullscreen="isFullscreen"
      >
        <div slot="title">
                   <span style="font-size:22px">搜索 / Search</span>
          <span v-if="queryIsEmpty" style="font-size:14px;color:red;margin-left:20px">{{$t('public_dialog_title.searchTip')}}</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i
              class="el-dialog__close el-icon-full-screen"
              style="cursor:pointer;font-weight:700;font-size:26px"
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
              <el-form-item class="paddingLeft" label="登录模块 / Login module" prop="loginModule">
                <el-input
                  v-model="queryFormData.loginModule"

                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item class="paddingLeft" label="登录人 / Login person" prop="userAccount">
                <el-input
                  v-model="queryFormData.userAccount"

                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item class="paddingLeft" label="登录IP / Login IP" prop="ipAddr">
                <el-input
                  v-model="queryFormData.ipAddr"
                  :maxlength="20"
                  clearable
                  :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item class="paddingLeft" label="登录结果 / Login result" prop="loginResult">
                <el-select
                  v-model="queryFormData.loginResult"

                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in loginResultOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="11" :offset="1">
              <el-form-item class="paddingLeft" label="起止时间 / Start and end time" prop="createTime">
                <el-date-picker
                  type="datetimerange"
                  v-model="queryFormData.createTime"
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


      <el-dialog destroy-on-close  :visible.sync="showHiddenBox" :width="dialogWidth" :before-close="offTipBeforeClose" :close-on-press-escape="isClose"
        :close-on-click-modal="false" :fullscreen="isFullscreen">
        <div slot="title">
          <span style="font-size:22px">显隐 / showHidden</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i class="el-dialog__close el-icon-full-screen" style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(2)"></i>
          </span>
        </div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选 / AllCheck</el-checkbox>
        <div v-for="item in tableOption" :label="item" :key="item.id" style="display:inline-block;margin:0 10px">
          <el-checkbox v-model="item.isChecked" @change="handleCheckedCitiesChange(item)">{{item.label}}</el-checkbox>
        </div>
      </el-dialog>


      <!-- 显隐 -->
      <!-- <el-dialog destroy-on-close
        :visible.sync="showHiddenBox"
        :width="dialogWidth"
        :before-close="beforeClose"
        :close-on-press-escape="isClose"
        :close-on-click-modal="false"
        :fullscreen="isFullscreen"
      >
        <div slot="title">
          <span style="font-size:22px">{{$t('public_btn_name.showHidden')}}</span>
          <span style="float:right;padding-right: 40px;margin-top:2px">
            <i
              class="el-dialog__close el-icon-full-screen"
              style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(2)"
            ></i>
          </span>
        </div>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >{{$t('public_label.allCheck')}}</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <div
          v-for="item in tableOption"
          :label="item "
          :key="item.id"
          style="display:inline-block;margin:0 10px"
        >
          <el-checkbox
            v-model="item.isChecked"
            @change="handleCheckedCitiesChange(item)"
          >{{item.label}}</el-checkbox>
        </div>
      </el-dialog> -->

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
  exportData,
  loginApproval// 初始化
} from './loginMangement.js';
import { getDate } from '@/unit/time';
import {resultInitConfig} from './loginFakeData'

export default {
  data () {
    return {
      dialogWidth: '60%',
      stompClient: '',
      timer: '',
      destId: 1,
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
          label: '登录模块',
          value: 'loginModule',
          isChecked: true
        },
        {
          label: '登录/登出时间',
          value: 'createTime',
          isChecked: true
        },
        {
          label: '登录IP',
          value: 'ipAddr',
          isChecked: true
        },
        {
          label: '登录人',
          value: 'userAccount',
          isChecked: true
        },

        {
          label: '登录结果',
          value: 'loginResult',
          isChecked: true
        }
      ],
      // 模糊查询
      fuzzy: false,
      // 定义查询字段
      queryFormData: {
        loginModule: '',
        userAccount: '',
        ipAddr: '',
        loginResult: '',
        createTime: '', //  登录/登出时间
        startTime: '',
        endTime: ''
      },
      // 临时存储下数据
      queryFormDataCopy: {},
      // 定义查询规则
      queryRules: {},

      // 下拉选项 固定
      loginResultOptions: [
        {
          label: '登录成功 / Login successful',
          value: 0
        },
        {
          label: '登录失败 / Login failed',
          value: 1
        },
        {
          label: '用户锁定 / User lock',
          value: 2
        },
        {
          label: '退出成功 / Exit successfully',
          value: 3
        }
      ],
      queryBox: false, // 搜索
      queryIsEmpty: false, // 搜索是否为空
      showHiddenBox: false, // 显隐
      // tableOption: [
      //   {
      //     label: "登录模块",
      //     value: "loginModule",
      //     isChecked: true,
      //   },
      //   {
      //     label: "登录/登出时间",
      //     value: "createTime",
      //     isChecked: true,
      //   },
      //   {
      //     label: "登录IP",
      //     value: "ipAddr",
      //     isChecked: true,
      //   },
      //   {
      //     label: "登录人",
      //     value: "userAccount",
      //     isChecked: true,
      //   },

      //   {
      //     label: "登录结果",
      //     value: "loginResult",
      //     isChecked: true,
      //   },
      // ],
      //  checkAll: false, //是否全选 显隐用
      //   isIndeterminate: true, //是否全选 显隐用
      exportBox: false, // 导出弹框
      exportFormat: 0, // 导出格式
      exportFileNamePrefix: '登录日志', // 导出文件名称前缀

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
    offTipBeforeClose () {
      // 校验显隐, 至少有一个选择（判断条件）
      const hasChecked = () => {
        return this.tableOption.some(item => item.isChecked);
      }

      if (this.addBox == true) {
        this.addCancel();
      }
      if (this.queryBox == true) {
        this.queryBox = false;
        this.isFullscreen = false
        this.queryClean();
        this.isFullscreen = false;
      }
      if (this.showHiddenBox == true) {
        // 至少有一个选中
        if (hasChecked()) {
          this.showHiddenBox = false
          setTimeout(() => {
            this.isFullscreen = false
          }, 200);
        } else {
          this.$message.error('必须选择一条');
        }
      }
      // 关闭导出窗口
      if (this.exportBox == true) {
        this.exportFormat = 0;
        this.exportBox = false;
        setTimeout(() => {
          this.isFullscreen = false
        }, 200);
      }
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
        // this.showHiddenBox = false;
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
          console.log(data)
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
          console.log(data)
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
      loading.close()
    },
    // // 导出保存
    // async exportSave () {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: 'loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(255, 255, 255, 0.5)'
    //   });
    //   let title = [];
    //   let arr = [];
    //   this.checkeds.forEach((item, index) => {
    //     if (item.isChecked == true) {
    //       if (item.nameId) {
    //         arr.push(item.nameId + ' _expand');
    //       } else if (item.value == 'loginResult') {
    //         arr.push(item.value + '_dic');
    //       } else {
    //         arr.push(item.value);
    //       }
    //       title.push(item.label);
    //     }
    //   });
    //   let orderMap = {
    //     title: title,
    //     arr: arr
    //   };

    //   if (this.exportFormat == 0) {
    //     var data;
    //     if (this.fuzzy == false) {
    //       data = (await exportData(this.exportFormat, { orderMap })).data
    //       this.$message.success(data.message)
    //     } else if (this.fuzzy == true) {
    //       this.queryFormDataCopy.orderMap = orderMap;

    //       if (this.queryFormDataCopy.createTime) {
    //         this.queryFormDataCopy.startTime = this.queryFormDataCopy.createTime[0];
    //         this.queryFormDataCopy.endTime = this.queryFormDataCopy.createTime[1];
    //         this.queryFormDataCopy.createTime = ''
    //       }

    //       let inventoryManageVo = this.queryFormDataCopy;
    //       data = (await exportData(this.exportFormat, inventoryManageVo)).data
    //       this.$message.success(data.message)
    //     }

    //     // let url = window.URL.createObjectURL(data);
    //     // var a = document.createElement('a');
    //     // document.body.appendChild(a);
    //     // a.href = url;
    //     // // 拼接文件名称
    //     // // a.download = this.exportFileNamePrefix + new Date().getTime() + ".xlsx";
    //     // let name = '登录日志' + getDate();
    //     // a.download = `${name}.xlsx`;
    //     // a.click();
    //     // window.URL.revokeObjectURL(url);
    //     this.exportFormat = 0;
    //     this.exportBox = false;
    //     loading.close()
    //   } else if (this.exportFormat == 1) {
    //     if (this.fuzzy == false) {
    //       data = await (exportData(this.exportFormat, { orderMap })).data
    //       this.$message.success(data.message)
    //     } else if (this.fuzzy == true) {
    //       this.queryFormDataCopy.orderMap = orderMap;

    //       if (this.queryFormDataCopy.createTime) {
    //         this.queryFormDataCopy.startTime = this.queryFormDataCopy.createTime[0];
    //         this.queryFormDataCopy.endTime = this.queryFormDataCopy.createTime[1];
    //         this.queryFormDataCopy.createTime = ''
    //       }

    //       let inventoryManageVo = this.queryFormDataCopy;
    //       data = await (exportData(this.exportFormat, inventoryManageVo)).data
    //       this.$message.success(data.message)
    //     }
    //     // let url = window.URL.createObjectURL(data);
    //     // document.body.appendChild(a);
    //     // a.href = url;
    //     // // 拼接文件名称
    //     // // a.download = this.exportFileNamePrefix + new Date().getTime() + ".pdf";
    //     // let name = '登录日志' + getDate();
    //     // a.download = `${name}.pdf`;
    //     // a.click();
    //     // window.URL.revokeObjectURL(url);
    //     this.exportFormat = 0;
    //     this.exportBox = false;
    //     loading.close()
    //   } else if ((this.exportFormat == '')) {
    //   }

    //   this.isFullscreen = false;
    // },

    // 导出取消
    exportCancel () {
      this.$confirm('是否确认关闭 / Are you sure to close', '提示 / Hint', {
        confirmButtonText: '关 闭 / Close',
        cancelButtonText: '取消 / Close',
        type: 'warning'
      }).then(() => {
        this.exportFormat = 0;
        this.exportBox = false;
        setTimeout(() => {
          this.isFullscreen = false
        }, 200);
        // this.$refs["purchaseForm"].resetFields();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消关闭 / Closed off'
        });
      });
    },

    // 查询保存
    async querySure () {
      // 验证查询搜索是否都为空
      function validSearchFormisExists (formData) {
        if (!formData || typeof formData !== 'object') {
          return Promise.reject(new Error(`查询表单不是个对象 / The query form is not an object`));
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

        if (searchFormDataCopy.createTime) {
          searchFormDataCopy.startTime = searchFormDataCopy.createTime[0];
          searchFormDataCopy.endTime = searchFormDataCopy.createTime[1];
          searchFormDataCopy.createTime = ''
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





      // return;

      // if (this.queryFormData.createTime) {
      //   this.queryFormData.startTime = this.queryFormData.createTime[0];
      //   this.queryFormData.endTime = this.queryFormData.createTime[1];
      //   this.queryFormData.createTime = "";
      // }

      // if (
      //   JSON.stringify(this.queryFormData) ==
      //   '{"loginModule":"","userAccount":"","ipAddr":"","loginResult":"","createTime":"","startTime":"","endTime":""}' || JSON.stringify(this.queryFormData) =='{"loginModule":"","userAccount":"","ipAddr":"","loginResult":"","createTime":"","startTime":""}' || JSON.stringify(this.queryFormData) =='{"loginModule":"","userAccount":"","ipAddr":"","loginResult":"","createTime":"","endTime":""}'
      // ) {
      //   this.queryIsEmpty = true;
      // } else {
      //   this.queryIsEmpty = false;
      //   this.$refs["queryForm"].validate(async (valid) => {
      //     if (valid) {
      //       this.fuzzy = true;
      //       const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(255, 2555, 255, 0.5)'
      // })
      //       this.queryFormDataCopy = JSON.parse(JSON.stringify(this.queryFormData));
      //       this.queryBox = false;
      this.isFullscreen = false
      //       this.page.currentPage=1;
      //       let data = await initList(
      //         this.page.currentPage,
      //         this.page.pageSize,
      //         this.queryFormData
      //       );
      //       this.queryFormData = {
      //         loginModule: "",
      //         userAccount: "",
      //         ipAddr: "",
      //         loginResult: "",
      //         createTime: "", //  登录/登出时间
      //         startTime: "",
      //         endTime: "",
      //       }
      //       if (data.code == 20000) {
      //         this.tableData = data.data.rows;
      //         loading.close()
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
        loginModule: '',
        userAccount: '',
        ipAddr: '',
        loginResult: '',
        createTime: '', //  登录/登出时间
        startTime: '',
        endTime: ''}
    },

    // 查询取消
    queryCancel () {
      this.queryBox = false;
      this.isFullscreen = false
      this.queryClean();
      this.isFullscreen = false;
    },

    query () {
      this.queryBox = true;
    },

    // 关闭前回调
    beforeClose (done) {
      // this.exportBox = false
      // this.isFullscreen = false;
      // this.queryIsEmpty = false;
      // this.exportFormat = 0;

      // 校验显隐, 至少有一个选择（判断条件）
      const hasChecked = () => {
        return this.tableOption.some(item => item.isChecked);
      }

      if (this.addBox == true) {
        this.addCancel();
      }
      if (this.queryBox == true) {
        this.queryCancel()
      }
      if (this.showHiddenBox == true) {
        this.$confirm('是否确认关闭 / Are you sure to close', '提示 / Hint', {
          confirmButtonText: '关闭 / Close',
          cancelButtonText: '取消 / Cancel',
          type: 'warning'
        }).then(() => {
        // 至少有一个选中
          if (hasChecked()) {
            this.showHiddenBox = false
            setTimeout(() => {
              this.isFullscreen = false
            }, 200);
          } else {
            this.$message.error('必须选择一条 / Must choose one');
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          });
        });
      }
      // 关闭导出窗口
      if (this.exportBox == true) {
        this.exportCancel()
      }
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
        // this.showHiddenBox = false;
      } else {
        this.$message.error('必须选择一条');
      }
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
      // this.tableTitles = this.tableOption
    },

    // 单选
    handleCheckedCitiesChange (value) {
      if (value.isChecked == true) {
        if (this.checkeds.indexOf(value) == -1) {
          this.checkeds.push(value);
        }
      } else {
        this.checkeds.forEach((item, index) => {
          if (item.value == value.value) {
            this.checkeds.splice(index, 1);
            // item.isChecked = false
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
      // this.tableKey+=1
    },

    //  计算登录状态
    toTransState (item, index) {
      if (item == 0) {
        return '登录成功';
      } else if (item == 1) {
        return '登录失败';
      } else if (item == 2) {
        return '用户锁定';
      } else if (item == 3) {
        return '退出成功';
      }
    },
    // 显隐
    ShowHidden () {
      this.showHiddenBox = true;
    },

    // 刷新
    Filter () {
      this.fuzzy = false
      this.page.currentPage = 1
      this.initList();
    },

    // 获取loading实例
    getLoadingInstance () {
      return this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(255, 2555, 255, 0.5)' });
    },

    // 改变下拉每页数据条数变化处理
    async handleSizeChange (val) {
      this.page.pageSize = val;
      const loading = this.getLoadingInstance();
      if (this.fuzzy == true) {
        if (this.queryFormDataCopy.createTime) {
          this.queryFormDataCopy.startTime = this.queryFormDataCopy.createTime[0];
          this.queryFormDataCopy.endTime = this.queryFormDataCopy.createTime[1];
          this.queryFormDataCopy.createTime = ''
        }
        let data = (await initList(
          this.page.currentPage,
          val,
          this.queryFormDataCopy
        )).data
        loading.close()
        if (data.code == 20000) {
          this.page.total = data.data.total;
          this.tableData = data.data.rows;
        }
      } else {
        let data = (await initList(this.page.currentPage, val, {})).data
        if (data.code == 20000) {
          loading.close()
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
        if (this.queryFormDataCopy.createTime) {
          this.queryFormDataCopy.startTime = this.queryFormDataCopy.createTime[0];
          this.queryFormDataCopy.endTime = this.queryFormDataCopy.createTime[1];
          this.queryFormDataCopy.createTime = ''
        }
        let data = (await initList(
          val,
          this.page.pageSize,
          this.queryFormDataCopy
        )).data
        if (data.code == 20000) {
          loading.close()
          this.page.total = data.data.total;
          this.tableData = data.data.rows;
        }
      } else {
        let data = (await initList(val, this.page.pageSize, {})).data
        if (data.code == 20000) {
          loading.close()
          this.page.total = data.data.total;
          this.tableData = data.data.rows;
        }
      }
    },

    // 初始化列表数据
    async initList () {
      this.fuzzy = false;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 2555, 255, 0.5)'
      })
      let data = (await initList(this.page.currentPage, this.page.pageSize, {})).data

      if (data.code == 20000) {
        loading.close()
        this.page.total = data.data.total;
        this.tableData = data.data.rows;
      }
    },


    // 初始化配置
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
  // 页面进来时初始化的内容
  async mounted () {
    let login = {
      loginModule: '日志管理_登录日志 / Login log',
      loginResult: '0'
    };
    await loginApproval(login);

    this.initConfig(); // 初始化配置
    this.initList();
  },
  beforeDestroy: function () {},
  components: {},

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
</style>
