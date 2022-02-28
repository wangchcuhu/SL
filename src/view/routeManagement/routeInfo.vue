<template>
  <div class="contents">
    <!-- 路径信息 -->
    <div class="CRUD">
      <div class="crudHeader">
        <el-button type="primary"
         @click='AuthorityData.electronicSignature.includes(5023)?sumbitCheckOpen():submitBtn()'
                   >提交 / Sumbit</el-button>
                        <!-- <el-button type="primary"
         @click='verifyBtn()'
                   >验证 / Verify</el-button> -->
      </div>
      <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>
      <div class="mainContent">
        <el-row :gutter="24">
          <el-form label-position="left"
                   autocomplete="new-password"
                   :model="routeFormData"
                   :rules="routeFormRules"
                   label-width="600px">
   <el-form-item     v-for="(item, i ) in arrData" :label="item" :key="item"
                          prop="i">
              <div style="display: flex;">
              <el-input v-model="routeFormData[i]" @blur="verifyBtn()"></el-input>
                 <el-button type="success" icon="el-icon-check" circle  v-if="checkForm[i]" > </el-button> <el-button type="info" icon="el-icon-close" v-else circle ></el-button>
              </div>
            </el-form-item>


            <!-- <el-form-item label="审计追踪报告网络备份存储路径 / Audit Trace Report NetWork Storage Path"
                          prop="auditTrialNetPath">
              <div style="display: flex;">
              <el-input v-model="routeFormData.auditTrialNetPath"></el-input>
                 <el-button type="success" icon="el-icon-check" circle  v-if="true" > </el-button> <el-button type="info" icon="el-icon-close" v-else circle ></el-button>
              </div>
            </el-form-item>

             <el-form-item label="审计追踪报告本地存储路径 / Audit Trace Report Local Storage Path"
                          prop="auditTrialPath">
              <el-input v-model="routeFormData.auditTrialPath"></el-input>
            </el-form-item>

               <el-form-item label="自动导出路径 / Log Export Path"
                          prop="automaticExportPath">
              <el-input v-model="routeFormData.automaticExportPath"></el-input>
            </el-form-item>

            <el-form-item label="相机报告路径 / Camera Report Path"
                          prop="cameraReportPath">
              <el-input v-model="routeFormData.cameraReportPath"></el-input>
            </el-form-item>

   <el-form-item label="CODESOFT文件历史文件存储路径 / Code Soft File Historical Path"
                          prop="codeSoftHistoricalPath">
              <el-input v-model="routeFormData.codeSoftHistoricalPath"></el-input>
            </el-form-item>

   <el-form-item label="CODESOFT文件本地存储路径 / Code Soft File Local Path"
                          prop="codeSoftLocalPath">
              <el-input v-model="routeFormData.codeSoftLocalPath"></el-input>
            </el-form-item>

<el-form-item label="CODESOFT文件源路径 / Code Soft File Path"
                          prop="codeSoftPath">
              <el-input v-model="routeFormData.codeSoftPath"></el-input>
            </el-form-item>

<el-form-item label="颜色图片网络备份路径 / Color Picture Network Backup Path"
                          prop="colorPictureNetBackupPath">
              <el-input v-model="routeFormData.colorPictureNetBackupPath"></el-input>
            </el-form-item>

<el-form-item label="盖子图片网络备份路径 / Cover Picture Network Backup Path"
                          prop="coverPictureNetBackupPath">
              <el-input v-model="routeFormData.coverPictureNetBackupPath"></el-input>
            </el-form-item>

<el-form-item label="完整度图片网络备份路径 / Integrity Picture Network Backup Path"
                          prop="integrityPictureNetBackupPath">
              <el-input v-model="routeFormData.integrityPictureNetBackupPath"></el-input>
            </el-form-item>

<el-form-item label="标签图片网络备份路径 / Label Image Network Backup Path"
                          prop="labelPictureNetBackupPath">
              <el-input v-model="routeFormData.labelPictureNetBackupPath"></el-input>
            </el-form-item>

<el-form-item label="标签条码质量检测报告本地存储路径 / Label Barcode quality check report Network Backup Path"
                          prop="labelQualityCheckLocalPath">
              <el-input v-model="routeFormData.labelQualityCheckLocalPath"></el-input>
            </el-form-item>

<el-form-item label="标签条码质量检测报告网络备份路径 / Label Bar Code Quality Check Report Local Storage Path"
                          prop="labelQualityCheckNetPath">
              <el-input v-model="routeFormData.labelQualityCheckNetPath"></el-input>
            </el-form-item>


<el-form-item label="本地备份地址 / Local backup Address"
                          prop="localBackUpPath">
              <el-input v-model="routeFormData.localBackUpPath"></el-input>
            </el-form-item>

<el-form-item label="本地路径 / Local Path"
                          prop="localXmlPath">
              <el-input v-model="routeFormData.localXmlPath"></el-input>
            </el-form-item>


<el-form-item label="日志信息本地存储路径 / Local Path For Storing Log Information"
                          prop="logExportLocalPath">
              <el-input v-model="routeFormData.logExportLocalPath"></el-input>
            </el-form-item>

<el-form-item label="日志信息网络存储路径 / Path For Storing Logs On The Network"
                          prop="logExportNetPath">
              <el-input v-model="routeFormData.logExportNetPath"></el-input>
            </el-form-item>

            <el-form-item label="网络备份地址 / Network Backup Address"
                          prop="netBackUpPath">
              <el-input v-model="routeFormData.netBackUpPath"></el-input>
            </el-form-item>


   <el-form-item label="查询导出路径 / Querying The Export Path"
                          prop="queryDerivedPath">
              <el-input v-model="routeFormData.queryDerivedPath"></el-input>
            </el-form-item>

   <el-form-item label="XML历史存储路径 / XML File Historical Path"
                          prop="xmlHistoricalPath">
              <el-input v-model="routeFormData.xmlHistoricalPath"></el-input>
            </el-form-item>

   <el-form-item label="XML文件本地存储路径 / XML File Local Path"
                          prop="xmlLocalPath">
              <el-input v-model="routeFormData.xmlLocalPath"></el-input>
            </el-form-item>

   <el-form-item label="XML文件源路径 / XML File Path"
                          prop="xmlPath">
              <el-input v-model="routeFormData.xmlPath"></el-input>
            </el-form-item>

                  <el-form-item  class="overflow" label="生产结束报告本地存储路径 / Local storage path of the end of production report"
                          prop='localEndProductionReport'>
              <el-input v-model="routeFormData.localEndProductionReport" type="text"></el-input>
            </el-form-item>
                  <el-form-item class="overflow" label="生产性能报告本地存储路径 / Local storage path of production performance report"
                          prop='localPerformanceProductionReport'>
              <el-input v-model="routeFormData.localPerformanceProductionReport" type="text"></el-input>
            </el-form-item>
                  <el-form-item class="overflow" label="生产标签图片本地存储路径 / Local storage path of production label images"
                          prop='localProductionLabelsImages'>
              <el-input v-model="routeFormData.localProductionLabelsImages" type="text"></el-input>
            </el-form-item>
                  <el-form-item class="overflow" label="生产结束报告网络存储路径 / Production end report network storage path"
                          prop='netEndProductionReport'>
              <el-input v-model="routeFormData.netEndProductionReport" type="text"></el-input>
            </el-form-item>
                 <el-form-item class="overflow" label="生产性能报告网络存储路径 / Production performance report network storage path"
                          prop='netPerformanceProductionReport'>
              <el-input v-model="routeFormData.netPerformanceProductionReport" type="text"></el-input>
            </el-form-item>
                  <el-form-item class="overflow" label="生产标签图片网络存储路径 / Production label image network storage path"
                          prop='netProductionLabelsImages'>
              <el-input v-model="routeFormData.netProductionLabelsImages" type="text"></el-input>
            </el-form-item> -->
            <el-collapse v-model="collapseList"  >
              <el-collapse-item
                                name="1">
                                  <template slot="title">
                         <span>数据库配置 ：对Limis数据库进行配置 / Database configuration: Configure the Limis database</span>
                         <el-button type="success" icon="el-icon-check" circle  v-if="checkForm['ls']" > </el-button> <el-button type="info" icon="el-icon-close" v-else circle ></el-button>
    </template>
                <el-form-item label="数据库ip / Database Of IP"
                              prop='sqlIp'>
                  <el-input v-model="routeFormData.sqlIp" @blur="verifyBtn()"></el-input>
                </el-form-item>
                <el-form-item label="数据库用户名 / Database User Name"
                              prop="sqlUsername">
                  <el-input v-model="routeFormData.sqlUsername" @blur="verifyBtn()"></el-input>
                </el-form-item>
                <el-form-item label="数据库密码 / Database Password"
                              prop="sqlPassword" >
                  <el-input :type="passwordType" @blur="verifyBtn()"
                            v-model="routeFormData.sqlPassword" autocomplete="new-password">
                    <i slot="suffix"
                       class="el-icon-view el-input__icon"
                       @click="showPassword" />
                  </el-input>
                </el-form-item>
                <el-form-item label="数据库名称 / Database Name"
                              prop="sqlName">
                  <el-input v-model="routeFormData.sqlName" @blur="verifyBtn()"></el-input>
                </el-form-item>
                <el-form-item label="数据库端口号 / Database Port Number"
                              prop="sqlPort">
                  <el-input v-model="routeFormData.sqlPort" @blur="verifyBtn()"></el-input>
                </el-form-item>
              </el-collapse-item>

            </el-collapse>
          </el-form>
        </el-row>
      </div>

    </div>

  </div>
</template>

<script>
import { fetchList, editPath, verifyAccount, verify } from '@/api/pathManage'
import signaturePublic from '@/components/signaturePublic.vue'
export default {
  name: 'routeInfo',
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
      operate: 0,
      passwordType: 'password',
      collapseList: [],
      arrData: {
        xmlPath: 'XML文件源路径 / XML File Path',
        xmlLocalPath: 'XML文件本地存储路径 / XML File Local Path',
        xmlHistoricalPath: 'XML历史存储路径 / XML File Historical Path',

        codeSoftPath: 'CODESOFT文件源路径 / Code Soft File Path',
        codeSoftLocalPath: 'CODESOFT文件本地存储路径 / Code Soft File Local Path',
        codeSoftHistoricalPath: 'CODESOFT文件历史文件存储路径 / Code Soft File Historical Path',

        colorPictureNetBackupPath: '颜色图片网络备份路径 / Color Picture Network Backup Path',
        coverPictureNetBackupPath: '盖子图片网络备份路径 / Cover Picture Network Backup Path',
        integrityPictureNetBackupPath: '完整度图片网络备份路径 / Integrity Picture Network Backup Path',
        labelPictureNetBackupPath: '标签图片网络备份路径 / Label Image Network Backup Path',
        labelQualityCheckLocalPath: '标签条码质量检测报告本地存储路径 / Label Barcode quality check report Network Backup Path',
        labelQualityCheckNetPath: '标签条码质量检测报告网络备份路径 / Label Bar Code Quality Check Report Local Storage Path',

        localProductionLabelsImages: '生产标签图片本地存储路径 / Local storage path of production label images',
        netProductionLabelsImages: '生产标签图片网络存储路径 / Production label image network storage path',

        localEndProductionReport: '生产结束报告本地存储路径 / Local storage path of the end of production report',
        netEndProductionReport: '生产结束报告网络存储路径 / Production end report network storage path',
        localPerformanceProductionReport: '生产性能报告本地存储路径 / Local storage path of production performance report',
        netPerformanceProductionReport: '生产性能报告网络存储路径 / Production performance report network storage path',

        localBackUpPath: '数据库本地备份地址 / DataBase Local backup Address',
        netBackUpPath: '数据库网络备份地址 / DataBase Network Backup Address',

        auditTrialPath: '审计追踪报告本地存储路径 / Audit Trace Report Local Storage Path',
        auditTrialNetPath: '审计追踪报告网络备份存储路径 / Audit Trace Report NetWork Storage Path'

        // automaticExportPath: '自动导出路径 / Log Export Path',
        // cameraReportPath: '相机报告路径 / Camera Report Path',
        // localXmlPath: '本地路径 / Local Path',
        // logExportLocalPath: '日志信息网络存储路径 / Path For Storing Logs On The Network',
        // queryDerivedPath: '查询导出路径 / Querying The Export Path'


        // sqlIp: '数据库ip / Database Of IP',
        // sqlUsername: '数据库用户名 / Database User Name',

        // sqlPassword: '数据库密码 / Database Password',
        // sqlName: '数据库名称 / Database Name',
        // sqlPort: '数据库端口号 / Database Port Number'
      },
      routeFormData: {
        auditTrialNetPath: '',
        auditTrialPath: '',
        automaticExportPath: '',
        cameraReportPath: '',
        codeSoftHistoricalPath: '',
        codeSoftLocalPath: '',
        codeSoftPath: '',
        colorPictureNetBackupPath: '',
        coverPictureNetBackupPath: '',
        integrityPictureNetBackupPath: '',
        labelPictureNetBackupPath: '',
        labelQualityCheckLocalPath: '',
        labelQualityCheckNetPath: '',
        localBackUpPath: '',
        localXmlPath: '',
        logExportLocalPath: '',
        logExportNetPath: '',
        netBackUpPath: '',
        sqlIp: '',
        sqlName: '',
        sqlPassword: '',
        sqlPort: '',
        sqlUsername: '',
        xmlHistoricalPath: '',
        xmlLocalPath: '',
        xmlPath: '',
        netEndProductionReport: '',
        netPerformanceProductionReport: '',
        netProductionLabelsImages: '',
        localEndProductionReport: '',
        localPerformanceProductionReport: '',
        localProductionLabelsImages: ''
      },
      checkForm: {},
      routeFormRules: {
        sqlIp: [{
          pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
          message: this.$t('Public.pattern_msg'),
          trigger: 'blur'
        }],
        sqlPort: [{
          pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
          message: this.$t('Public.pattern_msg'),
          trigger: 'blur'
        }]
      }




    }
  },

  mounted () {
    this.getPaths()
  },
  methods: {
    // 验证当前的地址时候联通
    async verifyBtn () {
      const res = (await verify(this.routeFormData)).data
      console.log(res);
      if (res.code === 20000) {
        console.log(res);
        this.checkForm = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    // 在这里触发所有需要电子签名的后续提交操作，新增和编辑写在了一起，然后是删除,要在结束的时候清空signPerson
    async authenticateUser () {
      if (this.signPerson.btnName == 'RouteManagement_Management_Sumbit') {
        this.sumbitCheck()
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
    sumbitCheckOpen () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'RouteManagement_Management_Sumbit'
    },
    async  sumbitCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        this.submitBtn()
      })
    },
    // 新增end==========================================================

    // 获取列表
    async getPaths () {
      let Result = await fetchList()
      // console.log(Result)
      const { success, data, message } = Result.data
      if (success) {
        this.routeFormData = {
          ...data
        }
        this.verifyBtn()
      } else {
        this.$message.error(message)
      }
    },
    // 密码显示
    showPassword () {
      this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '');
    },
    // 提交
    async submitBtn () {
      let res = await editPath({...this.routeFormData,
        'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5023)
                ? this.signPerson
                : null)})
      const { success, message } = res.data
      if (success) {
        this.$message.success(message)
        this.getPaths()
        this.clearSignPerson()
      } else {
        this.$message.error(message)
        this.clearSignPerson()
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.contents {
  border-radius: 10px;
  background: white;
  .CRUD {
    padding: 10px;
    .crudHeader {
      width: 100%;
    }
    .mainContent {
      padding: 40px;
    }
  }
}
  >>>.el-form-item__label{
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
