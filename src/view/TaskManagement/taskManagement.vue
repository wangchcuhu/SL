<template>
  <div class="contents" v-if="flag">

    <div class="CRUD">
      <el-button type="primary"  icon="el-icon-edit" @click="toAdd()"
      v-if="AuthorityData.showHidden.includes(5010)"
            >新增 / Add</el-button
          >

  <!-- <authImg></authImg> -->
      <!-- 新增 -->
      <div style="display:flex">
        <el-tooltip
          class="item"
          effect="dark"
          content="搜索 / Search"
          placement="top"
        >
          <el-button
            icon="el-icon-search"
            circle
            @click.native="query"
            class="crudHeaderBtn"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="刷新 / Refresh"
          placement="top"
        >
          <el-button
            icon="el-icon-refresh-left"
            circle
            @click.native="reflash(2)"
            class="crudHeaderBtn"
          ></el-button>
        </el-tooltip>
      </div>
    </div>
    <!-- Table -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      :cell-style="rowClass"
      border
      style="width: 100%"
      :key="0"
    >
      <el-table-column
        type="index"
        width="110"
        label="序号 / Index"
        align="center"
      ></el-table-column>

      <el-table-column
        v-for="(item, index) in checkeds"
        :key="`col_${index}`"
        :prop="checkeds[index].value"
        :label="checkeds[index].label"
      >
        <template slot-scope="scope">
          <div v-if="checkeds[index].value != 'taskStatus'">
            {{ scope.row[checkeds[index].value] }}
          </div>
          <div v-else>
            <p v-if="scope.row[checkeds[index].value] == 1">
              初始化 / Initialize
            </p>
            <p v-if="scope.row[checkeds[index].value] == 2">
              进行中 / Underway
            </p>
            <p v-if="scope.row[checkeds[index].value] == 3">暂停中 / Paused</p>
            <p v-if="scope.row[checkeds[index].value] == 4">
              已作废 / Abolished
            </p>
            <p v-if="scope.row[checkeds[index].value] == 5">结束 / Finished</p>
          </div>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column fixed="right" :label="$t('Public.operation')">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              功能 / Function
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                 @click.native="AuthorityData.electronicSignature.includes(5028)?c1():public(2,5028)"
                v-if="scope.row.taskStatus === 1&&AuthorityData.showHidden.includes(5028)"

                >导出任务批次结束报告/ Export task batch end report </el-dropdown-item
              >    <el-dropdown-item
                 @click.native="AuthorityData.electronicSignature.includes(5029)?c2():public(3,5029)"
                v-if="scope.row.taskStatus === 1&&AuthorityData.showHidden.includes(5029)"

                >打印批次报告/ Print batch report </el-dropdown-item
              >    <el-dropdown-item
                 @click.native="AuthorityData.electronicSignature.includes(5030)?c3():public(4,5030)"
                v-if="scope.row.taskStatus === 1&&AuthorityData.showHidden.includes(5030)"

                >导出任务性能报告/ Export task performance report </el-dropdown-item
              >
              <el-dropdown-item
                @click.native="AuthorityData.electronicSignature.includes(5031)?c4():public(5,5031)"
                v-if="scope.row.taskStatus === 1&&AuthorityData.showHidden.includes(5031)"
                >打印性能报告/ Print performance report </el-dropdown-item
              >

              <el-dropdown-item
                @click.native="AuthorityData.electronicSignature.includes(5043)?c5():public(15,5043)"
                v-if="scope.row.taskStatus === 1&&AuthorityData.showHidden.includes(5043)"
              >任务结束 / Task Finish </el-dropdown-item
              >

              <el-dropdown-item
                @click.native="edit(scope.row)"
                v-if="scope.row.taskStatus == 1&&AuthorityData.showHidden.includes(5008)"
                >编辑/ Edit </el-dropdown-item
              >
              <el-dropdown-item
                @click.native="AuthorityData.electronicSignature.includes(5011)?checkDetelCancel(scope.row.id):detelCancel(scope.row.id)"
                v-if="scope.row.taskStatus == 1&&AuthorityData.showHidden.includes(5011)"
                >删除 / Delect</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="checkFile(scope.row)"
                v-if="scope.row.taskStatus == 1&&AuthorityData.showHidden.includes(5012)"
                >启动 / Start</el-dropdown-item
              >
<!--              <el-dropdown-item-->
<!--                @click.native="finish(scope.row)"-->
<!--                v-if="scope.row.taskStatus == 2"-->
<!--                >结束 / Finish</el-dropdown-item-->
<!--              >-->
              <el-dropdown-item
                @click.native="finish(scope.row)"
                v-if="scope.row.taskStatus == 2"
                >暂停 / suspended</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="Details(scope.row)"
                v-if="scope.row.taskStatus == 2"
                >详情 / Details</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="TurnOn(scope.row)"
                v-if="scope.row.taskStatus == 3"
                >开启 / TurnOn</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="Rework(scope.row)"
                v-if="scope.row.taskStatus == 3"
                >返工 / Rework</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
   <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>
    <!-- 新增 -->
    <el-dialog
      :visible.sync="addBox"
      id="add"
      width="60%"
      :before-close="beforeClose"
      :close-on-press-escape="isClose"
      :close-on-click-modal="false"
    >
      <div slot="title" style="font-size:20px">
        <span style="font-size:22px">{{ title }}</span>
        <span style="font-size:22px"      v-if="this.title === '新增'"> / Add</span>
        <span style="font-size:22px"      v-if="this.title === '编辑'"> / Edit</span>
        <span style="font-size:22px"      v-if="this.title === '搜索'"> / Query</span>
        <!-- <span style="float:right;padding-right: 40px">
            <i
              class="el-dialog__close el-icon-full-screen"
              style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(0)"
            ></i>
          </span> -->
      </div>
      <el-row :gutter="24">
        <el-form
          autocomplete="new-password"
          ref="addForm"
          label-position="left"
          :model="queryFormData"
          label-width="200px"
          :rules="this.title==='搜索'?queryRules:rules"
        >
          <el-col :span="11">
            <el-form-item
              label="产品编号 / ProductCode"
              prop="productCode"
            >
              <el-input
                autocomplete="new-password"
                v-model.trim="queryFormData.productCode"
                placeholder="请输入产品编号"
                :maxlength="11"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="批号 / lotNo"
              prop="lotNumber"
            >
              <el-input
                autocomplete="new-password"
                v-model.trim="queryFormData.lotNumber"
                placeholder="请输入批号"
                :maxlength="11"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="产品货号 / ArtNo"
              prop="articleNumber"
            >
              <el-input
                autocomplete="new-password"
                v-model.trim="queryFormData.articleNumber"
                placeholder="请输入货号"
                :maxlength="11"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="XML名称 / XMLName"
              prop="xmlPathName"
            >
              <el-input
                autocomplete="new-password"
                v-model.trim="queryFormData.xmlPathName"
                placeholder="请输入CODESOFT模板名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <!-- <MySignature labelWidth='200px' v-if="this.title=='编辑'" :formMS.sync='queryFormData.formMS' btnName='User_Management_Edit' ></MySignature> -->
      <span slot="footer">
        <el-button
          type="primary"
          @click="querySureSS"
          v-if="this.title === '搜索'"
          >提交 / Sumbit</el-button
        >
        <el-button
          type="primary"
          @click='AuthorityData.electronicSignature.includes(5010)?signButton("Task_Management_Add"):querySure()'
          v-if="this.title === '新增'"
          >提交 / Sumbit</el-button
        >
          <el-button
          type="primary"
          @click='AuthorityData.electronicSignature.includes(5008)?signButton("Task_Management_Edit"):querySure()'
          v-if="this.title === '编辑'"
          >提交 / Sumbit</el-button
        >
        <el-button
          type="primary"
          v-if="this.title === '新增' || this.title === '搜索'"
          @click="queryClean"
          >清空 / Clear</el-button
        >
        <el-button @click="queryCancel">关闭 / Close</el-button>
      </span>
    </el-dialog>
    <!-- 文件校验 -->
    <el-dialog
      :visible.sync="checkFileBox"
      id="checkFile"
      width="60%"
      :before-close="
        () => {
          this.checkCancel();
        }
      "
      :close-on-press-escape="isClose"
      :close-on-click-modal="false"
    >
      <div
        slot="title"
        style="font-size:20px;width: 95%;display: flex;justify-content: space-between;"
      >
        <span style="font-size:22px">校验文件 / Check file
</span>
<div>
        <span style="font-size:22px" >模式 / Model：</span>
      <span style="font-size:22px" v-if="mode">联机 / Online</span>
        <span style="font-size:22px" v-else>离线 / Offline</span>
        </div>
      </div>
      <!-- body -->
      <div class="body_top">
        <div class="body_top_left">
          <el-row :gutter="24">
            <el-form
              autocomplete="new-password"
              ref="checkForm"
              label-position="left"
              :model="checkFormData"
              size="medium"
              label-width="250px"
              :rules="checkRules"
            >
              <el-col :span="24">
                <el-form-item
                  class="paddingLeft"
                  label="产品代码 / Product Code"
                  prop="productCode"
                >
                  <el-input
                    autocomplete="new-password"
                    v-model.trim="checkFormData.productCode"
                    :maxlength="11"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  class="paddingLeft"
                  label="批号 / Batch number"
                  prop="lotNumber"
                >
                  <el-input
                    autocomplete="new-password"
                    v-model.trim="checkFormData.lotNumber"
                    :maxlength="11"

                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  class="paddingLeft"
                  label="产品货号 / Product code"
                  prop="numeroArticolo"
                >
                  <el-input
                    autocomplete="new-password"
                    v-model.trim="checkFormData.numeroArticolo"
                    :maxlength="11"

                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  class="paddingLeft"
                  label="最后使用的序列号 / Last used serial number"
                  prop="kitNumber"
                >
                  <el-input
                    autocomplete="new-password"
                    v-model.trim="checkFormData.kitNumber"
                    :maxlength="11"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <el-divider direction="vertical"></el-divider>
        <!-- 对应的状态 -->
        <div class="body_top_right">
          <el-row :gutter="24">
            <el-col
              :span="22"
              v-for="(item, index) in fileState"
              :key="index"
              style="padding-bottom: 14px;display: flex;align-items: center;"
            >
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                v-if="item.state"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-close"
                v-else
                circle
              ></el-button>
              <div style="display: flex;flex-direction: column;">
                <span style="padding-left: 20px;">{{ item.title }}</span>
                <span style="padding-left: 20px;">{{ item.message }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="body_bottom">
        <span style='font-size:16px'>输入有效，按启动应用输入的参数 / The input is valid, press to start the application input parameters</span>
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          v-if="stateAll"
        ></el-button>
        <el-button type="info" icon="el-icon-close" v-else circle></el-button>
      </div>
        <!-- <div class="body_bottom" id='111'>
        <div style='display:flex'>
           <span style='display: flex;
       align-items: center;'>序列号插入测试 / Serial number insertion test</span>
           <el-input v-model="serialNumber" placeholder="请输入内容"></el-input>
                   <el-button type="success" @click='testLims'>测试 / Test</el-button>
        </div>
      </div> -->
      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => this.checkCancel()">取 消 / Cancel</el-button>
        <el-button
       :disabled="!stateAll"
        @click="AuthorityData.electronicSignature.includes(5012)?checkCheckFile():startUp()" type="primary">启 动 / Start</el-button>
      </span>
    </el-dialog>
  </div>
  <check v-else></check>
  <!-- <div v-else>111</div> -->
</template>
<script>
import { getpicture, addTask, editTask, getTable, detelTable, Rework, testLims, loginApproval, verifyAccount, testBtn } from './taskManagement.js';
import check from './check.vue';
import {signature} from '@/api/signature.js'
import MySignature from '@/components/signature.vue'
import signaturePublic from '@/components/signaturePublic.vue'
import authImg from '@/components/authImg.vue'

// import data from './fackData.js';
// 流程收集按钮===》触发电子签名组件===》收集信息（person）====》触发原本没有电子签名时候的函数（赝本的函数中需要加上person）
export default {
  props: {},
  data () {
    return {
      rrrrrrrrrr: null,
      AuthorityData: {},
      taskInfoId: '',
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
      serialNumber: undefined, // 测试用
      Timestamp: undefined, // 每500ms调用一次接口，成功后关闭这个计数器（挂载在浏览器上）clearInterval(timeoutID)
      Timestamp3: undefined, // 每500ms调用一次接口，成功后关闭这个计数器（挂载在浏览器上）clearInterval(timeoutID)
      flag: true, // 是否开启三级页面
      checkFormData: {
        productCode: '', // 产品代码
        lotNumber: '', // 批号
        numeroArticolo: '', // 文章编号
        kitNumber: '' // 最后使用的序列号
      }, // 检验文件的收集
      fileState: [
        // ls
        {
          state: false,
          message: '',
          title: 'SQL查询结果 / SQL query results:'
        },
        // productCodeLotNumber
        {
          state: false,
          message: '',
          key: 'productCodeLotNumber',
          title: 'XML文件/ XML file:'
        },
        // codeSoft
        {
          state: false,
          message: '',
          title: '标签模式 / Label mode:'
        },
        // jobCamera
        {
          state: false,
          message: '',
          title: '工作相机 / Working camera:'
        }
      ],
      webSockets: undefined,
      stateAll: false, // 总的状态
      mode: false, // 默认独立模式
      checkFileBox: false, // 校验文件
      tableData: [],
      addBox: false, // 新增控制
      isClose: true, // 导出遮罩是否可关闭
      isFullscreen: false, // 是否全屏,
      title: undefined,
      row: {}, // 选中的那行
      // 收集的数据
      queryFormData: {
        productCode: '', // 产品编号
        lotNumber: '', // 批号
        articleNumber: '', // 货号
        xmlPathName: '', // CODESOFT模板名称
        formMS: {}// 收集签字信息
      },
      queryData: {}, // 搜索的存储信息
      checkRules: {
        productCode: [
          {
            required: true,
            message: '请输入产品编号',
            trigger: 'blur'
          }
        ],
        lotNumber: [
          {
            required: true,
            message: '请输入批号',
            trigger: 'blur'
          }
        ]
      },
      rules: {
        productCode: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        lotNumber: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        articleNumber: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        xmlPathName: [
          {
            required: false,
            trigger: 'blur'
          }
        ]
      },
      queryRules: {
        productCode: [
          {
            required: false,
            trigger: 'blur'
          }
        ],
        lotNumber: [
          {
            required: false,
            trigger: 'blur'
          }
        ],
        articleNumber: [
          {
            required: false,
            trigger: 'blur'
          }
        ],
        xmlPathName: [
          {
            required: false,
            trigger: 'blur'
          }
        ]
      },
      // Table包含的序列
      checkeds: [
        { value: 'productCode', label: '产品编号 / ProductCode' },
        { value: 'lotNumber', label: '批号 / LotNo' },
        { value: 'articleNumber', label: '产品货号 / ArtNo' },
        { value: 'xmlPathName', label: 'XML名称 / XML Name' },
        { value: 'taskStatus', label: '状态 / Status' }
      ],
      // 主页分页
      page: {
        currentPage: undefined,
        pageSize: undefined,
        total: undefined
      },
      timer: undefined // 定时器(定时请求)
    };
  },
  computed: {},
  created () {
    this.AuthorityData = JSON.parse(sessionStorage.getItem('dataAuthority'))
  },
  destroyed () {
    clearInterval(this.timer);
  },
  async mounted () {
    let login = {
      loginModule: '任务管理_任务信息 / Task management_task information',
      loginResult: '0'
    };
    await loginApproval(login);
    this.initLists();
  },
  watch: {
    // 2.watch 不能检测以下变动的数组：
    // 当你利用索引直接设置一个项时，例如：myVue.demo[1] = 5
    // 当你修改数组的长度时，例如：myVue.demo.length = 2
    // 文件校验弹窗在开启的时候会自动的链接websocket，所以需要在弹窗关闭的时候关闭websocket
    checkFileBox (newValue, oldValue) {
      console.log(newValue, oldValue);
      if (!newValue) {
        // 关闭websocket
        this.webSockets.close();
      }
    }
  },
  methods: {
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
    // 测试lims数据
    async  testLims () {
      const result = (await testLims({'articleNumber': this.checkFormData.kitNumber,
        'serialNumber': this.serialNumber,
        productCode: this.checkFormData.productCode, // 产品代码
        lotNumber: this.checkFormData.lotNumber // 批号
      })).data
      console.log(result);
    },
    // 刷新功能
    flash () {
    // 全局刷新遮蔽的效果
      const loading = this.$loading({
        lock: true,
        text: '正在校验文件请稍等 / Checking the file, please wait',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 2555, 255, 0.5)'
      });
      return loading
    },
    // 查询
    query () {
      this.addBox = true;
      this.title = '搜索';
      if (this.queryData == {}) {
      } else {
        this.queryFormData = {
          ...this.queryFormData,
          ...JSON.parse(JSON.stringify(this.queryData))
        };
      }
    },

    // 作废生成一条新单据，刷新页面
    async Rework (row) {
      const data = (await Rework(row)).data;
      if (data.code == 20000) {
        this.$message.success(data.message);
        // 刷新到第一页
        this.reflash();
      } else {
        this.$message.error(data.message);
      }

      console.log();
    },
    // 二次开启的时候，这时候checkFormData可能没值
    Details (row) {
      this.flag = false
      // 清除定时器
      clearInterval(this.timer);
      this.keepWebSocket();
      this.webSockets.send({
        message: 0,
        id: this.row.id,
        taskInfoId: this.row.taskInfoId,
        ...this.checkFormData
      });
    },
    // 转化状态
    getStates (state) {
      console.log(state);
      return 1;
    },

    // 校验文件之后正常启动
    startUp () {
      clearInterval(this.Timestamp);
      clearInterval(this.Timestamp3);
      this.webSockets.close()
      // 跳转三级页面
      this.$router.push(
        {
          path: '/check',
          query: {
            productCode: this.checkFormData.productCode,
            lotNumber: this.checkFormData.lotNumber,
            taskInfoId: this.taskInfoId,
            ...this.checkFormData
          }
        }
      );
    },
    // 建立WebSocket连接http://172.169.90.96:8088//获取用户的id,联机模式是由两种状态下控制，改变
    // 一个是查询，另一个是websocket
    keepWebSocket (taskInfoId) {
      this.taskInfoId = taskInfoId
      // 这里应该去的是环境
      // this.webSockets = new WebSocket(`ws://172.169.90.25:8088/fcs/${sessionStorage.getItem('userId')}/${taskInfoId}`);
      this.webSockets = new WebSocket(`ws://192.168.2.221:8088/fcs/${sessionStorage.getItem('userId')}/${taskInfoId}`);

      // this.webSockets = new WebSocket(`ws://192.168.2.221:8088/fcs/${sessionStorage.getItem('userId')}/${taskInfoId}`);

      // 连接发生错误的回调方法
      this.webSockets.onerror = event => {
        console.error(event);
      };
      // 连接成功建立的回调方法
      this.webSockets.onopen = event => {
        console.log('开启WebSocket');
      };
      // 连接关闭的回调方法
      this.webSockets.onclose = () => {
        console.log('关闭WebSocket');
      };
      // 接收到消息的回调方法(websocket建立连接之后，后端会每隔一段时间给我发送一个模式的装填)
      this.webSockets.onmessage = event => {
        const data = JSON.parse(event.data);
        // 二级页面处理（判断key为0）keep和PLC是否通讯成功
        if (this.flag) {
          if (JSON.stringify(data['3'])) {
            if (!data['3']) {
              this.$message.error(
                '开启任务失败，其他任务正在进行中 / Description Failed to start the task. Other tasks are in progress'
              );
              // 关闭webSockets和定时器
              clearInterval(this.timer);
              this.webSockets.close();
              this.checkFileBox = false;
            }
          }

          // 获取其余三者的值
          if (JSON.stringify(data['4'])) {
            if (data['4']) {
              // 校验文件，实时
              this.verifyTaskInfoCopy({'data': data['4'], code: 20000});
            } else {
            }
          }
          // 获取SQL查询结果 / SQL query results:
          if (JSON.stringify(data['5'])) {
            if (data['5']) {
              // 校验文件，实时
              this.verifyTaskInfoCopy3({'data': data['5'], code: 20000});
            } else {
            }
          }
        } else {
          // 三级页面的判断key为1代表keep和后端的通讯，为false是代表通讯失败此时断掉连接发送消息
          console.log('三级页面');
        }
      };
    },
    // 编辑
    edit (row) {
      this.clearFormData()
      this.row = {...row};
      this.addBox = false;
      // 目的不改变queryFormData的结构不然在使用组件清空时会不起作用
      for (let key in row) {
        if (Object.keys(this.queryFormData).includes(key)) {
          this.queryFormData[key] = row[key];
        }
      }
      this.addBox = true;
      this.title = '编辑';
    },
    // 初始化
    initLists () {
      // 获取类标的初始数据
      this.getData();
    },
    rowClass () {
      return 'text-align: center;';
    },
    // 清空FormData，恢复原始值
    clearFormData () {
      // 收集的数据
      this.queryFormData = {
        productCode: '', // 产品编号
        lotNumber: '', // 批号
        articleNumber: '', // 产品货号
        xmlPathName: '', // CODESOFT模板名称
        formMS: {}// 收集签字信息
      }
    },
    // 新增触发
    async toAdd () {
      // const r = await getpicture()
      // this.rrrrrrrrrr = r.data.data
      this.clearFormData()
      this.addBox = true;
      this.title = '新增';
    },
    // 敞口关闭前的回调
    beforeClose (done) {
      this.$confirm('是否继续关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 新增关闭
        this.queryCancel();
      });
    },
    // 全屏
    handleScreen (index) {
      this.isFullscreen = !this.isFullscreen;
    },
    async signature (fn) {
      const data = (await signature({ ...this.queryFormData.formMS })).data
      if (data.code == 20000) {
        fn()
      } else {
        this.$message.error(data.message)
        return {
          code: '404'
        }
      }
    },
    signButton (btnName) {
      this.$refs['addForm'].validate(async valid => {
        if (valid) {
          this.signPerson.btnName = btnName
          this.signPerson.dialogVisible = true
        }
      })
    },
    // 在这里触发所有需要电子签名的后续提交操作，新增和编辑写在了一起，然后是删除,要在结束的时候清空signPerson
    authenticateUser () {
      if (this.signPerson.btnName == 'Task_Management_Edit' || this.signPerson.btnName == 'Task_Management_Add') {
        this.checkAddOrEdit()
      } else if (this.signPerson.btnName == 'Task_Management_Delete') {
        this.checkDetelCancelMain()
      } else if (this.signPerson.btnName == 'Task_Management_Check') {
        this.checkCheckFileMain()
      } else if (this.signPerson.btnName == 'Task_Management_Export_Task_Batch_End_Report') {
        this.add(2, 5028)
      } else if (this.signPerson.btnName == 'Task_Management_Print_Batch_Report') {
        this.add(3, 5029)
      } else if (this.signPerson.btnName == 'Task_Management_Data_Infoformation_Export_Task_Performance_Report') {
        this.add(4, 5030)
      } else if (this.signPerson.btnName == 'Task_Management_Print_Performance_Report') {
        this.add(5, 5031)
      } else if (this.signPerson.btnName == 'Task_Management_Task_Finish') {
        this.add(15, 5043)
      }
    },
    async checkAddOrEdit () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResult(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        this.querySure()
      })
    },
    // 新增提交
    async querySure () {
      this.$refs['addForm'].validate(async valid => {
        if (valid) {
          debugger
          // 新增调addTask,编辑调editTask
          const data = this.title == '新增' ? (

            (await addTask({ ...this.queryFormData,
              'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5010)
                ? this.signPerson
                : null)})).data

          ) : (
            (await editTask({ ...this.row,
              ...this.queryFormData,
              'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5008)
                ? this.signPerson
                : null) })).data
            // this.signature(async function () {
            //   return (await editTask({ ...this.row,
            //     ...this.queryFormData,
            //     'person':
            //     // 有电子签就塞person没有就塞null
            //   (this.AuthorityData.electronicSignature.includes(500)
            //     ? this.signPerson
            //     : null) })).data
            // })
          )
          if (data.code == 20000) {
            this.$message.success(data.message);
            this.queryCancel();
            this.getData(1, this.page.pageSize, {});
          } else if (data.code == 404) {
          } else {
            this.$message.error(data.message);
            this.queryCancel();
          }
        }
      });
    },
    // 搜索
    async querySureSS () {
      this.$refs['addForm'].validate(async valid => {
        if (valid) {
          const data = (
            await this.getData(1, this.page.pageSize, this.queryFormData)
          ).data;
          if (data.code == 20000) {
            this.$message.success(data.message);
            this.queryData = JSON.parse(JSON.stringify(this.queryFormData));
            this.queryCancel();
          } else {
            this.$message.error(data.message);
            this.queryCancel();
          }
        }
      });
    },

    // 新增清空
    queryClean () {
      this.$refs['addForm'].resetFields();
      this.row = {};
    },
    // 新增关闭
    queryCancel () {
      // this.$refs['addForm'].resetFields();
      // this.row = {}
      this.queryClean();
      this.addBox = false;
      this.signPerson = {
        row: {}, // 存整个row
        rowId: '', // 需要执行的操作行id,有的需要，有的不要
        userId: '',
        dialogVisible: false,
        reason: '', // 修改原因
        btnName: '', // 按钮字段
        password: '', // 用户密码
        userAccount: ''// 用户名称
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
    // 公共的调接口名的方法
    async getResult (fn, args) {
      debugger
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
      debugger
      // 在这里执行代码(打印导出等功能)
      this.getResult(testBtn, {'type': flag,
        'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(num)
                ? this.signPerson
                : null)})
    },

    // 导出任务批次结束报告start=======================================================================
    c1 () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Task_Management_Export_Task_Batch_End_Report'
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

    // 导出任务批次结束报告end=======================================================================


    // 打印批次报告start=======================================================================
    c2 () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Task_Management_Print_Batch_Report'
    },
    // 打印批次报告end=======================================================================

    // 导出任务性能报告start=======================================================================
    c3 () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Task_Management_Data_Infoformation_Export_Task_Performance_Report'
    },
    // 导出任务性能报告end=======================================================================

    // 打印性能报告start=======================================================================
    c4 () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Task_Management_Print_Performance_Report'
    },
    // 打印性能报告end=======================================================================

    // 任务结束start=======================================================================
    c5 () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Task_Management_Task_Finish'
    },
    // 任务结束end=======================================================================



    // 删除start========================================================================================================================================
    // 流程收集按钮===》触发电子签名组件===》收集信息（person）====》触发原本没有电子签名时候的函数（赝本的函数中需要加上person）
    checkDetelCancel (id) {
      this.signPerson.rowId = id
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Task_Management_Delete'
    },
    // 校验删除
    async checkDetelCancelMain () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResult(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.detelCancel()
      })
    },
    // 删除关闭
    detelCancel (id) {
      this.$confirm('是否继续删除? / Whether to continue deleting?', '提示 / Hint', {
        confirmButtonText: 'Sure / 确定',
        cancelButtonText: 'Cancel / 取消',
        type: 'warning'
      }).then(() => {
        // 删除关闭
        const data = detelTable({ id: id || this.signPerson.rowId,
          'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5010)
                ? this.signPerson
                : null)});
        Promise.all([data])
          .then(dataArr => {
            const data = dataArr[0].data;
            if (data.code === 20000) {
              this.$message.success(data.message);
              this.getData(1, this.page.pageSize, {});
              this.deleteClear()
              // 清空
            } else {
              this.$message.error(data.message);
              this.deleteClear()
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error(data.message);
          });
      });
    },
    deleteClear () {
      this.signPerson = {
        row: {}, // 存整个row
        rowId: '', // 需要执行的操作行id,有的需要，有的不要
        userId: '',
        dialogVisible: false,
        reason: '', // 修改原因
        btnName: '', // 按钮字段
        password: '', // 用户密码
        userAccount: ''// 用户名称
      }
    },
    // 删除end========================================================================================================================================
    // 校验start========================================================================================================================================
    // 流程收集按钮===》触发电子签名组件===》收集信息（person）====》触发原本没有电子签名时候的函数（赝本的函数中需要加上person）
    checkCheckFile () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Task_Management_Check'
    },
    // 校验删除
    async checkCheckFileMain () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResult(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.startUp()
      })
    },
    // 校验end========================================================================================================================================


    // 校验开启
    checkFile (row) {
      this.row = {...row};
      this.checkFileBox = true;
      // 塞物料代码和批号
      this.checkFormData.productCode = row.productCode;
      this.checkFormData.lotNumber = row.lotNumber;
      // 1.手动加的值不会触发校验文件状态的方法，手动触发，这里可以优化2.异步方法，将执行这个方法的队列放在
      //  this.checkFileBox = true 这个异步之后

      // this.Timestamp = setInterval(() => { this.verifyTaskInfoCopy() }, 500);
      // 同时开启webScoket
      setTimeout(() => {
        this.keepWebSocket(row.taskInfoId);
      }, 0);
      // 开启循环：每秒出现一次提示框(每0.5秒发送一次请求)一定要用箭头函数，不然this的只想就是window
      this.Timestamp = setInterval(() => {
        this.webSockets.send(
          JSON.stringify({
            message: 2,
            ...this.checkFormData
          })
        );
      }, 500);
      // 3代表获取lims数据库的变量
      this.Timestamp3 = setInterval(() => {
        this.webSockets.send(
          JSON.stringify({
            message: 3,
            ...this.checkFormData
          })
        );
      }, 500);
    },
    // 校验关闭
    checkCancel () {
      clearInterval(this.Timestamp)
      clearInterval(this.Timestamp3)
      this.checkFileBox = false;
      this.checkClean();
    },
    // 校验清空
    checkClean () {
      this.$refs['checkForm'].resetFields();
    },
    // 校验文件状态2
    async verifyTaskInfoCopy (data) {
      if (data.code == 20000) {
        //  loading.close()
        // 特定取值（取2的状态）
        if (data.data.length == 0) {
          // 查询为空的时候全部nulll
          this.fileState[1].state = false;
          this.fileState[1].message = null;
          this.fileState[2].state = false;
          this.fileState[2].message = null;
          this.fileState[3].state = false;
          this.fileState[3].message = null;
        } else {
          for (let item of data.data) {
            // 为XML文件塞状态
            if (item.key == 'productCodeLotNumber') {
              this.fileState[1].state = item.status;
              this.fileState[1].message = item.value;
            }
            // // 先判断是否是离线模式，联机模式才赋值,
            // if (item.key == 'ls') {
            //   this.mode = !!item.status;
            //   if (item.status) {
            //     this.fileState[0].message = item.value;
            //     this.fileState[0].state = item.status;
            //     this.checkFormData['kitNumber'] = item.nextSerial;
            //   } else {
            //     this.fileState[0].message = item.value;
            //     this.fileState[0].state = item.status;
            //   }
            // }
            // codeSoft
            if (item.key == 'codeSoft') {
              this.fileState[2].state = item.status;
              this.fileState[2].message = item.value;
            }
            // jobCamera
            if (item.key == 'jobCamera') {
              this.fileState[3].state = item.status;
              this.fileState[3].message = item.value;
            }
          }
        }

        // 这里判断一下总状态(1,2,3的状态全为true并且序列号不为空)
        if (
          this.fileState[1].state &&
        this.fileState[2].state &&
        this.fileState[3].state &&
        this.checkFormData.kitNumber
        ) {
          this.stateAll = true;
        } else {
          this.stateAll = false;
        }
      } else {
        //  loading.close()
        this.$message.error(data.message)
      }
    },
    // 校验文件状态3
    async verifyTaskInfoCopy3 (data) {
      if (data.code == 20000) {
        // 返回空代表离线模式
        if (data.data.length == 0) {
          this.mode = false
          this.fileState[0].message = null;
          this.fileState[0].state = false;
        } else {
        //  loading.close()
        // 特定取值（取2的状态）
          for (let item of data.data) {
            // 为XML文件塞状态
          // if (item.key == 'productCodeLotNumber') {
          //   this.fileState[1].state = item.status;
          //   this.fileState[1].message = item.value;
          // }
          // 先判断是否是离线模式，联机模式才赋值,
            if (item.key == 'ls') {
              this.mode = !!item.status;
              if (item.status) {
                this.fileState[0].message = item.value;
                this.fileState[0].state = item.status;
                this.checkFormData['kitNumber'] = item.nextSerial;
              } else {
                this.fileState[0].message = item.value;
                this.fileState[0].state = item.status;
              }
            }
          // // codeSoft
          // if (item.key == 'codeSoft') {
          //   this.fileState[2].state = item.status;
          //   this.fileState[2].message = item.value;
          // }
          // // jobCamera
          // if (item.key == 'jobCamera') {
          //   this.fileState[3].state = item.status;
          //   this.fileState[3].message = item.value;
          // }
          }
        }
        // 这里判断一下总状态(1,2,3的状态全为true并且序列号不为空)
        if (
          this.fileState[1].state &&
        this.fileState[2].state &&
        this.fileState[3].state &&
        this.checkFormData.kitNumber
        ) {
          this.stateAll = true;
        } else {
          this.stateAll = false;
        }
      } else {
        //  loading.close()
        this.$message.error(data.message)
      }
    },

    // 校验文件状态
    verifyTaskInfo (data) {
      // 特定取值（取2的状态）
      for (let item of data) {
        // 为XML文件塞状态
        if (item.key == 'productCodeLotNumber') {
          this.fileState[1].state = item.status;
          this.fileState[1].message = item.value;
        }
        // 先判断是否是离线模式，联机模式才赋值,
        if (item.key == 'ls') {
          if (item.status) {
            this.fileState[0].message = item.value;
            this.fileState[0].state = item.status;
            this.checkFormData['kitNumber'] = item.nextSerial;
          } else {
            this.fileState[0].message = item.value;
            this.fileState[0].state = item.status;
          }
        }
        // codeSoft
        if (item.key == 'codeSoft') {
          this.fileState[2].state = item.status;
          this.fileState[2].message = item.value;
        }
        // jobCamera
        if (item.key == 'jobCamera') {
          this.fileState[3].state = item.status;
          this.fileState[3].message = item.value;
        }
      }
      // 这里判断一下总状态(1,2,3的状态全为true并且序列号不为空)
      if (
        this.fileState[1].state &&
        this.fileState[2].state &&
        this.fileState[3].state &&
        this.checkFormData.kitNumber
      ) {
        this.stateAll = true;
      } else {
        this.stateAll = false;
      }
    },
    // 更改分页条数
    handleSizeChange (val) {
      this.page.pageSize = val;
      this.getData(this.page.currentPage, val, this.queryForm);
    },
    // 跳转分页
    handleCurrentChange (val) {
      this.page.currentPage = val;
      // 分页查询的第二页的功能后端没有做
      this.getData(val, this.page.pageSize, this.queryForm);
    },
    reflash (flag = 1) {
      if (flag == 1) {
        this.getData(1, this.page.pageSize, this.queryForm);
      } else {
        this.queryForm = {};
        this.getData(1, this.page.pageSize, this.queryForm);
      }
    },
    // 获取初始数据
    getData (currentPage = 1, pageSize = 10, queryData = {}) {
      const loading = this.$LoadingEvent();
      const data = getTable(currentPage, pageSize, queryData);
      Promise.all([data])
        .then(dataArr => {
          // 不使用async和await的语法糖
          const data = dataArr[0].data;
          if (data.code == 20000) {
            // this.$message.success(data.message)
            this.tableData = data.data.results;
            this.page.total = data.data.total;
            this.page.currentPage = currentPage;
            this.page.pageSize = pageSize;
            loading.close();
          } else {
            this.$message.error(data.message);
            loading.close();
          }
        })
        .catch(err => {
          console.log(err);
          loading.close();
          console.log('后端服务断开');
        });
      return data;
    }
  },
  components: {
    check,
    MySignature,
    signaturePublic,
    authImg
  }
};
</script>

<style scoped lang="scss">
.contents {
  border-radius: 10px;
  .CRUD {
    background: white;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 15px;
    .crudHeader {
      width: 100%;
    }
  }
  .block {
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
  }
  .body_top {
    display: flex;
    width: 100%;
    .body_top_left {
      width: 60%;
      //  box-shadow: 1px 1px 20px 5px rgb(80, 74, 74);
    }
    .body_top_right {
      width: 40%;
    }
  }
  .body_bottom {
    width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .dialog-footer {
    display: flex;
    justify-content: space-around;
  }
  .el-divider--vertical {
    height: 214px !important;
    margin-right: 50px;
  }
}
</style>
