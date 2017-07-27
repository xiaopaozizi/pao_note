<template>
    <div id="pao-search" class="container-fluid">
        <div class="row">
            <div class="form-group mysearch col-md-4">
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>
                    <input
                            type="text"
                            @keyup="search"
                            class="form-control"
                            id="exampleInputAmount"
                            placeholder="搜索">
                    <div class="input-group-addon"
                         :class="{ active : isShowSubSearch }"
                         @click="isShowSubSearch = !isShowSubSearch"
                    >
                      <i class="fa"
                         :class="{ 'fa-angle-double-up' : isShowSubSearch,  'fa-angle-double-down' : !isShowSubSearch }"
                         aria-hidden="true">
                      </i>
                    </div>
                </div>
                <ul class="resultBox" v-if="isShowSearchBox">
                    <li>运单号
                        <ul>
                            <li>运单号111</li>
                            <li>运单号222</li>
                            <li>运单号333</li>
                            <li>运单号444</li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li>托运方
                        <ul>
                            <li>捷达的是车队/小发发李/13656564545</li>
                            <li>捷达车队/小李/13656564545</li>
                            <li>捷达车队/小李/13656564545</li>
                            <li>捷达车队/小李/13656564545</li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li>船公司
                        <ul>
                            <li>船公司aaaa</li>
                            <li>船公司bbbb</li>
                            <li>船公司cccc</li>
                            <li>船公司dddd</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row subsearch" v-if="isShowSubSearch">
            <div class="addSearch">
            <i class="fa fa-2x fa-plus-square-o" @click="isShowSubmenuUl = !isShowSubmenuUl" aria-hidden="true"></i>
            <ul v-if="isShowSubmenuUl">
              <li
                @click="subsearch.isHide = !subsearch.isHide"
                v-for="subsearch in subsearches">
                <i
                  class="fa"
                  :class="{ 'fa-check' : !subsearch.isHide }"
                  aria-hidden="true"></i><span>{{subsearch.key}}</span></li>
            </ul>
          </div>
            <pao-form :data="subsearches"></pao-form>
            <!--<div class="form-group col-md-4">
                <label for="inputEmail3" class="col-sm-4 control-label">运单号</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group col-md-4">
                <label for="inputEmail3" class="col-sm-4 control-label">托运方</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group col-md-4">
                <label for="inputEmail3" class="col-sm-4 control-label">船公司</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group col-md-4">
                <label for="inputEmail3" class="col-sm-4 control-label">船公司</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group col-md-4">
                <label for="inputEmail3" class="col-sm-4 control-label">船公司</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group col-md-4">
                <label for="inputEmail3" class="col-sm-4 control-label">船公司</label>
                <div class="col-sm-8">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>

    import paoForm from '../pao-form/pao-form.vue'

    export default {
        components : {
            'pao-form' : paoForm,
        },
        data () {
            return {
                // 是否显示搜索结果
                isShowSearchBox : false,
                // 是否显示子菜单
                isShowSubSearch : false,
                // 子菜单
                subsearches : [
                    { type : 'input-text', col : 6, key : '提单号', isHide : false, value : [''], keyWidth: 90},
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
                    }], keyWidth: 90 },
                    { type : 'date-picker', col : 6, dateType : 'month', date : '', key : '日期',isHide : false, value : [], keyWidth: 90 },
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
                    }], keyWidth: 90 },
                    { type : 'select', col : 6, key : '状态',isHide : true, value : ['计划单数', '处理中', '运输中', '待付款'], keyWidth: 90},
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
                    }], keyWidth: 90 },
                    { type : 'input-text', col : 6, key : '提单号', isHide : true, value : [''], keyWidth: 90}
                ],
                // 是否显示编辑子菜单的ul
                isShowSubmenuUl : false,
            }
        },
        watch : {

        },
        methods: {
            // 搜索
            search(){
                console.log(999)
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
        background:#f1f1f1;
        padding-left:0;
        width:100%;
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
    #pao-search .resultBox li.divider{
        height: 1px;
        margin: 9px 0;
        overflow: hidden;
        background-color: #e5e5e5;
    }

    /*子搜索框*/
    .subsearch {
        background:#f1f1f1;
        padding-top:10px;
        position: relative;
    }
    .subsearch .addSearch{
        position:absolute;
        right: 0;
        z-index: 23;
        margin-right: 15px;
    }
    .subsearch .addSearch ul{
        position:absolute;
        border:1px solid #ccc;
        border-radius:10px;
        background: #fff;
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

