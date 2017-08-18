<template>
  <div class="tabs-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="基本信息">
        <!--基本信息显示-->
        <el-button @click="editFormBtn" v-if="displayForm" size="small">编辑</el-button>
        <el-button @click="saveFormBtn" v-if="!displayForm" size="small">保存</el-button>
        <el-button @click="delFormBtn" v-if="displayForm"  size="small">删除</el-button>
        <el-button @click="cancelFormBtn" v-if="!displayForm" size="small">取消</el-button>
        <div v-if="displayForm">
          <el-form :model="showForm"  label-width="140px" >
            <el-row class="col-height-show">
              <el-col :span="6">
                <el-form-item label="姓名">
                  <span>{{showForm.driverName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="常用手机">
                  <span>{{showForm.telephone1}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备用手机">
                  <span>{{showForm.telephone2}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家属电话">
                  <span>{{showForm.familyTel}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="col-height-show">
              <el-col :span="6">
                <el-form-item label="身份证号">
                  <span>{{showForm.idCard}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证地址">
                  <span>{{showForm.idAddr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态">
                  <span>{{showForm.status}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="col-height-show">
              <el-col :span="6">
                <el-form-item label="准驾车型">
                  <span>{{showForm.allowDriveType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶证有效期">
                  <span>{{showForm.driverLicenseEndStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年审日期">
                  <span>{{showForm.nextReturnDueStr}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="col-height-show">
              <el-col :span="6">
                <el-form-item label="资格证号">
                  <span>{{showForm.workNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="资格证有效期">
                  <span>{{showForm.workNoEndStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶车辆">
                  <span>{{showForm.bindingTruckNo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="col-height-show">
              <el-col :span="12">
                <el-form-item label="常住地址">
                  <span>{{showForm.usualAddr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通讯地址">
                  <span>{{showForm.contactAddr}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="col-height-show">
              <el-col :span="12">
                <el-form-item label="备注">
                  <span>{{showForm.remark}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div v-if="!displayForm">
          <el-form :model="editForm"  label-width="140px"  ref="editForm">
            <el-row class="col-height">
              <el-col :span="6">
                <el-form-item label="姓名">
                  <el-input v-model="editForm.driverName" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="常用手机">
                  <el-input v-model="editForm.telephone1" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备用手机">
                  <el-input v-model="editForm.telephone2" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="家属电话">
                  <el-input v-model="editForm.familyTel" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  class="col-height">
              <el-col :span="6">
                <el-form-item label="身份证号">
                  <el-input v-model="editForm.idCard" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证地址">
                  <el-input v-model="editForm.idAddr" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态">
                  <el-select v-model="editForm.status" @change="accountTypeChange" clearable placeholder="请选择">
                    <el-option
                      v-for="item in editForm.options"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="col-height">
              <el-col :span="6">
                <el-form-item label="准驾车型">
                  <el-input v-model="editForm.allowDriveType" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶证有效期">
                  <el-date-picker
                    v-model="editForm.driverLicenseEndStr"
                    type="date"
                    placeholder="选择日期"
                    >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年审日期">
                  <el-date-picker
                    v-model="editForm.nextReturnDueStr"
                    type="date"
                    placeholder="选择日期"
                   >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  class="col-height">
              <el-col :span="6">
                <el-form-item label="资格证号">
                  <el-input v-model="editForm.workNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="资格证有效期">
                  <el-date-picker
                    v-model="editForm. workNoEndStr"
                    type="date"
                    placeholder="选择日期"
                   >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶车辆">
                  <el-autocomplete
                    v-model="editForm.bindingTruckNo"
                    :fetch-suggestions="plateNoSearch"
                    placeholder="请输入内容"
                    :disabled="true"
                    @select="carHandleSelect"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  class="col-height">
              <el-col :span="12">
                <el-form-item label="常住地址">
                  <el-input v-model="editForm.usualAddr" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通讯地址">
                  <el-input v-model="editForm.contactAddr" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row  class="col-height">
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input v-model="editForm.remark"
                            type="textarea"
                            placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import api from '../../api/api'
  export default {
    props:['selectData'],
    name: 'tabs-list',
    data() {
      return {
        //日期禁止选择以前的日期
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        //客户tabs
        activeName: '基本信息',
        //客户编辑列表
        editForm: {
          driverName:'', //姓名
          idCard:'',//身份证号
          idAddr:'', //身份证地址
          telephone1:'',//常用手机
          telephone2:'',//备用手机
          familyTel: '', //家属电话
          usualAddr:'', //常住地址
          contactAddr:'',//通讯地址
          nextReturnDueStr:'',//年审日期后台
          status:'有效',//状态
          bindingTruckNo:'', //绑定车牌
          allowDriveType:'',//准驾车型
          driverLicenseEndStr:'',//驾驶证有效期止
          workNo:'', //从业资格证号
          workNoEndStr:'',//从业资格证有效期止
          options:[],
          remark:'' ,//备注
          truckBaseId:''
        },
        showForm: {
          driverName:'', //姓名
          idCard:'',//身份证号
          idAddr:'', //身份证地址
          telephone1:'',//常用手机
          telephone2:'',//备用手机
          familyTel: '', //家属电话
          usualAddr:'', //常住地址
          contactAddr:'',//通讯地址
          nextReturnDueStr:'',//年审日期后台
          status:'有效',//状态
          bindingTruckNo:'', //绑定车牌
          allowDriveType:'',//准驾车型
          driverLicenseEndStr:'',//驾驶证有效期止
          workNo:'', //从业资格证号
          workNoEndStr:'',//从业资格证有效期止,
          remark:'', //备注
        },
        //显示与编辑
        displayForm: true,
      }
    },
    watch: {
      'selectData.driverId':function () {
        this.showFormMsg();
      }
    },
    methods: {
      //转日期格式
      formatDate(date) {
        if(date === '') {
          return date;
        }else {
          let  start = new Date(date);
          let y = start.getFullYear();
          let m = start.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          var d = start.getDate();
          d = d < 10 ? ('0' + d) : d;
          return y + '-' + m + '-' + d;
        }

      },
      //存储状态
      showState() {
        let self = this;
        api.selectBusTypeHandle( 'status')
          .then(function (res) {
            let selectData = [];
            let { data } = res;
            console.log(data);
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.editForm.options = selectData;
          })
          .catch(function(err){

          })
      },
      accountTypeChange() {},
      //编辑按钮
      editFormBtn() {
        let self = this;
        console.log(this.selectData);
        if(this.selectData != null) {
          this.displayForm = false ;
        }else {
         self.$alert('请选择一条数据', '删除信息', {
            confirmButtonText: '确定'
          })
        }
      },
      //车牌号模糊搜索
      plateNoSearch(queryString, callback) {
        let self = this;
        api.driverBindNo(queryString)
          .then(function (res) {
            console.log(res);
            let  data  = res.data;
            let resultData = [];
            for(var objTemp of data){
              resultData.push({
                truckBaseId:objTemp.truckBaseId,
                value:objTemp.tractorNo
              })
            }
            callback(resultData);

          }).catch(function(err){
          console.log(err);

        })
      },
      carHandleSelect(val) {
        this.editForm.truckBaseId = val.truckBaseId;//车牌号ID赋值
      },
      //保存
      saveFormBtn() {
        let self = this;
        let params = {
          driverId: this.selectData.driverId, //司机ID
          driverName: this.editForm.driverName, //姓名
          idCard: this.editForm.idCard,//身份证号
          idAddr: this.editForm.idAddr, //身份证地址
          telephone1: this.editForm.telephone1,//常用手机
          telephone2: this.editForm.telephone2,//备用手机
          familyTel: this.editForm.familyTel, //家属电话
          usualAddr: this.editForm.usualAddr, //常住地址
          contactAddr: this.editForm.contactAddr,//通讯地址
          nextReturnDueStr: this.formatDate(this.editForm.nextReturnDueStr),//年审日期
          status: this.editForm.status,//状态
          bindingTruckNo: this.editForm.bindingTruckNo, //绑定车牌
          relTruckId: this.editForm.truckBaseId,
          allowDriveType: this.editForm.allowDriveType,//准驾车型
          driverLicenseEndStr: this.formatDate(this.editForm.driverLicenseEndStr),//驾驶证有效期止
          workNo: this.editForm.workNo, //从业资格证号
          workNoEndStr: this.formatDate(this.editForm.workNoEndStr),//从业资格证有效期止
          remark: this.editForm.remark
        };
        console.log(params);
        api.driverEdit(params)
          .then(function(res) {
            console.log("dsdasdasdasdsadsadsa");
            console.log(res);
            let data = res.data;

            self.$emit('editSucData',data); //将返回的值传给父级 让 其跟新表格数据
            self.displayForm = true;
            self.showForm = data;
          })
          .catch(function(err) {

            console.log(err);

          })


      },
      //单机显示列表 数据
      showFormMsg() {
        let self = this;
        let params = {
          driverId: this.selectData.driverId
        };
        api.driverListShow(params)
          .then(function(res) {
            let showData = res[0];
            console.log(res);
            for(let showJson in showData) {
              self.showForm[showJson] = showData[showJson];
              self.editForm[showJson] = showData[showJson];
            }
          })
          .catch(function(err) {

            /*====================*/
          })
      },
      //删除按钮
      delFormBtn() {
        let self = this;
        if(this.selectData != null ) {
          let params = {
            driverId : this.selectData.driverId
          };
          this.$confirm('确认删除该记录吗?', '提示', {
              type: 'warning'
            })
            .then(function() {
              api.driverDel(params)
                .then(function(res) {
                  console.log(res);
                  if(res.status === 'success') {
                    self.$emit('delData');
                    for(let item in self.showForm) {
                      self.showForm[item] = '';
                    }
                  }
                })
                .catch(function(err) {
                  console.log(err);

                })
            })
        }else {
          this.$alert('请选择一条数据', '删除信息', {
            confirmButtonText: '确定'
          })
        }



      },
      //取消按钮
      cancelFormBtn() {
        this.displayForm = true ;
      }
    },
    mounted(){
      this.showState();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col-height .el-col {
    height:40px ;
  }
  .col-height-show .el-col {
    height: 32px ;
  }
</style>


