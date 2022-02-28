<template>
  <div id="TM_body" class="TM_body">
                   <!-- 搜索 -->
    <el-dialog :visible.sync="check1"
               width="60%"
               :close-on-press-escape="true"
               :close-on-click-modal="false">
      <!-- <div slot="title"
           style="font-size:20px">
      </div> -->
      <el-row :gutter="24">
        <el-form
                 ref="queryForm"
                 label-position="left"
                 :model="check1Data"
                 size="medium"
                 label-width="200px"
               >
                <el-col :span="24" >
               <div style="display:flex;display: flex;justify-content: center;margin-bottom: 20px;">
                  <img src="../../assets/check-1Title.png"/>
                   <!-- <img src="../../assets/check-1LA.png"/> -->
                    </div>
          </el-col>
          <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1LA.png"/>  </div>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1RF.png"/></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex;"> <img src="../../assets/check-1AN.png"/>  <el-input disabled v-model="check1.A1" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1AN.png"/>  <el-input disabled v-model="check1.A2" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1LN.png"/>  <el-input disabled v-model="check1.A3" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1LN.png"/>  <el-input disabled v-model="check1.A4" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1KN.png"/>  <el-input disabled v-model="check1.A5" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1KN.png"/>  <el-input disabled v-model="check1.A6" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" style="    display: flex;width:100%;justify-content: space-around;">
                  <img src="../../assets/check-1.png" v-if="AuthorityData.showHidden.includes(5036)" @click="AuthorityData.electronicSignature.includes(5036)?CheckOpen (1):public(11,5036)"  style="height: 60px"/>
         <img src="../../assets/ckeck1-success.png"  style="height: 60px"/>
          <!-- <img src="../../assets/ckeck1-error.png"/> -->
            <img src="../../assets/check1-out.png" @click="check1=false"  style="height: 60px"/>
      </span>
    </el-dialog>
     <!-- 測試 -->
    <el-dialog :visible.sync="check2"
               width="60%"
               :close-on-press-escape="true"
               :close-on-click-modal="false">
      <!-- <div slot="title"
           style="font-size:20px">
      </div> -->
      <el-row :gutter="24">
        <el-form
                 ref="queryForm"
                 label-position="left"
                 :model="check2Data"
                 size="medium"
                 label-width="200px"
               >
          <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-2L.png"/>  </div>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-2R.png"/></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex;"> <img src="../../assets/check-1AN.png"/>  <el-input disabled v-model="check2Data.A1" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="productCode">
               <div style="display:flex"> <img src="../../assets/check-1AN.png"/>  <el-input disabled v-model="check2Data.productCode" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1LN.png"/>  <el-input disabled v-model="check2Data.A3" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="lotNumber">
               <div style="display:flex"> <img src="../../assets/check-1LN.png"/>  <el-input disabled v-model="check2Data.lotNumber" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1KN.png"/>  <el-input  v-model="check2Data.A5" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="kitNumber">
               <div style="display:flex"> <img src="../../assets/check-1KN.png"/>  <el-input  v-model="check2Data.kitNumber" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" style="    display: flex;width:100%;justify-content: space-around;">
                  <img src="../../assets/check.png"   v-if="AuthorityData.showHidden.includes(5037)" @click="AuthorityData.electronicSignature.includes(5037)?CheckOpen (4):public(11,5037)" style="height: 60px"/>
         <img src="../../assets/check1-out.png"  @click="check2=false"  style="height: 60px"/>
          <!-- <img src="../../assets/ckeck1-error.png"/> -->
            <img src="../../assets/check.png" v-if="AuthorityData.showHidden.includes(5039)" @click="AuthorityData.electronicSignature.includes(5039)?CheckOpen (6):public(11,5039)" style="height: 60px"/>
      </span>
    </el-dialog>
    <!-- 重打 -->
    <el-dialog :visible.sync="check3"
               width="60%"
               :close-on-press-escape="true"
               :close-on-click-modal="false">
      <!-- <div slot="title"
           style="font-size:20px">
      </div> -->
      <el-row :gutter="24">
        <el-form
                 ref="queryForm"
                 label-position="left"
                 :model="check3Data"
                 size="medium"
                 label-width="200px"
               >
          <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-3L.png"/>  </div>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-3R.png"/></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex;"> <img src="../../assets/check-1AN.png"/>  <el-input  v-model="check1.A1" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1AN.png"/>  <el-input  v-model="check1.A2" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1LN.png"/>  <el-input  v-model="check1.A3" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1LN.png"/>  <el-input  v-model="check1.A4" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1KN.png"/>  <el-input  v-model="check1.A5" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
            <el-col :span="11" >
            <el-form-item class="paddingLeft"
                          prop="userAccount">
               <div style="display:flex"> <img src="../../assets/check-1KN.png"/>  <el-input  v-model="check1.A6" :style="{width: '100%',marginLeft:'20px'}"></el-input></div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" style="    display: flex;width:100%;justify-content: space-around;">
                  <img src="../../assets/check.png"   v-if="AuthorityData.showHidden.includes(5038)" @click="AuthorityData.electronicSignature.includes(5038)?CheckOpen (5):public(11,5038)" style="height: 60px"/>
         <img src="../../assets/check1-out.png"  @click="check3=false"  style="height: 60px"/>
          <!-- <img src="../../assets/ckeck1-error.png"/> -->
            <img src="../../assets/check.png" v-if="AuthorityData.showHidden.includes(5040)" @click="AuthorityData.electronicSignature.includes(5040)?CheckOpen (7):public(9,5040)" style="height: 60px"/>
      </span>
    </el-dialog>
      <signaturePublic  labelWidth='200px'  :formMS.sync='signPerson' @authenticateUser='authenticateUser'></signaturePublic>
    <!-- 顶部 -->
    <div id="top">
      <el-row :span="24">
        <!-- 名称 -->
        <!-- <el-col :span="2" class="t1">
          <div>信息数据:</div>
          <div>工艺流程:</div>
          <div>一次通过数量:</div>
        </el-col> -->
        <!-- 颜色 工位1 -->
        <el-col :span="2">
          <div class="t2">颜色:</div>
          <!-- <el-button type="success" style="padding: 7px !important" circle
            >1</el-button > -->
                  <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_1_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_1_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_1_DATA.stationStatus==3"  class="pgn">
        </el-col>
        <!-- 液位 -->
        <el-col :span="2">
          <div class="t2">液位:</div>
         <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_2_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_2_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_2_DATA.stationStatus==3"  class="pgn">
        </el-col>
        <!-- 完整性 -->
        <el-col :span="2">
          <div class="t2">完整性:</div>
       <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_3_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_3_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_3_DATA.stationStatus==3"  class="pgn">
        </el-col>
        <!-- 校验位 -->
        <el-col :span="2">
          <div class="t2">NULL</div>
                <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_4_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_4_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_4_DATA.stationStatus==3"  class="pgn">
          <div>
               <img src="../../assets/receive.png" class="pgn">
            <div class="t2">30</div>
          </div>
        </el-col>
        <!-- 4 -->
           <el-col :span="2">
          <div class="t2">00390</div>
         <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_5_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_5_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_5_DATA.stationStatus==3"  class="pgn">
          <div>
               <img src="../../assets/receive.png" class="pgn">
            <div class="t2">30</div>
          </div>
        </el-col>
        <!-- 剔除 -->
        <!-- <el-col :span="2">
          <div style="visibility: hidden" class="t2">占位</div>
                 <img src="../../assets/test3.png" class="pgn">
          <div>
               <img src="../../assets/receive.png" class="pgn">
            <div class="t2">10</div>
          </div>
        </el-col> -->
        <!-- 贴标机 -->
        <el-col :span="2">
          <div style="visibility: hidden" class="t2">占位</div>
            <img src="../../assets/error.png" class="pgn">
        </el-col>
        <!-- 5 -->
        <el-col :span="2">
          <div class="t2">00938</div>
      <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_7_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_7_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_7_DATA.stationStatus==3"  class="pgn">
        </el-col>
        <!-- 6 -->
         <el-col :span="2">
          <div class="t2">00390</div>
  <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_8_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_8_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_8_DATA.stationStatus==3"  class="pgn">
          <div>
               <img src="../../assets/receive.png" class="pgn">
            <div class="t2">30</div>
          </div>
        </el-col>
        <!-- 剔除 -->
        <!-- <el-col :span="2">
          <div style="visibility: hidden" class="t2">占位</div>
          <div style="visibility: hidden" class="t2">占位</div>
          <div>
           <img src="../../assets/receive.png" class="pgn">
            <div class="t2">20</div>
          </div>
        </el-col> -->
        <!-- 成功放行 -->
        <!-- <el-col :span="2">
          <div class="t2">00935</div>
   <img src="../../assets/test6.png" v-if="this.lightInspectionData.STATION_9_DATA.stationStatus==1" class="pgn">
                 <img src="../../assets/test4.png" v-if="this.lightInspectionData.STATION_9_DATA.stationStatus==2" class="pgn">
                 <img src="../../assets/test5.png"  v-if="this.lightInspectionData.STATION_9_DATA.stationStatus==3"  class="pgn">
          <div style="color: green">860</div>
        </el-col> -->
      </el-row>
    </div>
    <div class="contents">
      <!-- 左半部分 -->
      <div class="left p1">
        <!-- title-first -->
        <!-- <el-row span='24'>
   <el-col :span="12" :offset="0">
     <span>RFTagID:</span><span>00393</span>
   </el-col>
      <el-col :span="12" :offset="0">
     <span>Label:</span><span>00393</span>
   </el-col>
 </el-row> -->
        <!-- title-second -->
        <el-row span="24">
          <el-col :span="24" :offset="0" style="    text-align: center;">
             <img src="../../assets/title.png" >
          </el-col>
          <!-- <el-col :span="12" :offset="0" class="l_t2">
            <span>第二次统一处置</span>
          </el-col> -->
        </el-row>
        <!-- body -->
        <el-row span="24">
          <!-- 左边 -->
          <el-col :span="12" :offset="0" key="left">
            <stationComponents
              :data="dataArr['data4']"
              height="240px"
              :index="4"
            ></stationComponents>
            <stationComponents
             :data="dataArr['data5']"
                  height="240px"
             :index="5"
            >
            </stationComponents>
            <!-- <stationComponents
              :data="dataArr[4]"
              index="工位3"
            ></stationComponents> -->
          </el-col>
          <!-- 右边 -->
          <el-col :span="12" :offset="0" key="right">
            <stationComponents
             :data="dataArr['data8']"
              height="652px"
              :index="8"
            >
            </stationComponents>
            <!-- <stationComponents
              :data="dataArr[3]"
              index="工位2"
            ></stationComponents>
            <stationComponents
              :data="dataArr[5]"
              index="工位3"
            ></stationComponents> -->
          </el-col>
        </el-row>
      </div>
      <!-- 右半部分 -->
      <div class="right">
        <div class="r_button">
      <img src="../../assets/Model.png"  v-if="AuthorityData.showHidden.includes(5042)" style="height: 40px;margin-left: 40px;"@click="AuthorityData.electronicSignature.includes(5042)?CheckOpen (9):public(11,5042)">
      <!-- <img src="../../assets/lantern-1.png" style="height: 42px;margin-left: 20px;"> -->
      <!-- <img src="../../assets/lantern-2.png" style="height: 42px;margin-left: 20px;"> -->
      <img src="../../assets/lantern-3.png" style="height: 42px;margin-left: 20px;" >
      <!-- <img src="../../assets/lantern-4.png" style="height: 42px;margin-left: 20px;"> -->

        </div>
        <div class="r_title">联机模式 / Online mode</div>
        <div class="r_t1 t2" style="font-size: 24px;color: black;padding-top: 40px;">
          <el-row span="24"
            ><el-col :span="24" :offset="0"
              ><span>产品代码：</span><span>{{this.firstData.productCode}}</span>
            </el-col></el-row
          >
          <el-row span="24"
            ><el-col :span="24" :offset="0"
              ><span>产品批号：</span><span>{{this.firstData.lotNumber}}</span>
            </el-col></el-row
          >
          <!-- <el-row span="24"
            ><el-col :span="24" :offset="0"
              ><span>产品货号：</span><span>310745</span>
            </el-col></el-row
          >
        </div>
        <div class="r_t2">
          <el-row span="24"
            ><el-col :span="24" :offset="0"
              ><span>生产日期：</span><span>2021-05-11</span>
            </el-col></el-row
          > -->
          <el-row span="24"
            ><el-col :span="24" :offset="0"
              ><span>有效期至：</span><span>{{this.firstData.expirationDate}}</span>
            </el-col></el-row
          >
        </div>
        <!-- 一次性通过 -->
        <div style="display: flex">
          <el-row style="width: 43%;" class="r_t3">
            <el-col
              ><span>入料总数量:</span><span class="r_t3_1">920</span></el-col
            >
            <el-col
              ><span>成功数量:</span><span class="r_t3_1">860</span></el-col
            >
            <el-col
              ><span>失败数量:</span><span class="r_t3_1">60</span></el-col
            >
          </el-row>
            <img src="../../assets/pass1.png"  v-if="AuthorityData.showHidden.includes(5033)"  style="height: 50px;width: 170px;"
              @click="AuthorityData.electronicSignature.includes(5033)?CheckOpen (0):public(6,5033)">
          <!-- <el-button  v-if="AuthorityData.showHidden.includes(5033)"
              @click.native="AuthorityData.electronicSignature.includes(5033)?CheckOpen (0):public(6,5033)"
          type="primary" style="height: 40px">一次性通过</el-button> -->
        </div>
        <!-- ============================================ -->
        <!-- 第二次处置 -->
        <div style="display: flex">
          <el-row style="width: 43%;" class="r_t3">
            <el-col
              ><span>入料总数量:</span><span class="r_t3_1">920</span></el-col
            >
            <el-col
              ><span>成功数量:</span><span class="r_t3_1">860</span></el-col
            >
            <el-col
              ><span>失败数量:</span><span class="r_t3_1">60</span></el-col
            >
          </el-row>
                  <img src="../../assets/pass2.png"  v-if="AuthorityData.showHidden.includes(5034)" style="height: 50px;width: 170px;" @click="AuthorityData.electronicSignature.includes(5034)?CheckOpen (1):public(7,5034)">
          <!-- <el-button  v-if="AuthorityData.showHidden.includes(5034)"
           @click.native="AuthorityData.electronicSignature.includes(5034)?CheckOpen (1):public(7,5034)" type="primary" style="height: 40px">第二次处置</el-button> -->
        </div>
        <!-- ============================================ -->
        <!-- 操作按钮 -->
        <el-row span="24" class="r_t4">
                  <img src="../../assets/pause.png" style="height: 40px;cursor: pointer;width:160px"  v-if="AuthorityData.showHidden.includes(5035)" class="r_t4_pa" @click="AuthorityData.electronicSignature.includes(5035)?CheckOpen (1):public(10,5035)">
                  <!-- <img src="../../assets/verifiy.png"  v-if="AuthorityData.showHidden.includes(5036)" class="r_t4_pa" style="height: 40px"@click="AuthorityData.electronicSignature.includes(5036)?CheckOpen (1):public(11,5036)"> -->
                <img src="../../assets/verifiy.png"  class="r_t4_pa" style="height: 40px;cursor: pointer;width:160px" @click="check1=true">



                    <!-- 標簽測試 -->
                  <!-- <img src="../../assets/Label.png"  v-if="AuthorityData.showHidden.includes(5037)" class="r_t4_pa" style="height: 40px"@click="AuthorityData.electronicSignature.includes(5037)?CheckOpen (4):public(11,5037)"> -->
                   <img src="../../assets/bigT.png"  class="r_t4_pa" style="height: 40px;cursor: pointer;width:325px" @click="check2=true">
                  <!-- 標簽重写 -->
                  <!-- <img src="../../assets/Label1.png"  v-if="AuthorityData.showHidden.includes(5038)" class="r_t4_pa" style="height: 40px"@click="AuthorityData.electronicSignature.includes(5038)?CheckOpen (5):public(11,5038)"> -->
                   <img src="../../assets/bigR.png"  class="r_t4_pa" style="height: 40px;cursor: pointer;width:325px" @click="check3=true">

                    <!-- RFID测试 -->
                  <!-- <img src="../../assets/RFTag.png"  v-if="AuthorityData.showHidden.includes(5039)" class="r_t4_pa" style="height: 40px"@click="AuthorityData.electronicSignature.includes(5039)?CheckOpen (6):public(11,5039)"> -->
                   <!-- <img src="../../assets/RFTag.png"  class="r_t4_pa" style="height: 40px;cursor: pointer" @click="check2=true"> -->
                     <!-- RFID重打 -->
                  <!-- <img src="../../assets/RFID.png"  v-if="AuthorityData.showHidden.includes(5040)" class="r_t4_pa" style="height: 40px"@click="AuthorityData.electronicSignature.includes(5040)?CheckOpen (7):public(11,5040)"> -->
                   <!-- <img src="../../assets/RFID.png"  class="r_t4_pa" style="height: 40px;cursor: pointer" @click="check3=true"> -->


                   <!-- ID还没有加电子签名 -->
                  <img src="../../assets/ID.png" class="r_t4_pa" style="height: 50px;cursor: pointer;width:160px"  v-if="AuthorityData.showHidden.includes(5041)"  @click="AuthorityData.electronicSignature.includes(5041)?CheckOpen (8):public(11,5041)">

                  <img src="../../assets/out.png" class="r_t4_pa" style="height: 50px;cursor: pointer;width:160px"  v-if="AuthorityData.showHidden.includes(5041)"  @click="AuthorityData.electronicSignature.includes(5041)?CheckOpen (8):public(11,5041)">

                  <!-- <img src="../../assets/verifiy.png"  v-if="AuthorityData.showHidden.includes(5042)" style="height: 40px"@click.native="AuthorityData.electronicSignature.includes(5042)?CheckOpen (9):public(11,5042)"> -->
<!--
          <el-col span="12"
            ><el-button          @click.native="AuthorityData.electronicSignature.includes(5035)?CheckOpen (2):public(10,5035)"  v-if="AuthorityData.showHidden.includes(5035)" type="primary">任务暂停</el-button></el-col
          >
          <el-col span="12"
            ><el-button          @click.native="AuthorityData.electronicSignature.includes(5036)?CheckOpen (3):public(11,5036)" v-if="AuthorityData.showHidden.includes(5036)" type="success">数据校验</el-button></el-col
          >
          <el-col span="12" style="margin: 20px 0px 0 0"
            ><el-button          @click.native="AuthorityData.electronicSignature.includes(5037)?CheckOpen (4):public(8,5037)" v-if="AuthorityData.showHidden.includes(5037)" type="info">标签测试</el-button></el-col
          >
            <el-col span="12" style="margin: 20px 0px 0 0"
            ><el-button          @click.native="AuthorityData.electronicSignature.includes(5038)?CheckOpen (5):public(1,5038)" v-if="AuthorityData.showHidden.includes(5038)" type="info">标签重打</el-button></el-col
          >  <el-col span="12" style="margin: 20px 0px 0 0"
            ><el-button          @click.native="AuthorityData.electronicSignature.includes(5039)?CheckOpen (6):public(9,5039)" v-if="AuthorityData.showHidden.includes(5039)" type="info">RFTag测试</el-button></el-col
          >  <el-col span="12" style="margin: 20px 0px 0 0"
            ><el-button          @click.native="AuthorityData.electronicSignature.includes(5040)?CheckOpen (7):public(0,5040)" v-if="AuthorityData.showHidden.includes(5040)" type="info">RFTag重写</el-button></el-col
          >
          <el-col span="12" style="margin: 20px 0px 0 0"
            ><el-button          @click.native="AuthorityData.electronicSignature.includes(5041)?CheckOpen (8):public(12,5041)" v-if="AuthorityData.showHidden.includes(5041)" type="warning" >退出</el-button></el-col
          >
          <el-col span="12" style="margin: 20px 0px 0 0"
          ><el-button          @click.native="AuthorityData.electronicSignature.includes(5042)?CheckOpen (9):public(13,5042)" v-if="AuthorityData.showHidden.includes(5042)" type="warning" >强制独立模式</el-button></el-col
          > -->
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import stationComponents from './stationComponents.vue'
import data from './fackData'
import signaturePublic from '@/components/signaturePublic.vue'
import {testBtn, verifyAccount, testRef} from './check'
export default {
  props: {
  },
  components: {
    stationComponents,
    signaturePublic
  },
  data () {
    return {
      webSockets: null,
      firstData: {
        expirationDate: '',
        lotNumber: '',
        productCode: ''
      },
      lightInspectionData: {
        STATION_1_DATA: {stationStatus: 3}, // 默认置灰
        STATION_2_DATA: {stationStatus: 3}, // 默认置灰
        STATION_3_DATA: {stationStatus: 3}, // 默认置灰
        STATION_4_DATA: {stationStatus: 3}, // 默认置灰
        STATION_5_DATA: {stationStatus: 3}, // 默认置灰
        STATION_6_DATA: {stationStatus: 3}, // 默认置灰
        STATION_7_DATA: {stationStatus: 3}, // 默认置灰
        STATION_8_DATA: {stationStatus: 3}, // 默认置灰
        STATION_9_DATA: {stationStatus: 3} // 默认置灰
      },
      check1: false,
      dataArr: {
        data4: {
          successInfo: [],
          failedInfo: []
        },
        data5: {
          successInfo: [],
          failedInfo: []
        },
        data8: {
          successInfo: [],
          failedInfo: []
        }
      },
      check1Data: {
        A1: '',
        A2: '',
        A3: '',
        A4: '',
        A5: '',
        A6: ''
      },
      check2: false, // 測試
      check2Data: {
        A1: '',
        productCode: this.$route.query.productCode,
        A3: '',
        lotNumber: this.$route.query.lotNumber,
        A5: '',
        kitNumber: ''
      },
      check3: false, // 重寫
      check3Data: {
        A1: '',
        productCode: this.$route.query.productCode,
        A3: '',
        lotNumber: this.$route.query.lotNumber,
        A5: '',
        A6: ''
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
      }
    };
  },
  computed: {

  },
  created () {
    console.log(data);
  },
  mounted () {
    this.fullScreen()
    // 开启webscoket
    this.keepWebSocket()
  },
  watch: {

  },
  methods: {
    // 一个是查询，另一个是websocket
    keepWebSocket () {
      // 这里应该去的是环境
      // this.webSockets = new WebSocket(`ws://172.169.90.25:8088/fcs/${sessionStorage.getItem('userId')}/${this.$route.query.taskInfoId}`);
      this.webSockets = new WebSocket(`ws://192.168.2.221:8088/fcs/${sessionStorage.getItem('userId')}/${this.$route.query.taskInfoId}`);

      // this.webSockets = new WebSocket(`ws://192.168.2.221:8088/fcs/${sessionStorage.getItem('userId')}/${taskInfoId}`);

      // 连接发生错误的回调方法
      this.webSockets.onerror = event => {
        console.error(event);
      };
      // 连接成功建立的回调方法
      this.webSockets.onopen = event => {
        console.log('开启WebSocket');
        this.webSockets.send(
          JSON.stringify({
            message: 0,
            // taskInfoId: this.$route.query.taskInfoId,
            ...this.$route.query
          })
        );
      };
      // 连接关闭的回调方法
      this.webSockets.onclose = () => {
        console.log('关闭WebSocket');
        // this.keepWebSocket()
        // this.webSockets.send({
        //   message: 0,
        //   id: this.row.id
        // })
      };

      // 接收到消息的回调方法(websocket建立连接之后，后端会每隔一段时间给我发送一个模式的装填)
      // this.webSockets.addEventListener('message', (event) => {
      //   debugger
      //   console.log('Message from server ', event.data);
      // });
      this.webSockets.onmessage = event => {
        const data = JSON.parse(event.data);
        // 接收灯检信息
        for (let key in this.lightInspectionData) {
          // 判断是否返回对应的灯检位的信息
          if (JSON.stringify(data[key])) {
            console.log(JSON.stringify(data[key]), data[key]['stationStatus']);
            this.lightInspectionData[key]['stationStatus'] = data[key]['stationStatus']
            // 特殊处理工位四，接受工位四的数据展示Table
            if (key == 'STATION_4_DATA') {
              this.dataArr['data4']['successInfo'] = data[key]['successInfo']
              this.dataArr['data4']['failedInfo'] = data[key]['failedInfo']
            }
            // 特殊处理工位五，接受工位四的数据展示Table
            if (key == 'STATION_5_DATA') {
              this.dataArr['data5']['successInfo'] = data[key]['successInfo']
              this.dataArr['data5']['failedInfo'] = data[key]['failedInfo']
            }
            // 特殊处理工位八，接受工位四的数据展示Table
            if (key == 'STATION_8_DATA') {
              this.dataArr['data8']['successInfo'] = data[key]['successInfo']
              this.dataArr['data8']['failedInfo'] = data[key]['failedInfo']
            }
            // 一秒之后置灰
            setTimeout(() => {
              this.lightInspectionData[key]['stationStatus'] = 3
            }, 2000)
          }
        }
        // 塞有效期等数据
        if (JSON.stringify(data['TASK_INFO'])) {
          for (let key in this.firstData) {
            if (data['TASK_INFO'][key]) {
              this.firstData[key] = data['TASK_INFO'][key]
            }
          }
        }
        // 校验成功
        if (JSON.stringify(data['1'])) {
          this.$message.success(data['1'])
        }
        // 校验失败
        if (JSON.stringify(data['0'])) {
          // 跳转三级页面(失败了需要跳回一级页面)
          this.$message.success(data['0'])
          this.$router.push('/taskManagement')
        }
      }
    },
    fullScreen () {
      const element = window.document.getElementById('TM_body')
      if (element.requestFullScreen) {
        element.requestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      }
    },
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
      if (this.signPerson.btnName == 'Sysuser_Management_One_Pass') {
        this.add(6, 5033)
      } else if (this.signPerson.btnName == 'Sysuser_Management_Second_Disposal') {
        this.add(7, 5034)
      } else if (this.signPerson.btnName == 'Sysuser_Management_Task_Pause') {
        this.add(10, 5035)
      } else if (this.signPerson.btnName == 'Sysuser_Management_Data_Validation') {
        this.add(11, 5036)
      } else if (this.signPerson.btnName == 'Sysuser_Management_Label_Test') {
        this.add(8, 5037)
      } else if (this.signPerson.btnName == 'Sysuser_Management_Label_Reprint') {
        this.add(1, 5038)
      } else if (this.signPerson.btnName == 'Sysuser_Management_RFTag_Test') {
        this.add(9, 5039)
      } else if (this.signPerson.btnName == 'Sysuser_Management_RFTag_Replay') {
        this.add(0, 5040)
      } else if (this.signPerson.btnName == 'Sysuser_Management_Quit') {
        this.add(12, 5041)
      } else if (this.signPerson.btnName == 'Sysuser_Management_Forced_Independent_Mode') {
        this.add(13, 5042)
      }
    },
    CheckOpen (type) {
      const dataArr = [
        // 一次性通过start 0
        'Sysuser_Management_One_Pass',
        // 第二次处置start 1
        'Sysuser_Management_Second_Disposal',
        // 任务暂停start 2
        'Sysuser_Management_Task_Pause',
        // 数据校验start 3
        'Sysuser_Management_Data_Validation',
        // 标签测试start 4
        'Sysuser_Management_Label_Test',
        // 标签重打start 5
        'Sysuser_Management_Label_Reprint',
        // RFTag测试start 6
        'Sysuser_Management_RFTag_Test',
        // RFTag重打start 7
        'Sysuser_Management_RFTag_Replay',
        // 退出start 8
        'Sysuser_Management_Quit',
        // 强制独立模式 9
        'Sysuser_Management_Forced_Independent_Mode'
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
      switch (flag) {
      // 测试RFLG
        case 9:
          console.log(this.$router);
          // 判断kitNumber是否满足要求
          if (this.check2Data.kitNumber && this.check2Data.kitNumber !== '' && (this.check2Data.kitNumber >= 1 && this.check2Data.kitNumber <= 9999)) {
            this.getResult(testRef, {
              // 'Type': flag,
              // 这里属性名可能和Label冲突
              ...this.check2Data,
              'person':
              // 有电子签就塞person没有就塞null
              (this.AuthorityData.electronicSignature.includes(num)
                ? this.signPerson
                : null)})
            break;
          } else {
            this.$message.error('请输入RFTag下ketNymber的值并且范围是1-9999')
          }
      }

      // // 在这里执行代码(打印导出等功能)
      // this.getResult(testBtn, {'type': flag,
      //   'person':
      //         // 有电子签就塞person没有就塞null
      //         (this.AuthorityData.electronicSignature.includes(num)
      //           ? this.signPerson
      //           : null)})
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
    }
    // 一次性通过start========================================================
    // 一次性通过end==========================================================

    // 第二次处置start========================================================
    // 第二次处置end==========================================================

    // 任务暂停start========================================================
    // 任务暂停end==========================================================

    // 数据校验start========================================================
    // 数据校验end==========================================================

    // 标签测试start========================================================

    // 标签测试end==========================================================

    // 标签重打start========================================================
    // 标签重打end==========================================================

    // RFTag测试start========================================================


    // RFTag测试end==========================================================

    // RFTag重打start========================================================
    // RFTag重打end==========================================================

    // 退出start========================================================
    // 退出end==========================================================
  }
};
//
</script>

<style scoped lang="scss">
.r_t4_pa{
  height: 40px;
  padding-bottom: 20px;
}
.pgn{
  width: 50px;
}
.contents {
  height: 100%;
  width: 100%;
  display: flex;
}
.left {
  width: 75%;
  border: 1px solid #ccc;
  padding: 6px 20px 0px 20px;
}
.right {
  width: 25%;
  border: 1px solid #ccc;
}
.p1 {
  font-size: 40px;
}

.p3 {
  font-size: 25px;
}
.top {
  width: 100%;
  border: 1px solid #ccc;
}
.TM_body {
  height: 100%;
  width: 100%;
    //   position: fixed;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // left: 0;
    // overflow: auto;
    // margin: 0;
    // z-index: 9999;
    // /* background: white; */
    background: ghostwhite;
}
.t1 {
  font-size: 22px;
  color: #d2691e;
}
.t2 {
  font-size: 16px;
  line-height: 30px;
  color: #ff7f50;
}
.t3 {
  background-color: #008b8b !important;
  border-color: #008b8b !important;
}
.t4 {
  background-color: green !important;
  border-color: green !important;
}
.r_button {
  width: 100%;
  text-align: center;
  padding: 10px 0px 0 0px;
}
.r_title {
  font-size: 20px;
  color: red;
  width: 100%;
  text-align: center;
  line-height: 32px;
}
.r_t1 {
  margin: 0px 0px 20px 20px;
}
.r_t2 {
  font-size: 24px;
  padding-top: 10px;
  margin: 0px 0px 20px 20px;
  color: black;
}
.r_t3 {
  font-size: 20px;
  margin: 0px 0px 20px 20px;
  color: black;
}
.r_t3_1 {
  font-size: 24px;
  line-height: 30px;
  color: #ff7f50;
}
.r_t4 {
  margin: 0px 0px 20px 20px;
}
.l_t1 {
  color: red;
  border: 1px solid black;
  text-align: center;
  background: #c0c0c0;
}
.l_t2 {
  color: black;
  border: 1px solid black;
  text-align: center;
  background: #c0c0c0;
  margin-bottom: 10px;
}

</style>
