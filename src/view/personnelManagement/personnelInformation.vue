<template>
  <!-- 人员信息 -->
  <div class="contents">
    <div class="CRUD">

      <div class="crudHeader">
        <div class="addBtn">
           <el-button type="primary" icon="el-icon-edit" @click="bcformFn"
             v-if="AuthorityData.showHidden.includes(5009)"
            >基础设置 / Basic Settings</el-button
          >
          <el-button type="primary" icon="el-icon-edit" @click="toAdd"
            v-if="AuthorityData.showHidden.includes(5013)"
            >新增 / Add</el-button
          >
        </div>
                  <div style="display:flex">
          <el-tooltip class="item" effect="dark" content="搜索 / Search" placement="top">
            <el-button icon="el-icon-search" circle @click.native="querySelect" class="crudHeaderBtn"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="刷新 / Reflash" placement="top">
            <el-button icon="el-icon-refresh-left" circle @click.native="reflash()" class="crudHeaderBtn"></el-button>
          </el-tooltip>
        </div>
      </div>

      <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
        <!-- 姓名 所属部门 电子邮箱 状态 操作 -->
        <el-table-column type="index" align="center" width="50">
        </el-table-column>
        <el-table-column
          prop="userAccount"
          align="center"
          label="用户账号 / UserAccount"
        >
        </el-table-column>
        <el-table-column prop="otherName" align="center" label="姓名 / Name">
        </el-table-column>

        <el-table-column
          prop="accountType"
          align="center"
          label="用户类型 / AccountType"
        >
          <template slot-scope="scope">
            <span
              v-text="
                scope.row.accountType == 0
                  ? '超级管理员 / SuperAdministrator'
                  : scope.row.accountType == 1
                  ? '普通用户 / GeneralUser'
                  : '域账户 / DomainAccount'
              "
            ></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="phoneNumber"
          align="center"
          label="电话号码 / PhoneNumber"
        >
        </el-table-column>

        <!-- <el-table-column prop="email" align="center" label="电子邮箱 / E-mail">
        </el-table-column> -->
        <el-table-column prop="states" align="center" label="状态 / Status">
          <template slot-scope="scope">
            <span
              v-text="
                scope.row.states == 0 ? '启用 / Enable' : '禁用 / Disable'
              "
            ></span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" align="center" label="功能 / Function">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="primary">
                  操作 / Operation
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="queryRow(scope.row)"
                  >查阅 / Query</el-dropdown-item
                >

                <el-dropdown-item
                 @click.native="AuthorityData.electronicSignature.includes(5032)?resetCheckOpen(scope.row.userId):Reset(scope.row.userId)"
                  v-if="AuthorityData.showHidden.includes(5032)"
                  >重置密码 / Reset Password</el-dropdown-item
                >
                <el-dropdown-item @click.native="edit(scope.row)"
                  v-if="AuthorityData.showHidden.includes(5015)"
                  >编辑 / Edit</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="AuthorityData.showHidden.includes(5016)"
                  @click.native="AuthorityData.electronicSignature.includes(5016)?deleteCheckOpen(scope.row.userId):del(scope.row.userId)"
                  >删除 / Delete</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="AuthorityData.electronicSignature.includes(5017)?eableCheckOpen(scope.row.userId,scope.row.states):changeState(scope.row.userId, scope.row.states)"
                >
                  <span v-if="scope.row.states == 1&&AuthorityData.showHidden.includes(5017)">启用 / Enable</span>
                </el-dropdown-item>
                      <el-dropdown-item
                    @click.native="AuthorityData.electronicSignature.includes(5018)?disableCheckOpen(scope.row.userId, scope.row.states):changeState(scope.row.userId, scope.row.states)"
                >
                  <span   v-if="scope.row.states === 0 &&AuthorityData.showHidden.includes(5017)">禁用 / Disable</span>
                </el-dropdown-item>
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
          :current-page="personnelPage.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="personnelPage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="personnelPage.total"
        ></el-pagination>
      </div>
        <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>
                  <!-- 搜索 -->
    <el-dialog :visible.sync="queryBox"
               width="60%"
               :close-on-press-escape="true"
               :close-on-click-modal="false">
      <div slot="title"
           style="font-size:20px">
        <span style="font-size:22px">搜索 / Query</span>
      </div>
      <el-row :gutter="24">
        <el-form
                 ref="queryForm"
                 label-position="left"
                 :model="queryFormData"
                 size="medium"
                 label-width="200px"
               >
          <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          label="用户账号 / userAccount"
                          prop="userAccount">
              <el-input
                        v-model="queryFormData.userAccount"
                        :maxlength="11"
                        clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="paddingLeft"
                          label="姓名 / otherName"
                          prop="otherName">
              <el-input
                        v-model.trim="queryFormData.otherName"
                        :maxlength="11"
                        clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          label="用户类型 / accountType"
                          prop="accountType">
                        <el-select
                        v-model="queryFormData.accountType"
                        filterable
                        clearable
                        :style="{width: '100%'}"
                    >
                        <el-option
                          v-for="item in [
                          {value:0, label:'超级管理员 / SuperAdministrator'},
                          {value:1, label: '普通用户 / GeneralUser'},
                          {value:2, label:'域账户 / DomainAccount'}, ]"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="paddingLeft"
                          label="状态 / states"
                          prop="states">

                        <el-select
                        v-model="queryFormData.states"
                        filterable
                        clearable
                        :style="{width: '100%'}"
                    >
                        <el-option
                          v-for="item in [{value:0, label:'启用 / Enable'},{value:1, label:'禁用 / Disable'}]"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer">
                <el-button type="primary"
                   @click="SumbitQuery" >提交 / Sumbit</el-button>
        <el-button
                   @click.stop="queryClose(0)">清空 / Clear</el-button>
        <el-button @click.stop="queryClose(1)">关闭 / Close</el-button>
      </span>
    </el-dialog>
      <!-- 新增/编辑 -->
      <el-dialog
        :visible.sync="addBox"
        width="60%"
        :before-close="beforeClose"
        :close-on-press-escape="isClose"
        :close-on-click-modal="false"
      >
        <div slot="title" style="font-size:20px">
          <span  style="font-size:22px">{{ title }}</span>
          <span v-if="this.title==this.$t('Public.add')" style="font-size:22px"> / Add</span>
          <span v-if="this.title==this.$t('Public.edit')" style="font-size:22px"> / Edit</span>
          <span v-if="this.title==this.$t('Public.query')" style="font-size:22px"> / Check</span>
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
            ref="userFormData"
            label-position="right"
            :model="userFormData"
            :rules="userFormRule"
            size="medium"
            label-width="175px"
          >
            <el-col
              :span="24"
              class="formHeader"
              style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px;padding-left:20px;width:calc(100% + 16px);margin-left:-8px"
            >
              <el-col>
                <span style="font-size:22px">用户基本信息 / Basic user information</span>
              </el-col>
            </el-col>
            <el-col :span="11">
              <el-form-item
                class="userAccount"
                label="账号 / Account"
                prop="userAccount"
              >
                <el-input
                  autocomplete="new-password"
                  v-model.trim="userFormData.userAccount"

                  :maxlength="11"
                  clearable
                  :style="{ width: '100%' }"
                  :disabled="disabledVal || operate == 2"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" >
              <el-form-item
                class="paddingLeft"
                label="姓名 / Name"
                prop="otherName"
              >
                <el-input
                  autocomplete="new-password"
                  v-model.trim="userFormData.otherName"

                  :maxlength="11"
                  clearable
                  :disabled="disabledVal"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                class="paddingLeft"
                label="电话 / phoneNumber"
                prop="phoneNumber"
              >
                <el-input
                  autocomplete="new-password"
                  v-model.trim="userFormData.phoneNumber"
                  :maxlength="11"
                  clearable
                  :disabled="disabledVal"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="11" :offset="2">
              <el-form-item
                class="paddingLeft"
                label="邮箱 / Email"
                prop="email"
              >
                <el-input
                  autocomplete="new-password"
                  v-model.trim="userFormData.email"
                  :placeholder="
                    disabledVal
                      ? ''
                      : $t('Public.placeholder_prefix') +
                        $t('personnelInfo.formInfo.email')
                  "
                  clearable
                  :disabled="disabledVal"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="11">
              <el-form-item
                class="paddingLeft"
                label="有效期 / ValidPeriod"
                prop="validityTime"
              >
                <el-date-picker
                   :maxlength="11"
                             :style="{ width: '100%' }"
                  :picker-options="pickerOptions0"
                  v-model="userFormData.validityTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  :disabled="disabledVal"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
              <!-- <el-col :span="11">
              <el-form-item
                class="userAccount"
                label="密码 / Password"
                prop="userPwd"
              >
                <el-input
                  autocomplete="new-password"
                  v-model.trim="userFormData.userPwd"
                  :maxlength="11"
                  placeholder="请输入 / Please Enter"
                  clearable
                  :style="{ width: '100%' }"
                  :disabled="disabledVal || operate == 2"
                ></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="24" v-if="operate != 2">
              <el-form-item
                class="paddingLeft"
                label="备注 / Remark"
                prop="remark"
              >
                <el-input
                  autocomplete="new-password"
                  type="textarea"
                  v-model.trim="userFormData.remark"

                  :maxlength="200"
                  clearable
                  :disabled="disabledVal"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-col
            :span="24"
            class="formHeader"
            style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px;padding-left:20px;width:calc(100% + 16px);margin-left:-8px"
          >
            <el-col>
              <span style="font-size:22px">角色信息 / Role information</span>
            </el-col>
          </el-col>
          <el-table
            ref="rolesTable"
            :data="rolesTableData"
            style="width: 100%"
            :row-key="roleKey"
            :reserve-selection="checkAllOrradio"
            @selection-change="handleRolesChange"
            border
          >
            <el-table-column
              v-if="!disabledVal"
              type="selection"
              width="55"
              align="center"
            >
            </el-table-column>
            <el-table-column
              type="index"
              width="100"
              label="序号 / Index"
              align="center"
            >
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称 / Role Name" align="center">
            </el-table-column>
            <el-table-column prop="roleId" label="角色ID / Role ID" align="center">
            </el-table-column>
          </el-table>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" v-if="this.title==this.$t('Public.add')"
             @click.native="AuthorityData.electronicSignature.includes(5013)?addCheckOpen():submit()"
           >提 交 / Sumbit</el-button>
          <el-button type="primary"
            @click.native="AuthorityData.electronicSignature.includes(5015)?editCheckOpen():submit()"
            v-if="this.title==this.$t('Public.edit')">提 交 / Sumbit</el-button>
          <el-button @click="queryCancel">关 闭 / Close</el-button>
        </span>
      </el-dialog>
                <!-- 基础设置 -->
        <basicConfiguration :bcform='bcform' ></basicConfiguration>

      <!-- 删除 -->

      <!-- 导出 -->
    </div>
  </div>
</template>

<script>
import basicConfiguration from './basicConfiguration.vue'
import {
  fetchList,
  addUser,
  editUser,
  roleList,
  getUserInfo,
  delUSer,
  changeUSerState,
  resetPassword
} from '@/api/personnelInformation';
import signaturePublic from '@/components/signaturePublic.vue'
import {getuserBaseInfo, verifyAccount} from './basicConfiguration.js'
export default {
  name: 'userInfo',
  components: {
    basicConfiguration,
    signaturePublic
  },
  data () {
    return {
      checkAllOrradio: true, //  多选
      queryBox: false,
      queryFormDataSave: {},
      queryFormData: {
        userAccount: '',
        otherName: '',
        accountType: '',
        states: ''
      },
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
      bcform: {
        sharedFolderUserName: '', // 共享文件夹连接账号
        sharedFolderPassword: '', // 共享文件夹连接密码
        zipPassword: '', // zip加密密码
        id: '',
        tokenTimeOut: '',
        passwordActivateTime: '',
        // 用户管理基础设置
        lockCount: '', // 锁定次数
        isNeedModify: '', // 首次登陆修改密码
        reminderTime: '', // 密码到期提醒时间
        passwordResetTime: '', // 密码重置时间
        modifyReason: '', // 修改原因
        lockScreenTime: '', // 自动锁屏时间
        refreshTokenTimeOut: 9999, // 固定的值
        minLength: '', // 最小长度
        historyPwdCount: '', // 强制密码历史
        upperCaseLength: '', //  大写英文长度
        lowerCaseLength: '', //  小写英文长度
        numberLength: '', //   数字长度
        specialLength: '', //  特殊字符长度
        lockTime: '', //  锁定时间
        userName: '', // 验证名称
        // modifyReason: '', // 理由
        passWord: '', // 验证密码
        flag: false// 这里给子组件传递的是引用，所以在子组件上修改值会反映到父组件上，但是像Boolean或者数字那种就是值而不是传递的引用
      }, // 基础设置的弹窗
      // 有效期不能小于当前时间
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now();
        }
      },

      operate: 0,
      addBox: false,
      isClose: true,
      disabledVal: false,
      title: '',
      tableData: [],

      rolesTableData: [],
      personnelPage: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 角色分页
      rolePage: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      userFormData: {
        validityTime: '', // 有效期
        userId: '',
        otherName: '',
        phoneNumber: '',
        email: '',
        remark: '',
        modifyReason: '',
        userAccount: '',
        operatorUser: '',
        userPwd: '',
        allowLoginTimes: '',
        roleIds: [] // 角色id数组
      },
      userFormRule: {
        otherName: [
          {
            required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: false,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          },
          {
            pattern: /^1[3|4|5|7|8]\d{9}$/,
            trigger: 'blur',
            message: 'Please check the format'
          }
        ],
        // 待修改
        email: [
          {
            required: false,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          },
          {
            pattern: /^(\\w+([-.][A-Za-z0-9]+)*){3,18}@\\w+([-.][A-Za-z0-9]+)*\\.\\w+([-.][A-Za-z0-9]+)*$/,
            message: 'Please check the format',
            trigger: 'blur'
          }
        ],
        userAccount: [
          {
            required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: false,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],
        modifyReason: [
          {
            required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],
        operatorUser: [
          {
            required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],
        validityTime: [
          {
            required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          }
        ],
        allowLoginTimes: [
          {
            required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]+$/,
            message: 'Please check the format',
            trigger: 'blur'
          }
        ]
      },
      queryForm: {}
    };
  },
  watch: {
    operate (val) {
      switch (val) {
        case 0:
          this.addBox = false;
          this.disabledVal = false;
          this.initLists();
          if (this.$refs['userFormData']) {
            this.$refs['userFormData'].resetFields();
            this.userFormData = {};
          }

          break;
        case 1:
          this.title = this.$t('Public.add');
          this.addBox = true;
          // 角色列表获取
          this.getRoleList();
          break;
        case 2:
          // 移出将这里的执行放在edit里执行，具体原因看1162-1168
          // this.title = this.$t('Public.edit');
          // this.addBox = true;
          // console.log(2222)
          // this.getRoleList();
          break;
        case 3:
          this.title = this.$t('Public.query');
          this.addBox = true;
          this.disabledVal = true;
          // 角色列表获取
          // this.getRoleList();
          break;
      }
    }
  },
  async mounted () {
    await this.initLists();
  },
  methods: {
    // 角色key
    roleKey (row) {
      return row.roleId;
    },
    // 搜索和刷新start====================
    querySelect () {
      this.queryBox = true
      let _this = this
      setTimeout(() => _this.$refs['queryForm'].resetFields(), 0)
    },

    // 关闭(0代表清空，1代表关闭)
    queryClose (flag = 1) {
      if (flag == 0) {
        if (this.$refs['queryForm']) {
          this.$refs['queryForm'].resetFields()
        }
      } else {
        this.queryBox = false
        if (this.$refs['queryForm']) {
          this.$refs['queryForm'].resetFields()
        }
      }
    },
    // 刷新(有问题)
    reflash () {
      // 清空缓存
      this.queryFormDataSave = {}
      // 这里没有生效
      this.personnelPage.pageSize = 10
      this.personnelPage.currentPage = 1
      console.log(this.personnelPage);
      this.initLists()
    },
    // 搜索和刷新end====================

    // 在这里触发所有需要电子签名的后续提交操作，新增和编辑写在了一起，然后是删除,要在结束的时候清空signPerson
    async authenticateUser () {
      if (this.signPerson.btnName == 'Sysuser_Management_Enable') {
        this.eableCheck()
      } else if (this.signPerson.btnName == 'Sysuser_Management_Disable') {
        this.disableCheck()
        // 删除
      } else if (this.signPerson.btnName == 'Sysuser_Management_Delete') {
        this.deleteCheck()
      } else if (this.signPerson.btnName == 'Sysuser_Management_Add') {
        this.addCheck()
        // 删除
      } else if (this.signPerson.btnName == 'Sysuser_Management_Edit') {
        this.editCheck()
      } else if (this.signPerson.btnName == 'Sysuser_Management_Reset_Password') {
        // 重置密码
        this.resetCheck()
      }
    },
    // 公共处理结果的方法
    dealResultCheck (result, fn) {
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
    // 新增start========================================================
    addCheckOpen () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Sysuser_Management_Add'
    },
    async  addCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.submit()
      })
    },
    // 新增end==========================================================

    // 编辑start========================================================
    editCheckOpen () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Sysuser_Management_Edit'
    },
    async  editCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.submit()
      })
    },
    // 编辑end==========================================================
    // 启用start========================================================
    eableCheckOpen (id, states) {
      this.signPerson.rowId = id
      this.signPerson.row = states// 这里暂时用row存一下states，虽然不太好
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Sysuser_Management_Enable'
    },
    async  eableCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.changeState(this.signPerson.rowId, this.signPerson.row)
      })
    },
    // 启用end==========================================================
    // 禁用start========================================================
    disableCheckOpen (id, states) {
      this.signPerson.rowId = id
      this.signPerson.row = states// 这里暂时用row存一下states，虽然不太好
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Sysuser_Management_Disable'
    },
    async disableCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.changeState(this.signPerson.rowId, this.signPerson.row)
      })
    },
    // 禁用end==========================================================
    // 删除start========================================================
    deleteCheckOpen (id, states) {
      this.signPerson.rowId = id
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Sysuser_Management_Delete'
    },
    async deleteCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.del(this.signPerson.rowId)
      })
    },
    // 删除end==========================================================

    // 重置密码start========================================================
    resetCheckOpen (id) {
      this.signPerson.rowId = id
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Sysuser_Management_Reset_Password'
    },
    async resetCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.Reset(this.signPerson.rowId)
      })
    },
    async Reset (id) {
      let res = await resetPassword(
        {userId: id,
          'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5032)
                ? this.signPerson
                : null)
        }
      )
      const { success, message } = res.data;
      if (success) {
        this.$message.success(message);
        this.clearSignPerson()
      } else {
        this.$message.error(message);
        this.clearSignPerson()
      }
    },

    // 重置密码end==========================================================

    // 基础设置
    async bcformFn () {
      // 获取基础数据
      const res = (await getuserBaseInfo()).data
      if (res.code === 20000) {
        if (res.data != {}) {
          // 不能直接赋值，不然会和子组件的引用打断
          for (let key in this.bcform) {
            this.bcform[key] = res.data[key] === 0 ? res.data[key] : (res.data[key] ? res.data[key] : '')
          }
        }
      } else {
        this.$message.error(res.message)
      }
      this.bcform.flag = true
    },


    // 页数改变
    handleSizeChange (val) {
      this.personnelPage.pageSize = val;
      this.initLists();
    },
    // 页码改变
    handleCurrentChange (val) {
      this.personnelPage.currentPage = val;
      this.initLists();
    },
    // 搜索
    async SumbitQuery () {
      let res = await fetchList(
        this.personnelPage.currentPage,
        this.personnelPage.pageSize,
        this.queryFormData
      );
      const { success, data, message } = res.data;
      if (success) {
        this.tableData = data.results;
        this.queryFormDataSave = JSON.parse(JSON.stringify(this.queryFormData))
        this.personnelPage = {
          total: data.total
        };
        this.queryClose(1)
      } else {
        this.$messgae.error(message);
      }
    },
    // 主列表获取
    async initLists () {
      let res = await fetchList(
        this.personnelPage.currentPage,
        this.personnelPage.pageSize,
        this.queryFormDataSave
      );
      const { success, data, message } = res.data;
      if (success) {
        this.tableData = data.results;
        this.personnelPage = {
          total: data.total
        };
      } else {
        this.$messgae.error(message);
      }
    },
    // 角色多选
    handleRolesChange (rows) {
      let obj = {};
      if (rows.length > 0) {
        const rowsIdArr = rows.map((value) => {
          return value.roleId
        })
        this.userFormData.roleIds = rowsIdArr;
        // this.userFormData.roleIds = this.userFormData.roleIds.reduce(function (item, next
        // ) {
        //   void (obj[next.roleId]
        //     ? ''
        //     : (obj[next.roleId] =
        //         true && next.roleId !== undefined && item.push(next.roleId)));
        //   return item;
        // },In
        // []);
      }
    },
    selectEnable (row) {
      if (row.rowIndex === 0) {
        return 'disabledCheck';
      }
    },
    // 获取用户绑定的角色
    getRole (id) {
      console.log(33333)
      const Port = getUserInfo(id);
      Promise.all([Port]).then(roleRes => {
        const { success, data, message } = roleRes[0].data;
        if (success) {
          //  Object.assign(data.results, [])
          this.userFormData = {
            ...data,
            roleIds: data.roles,
            operatorUser: '',
            userPwd: '',
            modifyReason: ''
          };
          if (this.operate == 3) {
            this.rolesTableData = this.userFormData.roleIds
          } else {
            this.toggleSelection(this.userFormData.roleIds);
          }
        } else {
          this.$message.error(message);
        }
      });
    },
    // 获取角色
    getRoleList () {
      const Port = roleList(this.rolePage, {});
      Promise.all([Port]).then(roleRes => {
        const { success, data, message, total } = roleRes[0].data;
        if (success) {
          console.log(data);
          this.rolesTableData = Object.assign(data.results, []);
          this.rolePage.total = total;
        } else {
          this.$message.error(message);
        }
      });
    },
    // 选中的角色回显
    //
    toggleSelection (rows) {
      const _this = this
      if (rows) {
        rows.forEach(val => {
          this.rolesTableData.forEach(role => {
            if (val.roleId == role.roleId) {
              _this.$refs.rolesTable.toggleRowSelection(role, true);
            }
          });
        });
      }
    },
    // 新增
    toAdd () {
      this.operate = 1;
    },
    queryRow (row) {
      this.operate = 3;
      this.getRole(row.userId);
    },
    del (id) {
      this.$confirm('是否继续删除? / Whether to continue deleting?', '提示 / Hint', {
        confirmButtonText: 'Sure / 确定',
        cancelButtonText: 'Cancel / 取消',
        type: 'warning'
      }).then(() => {
        // 删除关闭
        const data = delUSer({
          userId: id,
          'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5022)
                ? this.signPerson
                : null)
        });
        Promise.all([data])
          .then(dataArr => {
            const { success, message } = dataArr[0].data;
            if (success) {
              this.$message.success(message);
              this.initLists();
              this.clearSignPerson()
            } else {
              this.$message.error(message);
              this.clearSignPerson()
            }
          })
          // .catch(err => {
          //   console.log(err);
          //   this.$message.error(data.message);
          // });
      });
    },
    // 提交
    submit () {
      this.$refs['userFormData'].validate(async valids => {
        if (valids) {
          const port = this.operate == 1 ? addUser : editUser;
          let res = await port({
            ...this.userFormData,
            'person':
              // 有电子签就塞person没有就塞null
              ((this.operate == 1 ? this.AuthorityData.electronicSignature.includes(5013)
                : this.AuthorityData.electronicSignature.includes(5015))
                ? this.signPerson
                : null)
          });
          const { success, message } = res.data;
          if (success) {
            this.operate = 0;
            this.$message.success(message);
            this.clearSignPerson()
          } else {
            this.$message.error(message);
            this.clearSignPerson()
          }
        }
      });
    },
    // addUser
    queryClean () {},
    queryCancel () {
      this.operate = 0;
    },
    beforeClose (done) {
      this.operate = 0;
      done();
    },
    edit (row) {
      // 只有函数主流程结束后才会进入 watch 监听流程
      // this.operate触发watch获取角色的数组赋值给this.rolesTableData
      // 但this.getRole(row.userId)在使用this.rolesTableData发现没有值,也就是watch这个动作
      // 发生在this.getRole(row.userId);
      // 这个函数之后(巨坑)
      this.operate = 2;
      this.title = this.$t('Public.edit');
      this.addBox = true;
      this.getRoleList();
      this.getRole(row.userId);
    },
    changeState (id, type) {
      const state = type == 0 ? 1 : 0;
      const data = changeUSerState(
        {
          userId: id,
          'person':
              // 有电子签就塞person没有就塞null
              ((type ? this.AuthorityData.electronicSignature.includes(5017)
                : this.AuthorityData.electronicSignature.includes(5018))
                ? this.signPerson
                : null)
        }, state);
      Promise.all([data])
        .then(dataArr => {
          const { success, message } = dataArr[0].data;
          if (success) {
            this.$message.success(message);
            this.initLists();
            this.clearSignPerson()
          } else {
            this.$message.error(message);
            this.clearSignPerson()
          }
        })
      //     this.$confirm(`是否继续? / Whether to continue?`, '提示 / Hint', {
      //       confirmButtonText: '确定 / Sure',
      //       cancelButtonText: '取消 / Cancel',
      //       type: 'warning'
      //     }).then(() => {
      //       // 删除关闭
      //       const data = changeUSerState(
      //         {
      //           userId: id,
      //           'person':
      //             // 有电子签就塞person没有就塞null
      //             ((type ? this.AuthorityData.electronicSignature.includes(5017)
      //               : this.AuthorityData.electronicSignature.includes(5018))
      //               ? this.signPerson
      //               : null)
      //         }, state);
      //       Promise.all([data])
      //         .then(dataArr => {
      //           const { success, message } = dataArr[0].data;
      //           if (success) {
      //             this.$message.success(message);
      //             this.initLists();
      //             this.clearSignPerson()
      //           } else {
      //             this.$message.error(message);
      //             this.clearSignPerson()
      //           }
      //         })
      //         // .catch(err => {
      //         //   console.log(err);
      //         //   this.$message.error(data.message);
      //         // });
      //     });
    }
  }
};
</script>
<style lang="scss" scoped>
.contents {
  .CRUD {
    background: white;
    padding: 10px;
    .crudHeader {
      width: 100%;
     display: flex;
    justify-content: space-between;
    }
  }
  .formHeader {
    background: #e8f2f2;
  }
  .block {
    text-align: right;
  }
}
</style>
