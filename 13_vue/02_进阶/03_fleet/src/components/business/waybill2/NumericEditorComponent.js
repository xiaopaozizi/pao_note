import Vue from "vue";
import api from '@/api/api'

export default Vue.extend({
    template: `<el-autocomplete
                 style="width:200px"
                 size="mini"
                 v-model="value"
                 placeholder="请输入内容"
                 :fetch-suggestions="shipperInfoSearch"
                 @select="selectHandle"
               ></el-autocomplete>
                     `,
    data() {
        return {
          value: '',
          selectData:null,
            cancelBeforeStart: true
        }
    },
    methods: {
      //托运方模糊搜索接口
       shipperInfoSearch(queryString, callback) {
        let self = this;
        api.getShipperInfoSearch({
            searchStr: queryString
          })
          .then(function(res){
            console.log(res);
            var data = res.data;
            var resultData = [];
            for(var objTemp of data){
              resultData.push({
              key:objTemp.customerBaseId,
              value:objTemp.custShortName,
              custFullName: objTemp.custFullName
              });
            }
            callback(resultData);
          })
          .catch(function(err){

          });
      },
      selectHandle(item){
        this.params.node.data.settleAccountsFullName = item.custFullName;
        this.params.node.data.relSettleAccountsId = item.key;

      },
        getValue() {
            return this.value;
        }

    },
    created() {
      this.value = this.params.value;
    },
    mounted() {


    }
})


