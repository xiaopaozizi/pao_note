<template>
    <div id="role">
      <el-row>
        <el-col :span="6">
          <el-col :span="24">
            <label style="float:left;font-size:24px;">调度</label>
            <el-button style="float:right;" type="success">保存</el-button>
          </el-col>
          <el-col style="margin-top:40px;">
            <el-tree
              :data="roles.dispatch"
              show-checkbox
              node-key="id"
              :props="defaultProps">
            </el-tree>
          </el-col>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        roles : {
          // 调度
          'dispatch' : [
            {
              id: 1,
              label: '箱单',
              children : [
                {
                  id: 4,
                  label: '订单',
                  children : [
                    {
                      id: 13,
                      label: '基本信息',
                      children : [
                        {
                          id: 18,
                          label: '添加',
                        },
                        {
                          id: 19,
                            label: '编辑',
                        }
                      ],
                    },
                    {
                      id: 14,
                      label: '托卡信息',
                      children : [
                        {
                          id: 20,
                          label: '添加',
                        },
                        {
                          id: 21,
                          label: '编辑',
                        },
                        {
                          id: 22,
                          label: '删除',
                        },
                        {
                          id: 23,
                          label: '拖卡',
                        },
                        {
                          id: 24,
                          label: '作废',
                        },
                        {
                          id: 25,
                          label: '完成',
                        }
                      ],
                    },
                    {
                      id: 15,
                      label: '费用信息'
                    },
                    {
                      id: 16,
                      label: '上传图片'
                    },
                    {
                      id: 17,
                      label: '日志信息',
                    }
                  ]
                },
                {
                  id: 5,
                  label: '运单',
                  children : [
                    {
                      id: 26,
                      label: '运单信息',
                      children : [
                        {
                          id: 27,
                          label: '排车',
                        },
                        {
                          id: 28,
                          label: '编辑',
                        }
                      ],
                    },
                    {
                      id: 29,
                      label: '订单信息',
                    },
                    {
                      id: 30,
                      label: '费用信息',
                      children : [
                        {
                          id: 31,
                          label: '新增',
                        },
                        {
                          id: 32,
                          label: '删除',
                        }
                      ],
                    },

                    {
                      id: 33,
                      label: '上传图片',
                    },

                    {
                      id: 34,
                      label: '日志信息',
                    },
                  ]
                }
              ]
            },
            {
              id: 2,
              label: '后勤',
              children : [
                {
                  id: 6,
                  label: '司机',
                  children : [
                    {
                      id : 35,
                      label : '新增',
                    },

                    {
                      id : 36,
                      label : '绑定车牌',
                    },

                    {
                      id : 37,
                      label : '编辑',
                    },


                    {
                      id : 38,
                      label : '删除',
                    }
                  ]
                },
                {
                  id: 7,
                  label: '车辆',
                  children : [
                    {
                      id: 39,
                      label: '车头登记',
                      children : [
                        {
                          id : 40,
                          label : '新增',
                        },
                        {
                          id : 41,
                          label : '编辑',
                        },
                        {
                          id : 42,
                          label : '删除',
                        }
                      ]
                    },
                    {
                      id: 43,
                      label: '挂车登记',
                    },
                  ]
                },
                {
                  id: 8,
                  label: '客户',
                  children : [
                    {
                      id: 44,
                      label: '基本信息',
                      children : [
                        {
                          id : 45,
                          label : '新增',
                        },
                        {
                          id : 46,
                          label : '编辑',
                        },
                        {
                          id : 47,
                          label : '删除',
                        },
                        {
                          id : 48,
                          label : '查询',
                        },
                        {
                          id : 49,
                          label : '导出',
                        }
                      ]
                    },
                    {
                      id: 50,
                      label: '银行账号',
                    },

                    {
                      id: 51,
                      label: '取（交）单点',
                    },

                    {
                      id: 52,
                      label: '联系人',
                      children : [
                        {
                          id : 54,
                          label : '新增',
                        },
                        {
                          id : 55,
                          label : '编辑',
                        },
                        {
                          id : 56,
                          label : '删除',
                        },
                      ]
                    },

                    {
                      id: 53,
                      label: '装拆点',
                      children : [
                        {
                          id : 57,
                          label : '新增',
                        },
                        {
                          id : 58,
                          label : '编辑',
                        },
                        {
                          id : 58,
                          label : '删除',
                        },
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 3,
              label: '结算',
              children : [
                {
                  id: 9,
                  label: '账单',
                  children : [
                    {
                      id : 59,
                      label : '查询'
                    },
                    {
                      id : 60,
                      label : '编辑'
                    }
                  ]
                },
                {
                  id: 10,
                  label: '通知',
                  children : [
                    {
                      id : 61,
                      label : '查询'
                    },
                    {
                      id : 62,
                      label : '编辑'
                    }
                  ]
                },
                {
                  id: 11,
                  label: '销账',
                  children : [
                    {
                      id : 63,
                      label : '查询'
                    },

                    {
                      id : 64,
                      label : '审核'
                    },
                    {
                      id : 65,
                      label : '编辑'
                    }
                  ]
                },

                {
                  id: 12,
                  label: '账户',
                  children : [
                    {
                      id : 66,
                      label : '查询'
                    },
                    {
                      id : 67,
                      label : '新增'
                    },
                    {
                      id : 68,
                      label : '编辑'
                    },
                    {
                      id : 69,
                      label : '删除'
                    },
                  ]
                }
              ]
            },
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>

<style>

</style>
