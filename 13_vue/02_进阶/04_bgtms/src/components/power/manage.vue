<template>
    <div id="manage">
      <el-row>
        <el-col :span="3">
          <el-tree
            :data="leftNavs"
            :props="defaultProps"
            accordion
            node-key="grade"
            :default-expanded-keys="[1, 2, 3]"
            @node-click="nodeClickHandle">
          </el-tree>
        </el-col>
        <el-col :offset="0" :span="21">
          <el-row>
            <!--公司信息-->
            <el-col :span="24" class="company" v-if="curGrade > 0">
              <el-card>
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;font-weight: bold;">{{companyField.companyFullName.text}}</span>
                  <el-button
                    style="float: right; margin-right:20px;"
                    type="primary"
                    @click="isEditCompanyFiled = false; isAddCompanyFiled = true;">新增</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="isEditCompanyFiled = true; isAddCompanyFiled = false;"
                    type="primary">编辑</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="addOrEditCompanyHandle"
                    type="primary">保存</el-button>
                  <el-button
                  style="float: right; margin-right:20px;"
                  type="danger"
                  @click="delCompanyHandle">删除</el-button>
                  <el-button
                </div>
                <el-col :span="8" v-for="item in companyField">
                  <el-form :inline="true"  :label-position="'right'" label-width="120px">
                    <el-form-item :label="item.title" v-if="item.isShow">
                      <!--显示-->
                      <span v-if="!isEditCompanyFiled && !isAddCompanyFiled">{{item.text}}</span>
                      <!--编辑-->
                      <el-input v-if="isEditCompanyFiled" v-model="item.text"></el-input>
                      <!--添加-->
                      <el-input v-if="isAddCompanyFiled" v-model="item.add"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-card>
            </el-col>
            <!--部门列表-->
            <el-col :span="24" class="company" v-if="curGrade == 1">
              <ag-grid-vue style="height: 250px;width: 100%;" class="ag-blue"
                           :gridOptions="departmentTable.method"
                           :columnDefs="departmentTable.header"
                           :rowData="departmentTable.content"
                           v-show="departmentTable.content.length > 0"
                           :enableSorting="true"
                           :enableColResize="true"
                           :suppressMenuFilterPanel="true"
                           :suppressMenuMainPanel="true"
                           :suppressMenuColumnPanel="true"
                           :toolPanelSuppressValues="true"
                           :floatingFilter="true"
                           :enableFilter="true">
              </ag-grid-vue>
            </el-col>



            <!--部门信息-->
            <el-col :span="24" class="company" v-if="curGrade > 1">
              <el-card>
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;font-weight: bold;">{{departmentField.departName.text}}</span>
                  <el-button
                    style="float: right; margin-right:20px;"
                    type="primary"
                    @click="isEditDepartmentFiled = false; isAddDepartmentFiled = true;">新增</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="isEditDepartmentFiled = true; isAddDepartmentFiled = false;"
                    type="primary">编辑</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="addOrEditDepartmentHandle"
                    type="primary">保存</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    type="danger"
                    @click="delDepartmentHandle">删除</el-button>
                  <el-button
                </div>
                <el-col :span="8" v-for="item in departmentField">
                  <el-form :inline="true"  :label-position="'right'" label-width="120px">
                    <el-form-item :label="item.title" v-if="item.isShow">
                      <!--显示-->
                      <span v-if="!isEditDepartmentFiled && !isAddDepartmentFiled">{{item.text}}</span>
                      <!--编辑-->
                      <el-input v-if="isEditDepartmentFiled" v-model="item.text"></el-input>
                      <!--添加-->
                      <el-input v-if="isAddDepartmentFiled" v-model="item.add"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-card>
            </el-col>
            <!--职员列表-->
            <el-col :span="24" class="company" v-if="curGrade == 2">
              <ag-grid-vue style="height: 250px;width: 100%;" class="ag-blue"
                           :gridOptions="staffTable.method"
                           :columnDefs="staffTable.header"
                           :rowData="staffTable.content"
                           :enableSorting="true"
                           :enableColResize="true"
                           :suppressMenuFilterPanel="true"
                           :suppressMenuMainPanel="true"
                           :suppressMenuColumnPanel="true"
                           :toolPanelSuppressValues="true"
                           :floatingFilter="true"
                           :enableFilter="true">
              </ag-grid-vue>
            </el-col>


            <!--职员信息-->
            <el-col :span="24" class="staff" v-if="curGrade > 2">
              <el-card>
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;font-weight: bold;">{{staffField.name.text}}</span>
                  <el-button
                    style="float: right; margin-right:20px;"
                    type="primary"
                    @click="isEditStaffFiled = false; isAddStaffFiled = true;">新增</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="isEditStaffFiled = true; isAddStaffFiled = false;"
                    type="primary">编辑</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="addOrEditStaffHandle"
                    type="primary">保存</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    type="danger"
                    @click="delStaffHandle">删除</el-button>
                  <el-button
                </div>
                <el-col :span="8" v-for="item in staffField">
                  <el-form :inline="true"  :label-position="'right'" label-width="120px">
                    <el-form-item :label="item.title" v-if="item.isShow">
                      <!--显示-->
                      <span v-if="!isEditStaffFiled && !isAddStaffFiled">{{item.text}}</span>
                      <!--编辑-->
                      <el-input v-if="isEditStaffFiled" v-model="item.text"></el-input>
                      <!--添加-->
                      <el-input v-if="isAddStaffFiled" v-model="item.add"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-card>
            </el-col>




            <!--权限列表-->
            <el-col :span="24" class="company" v-if="curGrade ==  3">
              <el-table
                ref="multipleTable"
                :data="tableRole"
                border
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="角色"
                  width="120">
                  <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="描述"
                  width="120">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>


    </div>
</template>

<script>
    import api from '@/api/api'
    import Tool from '@/api/tool'
    import {AgGridVue} from "ag-grid-vue";
    let tool = new Tool();
    export default {
      components: {
        "ag-grid-vue": AgGridVue,
      },
      data() {
        return {
          labelPosition : 'left',
          leftNavs: [],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          // 当前选中哪一级
          curGrade : 0,
          /*公司的字段*/
          companyField : {
            uuid:{ title : 'uuid', isShow : false, text : '', add : '', },
            companyCcc :  { title : '公司信用代码证', isShow : true, text : '', add : '', },
            companyCode:{ title : '公司代码', isShow : true,text : '', add : '',  },
            companyFullName :{ title : '公司全称', isShow : true,text : '', add : '',   },
            companyShortName: { title : '公司简称', isShow : true, text : '', add : '',  },
            companyType : { title : '公司类型', isShow : true,text : '', add : '',   },
            contacts : { title : '联系人', isShow : true, text : '', add : '', },
            contactsTel : { title : '联系人电话', isShow : true, text : '', add : '',  },
            createDate :     { title : '创建时间', isShow : false,text : '', add : '',  },
            createUser:   { title : '创建人', isShow : false,text : '', add : '',  },
            officeAddress:{ title : '公司地址', isShow : true, text : '', add : '',  },
            officeTel :{ title : '公司电话', isShow : true, text : '', add : '',   },
            remark : { title : '备注', isShow : true,text : '', add : '',  },
            status: { title : '公司类型', isShow : false ,text : '', add : '', },
            tranLicense:{ title : '道路运输许可证', isShow : true,text : '', add : '', },
          },
          // 添加和编辑公司
          isAddCompanyFiled : false,
          isEditCompanyFiled : false,
          departmentTable : {
            header : [],
            content : [],
            method : { }
          },



          /*部门的字段*/
          departmentField : {
            uuid:{ title : 'uuid', isShow : false, text : '', add : ''},
            departName:{ title : '部门名称', isShow : true, text : '', add : '' },
            departCode:{ title : '部门编号', isShow : true, text : '', add : '' },
            departManager:{ title : '部门负责人', isShow : true, text : '', add : '' },
            remark:{ title : '备注', isShow : true, text : '', add : '' },
            createDate:{ title : '创建时间', isShow : false, text : '', add : '' },
            createUser:{ title : '创建人', isShow : false, text : '', add : '' },
            relCompanyId:{ title : '关联的公司', isShow : false, text : '', add : '' },
            companyName:{ title : '公司名称', isShow : false, text : '', add : '' },
          },
          // 添加和编辑部门
          isAddDepartmentFiled : false,
          isEditDepartmentFiled : false,
          staffTable : {
            header : [],
            content : [],
            method : { }
          },


          /*员工的字段*/
          staffField : {
            uuid:{ title : 'uuid', isShow : false, text : '', add : ''},
            staffCode:{ title : '员工编号', isShow : true, text : '', add : ''},
            name:{ title : '姓名', isShow : true, text : '', add : ''},
            sex:{ title : '性别', isShow : true, text : '', add : ''},
            telephone:{ title : '联系电话', isShow : true, text : '', add : ''},
            idCard:{ title : '身份证号码', isShow : true, text : '', add : ''},
            position:{ title : '岗位', isShow : true, text : '', add : ''},
            familyAddress:{ title : '家庭住址', isShow : true, text : '', add : ''},
            email:{ title : 'Email', isShow : true, text : '', add : ''},
            status:{ title : '状态', isShow : false, text : '', add : ''},
            joinedCompanyDate:{ title : '入职时间', isShow : false, text : '', add : ''},
            leftCompanyDate:{ title : '离职时间', isShow : false, text : '', add : ''},
            createDate:{ title : '创建时间', isShow : false, text : '', add : ''},
            createUser:{ title : '创建人', isShow : false, text : '', add : ''},
            remark:{ title : '备注', isShow : true, text : '', add : ''},
            relDepartmentId:{ title : '所属部门ID', isShow : false, text : '', add : ''},
            departmentName:{ title : '部门名称', isShow : false, text : '', add : ''},
            relCompanyId:{ title : '关联的公司', isShow : false, text : '', add : ''},
            companyName:{ title : '公司名称', isShow : false, text : '', add : ''},
          },
          // 添加和编辑部门
          isAddStaffFiled : false,
          isEditStaffFiled : false,
          powerTable : {
            header : [],
            content : [],
            method : { }
          },






          /*角色*/
          tableRole: [{
            date: '出纳',
            name: '王小虎'
          },{
            date: '财务',
            name: '王小虎'
          },{
            date: '经理',
            name: '王小虎'
          },{
            date: '老板',
            name: '王小虎'
          },],
          multipleSelection: []





        };

      },
      beforeMount() {
        this.departmentTable.method = {
          context: {
            componentParent: this
          },
        };
        this.staffTable.method = {
          context: {
            componentParent: this
          },
        };
      },
      mounted(){
        this.getLeftNavsHandle();
        this.createDepartmentHeader();
        this.createStaffHeader();



      },
      methods: {
        // 左边导航栏的信息
        getLeftNavsHandle(){
          let self = this;
          // 添加
          api.getPowerTree({})
            .then(function(res) {
              if(res.status === 'success'){
                // 先清空
                self.leftNavs = res.data;
              }
            })
        },




        // 添加或者编辑公司信息
        addOrEditCompanyHandle(){
          let self = this;
          // 添加
          if(this.isAddCompanyFiled){
            let params = {};
            Object.entries(self.companyField).forEach(item => {
              if(item[1].isShow){
                params[item[0]] = item[1].add ? item[1].add : '';
              }
            });

            api.powerCompanyAdd(params)
              .then(function(res) {
                if(res.status === 'success'){
                  self.getLeftNavsHandle();
                  self.isEditCompanyFiled = false;
                  self.isAddCompanyFiled = false;
                  Object.entries(self.companyField).forEach(item => {
                    item[1].add = '';
                  });
                }
              })
          }
          else if (this.isEditCompanyFiled){
            // 编辑
            let params = {};
            Object.entries(self.companyField).forEach(item => {
              if(item[0] === 'uuid' || item[1].isShow){
                params[item[0]] = item[1].text || '';
              }
            });
            api.powerCompanyMod(params)
              .then(function(res) {
                if(res.status === 'success'){
                  self.getLeftNavsHandle();
                  self.isEditCompanyFiled = false;
                  self.isAddCompanyFiled = false;
                }
              })
          }
        },
        // 删除公司信息
        delCompanyHandle(){
          let self = this;
          // 添加
          let params = {
            uuid : self.companyField.uuid.text,
          };
          api.powerCompanyDel(params)
            .then(function(res) {
              if(res.status === 'success'){
                self.getLeftNavsHandle();
                self.curGrade = 0;
              }
            })
        },




        // 添加或者编辑部门信息
        addOrEditDepartmentHandle(){
          let self = this;
          // 添加
          if(this.isAddDepartmentFiled){
            let params = {};
            Object.entries(self.departmentField).forEach(item => {
              if(item[1].isShow){
                params[item[0]] = item[1].add ? item[1].add : '';
              }
              // 如果是关联公司和关联公司id
              if(item[0] === 'relCompanyId' || item[0] === 'companyName'){
                params[item[0]] = item[1].text ? item[1].text : '';
              }
            });
            api.powerDepartmentAdd(params)
              .then(function(res) {
                if(res.status === 'success'){
                  self.getLeftNavsHandle();
                  self.isEditDepartmentFiled = false;
                  self.isAddDepartmentFiled = false;
                  Object.entries(self.departmentField).forEach(item => {
                    item[1].add = '';
                  });
                }
              })
          }
          else if (this.isEditDepartmentFiled){
            // 编辑
            let params = {};
            Object.entries(self.departmentField).forEach(item => {
              // 如果是关联公司和关联公司id
              if(item[0] !== 'createDate' && item[0] !== 'createUser'){
                params[item[0]] = item[1].text || '';
              }
            });
            api.powerDepartmentMod(params)
              .then(function(res) {
                if(res.status === 'success'){
                  self.getLeftNavsHandle();
                  self.isEditDepartmentFiled = false;
                  self.isAddDepartmentFiled = false;
                }
              })
          }
        },
        // 删除部门信息
        delDepartmentHandle(){
          let self = this;
          let params = {
            uuid : self.departmentField.uuid.text,
          };
          api.powerDepartmentDel(params)
            .then(function(res) {
              if(res.status === 'success'){
                self.getLeftNavsHandle();
                self.curGrade = 1;
              }
            })
        },




        // 添加或者编辑员工信息
        addOrEditStaffHandle(){
            let self = this;
            // 添加
            if(this.isAddStaffFiled){
              let params = {};
              Object.entries(self.staffField).forEach(item => {
                if(item[1].isShow){
                params[item[0]] = item[1].add ? item[1].add : '';
              }

              let textArr = ['relCompanyId', 'companyName', 'relDepartmentId', 'departmentName'];
              // 如果是关联公司和关联公司id
              if(textArr.indexOf(item[0]) > -1){
                params[item[0]] = item[1].text ? item[1].text : '';
              }
            });
            api.powerStaffAdd(params)
              .then(function(res) {
                if(res.status === 'success'){
                  alert('添加员工成功');
                  self.getLeftNavsHandle();
                  self.isEditStaffFiled = false;
                  self.isAddStaffFiled = false;
                  Object.entries(self.staffField).forEach(item => {
                    item[1].add = '';
                });
                }
              })
          }
          else if (this.isEditStaffFiled){
            // 编辑
            let params = {};
            Object.entries(self.staffField).forEach(item => {
              // 如果是关联公司和关联公司id
              // 不需要修改的字段
              let noUseField = ['createDate', 'createUser', 'joinedCompanyDate', 'leftCompanyDate', 'status'];
              if(noUseField.indexOf(item[0]) === -1){
                params[item[0]] = item[1].text || '';
              }
            });
            api.powerStaffMod(params)
              .then(function(res) {
                if(res.status === 'success'){
                  self.getLeftNavsHandle();
                  self.isEditStaffFiled = false;
                  self.isAddStaffFiled = false;
                }
              })
          }
        },
        // 删除员工信息
        delStaffHandle(){
          let self = this;
          // 添加
          let params = {
            uuid : self.staffField.uuid.text,
          };
          api.powerStaffDel(params)
            .then(function(res) {
              if(res.status === 'success'){
                self.getLeftNavsHandle();
                self.curGrade = 0;
              }
            })
        },







        // 点击左边导航条，一级，二级，三级菜单
        nodeClickHandle(data) {
          // 获取节点名称
          let name = data.label;
          let self = this;
          // 等级 从localstorage中获取缓存信息
          this.curGrade = data.grade;
          switch(this.curGrade){
            case 1:
                // 获取和公司有关的数据
                // 通过uuid获取公司的信息
                api.powerOneCompany({
                  uuid : data.id
                }).then(function(res) {
                  if(res.status === 'success'){
                    Object.entries(res.data).forEach(item=>{
                        self.companyField[item[0]].text = item[1];
                    });
                  }
                })
                // 获取点击的公司的uuid,然后查询下面的部门
                api.powerDepartmentList({
                    relCompanyId : data.id
                }) .then(function(res) {
                  let result = res.data;
                  self.departmentTable.content = result;
                })
                break;
            case 2:
                // 二级菜单
                // 部门的信息
                // 通过uuid获取部门的信息
                api.powerOneDepartment({
                  uuid : data.id
                }).then(function(res) {
                  if(res.status === 'success'){
                    Object.entries(res.data).forEach(item=>{
                      self.departmentField[item[0]].text = item[1];
                  });
                  }
                })
                // 获取点击的部门的uuid,然后查询下面的员工
                api.powerStaffList({
                  relCompanyId : data.id
                }) .then(function(res) {
                  let result = res.data;
                  self.staffTable.content = result;
                })
                break;
            case 3:
              // 二级菜单
              // 部门的信息
              // 通过uuid获取部门的信息
              api.powerOneStaff({
                uuid : data.id
              }).then(function(res) {
                if(res.status === 'success'){
                  Object.entries(res.data).forEach(item=>{
                    self.staffField[item[0]].text = item[1];
                  });
                }
              })
              return;
              // 获取点击的部门的uuid,然后查询下面的员工
              api.powerStaffList({
                relCompanyId : data.id
              }) .then(function(res) {
                let result = res.data;
                self.staffTable.content = result;
              })
              break;
          }
        },
        // 创建部门表头
        createDepartmentHeader(){
          let self = this;
          Object.entries(this.departmentField).forEach(item => {
            if(item[1].isShow){
              self.departmentTable.header.push({
                headerName : item[1].title,
                field : item[0],
                filter : 'text'
              })
            }
          })
        },
        // 创建员工表头
        createStaffHeader(){
          let self = this;
          Object.entries(this.staffField).forEach(item => {
            if(item[1].isShow){
            self.staffTable.header.push({
              headerName : item[1].title,
              field : item[0],
              filter : 'text'
            })
          }
        })
        },

      }
    }
</script>

<style>
  #manage .company{
    margin-bottom:50px;
  }
  #manage .company h3{
    text-align: center;
  }
</style>
