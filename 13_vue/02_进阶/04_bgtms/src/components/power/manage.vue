<template>
    <div id="manage">
      <el-row>
        <!--左边导航树-->
        <el-col :span="3">
          <el-tree
            :data="leftNavs"
            :props="defaultProps"
            accordion
            node-key="grade"
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
                    type="success"
                    @click="changeAddDepartmentHandle">部门</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    type="primary"
                    @click="controllPageShow('companyStatus', 'add');">新增</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="controllPageShow('companyStatus', 'edit');"
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
                      <span v-if="companyStatus.show">{{item.text}}</span>
                      <!--编辑-->
                      <el-input v-if="companyStatus.edit" v-model="item.text"></el-input>
                      <!--添加-->
                      <el-input v-if="companyStatus.add" v-model="item.add"></el-input>
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
                    type="success"
                    @click="changeAddStaffHandle">职员</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    type="primary"
                    @click="controllPageShow('departmentStatus', 'add');">新增</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="controllPageShow('departmentStatus', 'edit');"
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
                      <span v-if="departmentStatus.show">{{item.text}}</span>
                      <!--编辑-->
                      <el-input v-if="departmentStatus.edit" v-model="item.text"></el-input>
                      <!--添加-->
                      <el-input v-if="departmentStatus.add" v-model="item.add"></el-input>
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
                    @click="controllPageShow('staffStatus', 'add');">新增</el-button>
                  <el-button
                    style="float: right; margin-right:20px;"
                    @click="controllPageShow('staffStatus', 'edit');"
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
                      <span v-if="staffStatus.show">{{item.text}}</span>
                      <!--编辑-->
                      <el-input v-if="staffStatus.edit" v-model="item.text"></el-input>
                      <!--添加-->
                      <el-input v-if="staffStatus.add" v-model="item.add"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-card>
            </el-col>




            <!--权限列表-->
            <div v-if="curGrade == 3">
              <el-col :span="24" style="margin:20px 0;">
                <el-button type="success" @click="addPowerToStaffHandle">授权</el-button>
              </el-col>
              <el-col :span="24" class="company" >
                <el-table
                  ref="multipleTable"
                  :data="tableRole"
                  border
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    prop="uuid"
                    label="uuid"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="roleCode"
                    label="编码">
                  </el-table-column>
                  <el-table-column
                    prop="roleName"
                    label="名称">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="有效">
                  </el-table-column>
                </el-table>
              </el-col>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import api from '@/api/api'
    import Tool from '@/api/tool2'
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
          // 显示，添加和编辑公司
          companyStatus : {
            show : true,
            edit : false,
            add : false
          },
          //isAddCompanyFiled : false,
          //isEditCompanyFiled : false,
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
          departmentStatus : {
            show : true,
            edit : false,
            add : false
          },
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
            leftCompanyDate:{ title : '入职时间', isShow : false, text : '', add : ''},
            leftCompanyDateStr:{ title : '入职时间', isShow : true, text : '', add : ''},
            joinedCompanyDate:{ title : '离职时间', isShow : false, text : '', add : ''},
            joinedCompanyDateStr:{ title : '离职时间', isShow : true, text : '', add : ''},
            createDate:{ title : '创建时间', isShow : false, text : '', add : ''},
            createDateStr:{ title : '创建时间', isShow : true, text : '', add : ''},
            createUser:{ title : '创建人', isShow : false, text : '', add : ''},
            remark:{ title : '备注', isShow : true, text : '', add : ''},
            relDepartmentId:{ title : '所属部门ID', isShow : false, text : '', add : ''},
            departmentName:{ title : '部门名称', isShow : false, text : '', add : ''},
            relCompanyId:{ title : '关联的公司', isShow : false, text : '', add : ''},
            companyName:{ title : '公司名称', isShow : false, text : '', add : ''},
          },
          // 添加和编辑员工
          staffStatus : {
            show : true,
            edit : false,
            add : false
          },
          powerTable : {
            header : [],
            content : [],
            method : { }
          },






          /*角色*/
          tableRole: [],
          // 复选框勾中的数组
          mulSelTableRole: [],

          // 记录当前公司，部门，员工的
          node : {
            companyId : 0,
            departmentId : 0,
            staffId : 0,
          },


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
          if(this.companyStatus.add){
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
                  // 点击保持，回到显示页面
                  self.controllPageShow('companyStatus', 'show');
                  Object.entries(self.companyField).forEach(item => {
                    item[1].add = '';
                  });
                  self.curGrade = 0;
                }
              })
          }
          else if (this.companyStatus.edit){
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
                  // 点击保持，回到显示页面
                  self.controllPageShow('companyStatus', 'show');
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
          if(this.departmentStatus.add){
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
                  self.controllPageShow('departmentStatus', 'show');
                  Object.entries(self.departmentField).forEach(item => {
                    item[1].add = '';
                  });
                  self.curGrade = 1;
                }
              })
          }
          else if (this.departmentStatus.edit){
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
                  self.controllPageShow('departmentStatus', 'show');
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
                self.controllPageShow('departmentStatus', 'show');
                self.curGrade = 1;
              }
            })
        },




        // 添加或者编辑员工信息
        addOrEditStaffHandle(){
            let self = this;
            // 添加
            if(this.staffStatus.add){
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
                  self.controllPageShow('staffStatus', 'edit');
                  Object.entries(self.staffField).forEach(item => {
                    item[1].add = '';
                  self.curGrade = 2;
                });
                }
              })
          }
          else if (this.staffStatus.edit){
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
                  self.controllPageShow('staffStatus', 'edit');
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
                self.controllPageShow('staffStatus', 'edit');
                self.curGrade = 0;
              }
            })
        },



        // 公司切换到添加部门的操作
        changeAddDepartmentHandle(){
          this.showCompalyInfoAndDepartmentListHandle();
          // 还有将公司的id和name，传给部门字段中
          this.departmentField.relCompanyId.text = this.companyField.uuid.text;
          this.departmentField.companyName.text = this.companyField.companyShortName.text;
          this.curGrade = 2;
          this.controllPageShow('departmentStatus', 'add');
          console.log(111111,this.departmentField);
        },
        // 部门切换到添加员工的操作
        changeAddStaffHandle(){
          this.showDepartmentInfoAndStaffListHandle();
          // 还有将公司的id和name，传给部门字段中
          this.staffField.relCompanyId.text = this.departmentField.relCompanyId.text;
          this.staffField.companyName.text = this.departmentField.companyName.text;
          this.staffField.relDepartmentId.text = this.departmentField.uuid.text;
          this.staffField.departmentName.text = this.departmentField.departName.text;
          this.curGrade = 3;
          this.controllPageShow('staffStatus', 'add');
        },


        // 点击一级菜单，获取公司信息和部门列表
        showCompalyInfoAndDepartmentListHandle(){
          let self = this;
           self.controllPageShow('companyStatus', 'show');
          let id = this.node.companyId;
          // 获取和公司有关的数据
          // 通过uuid获取公司的信息
          api.powerOneCompany({
            uuid : id
          }).then(function(res) {
            if(res.status === 'success'){
              Object.entries(res.data).forEach(item=>{
                self.companyField[item[0]].text = item[1];
            });
            }
          })
          // 获取点击的公司的uuid,然后查询下面的部门
          api.powerDepartmentList({
            relCompanyId : id
          }) .then(function(res) {
            let result = res.data;
            self.departmentTable.content = result;
          })
        },
        // 点击二级菜单，获取部门信息和员工列表
        showDepartmentInfoAndStaffListHandle(){
          let self = this;
          self.controllPageShow('departmentStatus', 'show');
          let id = this.node.departmentId;
          // 二级菜单
          // 部门的信息
          // 通过uuid获取部门的信息
          api.powerOneDepartment({
            uuid : id
          }).then(function(res) {
            if(res.status === 'success'){
              Object.entries(res.data).forEach(item=>{
                self.departmentField[item[0]].text = item[1];
              });
            }
          })
          // 获取点击的部门的uuid,然后查询下面的员工
          api.powerStaffList({
            relDepartmentId : id
          }) .then(function(res) {
            let result = res.data;
            self.staffTable.content = result;
          })
        },
        // 点击三级菜单，获取部门信息和员工列表
        showStaffInfoAndRoleListHandle(){
          let self = this;
          self.controllPageShow('staffStatus', 'show');
          let id = this.node.staffId;
          // 通过uuid获取员工的信息
          api.powerOneStaff({
            uuid : id
          }).then(function(res) {
            if(res.status === 'success'){
              Object.entries(res.data).forEach(item=>{
                self.staffField[item[0]].text = item[1];
              });
            }
          })
          // 通过uuid获取角色的信息
          api.getRoleListByStaffId({
            relStaffId : id
          }).then(function(res) {
            //self.tableRole = [];
            self.mulSelTableRole = [];
            res.forEach((item,index) => {
              self.tableRole[index] = item;
            })
            // 勾选
            if(self.tableRole){
              self.tableRole.forEach(row => {
                self.$refs.multipleTable.toggleRowSelection(row, row.selected);
              })
            }
          })
          // 通过uuid获取权限的信息
          api.getPowerListByStaffId({
            uuid : id
          }).then(function(res) {
            //console.log(4444,res);
          });
        },
        // 将权限赋值给员工
        addPowerToStaffHandle(){
          let self = this;
          let params = [];
          this.mulSelTableRole.forEach(item=>{
              params.push({
                relStaffId : self.staffField.uuid.text,
                relRoleId : item.uuid
              });
          });
          api.giveRoleToStaff({
            sysRoleStaffRelList : JSON.stringify(params)
          }).then(function(res) {
            if(res.status === 'success'){
              self.$message({
                message: '授权成功',
                type: 'success'
              });
            }
          })
        },
        //复选框状态改变
        handleSelectionChange(val) {
          val = tool.uniqeByKeys(val, ['roleCode']);
          //console.log(val);
          this.mulSelTableRole = val;
        },

        // 点击左边导航条，一级，二级，三级菜单
        nodeClickHandle(data) {
         // console.log(7777,data)
          //this.node = data.id;
          // 获取节点名称
          let self = this;
          // 等级 从localstorage中获取缓存信息
          this.curGrade = data.grade;
          switch(this.curGrade){
            case 1:
                self.node.companyId = data.id;
                self.showCompalyInfoAndDepartmentListHandle();
                break;
            case 2:
                self.node.departmentId = data.id;
                self.showDepartmentInfoAndStaffListHandle();
                break;
            case 3:
                self.node.departmentId = data.parentId;
                self.showDepartmentInfoAndStaffListHandle();
                self.node.staffId = data.id;
                self.showStaffInfoAndRoleListHandle();
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
        // 控制显示的页面，比如是显示列表、编辑还是添加
        // filedStatus 代表控制哪个字段，有companyStatus，departmentStatus,staffStatus
        // str 代表显示哪一个页面，show代表显示页面，edit代表编辑页面，add代表添加页面
        controllPageShow(filedStatus, str){
          let self = this;
          // 让所有属性为false，然后让当前str为true
          Object.keys(self[filedStatus]).forEach(item => {
            self[filedStatus][item] = false;
          })
          self[filedStatus][str] = true;
        }

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
