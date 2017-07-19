<template>
  <div class="show-info">
      <el-form :model="showForm"  label-width="140px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态">
              <span>{{showForm.orderStatus}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单时间">
              <span>{{showForm.createDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <span>{{showForm.createUser}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单号">
              <span>{{showForm.orderCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="托运方">
              <span>{{showForm.shipperInfo}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户单号" prop="customerCode">
              <span>{{showForm.customerCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="类型">
              <span>{{showForm.busType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提单号">
              <span>{{showForm.billNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="船名航次">
              <span>{{showForm.vesselVoyage}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="截关日期">
              <span>{{showForm.cyClosingDay}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源">
              <span>{{showForm.orderSource}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="装拆地">
              <span>{{showForm.destination}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="提箱点">
              <span>{{showForm.getClpPlace}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进箱点">
              <span>{{showForm.downClpPlace}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="船公司">
              <span>{{showForm.shippingCompany}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="部门">
              <span>{{showForm.department}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务员">
              <span>{{showForm.salesman}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="箱量">
              <span>{{showForm.teuTypeCount}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="8">
          <el-form-item label="装拆期限">
            <span>{{showForm.expdate}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注">
            <span>{{showForm.remark}}</span>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
    export default {
      props:['showData','activeName'],
      name:'show-info',
      data() {
        return {
          showForm: {
            customerCode:'',//客户单号
            orderStatus:'',//状态
            createDate:'', //制单时间
            createUser: '',//录入人
            orderCode: '', //订单号
            shipperInfo: '', //托运方
            expdate:'',  //装拆期限
            busType: '',//类型
            billNumber: '', //提单号
            vesselVoyage:'',//船名航次
            cyClosingDay: '',//截关日期
            orderSource: '', //来源
            destination: '', //装拆地
            getClpPlace: '', //提箱点
            downClpPlace: '', //进箱点
            shippingCompany: '', //船公司
            department: '',//部门
            salesman: '', //业务员
            remark: '', //备注
            teuTypeCount: '' //箱量
          },
        }
      },
      watch: {
        'showData': function () {
          this.showFormMsg();
        }
      },
      methods: {
        //单机显示列表 数据
        showFormMsg() {
          let self = this;
          let params = {
            xdOrderId: this.showData.relOrderId
          };
          if(this.activeName ==='订单信息') { //判断tabs是否在当前的信息上
            api.orderStatus(params)
              .then(function(res){
                for( let objTemp in self.showForm) {
                  self.showForm[objTemp] = res[0][objTemp];
                }
              })
              .catch(function(err) {

              })
          }





        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

