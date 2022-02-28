<template id="inputDevice">
  <div>
    <el-dialog
      :visible.sync="visible"
      width="40%"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div slot="title">
        <button style="float: left" @click="inputOperateForm = 1">
          设备属性
        </button>
        <button style="float: left" @click="inputOperateForm = 2">
          扩展属性
        </button>
      </div>
      <el-row v-show="inputOperateForm == 1">
        <!-- 工位属性表单 -->
        <el-form
          :model="inputDeviceForm"
          :rules="inputDeviceRules"
          ref="inputDeviceRef"
          label-position="right"
          label-width="110px"
        >
          <el-col :span="12">
            <el-form-item label="设备编码" prop="deviceCode">
              <el-input
                v-model="inputDeviceForm.deviceCode"
                placeholder="设备编码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="deviceName">
              <el-select v-model="inputDeviceForm.deviceName" @change="isShow">
                <el-option
                  v-for="item in deviceTypeOptions"
                  :key="item.deviceId"
                  :value="item.deviceName"
                >
                  <!-- <span>{{ item.value }}</span> -->
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="端口" prop="devicePort" v-show="isdevicePort">
              <el-input v-model="inputDeviceForm.devicePort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isbaudRate">
            <el-form-item label="波特率" prop="baudRate">
              <el-input v-model="inputDeviceForm.baudRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isdataBit">
            <el-form-item label="数据位" prop="dataBit">
              <el-input v-model="inputDeviceForm.dataBit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isparityCheck">
            <el-form-item label="奇偶校验" prop="parityCheck">
              <el-input v-model="inputDeviceForm.parityCheck"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isstopBit">
            <el-form-item label="停止位" prop="stopBit">
              <el-input v-model="inputDeviceForm.stopBit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isplcContact">
            <el-form-item label="PLC触点号" prop="plcContact">
              <el-input v-model="inputDeviceForm.plcContact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isscanNum">
            <el-form-item label="扫描数量" prop="scanNum">
              <el-input v-model="inputDeviceForm.scanNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isip">
            <el-form-item label="IP" prop="ip">
              <el-input v-model="inputDeviceForm.ip"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isrelationCheck">
            <el-form-item prop="relationCheck">
              <el-checkbox
                v-model="inputDeviceForm.relationCheck"
                :true-label="0"
                :false-label="1"
                >关联关系检查</el-checkbox
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <el-row v-show="inputOperateForm == 2">
        <el-form
          ref="stationExtendRef"
          :model="stationExtendForm"
          label-position="right"
          label-width="60px"
          :rules="stationExtendRules"
        >
          <el-col :span="10">
            <el-form-item label="键：" prop="extendKey">
              <el-input v-model="stationExtendForm.extendKey">
                <el-dropdown slot="append" trigger="click" @command="getkey">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(obj, key) in keyList"
                      :key="key"
                      :command="obj.keys"
                      >{{ obj.keys }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="值：" prop="extendValue">
              <el-input v-model="stationExtendForm.extendValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              style="margin-left: 15px"
              @click="addExtendAtt(stationExtendForm)"
              >添加</el-button
            >
          </el-col>
        </el-form>

        <el-table :data="stationTableData" border style="width: 100%">
          <el-table-column prop="extendKey" label="键"> </el-table-column>
          <el-table-column prop="extendValue" label="值"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="delExtendAtt(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getstationKeyList, getInputdeviceList } from './productlinema.js';

export default {
  name: 'inputDevice',
  data () {
    return {
      visible: this.show,
      inputOperateForm: 1,
      // 输入设备属性
      inputDeviceForm: {
        deviceCode: '',
        deviceType: '',
        devicePort: '',
        baudRate: '9600',
        dataBit: '8',
        parityCheck: '',
        stopBit: '1',
        plcContact: '',
        scanNum: '',
        deviceId: '',
        ip: '',
        relationCheck: '1'
      },
      // 输入设备属性输入字段检验
      inputDeviceRules: {},
      // 设备类型选项
      deviceTypeOptions: [],
      // 设备扩展属性
      stationExtendForm: {
        extendKey: '',
        extendValue: ''
      },
      // 键的下拉菜单
      keyList: [],
      stationTableData: [],
      // 扩展属性表单校验
      stationExtendRules: {
        extendKey: [{ max: 30 }],
        extendValue: [{ max: 30 }]
      },
      // 设备属性中所有属性的展示控制
      isdevicePort: false,
      isbaudRate: false,
      isdataBit: false,
      isparityCheck: false,
      isstopBit: false,
      isplcContact: false,
      isscanNum: false,
      isip: false,
      isrelationCheck: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show () {
      this.visible = this.show;
    }
  },
  created () {
    this.initOption();
    this.initInputOption();
  },
  methods: {
    async initOption () {
      const { code, data, message } = await getstationKeyList();
      this.keyList = data.map(item => {
        return item;
      });
    },
    async initInputOption () {
      const { code, data, message } = await getInputdeviceList();
      if (code != 20000) {
        return;
      }
      this.deviceTypeOptions = data;
    },
    isShow (val) {
      // console.log(val);
      // console.log(deviceId);
      var obj = {},
        obj = this.deviceTypeOptions.find(function (item) {
          return item.deviceName === val;
        });
      if (obj.deviceId == 7) {
        (this.isdevicePort = true),
        (this.isbaudRate = true),
        (this.isdataBit = true),
        (this.isparityCheck = true),
        (this.isstopBit = true),
        (this.isplcContact = false),
        (this.isscanNum = true),
        (this.isip = false),
        (this.isrelationCheck = true);
      } else if (obj.deviceId == 8) {
        (this.isdevicePort = true),
        (this.isbaudRate = false),
        (this.isdataBit = false),
        (this.isparityCheck = false),
        (this.isstopBit = false),
        (this.isplcContact = false),
        (this.isscanNum = true),
        (this.isip = true),
        (this.isrelationCheck = true);
      } else {
        (this.isdevicePort = true),
        (this.isbaudRate = false),
        (this.isdataBit = false),
        (this.isparityCheck = false),
        (this.isstopBit = false),
        (this.isplcContact = true),
        (this.isscanNum = false),
        (this.isip = true),
        (this.isrelationCheck = false);
      }
    },
    // 将选中的键放入输入框
    getkey (command) {
      this.stationExtendForm.extendKey = command;
    },
    // 添加扩展属性
    addExtendAtt (stationExtendForm) {
      if (
        stationExtendForm.extendKey != '' &&
        stationExtendForm.extendValue != ''
      ) {
        const stationForm = {};
        stationForm.extendKey = stationExtendForm.extendKey;
        stationForm.extendValue = stationExtendForm.extendValue;
        this.stationTableData.push(stationForm);
        this.$refs.stationExtendRef.resetFields();
      } else {
        this.$message.error('键和值必须同时有值');
      }
    },
    // 删除扩展属性
    delExtendAtt (index) {
      // console.log(index);
      this.stationTableData.splice(index, 1);
    }
  }
};
</script>
