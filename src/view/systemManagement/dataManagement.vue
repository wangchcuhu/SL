<template>
  <div class="context">
     <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>
<div class="left">
         <div class="title">手动备份与恢复 / Manual backup and restore</div>
<el-row :span="24" style="padding-left: 30px;">
  <el-col :span="24" class="padding"><div>数据备份 / Data Backup :
  <img src="../../assets/data_click.png"  style="height: 40px;cursor: pointer" v-if="AuthorityData.showHidden.includes(5024)"
           @click="AuthorityData.electronicSignature.includes(5024)?backupCheckOpen():backUpDataButton()">

     <!-- <el-button type="primary" size="small"
     v-if="AuthorityData.showHidden.includes(5024)"
           @click.native="AuthorityData.electronicSignature.includes(5024)?backupCheckOpen():backUpData()">点击 / Click on</el-button> -->
           </div></el-col>
  <el-col :span="24" class="padding"><div>数据恢复 / Data Recovery :  <el-upload
  class="upload-demo"
  id='upload'
  :multiple='false'
  action="fasle"
  :on-change='onChange'
  :on-remove='onChange'
  :limit="1"
    :on-preview="handlePreview"
  :auto-upload="false"
  :file-list="fileList">
   <img src="../../assets/data_select.png"  style="height: 46px;cursor: pointer" mousedown="handlePreview">
  <!-- <el-button size="small" type="primary"  @mousedown.native="handlePreview">选取文件 / Select file</el-button> -->
</el-upload>

</div>

</el-col>
   <img src="../../assets/data_up.png"  style="height: 40px;cursor: pointer"    v-if="AuthorityData.showHidden.includes(5025)"
          @click="AuthorityData.electronicSignature.includes(5025)?dataRecoverCheckOpen():reductionOfData()">

    <!-- <el-button size="small" type="primary"
         v-if="AuthorityData.showHidden.includes(5025)"
          @click.native="AuthorityData.electronicSignature.includes(5025)?dataRecoverCheckOpen():reductionOfData()"
     >点击上传 / Click upload</el-button> -->

  <el-col :span="24">
    <div>数据库表恢复 / Database Table Recovery :
   <img src="../../assets/data_click.png"  style="height: 40px;cursor: pointer" v-if="AuthorityData.showHidden.includes(5026)"
           @click="AuthorityData.electronicSignature.includes(5026)?dataTableRecoverCheckOpen():databaseTableRecovery()">

     <!-- <el-button type="primary" size="small"
           v-if="AuthorityData.showHidden.includes(5026)"
           @click.native="AuthorityData.electronicSignature.includes(5026)?dataTableRecoverCheckOpen():databaseTableRecovery()"
   >点击 / Click on</el-button> -->
   </div>
   </el-col>
</el-row>
<!-- </div> -->
<!-- 分割线 -->
<div class="line"></div>
<!-- <div class="right"> -->
          <div class="title">自动备份 / Automatic backup</div>
       <el-row :span="300" style="padding:0 20px">
          <el-form autocomplete="new-password" label-position="left" ref="basicConfigurationForm"
            :model="basicConfigurationFormData" size="medium" label-width="200px" :rules="basicConfigurationRules">
            <el-col :span="30">
              <el-form-item class="paddingLeft" label="生成周期 / Generation cycle"  label-width="200px"  >
                <el-radio-group v-model="periodTypeRedio" @change="periodTypeChange">
                  <el-radio :label="0" >
                    <span style="display: inline-block;width: 300px;">每次间隔 / Every interval</span>
                    <el-input-number v-model="basicConfigurationFormData.basicDay0" controls-position="right" :step="1"
                      :min="0" size="mini"></el-input-number>&emsp;天
                  </el-radio>
                  <!-- 占个空位 -->
                  <div></div>
                  <el-radio :label="1" style>
                    <span style="display: inline-block;width: 300px;">每月正数 / Positive monthly</span>
                    <el-input-number v-model="basicConfigurationFormData.basicDay1" controls-position="right" :step="1"
                      :min="0" :max=getDays() size="mini"></el-input-number>&emsp;天
                  </el-radio>
                  <!-- 占个空位 -->
                  <div></div>
                  <el-radio :label="2">
                    <span style="display: inline-block;width: 300px;">每月倒数 / Count down every month</span>
                    <el-input-number v-model="basicConfigurationFormData.basicDay2" controls-position="right" :step="1"
                      :min="0" :max=getDays() size="mini"></el-input-number>&emsp;天
                  </el-radio>
                  <!-- 占个空位 -->
                  <div></div>
                  <el-radio :label="3">
                    <span style="display: inline-block;width: 200px;margin-top:5px">每周 / weekly</span>
                    <div v-show="showWeek">
                      <el-checkbox-group v-model="basicConfigurationFormData.basicWeeks">
                        <el-checkbox label="2">一</el-checkbox>
                        <el-checkbox label="3">二</el-checkbox>
                        <el-checkbox label="4">三</el-checkbox>
                        <el-checkbox label="5">四</el-checkbox>
                        <el-checkbox label="6">五</el-checkbox>
                        <el-checkbox label="7">六</el-checkbox>
                        <el-checkbox label="1">日</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>



              <el-form-item class="paddingLeft" label="生成时间 / Build time">
                <el-input-number v-model="basicConfigurationFormData.basicHour" controls-position="right" :step="1"
                  :min="0" :max="23" size="mini"></el-input-number>&emsp;时 / Time&emsp;
                <el-input-number v-model="basicConfigurationFormData.basicMinute" controls-position="right" :step="1"
                  :min="0" :max="59" size="mini"></el-input-number>&emsp;分 / Minute
              </el-form-item>
            </el-col>
<!--                     <el-col>-->
<!--              <el-form-item class="paddingLeft" label="修改原因 / Modify reason" prop="reason">-->
<!--                <el-input v-model="basicConfigurationFormData.reason" type="textarea" placeholder="请输入修改原因 / Please enter the reason for modification"-->
<!--                  :maxlength="100" :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
        <el-col style="display: flex;justify-content: center;">
   <img src="../../assets/data_save.png"  style="height: 40px;cursor: pointer"   v-if="AuthorityData.showHidden.includes(5027)"
          @click="AuthorityData.electronicSignature.includes(5027)?automaticDataBackupCheckOpen():timingBackUpBaseConfig()">

            <!-- <el-button type="primary"
           v-if="AuthorityData.showHidden.includes(5027)"
          @click.native="AuthorityData.electronicSignature.includes(5027)?automaticDataBackupCheckOpen():timingBackUpBaseConfig()">保存 / Save</el-button> -->
        </el-col>
          </el-form>
       </el-row>
</div>
  </div>
</template>

<script>
import {backUpData, databaseTableRecovery, reductionOfData, verifyAccount, timingBackUpBaseConfig, queryBackUpBaseConfig} from './dataManagement'
import signaturePublic from '@/components/signaturePublic.vue'
export default {
  components: {
    signaturePublic
  },
  data: function () {
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
      fileList: undefined, // 数据恢复的文件
      basicConfigurationRules: {
        reason: [{
          required: true,
          message: '请输入修改原因 / Please enter the reason for modification',
          trigger: 'blur'
        } ]
      }, // 校验规则
      periodTypeRedio: 0, // 自动生成周期
      days: 0, // 计算当前最大天数
      showWeek: false,
      basicConfigurationFormData: {
        tenantName: 'lala',
        periodTypeRedio: 0,
        configId: '',
        periodType: 0, // 自动生成周期方式
        basicHour: 0, // 对应小时
        basicMinute: 0, // 对应分钟
        basicDay: '', // 对应天数
        basicDay0: '', // 对应天数
        basicDay1: '', // 对应天数
        basicDay2: '', // 对应天数
        basicWeeks: [], // 周
        reason: '' // 修改原因
      } // 收集自动备份的数据
    };
  },
  methods: {
    // 在这里触发所有需要电子签名的后续提交操作，新增和编辑写在了一起，然后是删除,要在结束的时候清空signPerson
    async authenticateUser () {
      if (this.signPerson.btnName == 'DataManagement_Management_Data_Backup') {
        this.backupCheck()
      } else if (this.signPerson.btnName == 'DataManagement_Management_Data_Recover') {
        this.dataRecoverCheck()
        // 删除
      } else if (this.signPerson.btnName == 'DataManagement_Management_Data_Table_Recover') {
        this.dataTableRecoverCheck()
      } else if (this.signPerson.btnName == 'DataManagement_Management_Automatic_Data_Backup') {
        this.automaticDataBackupCheck()
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
    // 数据备份start========================================================
    backupCheckOpen () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'DataManagement_Management_Data_Backup'
    },
    async backupCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        // 这里需要id并且清空要在结束的时候清空signPerson
        // this.del(this.signPerson.rowId)
        this.backUpDataButton()
      })
    },
    // 数据备份end==========================================================

    // 数据备份start========================================================
    dataRecoverCheckOpen () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'DataManagement_Management_Data_Recover'
    },
    async dataRecoverCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        this.reductionOfData()
        // 这里需要id并且清空要在结束的时候清空signPerson
        // this.del(this.signPerson.rowId)
      })
    },
    // 数据备份end==========================================================


    // 数据库表恢复start====================================================
    dataTableRecoverCheckOpen () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'DataManagement_Management_Data_Table_Recover'
    },
    async dataTableRecoverCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        this.databaseTableRecovery()
        // 这里需要id并且清空要在结束的时候清空signPerson
        // this.del(this.signPerson.rowId)
      })
    },
    // 数据库表恢复end==========================================================


    // 自动备份start========================================================
    automaticDataBackupCheckOpen () {
      this.signPerson.dialogVisible = true
      this.signPerson.btnName = 'DataManagement_Management_Automatic_Data_Backup'
    },
    async automaticDataBackupCheck () {
      // buName按钮名称,需要执行的函数
      const results = (await verifyAccount({...this.signPerson})).data
      this.dealResultCheck(results, function () {
        this.signPerson.dialogVisible = false
        // 为person中塞userId
        this.signPerson.userId = results.data.userId
        this.timingBackUpBaseConfig()
        // 这里需要id并且清空要在结束的时候清空signPerson
        // this.del(this.signPerson.rowId)
      })
    },
    // 自动备份end==========================================================


    async  timingBackUpBaseConfig () {
      const loading = this.flash()
      // 保存的时候
      this.basicConfigurationFormData['basicDay'] = this.basicConfigurationFormData['basicDay' + this.basicConfigurationFormData['periodType']]
      // 自动备份
      const data = (await timingBackUpBaseConfig(
        {
          ...this.basicConfigurationFormData,
          'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5027)
                ? this.signPerson
                : null)}
      )).data
      if (data.code === 20000) {
        this.$message.success(data.message)
        this.query()
        loading.close()
        this.clear()
      } else {
        this.$message.error(data.message)
        loading.close()
        this.clear()
      }
    },
    // 计算当前可选的最大天数
    getDays () {
      const curDate = new Date();
      const curMonth = curDate.getMonth() + 1;
      curDate.setMonth(curMonth, 0)
      let days = curDate.getDate();
      this.days = days;

      return days;
    },
    // 每次切换将上次的数据清空
    periodTypeChange () {
      this.basicConfigurationFormData.periodType = this.periodTypeRedio;
      if (this.periodTypeRedio === 0) {
        this.basicConfigurationFormData.basicDay1 = '';
        this.basicConfigurationFormData.basicDay2 = '';
        // this.basicConfigurationFormData.basicWeeks = [];
      }
      if (this.periodTypeRedio === 1) {
        this.basicConfigurationFormData.basicDay0 = '';
        this.basicConfigurationFormData.basicDay2 = '';
        // this.basicConfigurationFormData.basicWeeks = [];
      }
      if (this.periodTypeRedio === 2) {
        this.basicConfigurationFormData.basicDay0 = '';
        this.basicConfigurationFormData.basicDay1 = '';
        // this.basicConfigurationFormData.basicWeeks = [];
      }
      if (this.periodTypeRedio === 3) {
        this.basicConfigurationFormData.basicDay0 = '';
        this.basicConfigurationFormData.basicDay1 = '';
        this.basicConfigurationFormData.basicDay2 = '';
      }


      if (this.periodTypeRedio === 3) {
        this.showWeek = true;
      } else {
        this.showWeek = false;
        this.basicConfigurationFormData.basicWeeks = [];
      }
    },
    // 数据库表恢复
    async  databaseTableRecovery () {
      const loading = this.$LoadingEvent()
      const data = (await databaseTableRecovery({
        'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5026)
                ? this.signPerson
                : null)
      })).data
      if (data.code === 20000) {
        this.$message.success(data.message)
        loading.close()
        this.clear()
      } else {
        this.$message.error(data.message)
        loading.close()
        this.clear()
      }
    },
    // 选中文件触发
    onChange (file, fileList) {
      this.fileList = fileList
    },
    // 鼠标点下去的时候将fileList清空，方便第二次选择覆盖
    handlePreview (e) {
      // 这里的目的是不知道为什么点击触发按钮时候，点击下面展示的文件也会触发这个方法
      if (e.name) {
      } else {
        this.fileList = []
      }
    },
    // 数据恢复
    async reductionOfData () {
      if (this.fileList && this.fileList.length === 1) {
        // 上传文件
        let formdata = new FormData();
        formdata.append('file', this.fileList[0].raw)
        const loading = this.flash()
        const data = (await reductionOfData(formdata)).data
        if (data.code === 20000) {
          this.$message.success(data.message)
          loading.close()
          this.clear()
        } else {
          this.$message.error(data.message)
          loading.close()
          this.clear()
        }
      } else {
        this.$message.error('请先选中文件 / Please select the file first')
      }
    },
    async backUpDataButton () {
      const loading = this.flash()
      // // 数据备份
      const data = (await backUpData(
        { 'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(5024)
                ? this.signPerson
                : null)}
      )).data

      if (data.code === 20000) {
        this.$message.success(data.message)
        loading.close()
        this.clear()
      } else {
        this.$message.error(data.message)
        loading.close()
        this.clear()
      }
    },
    // 清空电子签名
    clear () {
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
    // 刷新功能
    flash () {
    // 全局刷新遮蔽的效果
      const loading = this.$loading({
        lock: true,
        text: '正在恢复请勿操作 / Resuming please do not operate',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 2555, 255, 0.5)'
      });
      return loading
    },
    // 初始化对象
    initData (a) {
      for (const key of Object.keys(a)) {
        a[key] = ''
      }
    },
    async query () {
      this.initData(this.basicConfigurationFormData)
      const results = (await queryBackUpBaseConfig()).data.data
      this.basicConfigurationFormData['basicHour'] = results['basicHour']
      this.basicConfigurationFormData['configId'] = results['configId']
      this.basicConfigurationFormData['basicMinute'] = results['basicMinute']
      this.basicConfigurationFormData['basicDay' + results['periodType']] = results['basicDay']
      this.basicConfigurationFormData['basicWeeks'] = results['basicWeeks'] ? results['basicWeeks'] : []
      results['basicWeeks'].length > 0 ? this.showWeek = true : this.showWeek = false
    }
  },
  mounted () {
    this.query()
  }


}
</script>

<style>
.context{
  background: white;
      color: #606266;
  width: 100%;
  display: flex;
      padding-bottom: 20px;
}
.left{
    width: 50%;
}
.right{
    width: 50%;
}
.padding{
  padding-bottom: 20px;
}
.line{
    border: 1px solid;
    /* margin-top: 20px; */
}
.title{
      font-size: 18px;
    /* font-weight: 11; */
    font-weight: 500;
    color: #D19275;
    padding-top: 20px;
}
</style>
