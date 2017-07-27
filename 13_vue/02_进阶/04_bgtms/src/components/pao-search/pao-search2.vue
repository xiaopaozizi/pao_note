<template>
    <div id="pao-search" class="">
        <div class="row">
            <div class="form-group mysearch col-md-2 pull-right">
                <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <input
                            type="text"
                            @keyup="search(searchKey, $event)"
                            v-model="searchKey"
                            class="form-control input-sm"
                            id="exampleInputAmount"
                            placeholder="搜索">
                    <div class="input-group-addon" :class="{ active : isShowSubSearch }" @click="isShowSubSearch = !isShowSubSearch"><i class="fa" :class="{ 'fa-angle-double-up' : isShowSubSearch,  'fa-angle-double-down' : !isShowSubSearch }" aria-hidden="true"></i></div>
                </div>
                <ul class="resultBox"  v-if="isShowSearchBox">
                    <template v-for="result in completeSearchResult">
                        <li>
                            <span>{{result.title}}</span>
                            <ul>
                                <li v-for="data in result.data" @click="searchKey = data;isShowSearchBox = false;">{{data}}</li>
                            </ul>
                        </li>
                        <li class="divider"></li>
                    </template>
                    <template v-if="completeSearchResult.length === 0">
                        <li>没有搜索到数据╮(╯_╰)╭</li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="row subsearch" v-if="isShowSubSearch">
            <div class="addSearch">
            <i class="fa fa-2x fa-plus-square-o" @click="isShowSubmenuUl = !isShowSubmenuUl" aria-hidden="true"></i>
            <ul v-if="isShowSubmenuUl">
              <li
                @click="operate(subsearch)"
                v-for="subsearch in subsearches">
                <i
                  class="fa"
                  :class="{ 'fa-check' : !subsearch.isHide }"
                  aria-hidden="true"></i><span>{{subsearch.key}}</span></li>
            </ul>
          </div>
<!--
         <pao-form :data="subsearches" class="search-bg"></pao-form>
-->
            <form-search
              :FieldList='fields'
              :DefaultValue="DefaultValue"
              :Rules="rules"
              :formRef="formRef"
              ref="child"
            >
            </form-search>
        </div>
<!--        <div ><el-button @click="test">箱单查询测试</el-button></div>
        <div ><el-button @click="test2">运单查询测试</el-button></div>-->
    </div>

</template>

<script>

    import paoForm from '../pao-form/pao-form.vue'
    //表单form
    import editForm from '../common/formDataEdit/formDataEdit.vue'
    import api from '../../api/api'

    var subsearches = [
        { type : 'input-text', col : 6, key : '运单号', isHide : false, value : [''], keyWidth: '90px'},
        { type : 'cascader', col : 6, key : '托运方', isHide : false, value : [{
            value: 'zhinan',
            label: '指南',
            children: [
                {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                        {
                            value: 'yizhi',
                            label: '一致'
                        },
                        {
                            value: 'fankui',
                            label: '反馈'
                        },
                        {
                            value: 'xiaolv',
                            label: '效率'
                        },
                        {
                            value: 'kekong',
                            label: '可控'
                        }
                    ]
                }
            ]
        }], keyWidth: '90px' },
        { type : 'date-picker', col : 6, dateType : 'month', date : '', key : '日期',isHide : false, value : [], keyWidth: '90px' },
        { type : 'cascader', col : 6, key : '船公司', isHide : false, value : [{
            value: 'zhinan',
            label: '指南',
            children: [
                {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                        {
                            value: 'yizhi',
                            label: '一致'
                        },
                        {
                            value: 'fankui',
                            label: '反馈'
                        },
                        {
                            value: 'xiaolv',
                            label: '效率'
                        },
                        {
                            value: 'kekong',
                            label: '可控'
                        }
                    ]
                }
            ]
        }], keyWidth: '90px' },
        { type : 'select', col : 6, key : '状态',isHide : true, value : ['计划单数', '处理中', '运输中', '待付款'], keyWidth: '90px'},
        { type : 'cascader', col : 6, key : '船名航次', isHide : true, value : [{
            value: 'zhinan',
            label: '指南',
            children: [
                {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                        {
                            value: 'yizhi',
                            label: '一致'
                        },
                        {
                            value: 'fankui',
                            label: '反馈'
                        },
                        {
                            value: 'xiaolv',
                            label: '效率'
                        },
                        {
                            value: 'kekong',
                            label: '可控'
                        }
                    ]
                }
            ]
        }], keyWidth: '90px' },
        { type : 'input-text', col : 6, key : '提单号', isHide : true, value : [''], keyWidth: '90px', load:[
          {value: '宁波精工'},
          {value: '金华大邦'},
          {value: '宁波稀罕'},
          {value: '金华夏枫'}
        ]}
    ];
    // 获取localStorage的值
    function fetchArray(key){
        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        }
        return subsearches;
        //return [];
    }
    // 设置localStorage的值
    function saveArray(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    var opiton = {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    }

    export default {
        components : {
            'pao-form' : paoForm,
           'form-search': editForm
        },
        data () {
            return {
                // 搜索字段
                searchKey : '',
                // 待搜索结果集合
                searchResult : [
                    {
                        title : '运单号',
                        data : ['运单号1','运单号2','运单号3','运单号4']
                    },
                    {
                        title : '托运方',
                        data : ['托运方1','托运方2','托运方3','托运方4']
                    },
                    {
                        title : '日期',
                        data : ['日期1','日期2','日期3','日期4']
                    },
                    {
                        title : '船公司',
                        data : ['船公司1','船公司2','船公司3','船公司4']
                    },
                    {
                        title : '状态',
                        data : ['状态1','状态2','状态3','状态4']
                    },
                    {
                        title : '船名航次',
                        data : ['船名航次1','船名航次2','船名航次3','船名航次4']
                    },
                    {
                        title : '提单号',
                        data : ['提单号1','提单号2','提单号3','提单号4']
                    }

                ],
                // 完成搜索的值
                completeSearchResult : [],
                // 是否显示搜索结果框
                isShowSearchBox : false,
                // 是否显示子菜单
                isShowSubSearch : false,
                // 子菜单
                subsearches : fetchArray('paoSearch'),
                // 是否显示编辑子菜单的ul
                isShowSubmenuUl : false,
                formRef: 'search-data',
                DefaultValue:{
                  orderId:'',
                  ydId:'',
                  shipperInfo:'',
                  shipperId:'',
                  customerCode: '',
                  expdateQuery: '',
                  expdataTime:'',
                  busType: '',
                  billNumber: '',
                  vesselVoyage: '',
                  cyClosingDayStr: '',
                  orderSource: '',
                  destination: '',
                  getClpPlace: '',
                  downClpPlace: '',
                  shippingCompany: '',
                  department: '',
                  salesman: '',
                  remark: '',
                  orderStatus: '1-处理中',
                  teuTypeCount: ''
                },
                /*
                 * 校验规则数据参数
                 * */
                rules: {},
                /*
                 * 表单的数据参数
                 * Span     : 当前框的布局宽度
                 * type     : 框的类型
                 * label    : 当前框的label
                 * key      : 对应model的值
                 * value    : 默认输入的值
                 * desc     : placeholder 属性
                 *
                 *
                 * */
                fields: [
                  /*input 模板参数*/
                  {span: 6, type:'autocomplete',display:true,querySearch:this.xdIdSearch,style:'width:245px', label: '订单号',key: 'orderId',value: '222',desc: '请输入订单号',select:this.handleSelect},
                  {span: 6, type:'autocomplete',display:true,querySearch:this.ydIdSearch,style:'width:245px', label: '运单号',key: 'ydId',value: '222',desc: '请输入运单号',select:this.handleSelect},
                  {span:6, type:'input', label: '运单号',display:true,style:'width:245px',key: 'customerCode',value: '222',desc: '请输入客户简称'},
                  {span: 6, type:'daterange',label: '装拆期限',display:true,style:'width:245px',key: 'expdateQuery',value: '222',desc: '请输入装拆期限',editable: false,pickerOptions:opiton,change:this.expdateStrChange},
                  {span: 6, type:'daterange',label: '装拆时间',display:true,style:'width:245px',key: 'expdataTime',value: '222',desc: '',editable: false,change:this.DateChange},
                  {span: 6, type:'input',label: '提单号',display:true,style:'width:245px', key: 'billNumber',value: '222',desc: '请输入提单号' },
                  {span: 6, type:'autocomplete',display:true,querySearch:this.vesselVoyageSearch,style:'width:245px', label: '船名航次',key: 'vesselVoyage',value: '222',desc: '请输入船名航次',select:this.handleSelect},
                  {span: 6, type:'autocomplete',display:true,querySearch:this.destinationSearch,style:'width:245px', label: '装拆地',key: 'destination',value: '222',desc: '请输入装拆地', select:this.handleSelect},
                  {span: 6, type:'autocomplete',display:true,querySearch:this.hippingCompanySearch ,style:'width:245px',label: '船公司',key: 'shippingCompany',value: '222',desc: '请输入船公司',select:this.handleSelect },
                  /*运单的查询*/
                ],
            }
        },
        methods: {
          //测试函数
          test() {
            let params = {
              expdateQuery: this.DefaultValue.expdateStr
            }
            console.log(params)
     /*       api.xdTableList(params)
              .then(function(res) {})
              .catch(function(err) {
                console.log(err)
              })*/
          },
          test2(){
            let   self = this
            let item = {
              destinationDateQuery: self.DefaultValue.expdataTime
            };
            console.log(item)
     /*          api.tkOrderQueryList(params)
             .then(function(res) {})
             .catch(function(err) {
             console.log(err)
             })*/
          },
           //托运方模糊搜索接口
          shipperInfoSearch(queryString, callback) {
            let self = this;
            api.getShipperInfoSearch({
                searchStr: queryString
              })
              .then(function(res){
                console.log(res);
              })
              .catch(function(err){
                var data = err.data.data;
                var resultData = [];
                for(var objTemp of data){
                  resultData.push({"key":objTemp.shipperId, "value":objTemp.custShortName + '/' + objTemp.contactPeople + '/' + objTemp.mobilephoneOne});
                }
                callback(resultData);
              });
          },
          //下拉框选中的默认事件
          handleSelect(item){
            console.log(item)
          },
          //订单号模糊搜索查询
          xdIdSearch(queryString, callback) {
            if( queryString != '' ){
              api.getXdIdSearch(queryString)
                .then(function (res) {
                  console.log("tttttt");

                })
                .catch(function(err){

                  let data = err.data.data;
                  console.log(data)
                  let resultData = [];
                  for(var objTemp of data){
                    resultData.push({"value":objTemp});
                  }
                  callback(resultData);

                })
            }else{
              console.log('为空值')
            }
          },
          //运单号查询
          ydIdSearch(queryString, callback) {
            if( queryString != '' ){
              api.ydNumSearch(queryString)
                .then(function (res) {
                  console.log("tttttt");

                })
                .catch(function(err){

                  let data = err.data.data;
                  console.log(data)
                  let resultData = [];
                  for(var objTemp of data){
                    resultData.push({"value":objTemp});
                  }
                  callback(resultData);

                })
            }else{
              console.log('为空值')
            }
          },
          //装拆期限选中的事件
          expdateStrChange(val) {
            console.log(val)
            this.DefaultValue.expdateStr = val;
            console.log(this.DefaultValue.expdateStr)

          },
          DateChange(val) {
            this.DefaultValue.expdateTime = val;
            console.log(this.DefaultValue.expdateTime)

       /*     this.DefaultValue.expdataTime = val;*/
          },




          /*====================================*/

            operate(subsearch){
                subsearch.isHide = !subsearch.isHide;
                saveArray("paoSearch", this.subsearches);
            },
            // 搜索
            search(key, event){
                // 监听键盘的值   ↑38   ↓40
                if(event.keyCode === 38){
                    alert('↑')
                } else if (event.keyCode === 40) {
                    alert('↓')
                }
                // 如果key值为为空
                if(key === '') {
                    this.isShowSearchBox = false;
                    return;
                }
                var _this = this;
                setTimeout(function () {
                    startSearch();
                }, 300);

                function startSearch(){
                    var result = [];
                    var resultAll = [];
                    for ( var i = 0; i < _this.searchResult.length; i++ ) {
                        for ( var j = 0; j < _this.searchResult[i].data.length; j++ ) {
                            if (_this.searchResult[i].data[j].indexOf(key) !== -1){
                                result.push(_this.searchResult[i].data[j]);
                            }
                        }
                        if(result.length){
                            resultAll.push({
                                title : _this.searchResult[i].title,
                                data : result
                            });
                            result = [];
                        }
                    }
                    _this.completeSearchResult = resultAll;
                    _this.isShowSearchBox = true;
                    //return resultAll;
                }
            }


        }
    }




</script>
<style>
    *{
        margin:0;
    }
    body{
        padding-top:0;
    }

    #pao-search .mysearch{
        position:relative;
        padding:0;
        margin-right:30px;
    }
    #pao-search .input-group-addon.active{
        background-color: lightskyblue;
    }
    #pao-search .resultBox{
        position:absolute;
        z-index : 999;
        padding-left:0;
        width:100%;
        height:300px;
        overflow:scroll;
        border:1px solid #ccc;
        border-radius:5px;

    }
    #pao-search .resultBox li {
        margin-top:5px;
        padding-left:10px;
    }
    #pao-search .resultBox li ul{
        padding-left:10px;
    }
    #pao-search .resultBox li ul li{
        cursor: pointer;
    }
    #pao-search .resultBox li.divider{
        height: 1px;
        margin: 9px 0;
        overflow: hidden;
    }

    /*子搜索框*/
    .subsearch {
        padding-top:10px;
        position: relative;
        background-color: white;
    }
    .subsearch .addSearch{
        position:absolute;
        right: 0;
        z-index: 23;
        margin-right: 15px;
    }
    .subsearch .addSearch ul{
        position:absolute;
        /*border:1px solid #ccc;*/
        border-radius:10px;
        width:120px;
        padding:10px 5px 10px 10px;
        top:30px;
        right:10px;
    }
    .subsearch .addSearch ul li{
        cursor:pointer;
    }
    .subsearch .addSearch ul li i{
        margin-right:10px;
        width:20px;
    }

    .subsearch input {
      height: 25px;
    }
    .subsearch .el-row .el-input{

    }
    .subsearch .el-form-item {
      margin-bottom: 0;
    }

    .control-label{
        margin-top:8px;
    }
</style>

