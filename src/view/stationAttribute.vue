<template id="stationAttribute">
  <div>
    <el-dialog
      :visible.sync="visible"
      width="40%"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div slot="title">
        <button style="float: left" @click="stationOperateForm = 1">
          工位属性
        </button>
        <button style="float: left" @click="stationOperateForm = 2">
          扩展属性
        </button>
      </div>
      <el-row v-show="stationOperateForm == 1">
        <!-- 工位属性表单 -->
        <el-form
          :model="stationsForm"
          :rules="stationsRules"
          ref="stationsRef"
          label-position="right"
          label-width="110px"
        >
          <el-col :span="12">
            <el-form-item label="工位名称" prop="stationName">
              <el-input
                v-model="stationsForm.stationName"
                placeholder="工位名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工位级别" prop="stationLevel">
              <el-input
                v-model="stationsForm.stationLevel"
                placeholder="工位级别"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工位用途" prop="stationUse">
              <el-select v-model="stationsForm.stationUse">
                <el-option
                  v-for="item in stationUseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扫描方式" prop="scanMode">
              <el-select v-model="stationsForm.scanMode">
                <el-option
                  v-for="item in scanOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="stationsForm.stationUse != 1">
            <el-form-item label="关联方式" prop="connectMode">
              <el-select v-model="stationsForm.connectMode">
                <el-option
                  v-for="item in connectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="stationsForm.stationUse == 2">
            <el-form-item label="包装数量" prop="packageNo">
              <el-input
                v-model="stationsForm.packageNo"
                placeholder="包装数量"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="stationsForm.scanMode == 3">
            <el-form-item label="确认扫描" prop="confirmScan">
              <el-input
                v-model="stationsForm.confirmScan"
                placeholder="确认扫描"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-show="
              stationsForm.connectMode == 1 &&
                stationsForm.stationUse != 1 &&
                stationsForm.stationUse != 2">
            <el-checkbox v-model="alsoPrint" :true-label="0" :false-label="1"
              >同时打印</el-checkbox
            >
          </el-col>
          <el-col
            :span="24"
            v-show="
              stationsForm.connectMode == 2 &&
                stationsForm.stationUse != 1 &&
                stationsForm.stationUse != 2
            "
          >
            <el-checkbox
              v-model="changeStation"
              :true-label="0"
              :false-label="1"
              >切换工位</el-checkbox
            >
            <el-checkbox
              v-model="exceptionClear"
              :true-label="0"
              :false-label="1"
              >异常清除</el-checkbox
            >
            <el-checkbox
              v-model="packageFullStop"
              :true-label="0"
              :false-label="1"
              >满包装停止</el-checkbox
            >
          </el-col>
        </el-form>
      </el-row>
      <!-- 扩展属性表单 -->
      <el-row v-show="stationOperateForm == 2" class="stationExpend">
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
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="() => getData()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getstationKeyList } from './productlinema.js';
export default {
  name: 'stationAttribute',
  data () {
    // 工位级别校验
    var validateLevel = async (rule, value, callback) => {
      const stationLevel = /[1-5]/;
      if (!value) {
        callback(new Error('工位级别不能为空'));
      } else if (stationLevel.test(value)) {
        return callback();
      } else {
        callback(new Error('输入有误'));
      }
    };

    return {
      visible: this.show,
      stationOperateForm: 1,
      // 工位属性表单数据
      stationsForm: {
        stationName: '',
        stationLevel: '1',
        stationUse: '0',
        scanMode: '0',
        connectMode: '0'
      },
      // 工位属性校验
      stationsRules: {
        stationName: [
          {
            required: true,
            message: '工位名称不能为空',
            trigger: 'blur'
          }
        ],
        stationLevel: [
          {
            required: true,
            trigger: 'blur',
            validator: validateLevel
          }
        ]
      },
      // 工位用途下拉框选项
      stationUseOptions: [
        {
          value: '0',
          label: '普通工位'
        },
        {
          value: '1',
          label: '前置工位'
        },
        {
          value: '2',
          label: '托盘工位'
        }
      ],
      // 扫描方式的选择
      scanOptions: [
        {
          value: '0',
          label: '扫描'
        },
        {
          value: '1',
          label: '扫描且保存'
        },
        {
          value: '2',
          label: '二次扫描'
        },
        {
          value: '3',
          label: '预扫描确认'
        }
      ],
      connectOptions: [
        {
          value: '0',
          label: '无关联'
        },
        {
          value: '1',
          label: '自动关联'
        },
        {
          value: '2',
          label: '扫描关联'
        }
      ],
      alsoPrint: 1, // 同时打印
      changeStation: 1, // 切换工位
      exceptionClear: 1, // 异常清除
      packageFullStop: 1, // 满包装停止

      // 工位扩展属性
      stationExtendForm: {
        extendKey: '',
        extendValue: ''
      },
      // 键的下拉菜单
      keyList: [],
      stationTableData: [],
      // stationForm: {},
      // stationTableData: [],
      // stationForm: {},
      // 扩展属性表单校验
      stationExtendRules: {
        extendKey: [{ max: 30 }],
        extendValue: [{ max: 30 }]
      }
    };
  },
  props: {
    GWData: {
      type: Object
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  watch: {
    GWData (newVal, oldVal) {
      this.stationTableData = newVal.stationTableData
        ? newVal.stationTableData
        : [];
      this.stationsForm = newVal.stationsForm ? newVal.stationsForm : {};
      // console.log(this.stationForm.stationName);
      // this.$forceUpdate();
    },
    show () {
      this.visible = this.show;
    },
    // 监听工位用户，不同的工位时，所展现的扫描方式不同
    'stationsForm.stationUse': {
      handler (newName, oldName) {
        // 当工位用途是托盘工位时
        if (newName == 1) {
          // 删除其他的扫描方式
          (this.scanOptions = []),
          this.scanOptions.unshift({
            value: '4',
            label: '预扫描'
          });
          this.stationsForm.scanMode = '4';
        }
        // 当工位用途是普通工位时
        else if (newName == 0) {
          (this.scanOptions = []),
          this.scanOptions.unshift(
            {
              value: '0',
              label: '扫描'
            },
            {
              value: '1',
              label: '扫描且保存'
            },
            {
              value: '2',
              label: '二次扫描'
            },
            {
              value: '3',
              label: '预扫描确认'
            }
          );
          this.stationsForm.scanMode = '0';
          // 重置关联方式
          (this.connectOptions = []),
          this.connectOptions.unshift(
            {
              value: '0',
              label: '无关联'
            },
            {
              value: '1',
              label: '自动关联'
            },
            {
              value: '2',
              label: '扫描关联'
            }
          );
          this.stationsForm.connectMode = '0';
        } else {
          // 当工位用户是托盘工位时
          (this.scanOptions = []),
          this.scanOptions.unshift(
            {
              value: '0',
              label: '扫描'
            },
            {
              value: '1',
              label: '扫描且保存'
            }
          ),
          (this.stationsForm.scanMode = '0');
          // 重置关联方式
          (this.connectOptions = []),
          this.connectOptions.unshift(
            {
              value: '1',
              label: '自动关联'
            },
            {
              value: '2',
              label: '扫描关联'
            }
          );
          this.stationsForm.connectMode = '1';
        }
      },
      deep: true
    }
  },
  created () {
    this.initOption();
  },
  methods: {
    getData () {
      this.$emit('addGWData', {
        stationsForm: this.stationsForm,
        stationTableData: this.stationTableData
      });
      // 关闭弹窗
      this.$emit('update:show', false);
      // console.log(this.stationsForm, this.stationTableData);
    },
    async initOption () {
      const { code, data, message } = await getstationKeyList();
      this.keyList = data.map(item => {
        return item;
      });
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
<style lang="scss" scoped>
::v-deep .el-input-group__append {
  padding: 0 8px;
}
</style>
