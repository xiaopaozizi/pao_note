import Vue from "vue";
import api from '@/api/api'

export default Vue.extend({
    template: `<el-autocomplete
                 style="width:200px"
                 size="mini"
                 v-model="value"
                 placeholder="请输入内容"
                 :fetch-suggestions="costNameSearch"
               ></el-autocomplete>
                     `,
    data() {
        return {
          value: '',
            cancelBeforeStart: true
        }
    },
    methods: {
      //托运方模糊搜索接口
      //费用名称查询接口
      costNameSearch(queryString, callback) {
        api.getCostsForSearch(queryString,'TK')
          .then(function (res) {
            let data  = res.data;
            console.log(data);
            var resultData = [];
            for(var objTemp of data){
              resultData.push({"key":'',"value":objTemp.costName });
            }
            callback(resultData);
          })
          .catch(function(err) {


          })
      },

        getValue() {
            return this.value;
        },

    },
    created() {
      this.value = this.params.value;
    },
    mounted() {


    }
})


