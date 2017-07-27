import Vue from "vue";
import api from '@/api/api'

export default Vue.extend({
    template: `<el-select style="width:200px"
                         v-model="specsModel"
                         clearable
                         placeholder="请选择"
                         size="mini"
                         >
                                  <el-option
                                       v-for="item in options"
                                       :key="item.value"
                                       :label="item.value"
                                        :value="item.value">
                                   </el-option>
                             </el-select>`
                     ,
    data() {
        return {
          specsModel: '',
          options:[],
        }
    },
    methods: {
      //费用类别下拉框接口
      categoryChange() {
        let self = this;
        let optionsData = [];
        api.selectBusTypeHandle('specsm')
          .then(function (res) {
            let  data  = res.data;
            console.log(data);
            for (let objTemp of data) {
              optionsData.push({"value":objTemp.display })
            }
            self.options = optionsData;
          })
          .catch(function(err){

          })
      },

        getValue() {
          if(this.specsModel instanceof Array) {
            return '';
          }else {
            return this.specsModel;
          }

        },
    },
    created() {
      this.value = this.params.value;
    },
    mounted() {
      this.categoryChange();
    }
})


