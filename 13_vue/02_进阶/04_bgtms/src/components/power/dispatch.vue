<template>
    <div id="role">
      <el-row style="margin-top:20px;">
        <el-col style="margin-bottom:20px;">
          <el-button type="primary" @click="editRolePowerHandle">保存</el-button>
        </el-col>
        <el-col :span="6" >
          <el-col>
            <el-tree
              :data="roleList"
              :props="roleListProps"
              highlight-current
              @node-click="nodeClickRoleHandle"></el-tree>
          </el-col>
        </el-col>
        <el-col :offset="2" :span="16">
          <el-tree
            :data="powerList"
            :default-checked-keys="powerListSelected"
            show-checkbox
            default-expand-all
            ref="tree"
            node-key="id"
            :props="powerListProps">
          </el-tree>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    data() {
      return {
        // 角色列表
        roleList: [],
        // 当前点击选中的roleId
        curRoleId : 0,
        roleListProps: {
          label: 'roleName'
        },
        // 权限列表
        powerList : {},
        // 选择的权限
        powerListSelected : [],
        powerListProps: {
          children: 'children',
          label: 'name',
        },
      };
    },
    mounted(){
      this.getRoleListHandle();
      //this.getPowerListHandle();
    },
    methods: {
      nodeClickRoleHandle(data) {
        // 获取当前角色的id
        this.curRoleId = data.uuid;
        this.getPowerListHandle(data.uuid, 1)
      },
      // 获取角色列表
      getRoleListHandle(){
        let self = this;
        let params = {}
        api.powerRoleList(params)
          .then(function(res) {
            if(res.status === 'success'){
              self.roleList = res.data;
            }
          })
      },
      // 获取权限列表
      getPowerListHandle(roleUuid, companyUuid){
        let self = this;
        let params = {
          relRoleId : roleUuid,
          relCompanyId : companyUuid
        }
        api.getPowerListByIds(params)
          .then(function(res) {
            if(res.status === 'success'){
              self.powerList = res.data;
              self.powerListSelected = [];
              self.dealSelectedPowerHandle(res.data);
              console.log(self.powerListSelected)
            }
          })
      },
      // 提取选中的权限
      dealSelectedPowerHandle(data){
        if(data === null) return;
        data.forEach(item => {
          if ( item.selected ) {
            this.powerListSelected.push(item.id);
          }
          if( item.children ) {
           this.dealSelectedPowerHandle(item.children);
          }
        })
      },
      // 编辑角色权限
      editRolePowerHandle(){
        let self = this;
        let params = {
          sysRolePowerRelList : []
        }
        this.$refs.tree.getCheckedKeys().forEach(item => {
          params.sysRolePowerRelList.push({
            relRoleId : self.curRoleId,
            relPowerId : item,
            relCompanyId : 1
          })
        })
        params.sysRolePowerRelList = JSON.stringify(params.sysRolePowerRelList)
        api.editRolePower(params)
          .then(function(res) {
            if(res.status === 'success'){
              self.$message({
                message: '保存成功',
                type: 'success'
              });
            }
          })
      }
    }
  };
</script>

<style>
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background:#00afc7;
    color:#fff;
  }
</style>
