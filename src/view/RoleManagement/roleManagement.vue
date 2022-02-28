<template>
  <!-- 人员信息 -->
  <div class="contents">
    <div class="CRUD" >
      <div class="crudHeader" >
        <div class="addBtn">
          <el-button type="primary"
                     icon="el-icon-edit"
                     v-if="AuthorityData.showHidden.includes(5019)"
                     @click="toAdd">新增 / Add</el-button>
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

      <el-table :data="tableData"
                border
                style="width: 100%;margin-top:10px;">
        <!-- 角色名称 角色描述 修改人 修改时间 创建人 创建时间 操作 -->
        <el-table-column type="index"
                         align="center"
                         width="50">
        </el-table-column>
        <el-table-column prop="roleName"
                         align="center"
                        label="角色名称 / Role name">
        </el-table-column>
        <el-table-column prop="roleDescribe"
                         align="center" label="角色描述 / Role Description">
        </el-table-column>

        <el-table-column prop="modifyUserName"
                         align="center"
                         label="修改人 / Modifier">
        </el-table-column>

        <el-table-column prop="modifyTime"
                         align="center"
                         label="修改时间 / Modification Time">
        </el-table-column>
         <el-table-column prop="createUserName"
                         align="center"
                         label="创建人 / Creator">
        </el-table-column>

          <el-table-column prop="createTime"
                         align="center"
                        label="创建时间 / Creation time">
        </el-table-column>

        <el-table-column fixed="right"
                         align="center"
                      label="操作 / Operation">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="primary">
                功能 / Function
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  @click.native="query(scope.row)">查阅 / Check</el-dropdown-item>
                <el-dropdown-item v-if="AuthorityData.showHidden.includes(5021)" @click.native="edit(scope.row)">编辑 / Edit</el-dropdown-item>
                <el-dropdown-item v-if="AuthorityData.showHidden.includes(5022)"
                @click.native="AuthorityData.electronicSignature.includes(5022)?deleteCheckOpen(scope.row.roleId):del(scope.row.roleId)">删除 / Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="personnelPage.currentPage"
                       :page-sizes="[10, 20, 30, 40,50,100]"
                       :page-size="personnelPage.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="personnelPage.total"></el-pagination>
      </div>
      <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>
      <!-- 新增/编辑 -->
      <el-dialog :visible.sync="addBox"
                 width="80%"
                 :before-close="beforeClose"
                 :close-on-press-escape="isClose"
                 :close-on-click-modal="false">
        <div slot="title"
             style="font-size:20px">
          <span style="font-size:22px">{{title}}</span>
          <span style="font-size:22px" v-if="title=='新增'">/ Add</span>
          <span style="font-size:22px" v-if="title=='编辑'">/ Edit</span>
          <!-- <span style="float:right;padding-right: 40px">
            <i
              class="el-dialog__close el-icon-full-screen"
              style="cursor:pointer;font-size:26px;font-weight:700"
              @click="handleScreen(0)"
            ></i>
          </span> -->
        </div>
        <el-row :gutter="24">
          <el-form autocomplete="new-password"
                   ref="userFormData"
                   label-position="right"
                   :model="userFormData"
                   :rules="userFormRule"
                   size="medium"
                   label-width="175px">
            <el-col :span="24"
                    class="formHeader"
                    style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px;padding-left:20px;width:calc(100% + 16px);margin-left:-8px">
              <el-col>
                <span style="font-size:22px">角色基本信息 / Basic role information</span>
              </el-col>
            </el-col>
            <el-col :span="11">
              <el-form-item class="userAccount"
                            label="角色名称 / Role Name"
                            prop="roleName">
                <el-input autocomplete="new-password"
                          v-model.trim="userFormData.roleName"
                          :maxlength="11"
                          :disabled='this.operate==3'
                          clearable
                          :style="{width: '100%'}"
                          ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11"
                    :offset="2">
              <el-form-item class="paddingLeft"
                 label-width="250px"
                            label="角色描述 / Role description"
                            prop="roleDescribe">
                <el-input autocomplete="new-password"
                          v-model.trim="userFormData.roleDescribe"
                          :maxlength="11"
                          :disabled='this.operate==3'
                          clearable
                          :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-col :span="24"
                  class="formHeader"
                  style="height:40px;line-height:40px;font-size:20px;margin-bottom:22px;padding-left:20px;width:calc(100% + 16px);margin-left:-8px">
            <el-col>
              <span style="font-size:22px">权限绑定 / Permission binding
              </span>
            </el-col>
          </el-col>
   <!-- 添加树状结构 -->
        <el-col :span="9">
          <el-tree
           :render-content="renderContent"
          :data="data" ref="tree"
          :show-checkbox='this.operate!=3'
           :default-checked-keys="checkedKeys"
           @check-change="getCheckedKey"
           node-key="authorityId"
           :props="defaultProps">
          </el-tree>
        </el-col>
           <el-col :span="13">
           <el-table
            border
        :data="tableDataAuthority"
          style="width: 100%">
               <el-table-column
                prop="authorityName"
                  align="center"
        label="名称 / Name">
       </el-table-column>
      <el-table-column prop="electronicSignature" v-if="this.operate==3" align="center" label="电子签名 / Electronic signature">
             <template slot-scope="scope">
          <el-switch disabled
  v-model="scope.row.electronicSignature"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>

             </template>
      </el-table-column>
             <el-table-column prop="electronicSignature" v-else align="center" label="电子签名 / Electronic signature">
               <template slot-scope="scope">
                 <el-switch
                   v-model="scope.row.electronicSignature"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
                 </el-switch>

               </template>
             </el-table-column>


       <el-table-column v-if="this.operate==3"
                        prop="showHidden"
        align="center"
        label="显隐 / Obviously hidden"
         >
                   <template slot-scope="scope">
          <el-switch   disabled
  v-model="scope.row.showHidden"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
             </template>
      </el-table-column>

             <el-table-column v-else
                              prop="showHidden"
                              align="center"
                              label="显隐 / Obviously hidden"
             >
               <template slot-scope="scope">
                 <el-switch
                              v-model="scope.row.showHidden"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                 </el-switch>
               </template>
             </el-table-column>

    </el-table>
        </el-col>
        </el-row>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                      @click='AuthorityData.electronicSignature.includes(5019)?addCheckOpen():submit()'
                      v-if="this.operate==1">提 交 / Sumbit </el-button>
                      <el-button type="primary"
                     @click='AuthorityData.electronicSignature.includes(5021)?editCheckOpen():submit()' v-if="this.operate==2">提 交 / Sumbit </el-button>
          <el-button @click="queryCancel">关 闭 / Close</el-button>
        </span>
      </el-dialog>
      <!-- 删除 -->

      <!-- 导出 -->

    </div>
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
                          label="角色名称 / RolenName"
                          prop="roleName">
              <el-input
                        v-model="queryFormData.roleName"
                        :maxlength="11"
                        clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="paddingLeft"
                          label="角色描述 / RolDescription"
                          prop="roleDescribe">
              <el-input
                        v-model.trim="queryFormData.roleDescribe"
                        :maxlength="11"
                        clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer">
                <el-button type="primary"
                   @click="querySureSS" >提交 / Sumbit</el-button>
        <el-button
                   @click.stop="queryClose(0)">清空 / Clear</el-button>
        <el-button @click.stop="queryClose(1)">关闭 / Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getIds, fetchList, addRole, editRole, delRole, queryPowerById, getButton, loginApproval, verifyAccount } from '@/view/RoleManagement/roleManagement'
import signaturePublic from '@/components/signaturePublic.vue'
export default {
  name: 'userInfo',
  components: {
    signaturePublic
  },
  data () {
    return {
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
      tableDataAuthority: [],
      CacheTableDataAuthority: [], // 缓存当前的按钮信息Table
      tableFormArr: [], // 存储选中的模块Table
      queryBox: false, // 搜索
      data: undefined, // 树状结构
      tableRow: undefined, // 选中的那一列
      authorityIds: [], // 选中的数组
      checkedKeys: [], // 树状结构选中数据
      list4: [], // 存储id
      list: [], // 存储id
      list5: [], // 存储id
      defaultProps: {
        children: 'children', // 指定子树为节点对象的某个属性值
        label: 'authorityName'// 指定节点标签为节点对象的某个属性值
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
        roleName: '', // 角色名称
        roleDescribe: '' // 角色描述
        // modifyReason: ''// 修改原因
      },
      userFormRule: {

        roleName: [
          { required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur' }

        ],
        roleDescribe: [
          { required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur' }
        ],
        modifyReason: [
          { required: true,
            message: '请输入 / Please Enter',
            trigger: 'blur' }
        ]

      },
      queryFormDataSave: {},
      queryFormData: {
        roleName: '',
        roleDescribe: ''
      },
      queryForm: {

      }
    }
  },
  watch: {
    operate (val) {
      switch (val) {
        case 0:
          this.addBox = false;
          this.disabledVal = false;
          this.initLists()
          if (this.$refs['userFormData']) {
            this.$refs['userFormData'].resetFields()
          }
          break;
        case 1:
          this.title = this.$t('Public.add')
          this.addBox = true
          setTimeout(() => this.$refs['userFormData'].resetFields())

          break;
        case 2:
          this.title = this.$t('Public.edit')
          this.addBox = true
          break;
        case 3:
          this.title = this.$t('Public.query')
          this.addBox = true
          this.disabledVal = true
          break;
      }
    }
  },
  async mounted () {
    let login = {
      loginModule: '角色管理_角色信息 / Role management_role information',
      loginResult: '0'
    };
    await loginApproval(login);
    await this.initLists()
    await this.RoleAuthorCopy()
  },
  methods: {
    // 在这里触发所有需要电子签名的后续提交操作，新增和编辑写在了一起，然后是删除,要在结束的时候清空signPerson
    async authenticateUser () {
      if (this.signPerson.btnName == 'Sysrole_Management_Add') {
        this.addCheck()
      } else if (this.signPerson.btnName == 'Sysrole_Management_Edit') {
        this.editCheck()
        // 删除
      } else if (this.signPerson.btnName == 'Sysrole_Management_Delete') {
        this.deleteCheck()
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
    addCheckOpen (id) {
      this.$refs['userFormData'].validate(async valids => {
        if (valids) {
          this.signPerson.dialogVisible = true
          this.signPerson.btnName = 'Sysrole_Management_Add'
        }
      })
    },
    async addCheck () {
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
    editCheckOpen (id) {
      this.$refs['userFormData'].validate(async valids => {
        if (valids) {
          this.signPerson.dialogVisible = true
          this.signPerson.btnName = 'Sysrole_Management_Edit'
        }
      })
    },
    async editCheck () {
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

    // 删除start========================================================
    deleteCheckOpen (id) {
      this.signPerson.rowId = id
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'Sysrole_Management_Delete'
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


    // 过滤器(针对遇到的值强制转换，1转成true，0转成fasle)
    booleanFilter (arr) {
      for (let value of arr) {
        for (let item in value) {
          if (item === 'electronicSignature' || item === 'showHidden') {
            if (value[item] === 1) {
              value[item] = true
            } else if (value[item] === 0) {
              value[item] = false
            }
          }
        }
      }
    },
    // 过滤器(针对遇到的值强制转换，true转成1，fasle转成0)
    booleanISFilter (arr) {
      for (let value of arr) {
        for (let item in value) {
          if (item === 'electronicSignature' || item === 'showHidden') {
            if (value[item]) {
              console.log(item);
              value[item] = 1
            } else {
              value[item] = 0
            }
          }
        }
      }
    },

    // 添加的渲染函数
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node" >
          <span on-click={ () => this.getTableData(node, data, store) }>{node.label}</span>
        </span>);
    },
    // 选中时触发主要是为了清除缓存
    handleCheckChange (data, checked, indeterminate) {
      for (let key in this.CacheTableDataAuthority) {
        if (data.authorityId === this.CacheTableDataAuthority[key][0].parentAuthorityId) {
          // 选中的id是否在缓存里一旦在而且是false就清除缓存中的值
          if (!data.isChecked) {
            delete this.CacheTableDataAuthority[key]
            this.tableDataAuthority = []
          }
        }
      }
      console.log(data, checked, indeterminate);
    },
    // 初始化Table
    async getTableData (node, data, store) {
      console.log(node, data, store);
      // 点击的时候要清空上一次的结果
      this.tableDataAuthority = []
      // 只有二级才可以触发点击事件
      if (data.parentAuthorityId !== '0' && data.parentAuthorityId) {
        // 只有勾选才查数据
        if (node.checked) {
        // 判断缓存中是否存在存在就在换从中取不存在就从后端去
          var flag = true
          for (let key in this.CacheTableDataAuthority) {
            if (data.authorityId === this.CacheTableDataAuthority[key][0].parentAuthorityId) {
              flag = false
              this.tableDataAuthority = this.CacheTableDataAuthority[key]
            }
          }
          // 新的Table数据
          if (flag) { this.getDataFromH(data) }
          // 获取对应按钮以及控制权限
        }
      }
    },
    async  getDataFromH (data) {
      // 初次从后端获取或者直接从缓存中取
      const result = (await getButton({authorityId: data.authorityId})).data
      this.dealResult(result, function () {
        // 结果包含按钮才会缓存值
        if (result.data.length > 0) {
        // 处理获取的数据
          this.tableDataAuthority = result.data
          // 过滤数据
          this.booleanFilter(this.tableDataAuthority)
          this.CacheTableDataAuthority.push(this.tableDataAuthority)
        }
      })
    },
    // 公共处理数据结果的方法
    dealResult (result, fn) {
      if (result.code === 20000) {
        // this.$messgae.success(data.message)
        // 这里可以研究一下，无名函数传参找不到对应的引用
        fn.call(this)
      } else {
        this.$messgae.error(result.message)
      }
    },
    async querySureSS () {
      let res = await fetchList(1, 10, this.queryFormData)
      const { success, data, message } = res.data
      if (success) {
        this.personnelPage.currentPage = 1
        this.personnelPage.pageSize = 10
        this.queryFormDataSave = JSON.parse(JSON.stringify(this.queryFormData))
        this.tableData = data.results
        this.personnelPage = {
          total: data.total
        }
        this.queryClose(1)
        this.$message.success(message)
      } else {
        this.$messgae.error(message)
        this.queryClose(0)
      }
    },
    // 搜索
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
    // 新增树形选中数据
    getCheckedKey (row, checked, checkeds) {
      // 选中时触发主要是为了清除缓存
      this.handleCheckChange(row, checked, checkeds)
      // console.log(row, checked, checkeds)
      // let childeArr = this.$refs.tree.getCheckedKeys();
      this.authorityIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
    },
    // 角色授权的功能添加到新增中
    async RoleAuthorCopy () {
      let data = (await queryPowerById()).data;
      if (data.code == 20000) {
        this.data = data.data;
      }
    },

    // 页数改变
    handleSizeChange (val) {
      this.personnelPage.pageSize = val
      this.initLists()
    },
    // 页码改变
    handleCurrentChange (val) {
      this.personnelPage.currentPage = val
      this.initLists()
    },
    // 刷新(有问题)
    reflash () {
      // 清空缓存
      this.queryFormDataSave = {}
      this.personnelPage.pageSize = 10
      this.personnelPage.currentPage = 1
      console.log(this.personnelPage);
      this.initLists()
    },
    // 主列表获取
    async initLists () {
      let res = await fetchList(this.personnelPage.currentPage, this.personnelPage.pageSize, this.queryFormDataSave)
      const { success, data, message } = res.data
      if (success) {
        this.tableData = data.results
        this.personnelPage = {
          total: data.total
        }
      } else {
        this.$messgae.error(message)
      }
    },
    selectEnable (row) {
      if (row.rowIndex === 0) {
        return 'disabledCheck';
      }
    },
    async  edit (row) {
      this.CacheTableDataAuthority = []
      this.tableDataAuthority = []
      this.tableRow = row
      this.operate = 2
      // 基本信息赋值
      for (let key in row) {
        if (Object.keys(this.userFormData).includes(key)) { this.userFormData[key] = row[key] }
      }
      // 清空树
      setTimeout(() => { this.$refs.tree.setCheckedKeys([]) }, 0)
      // 获取对应的权限并且为树赋值
      await this.getIdsArr(row.roleId)
      // 获取所有的按钮信息并且整合起来把值传给缓存
      await this.integrateButtonInformation(row.roleId)
    },
    // 获取所有的按钮信息并且整合起来把值传给缓存
    async integrateButtonInformation (roleId) {
      const result = (await getButton({'roleId': roleId})).data
      if (result.code === 20000) {
        this.CacheTableDataAuthority = this.getArr(result.data)
      } else {
        this.$messgae.error(result.message)
      }
    },
    // 将结果重新组装
    getArr (data) {
      const parentId = [100, 101, 102, 103, 104, 105, 107, 108]
      let result = []
      for (let valueId of parentId) {
        let Cache = []
        for (let value of data) {
          if (value.parentAuthorityId == valueId) {
            Cache.push(value)
          }
        }
        // 过滤数据
        this.booleanFilter(Cache)
        result.push(Cache)
      }
      // 剔除掉空数组
      result = result.filter((item) => item.length > 0)
      return result
    },

    // 新增(this.checkedKeys=[],this.userFormData)
    toAdd () {
      this.operate = 1
      // 不在结束的时候清空在开始的是后正确的为变量赋值，清空选中的节点
      setTimeout(() => { this.$refs.tree.setCheckedKeys([]); }, 0)
      this.userFormData = {
        roleName: '', // 角色名称
        roleDescribe: '' // 角色描述
        // modifyReason: ''// 修改原因
      }
    },
    async query (row) {
      this.CacheTableDataAuthority = []
      this.tableDataAuthority = []
      this.operate = 3
      // 赋值以及选择对应的权限绑定
      // 目的不改变queryFormData的结构不然在使用组件清空时会不起作用
      for (let key in row) {
        if (Object.keys(this.userFormData).includes(key)) { this.userFormData[key] = row[key] }
      }
      // 清空树
      setTimeout(() => { this.$refs.tree.setCheckedKeys([]) }, 0)
      // 获取对应的权限并且为树赋值
      await this.getIdsArr(row.roleId)
      // 获取所有的按钮信息并且整合起来把值传给缓存
      await this.integrateButtonInformation(row.roleId)
      // this.checkedKeys
      // this.getRole(row.userId)
    },
    // 查询对应角色的权限
    async getIdsArr (roleId) {
      let data = (await getIds(roleId)).data.data.auths
      this.$refs.tree.setCheckedNodes(data)
    },
    del (id) {
      this.$confirm('是否继续删除? / Whether to continue deleting?', '提示 / Hint', {
        confirmButtonText: 'Sure / 确定',
        cancelButtonText: 'Cancel / 取消',
        type: 'warning'
      }).then(() => {
        // 删除关闭
        const data = delRole({'roleId': id,
          'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5022)
                ? this.signPerson
                : null)
        })
        Promise.all([data]).then((dataArr) => {
          const { success, message } = dataArr[0].data
          if (success) {
            this.$message.success(message)
            this.initLists()
            this.clearSignPerson()
          } else {
            this.$message.error(message)
            this.clearSignPerson()
          }
        })
        // .catch((err) => {
        //   console.log(err);
        //   this.$message.error(data.message)
        // })
      })
    },
    // 提交
    submit () {
      this.$refs['userFormData'].validate(async valids => {
        if (valids) {
          const port = this.operate == 1 ? addRole : editRole
          this.operate == 1 ? this.tableRow = {} : this.tableRow = this.tableRow
          let systemAuthorityVoList = []
          // 改变结构，将list拆分出来
          for (let value of this.CacheTableDataAuthority) {
            if (value) {
              systemAuthorityVoList = [...systemAuthorityVoList, ...value]
            }
          }
          // 过滤器(针对遇到的值强制转换，true转成1，fasle转成0)
          this.booleanISFilter(systemAuthorityVoList)
          let res = await port({...this.tableRow,
            ...this.userFormData,
            'authorityIds': this.authorityIds,
            systemAuthorityVoList: systemAuthorityVoList,
            'person':
              // 有电子签就塞person没有就塞null
              ((this.operate == 1 ? this.AuthorityData.electronicSignature.includes(5019)
                : this.AuthorityData.electronicSignature.includes(5021))
                ? this.signPerson
                : null)})
          const { success, message } = res.data
          if (success) {
            this.operate = 0
            this.$message.success(message)
            this.clearSignPerson()
          } else {
            this.$message.error(message)
            this.clearSignPerson()
          }
        }
      })
    },
    // addRole
    queryClean () { },
    queryCancel () {
      this.operate = 0;
    },
    beforeClose (done) {
      this.operate = 0;
      done()
    }

  }
}
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
