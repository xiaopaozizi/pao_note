<template>
    <div id="manage">
      <el-row>
        <el-col :span="3">
          <el-tree
            :data="leftNavs"
            :props="defaultProps"
            accordion
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
              <el-table
                :data="tableDepart"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="负责人"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="备注">
                </el-table-column>
              </el-table>
            </el-col>

            <!--部门信息-->
            <el-col :span="24" class="company" v-if="curGrade > 1">
              <el-col :span="24">
                <h3>IT部</h3>
              </el-col>
              <el-col :span="8" v-for="item in departmentField">
                <label for="">{{item.title}}</label>
                <span>jhjk</span>
              </el-col>
            </el-col>
            <!--职员列表-->
            <el-col :span="24" class="company" v-if="curGrade == 2">
              <el-table
                :data="tableStaff"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="联系电话"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="备注">
                </el-table-column>
              </el-table>
            </el-col>


            <!--职员信息-->
            <el-col :span="24" class="company" v-if="curGrade > 2">
              <el-col :span="24">
                <h3>张三</h3>
              </el-col>
              <el-col :span="8" v-for="item in staffField">
                <label for="">{{item.title}}</label>
                <span>jhjk</span>
              </el-col>
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
    let tool = new Tool();
    export default {
      data() {
        return {
          labelPosition : 'left',
          leftNavs: [
            /*{
              label: '公司A',
              children: [
                {
                  label: '部门A',
                  children: [
                    { label: '员工A' },
                  ]
                }
              ],
            }*/
          ],
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
          // 添加公司要的字段
          // 添加和编辑公司
          isAddCompanyFiled : false,
          isEditCompanyFiled : false,
          /*部门的字段*/
          departmentField : [
            { title : '部门名称' },
            { title : '部门编号' },
            { title : '部门负责人' },
            { title : '备注' },
            { title : '创建时间' },
            { title : '创建人' },
            { title : '关联公司' },
            { title : '公司名称' },
          ],
          /*员工的字段*/
          staffField : [
            { title : '员工编号' },
            { title : '姓名' },
            { title : '性别' },
            { title : '联系电话' },
            { title : '身份证号码' },
            { title : '岗位' },
            { title : '家庭住址' },
            { title : 'Email' },
            { title : '状态' },
            { title : '入职时间' },
            { title : '创建时间' },
            { title : '备注' },
            { title : '所属部门ID' },
            { title : '部门名称' },
          ],
          /*部门*/
          tableDepart: [{
            date: 'IT部',
            name: '老牛',
            address: '老牛',
          }, {
            date: '财务部',
            name: '何飞',
            address: '何飞',
          },{
            date: '市场部',
            name: '徐',
            address: '徐',
          },{
            date: '人才部',
            name: '飞哥',
            address: '飞哥',
          }],
          /*职员*/
          tableStaff: [{
            date: '张三',
            name: '123123123123',
            address: '无',
          }, {
            date: '李四',
            name: '123123123123',
            address: '无',
          },{
            date: '王五',
            name: '123123123123',
            address: '无',
          },{
            date: '找刘',
            name: '123123123123',
            address: '无',
          }],
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
      mounted(){
        this.getLeftNavsHandle();
      },
      methods: {
        // 左边导航栏的信息
        getLeftNavsHandle(){
          let self = this;
          let params = {

          };
          api.powerCompanyList(params)
            .then(function(res) {
              let result = res.data;
              if(!result){
                // 如果没有值，就从本地取出
                result = tool.getIte('powerCompanyList');
              } else {
                // 将数据存到本地
                tool.setIte('powerCompanyList', result);
              }
              result.forEach(item=>{
                self.leftNavs.push({
                  // 菜单的名称
                  label : item.companyShortName,
                  // 菜单等级，1代表一级菜单
                  grade : 1,
                  // 孩子节点
                  children : [],
                });
              })
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
                  alert('添加成功')
                  self.$router.go();
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
                  alert('修改成功')
                  self.$router.go();
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
                alert('删除成功')
                self.$router.go();
              }
            })
        },
        nodeClickHandle(data) {
          // 获取节点名称
          let name = data.label;
          let self = this;
          // 从localstorage中获取缓存信息
          this.curGrade = data.grade;
          switch(this.curGrade){
            case 1:
                // 获取和公司有关的数据
                let companyInfo = tool.getIte('powerCompanyList');
                // 根据公司简称，找到一级菜单相同的数据，比如宁波大英
                // 将数据放到右边显示的公司数据中，就是companyField对于字段的text中去
                Object.entries(companyInfo.filter(item => {
                    return item.companyShortName === name;
                })[0]).forEach(item=>{
                  //Vue.set(self.companyField[item[0]], 'text', item[1]);
                  self.companyField[item[0]].text = item[1];
                  //Array.of(self.companyField[item[0]]).splice('text', 1, item[1])
                });

                // 获取点击的公司的uuid,然后查询下面的部门
                let companyUuid = self.companyField.uuid.text;
                let params = {
                  relCompanyId : companyUuid
                }
                api.powerDepartmentList(params)
                .then(function(res) {
                  let result = res.data[0];
                  if(!result) return;
                  self.leftNavs.forEach(item => {
                    if(item.label === result.companyName){
                      item.children = [];
                      item.children.push({
                        label : result.departName,
                        grade : 2,
                        children : []
                      })
                    }
                  })
                  // 把值给表格
                  })
                break;
          }
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
