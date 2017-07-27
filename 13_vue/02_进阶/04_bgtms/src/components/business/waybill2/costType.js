import Vue from "vue";
import api from '@/api/api'

export default Vue.extend({
    template: `<el-select style="width:200px" v-model="costType" clearable placeholder="请选择"  size="mini"  @change="selectChange">
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
          costType: '应收',
          options:[],
        }
    },
    methods: {
      //费用类型下拉框
      costtTypeSelect(){
        let self = this;
        self.costType = [];
        api.selectBusTypeHandle('costtype')
          .then(function (res) {
            let data  = res.data;
            console.log(data);
            for (let objTemp of data) {
              self.costType.push({"value":objTemp.display })
            }
            self.options= self.costType;
          })
          .catch(function(err){


          })
      },

        getValue() {
          if(this.costType instanceof Array) {
            return '';
          }else {
            return this.costType;
          }

        },
      selectChange(item) {
        console.log('我是选中的值');

      }
    },
    created() {
      this.value = this.params.value;
    },
    mounted() {
      this.costtTypeSelect()
    }
})


