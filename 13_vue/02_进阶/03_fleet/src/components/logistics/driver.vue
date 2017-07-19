<template>
  <div class="driver">
    <div class="container-fluid">
      <div class="row" >
        <div class="col-sm-12">
          <div style="float: left;">
            <p class="icon-inline">
              <i class="fa fa-share fa-lg" aria-hidden="true" style="cursor: pointer"></i>
              <span style="font-size: 4px!important;">导出</span>
            </p>
            <p class="icon-inline" @click="addDriver">
              <i class="fa fa-plus" aria-hidden="true" style="cursor: pointer"></i>
              <span>新增</span>
            </p>
          </div>

          <pao-search style="border: 1px solid white;margin-top: 5px"></pao-search>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="22"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="身份证号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone1"
        label="电话1"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone2"
        label="电话2"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="上岗证号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="暂住地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="年审日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="备注"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="关联车牌号"
        width="180">
      </el-table-column>
    </el-table>
    <div class="block" style="text-align: center">
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="10"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
     <!--tabs模板-->
    <tabs-t :form-tabs="formTabs" @click-active="handleActive"></tabs-t>
    <!--用is动态创建子组件-->
    <p :is="current"></p>

    <!--模板弹出框-->
    <dialog-v :dialog-temp="dialogTemp">
      <div slot="other">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model.string="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idNum">
              <el-input v-model="ruleForm.idNum" :maxlength="18"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证地址" prop="idAddr">
              <el-input v-model="ruleForm.idAddr" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话1" prop="phone1">
              <el-input v-model="ruleForm.phone1" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话2" prop="phone2">
              <el-input v-model="ruleForm.phone2" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="暂住地址" prop="zsAddr">
              <el-input v-model="ruleForm.zsAddr" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="年审日期" prop="date1">
              <el-date-picker :editable="false" type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </dialog-v>
    <!--模板弹出框结束-->
  </div>
</template>

<script>
    import axios from 'axios';
    import paoSearch from '../pao-search/pao-search2.vue'
    import paoForm from '../pao-form/pao-form.vue';
    import Dialog from '../common/dialog.vue'
    import tabsT from '../tabs/tabs.vue'
    //司机基本信息路由
    import baseInfo from './driverBaseInfo.vue'
    import { addUser, getUserListPage } from '../../api/api';

    export default {
      name: 'driver',
      components: {
        'pao-search': paoSearch,
        'pao-form' : paoForm,
        'dialog-v': Dialog,
        'tabs-t': tabsT,
        'base-info': baseInfo
      },
      data() {
        var telphone = function (rule, value, callback) {
          if (!value) {
            return callback(new Error('数字不能为空'));
          }
          setTimeout(function() {
            console.log(value)
            if (!parseInt(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
        }
        return {
          //dialog 数据
          dialogTemp :{
            dialogTempVisible: false,
            handleClose: this.handleDialog,
            title : '司机信息',
            size : 'small',
            groupBtn : {
              'save' : {
                type : 'primary',
                label : '保存',
                fnName : this.saveHandle
              }
            }
          },
          current: 'base-info',
          /*tabs数据*/
          formTabs : {
            tabs: [
              { name:'first', label: "身份信息", id: "1", isShow: true },
            ],
            activeName: 'first',
            type: ""
          },

          activeName2: 'first',
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '2'
          },{
            date: '2016-05-04',
            name: '王小虎',
            address: '2'
          },{
            date: '2016-05-01',
            name: '王小虎',
            address: '2'
          },{
            date: '2016-05-03',
            name: '王小虎',
            address: '2'
          }],

          //工具条
          currentPage:1, //当前页码
          totalCount: 100, //总条目数
          // 对话框数据---单条排单数据
/*          dialogData :{
            title : '司机信息',
            size : 'small',
            groupBtn : {
              'save' : {
                type : 'primary',
                label : '保存',
                fnName : this.saveHandle
              }
            },
            formData : [
              { type : 'input-text', col : 12, keyWidth : '80px', key : '姓名', value : '', name:''},
              { type : 'input-text', col : 12, keyWidth : '80px', key : '身份证号', value : '', name: 'idCard'},
              { type : 'input-text', col : 12, keyWidth : '80px', key : '身份地址', value : '', name: 'idAddr'},
              { type : 'input-text', date : '', col : 12, keyWidth : '80px', key : '电话1',name: 'telephone1', value : ''},
              { type : 'input-text', col : 12, keyWidth : '80px', key : '电话2', value : '' ,name: 'telephone2',},
              { type : 'input-text', col : 12, keyWidth : '80px', key : '暂住地址', value : ''},
              { type : 'input-text', col : 12, keyWidth : '80px', key : '类型', value : '', name: 'currency'},
              { type : 'input-text', col : 24, keyWidth : '80px', style : 'width:400px;', key : '年审日期', value : ''},
              { type : 'input-text', col : 24, keyWidth : '80px', style : 'width:400px;', key : '备注', value : '', name: 'remark'},
            ]
          },*/
          // 打开对话框
          dialogFormVisible : false,
          /*新增表单的数据*/
          ruleForm: {
            name: '',
            idNum: '',
            phone1: '',
            phone2: '',
            zsAddr: '',
            date1: '',
            desc: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入司机姓名', trigger: 'blur' },
              { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
            ],
            idNum: [
              { required: true, message: '请输入司机身份证号', trigger: 'blur' },
              { max: 18, message: '请输入正确的身份证号码', trigger: 'blur' },
              {pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/, message: '请输入正确的身份证号码', trigger: 'blur'}

            ],
            phone1: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确手机号码', trigger: 'blur' },
            ],
            phone2: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
             /* { required: true,validator:telphone, trigger: 'blur' },*/
              { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确手机号码', trigger: 'blur' }
            ],
            zsAddr: [
//              { required: true, message: '请输入暂住地址', trigger: 'blur' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger:'blur'}
            ]
          }
        }
      },
      methods: {
        //tabs 对应的切换
        handleActive(tab) {
          switch(tab) {
            case "身份信息" : return this.current = 'base-info';
            case "客户管理" : return this.current = 'com-b';
            case "后倾管理" : return this.current = 'com-c';
            default: return true;
          }
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        /*新增司机*/
        addDriver() {
          this.dialogTemp.dialogTempVisible = !this.dialogTemp.dialogTempVisible
//          this.dialogFormVisible = !this.dialogFormVisible

        },
        test() {
            axios({
           method: 'post',
           url: '/api/orderinfo/addimage.do',
           timeout:5000,
           params: {
             name: '222'
           },
           headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
           },
           responseType: 'json'
           }).then(function (response) {
           console.log( response);

           }).catch(function(err){
           console.log(err);
           })
        },
        saveHandle() {
          /*  axios({
           method: 'post',
           url: '/api/adddriverinfo.do',
           timeout:5000,
           params: {
           driverName: this.dialogData.formData[0].value,
           idCard: this.dialogData.formData[1].value,
           idAddr: this.dialogData.formData[2].value,
           telephone1: this.dialogData.formData[3].value,
           telephone2: this.dialogData.formData[4].value,
           usualAddr: this.dialogData.formData[5].value,
           remark: this.dialogData.formData[8].value
           },
           headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
           },
           responseType: 'json'
           }).then(function (response) {
           console.log( response.data);

           }).catch(function(err){
           console.log(err);
           })*/
            let para = {
              name: '2222'
           };
          addUser(para).then(function (response) {
           console.log( response.data);

           }).catch(function(err){
           console.log(err);
           })

          //判断验证规则是否正确
          this.$refs.ruleForm.validate(function(valid){
            if (valid) {

              this.dialogTemp.dialogTempVisible = false

            } else {
              console.log('error submit!!');
          return false;
        }
        });
        },
        //关闭dialog的回调
        handleDialog() {
          this.$refs.ruleForm.resetFields();
        },

        //获取列表函数
        getUsers() {
          let para = {
            currentPage: 2 //给后台传当前的page
          };
          getUserListPage(para).then(function(res) {
            this.totalCount = res.data.total;  //获取后台的条目总数
            this.tableData = res.data.tableData; //获取后台的当前页面数据
        });
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .driver .icon-inline {
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px 5px 10px;
    background-color: lightblue;
    margin-top: 5px;
  }
</style>

