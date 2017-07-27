<template>
  <div class="tabs-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="基本信息">
        <!--基本信息显示-->
        <el-button @click="editFormBtn" v-if="displayForm">编辑</el-button>
        <el-button @click="saveFormBtn" v-if="!displayForm">保存</el-button>
        <el-button @click="delFormBtn">删除</el-button>
        <el-button @click="cancelFormBtn" v-if="!displayForm">取消</el-button>
        <div v-if="displayForm">
          <el-form :model="showForm"  label-width="140px" >
            <el-row>
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
            <el-row>
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
            <el-row>
              <el-col :span="6">
                <el-form-item label="准驾车型">
                  <span>{{showForm.allowDriveType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶证有效期起">
                  <span>{{showForm.driverLicenseStartStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶证有效期止">
                  <span>{{showForm.driverLicenseSedStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年审日期">
                  <span>{{showForm.nextReturnDue}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="从业资格证号">
                  <span>{{showForm.workNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="从业资格证有效期起">
                  <span>{{showForm.workNoStartStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="从业资格证有效期止">
                  <span>{{showForm.workNoEndStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶车牌">
                  <span>{{showForm.bindingTruckNo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
          </el-form>
        </div>
        <div v-if="!displayForm">
          <el-form :model="editForm"  label-width="140px"  ref="editForm">
            <el-row>
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
            <el-row>
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
            <el-row>
              <el-col :span="6">
                <el-form-item label="准驾车型">
                  <el-input v-model="editForm.allowDriveType" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶证有效期起">
                  <el-date-picker
                    v-model="editForm.driverLicenseStartStr"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶证有效期止">
                  <el-date-picker
                    v-model="editForm.driverLicenseSedStr"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年审日期">
                  <el-date-picker
                    v-model="editForm.nextReturnDue"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="从业资格证号">
                  <el-input v-model="editForm.workNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="从业资格证有效期起">
                  <el-date-picker
                    v-model="editForm.workNoStartStr"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="从业资格证有效期止">
                  <el-date-picker
                    v-model="editForm. workNoEndStr"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="驾驶车牌">
                  <el-input v-model="editForm.bindingTruckNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
          status:'1-有效',//状态
          bindingTruckNo:'', //绑定车牌
          allowDriveType:'',//准驾车型
          driverLicenseStartStr:'',//驾驶证有效期起
          driverLicenseSedStr:'',//驾驶证有效期止
          workNo:'', //从业资格证号
          workNoStartStr:'',//从业资格证有效期起
          workNoEndStr:'',//从业资格证有效期止
          options:[]
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
          status:'1-有效',//状态
          bindingTruckNo:'', //绑定车牌
          allowDriveType:'',//准驾车型
          driverLicenseStartStr:'',//驾驶证有效期起
          driverLicenseSedStr:'',//驾驶证有效期止
          workNo:'', //从业资格证号
          workNoStartStr:'',//从业资格证有效期起
          workNoEndStr:''//从业资格证有效期止
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
            console.log("tttttt");
          })
          .catch(function(err){
            let selectData = [];
            let { data } = err.data;
            console.log(data);
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.editForm.options = selectData;
          })
      },
      accountTypeChange() {},
      //编辑按钮
      editFormBtn() {
        if(this.selectData != null) {
          this.displayForm = false ;
        }
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
          allowDriveType: this.editForm.allowDriveType,//准驾车型
          driverLicenseStartStr: this.formatDate(this.editForm.driverLicenseStartStr),//驾驶证有效期起
          driverLicenseSedStr: this.formatDate(this.editForm.driverLicenseSedStr),//驾驶证有效期止
          workNo: this.editForm.workNo, //从业资格证号
          workNoStartStr: this.formatDate(this.editForm.workNoStartStr),//从业资格证有效期起
          workNoEndStr: this.formatDate(this.editForm.workNoEndStr)//从业资格证有效期止
        };
        console.log(params);
        api.driverEdit(params)
          .then(function(res) {
            let data = err.data;
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
          .then(function() {})
          .catch(function(err) {
            let showData = err.data[0];
            for(let showJson in showData) {
              self.showForm[showJson] = showData[showJson];
              self.editForm[showJson] = showData[showJson];
            }
            /*====================*/
          })
      },
      //删除按钮
      delFormBtn() {
        let self = this;
        let params = {
          driverId : this.selectData.driverId
        };
        api.driverDel(params)
          .then(function(res) {
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

</style>


