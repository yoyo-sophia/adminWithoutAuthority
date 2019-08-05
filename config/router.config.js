export default [
  // user
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user", redirect: "/user/login" },
      { path: "/user/login", component: "./User/Login" },
      { path: "/user/register", component: "./User/Register" }
    ]
  },
  // app
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    authority: ["admin", "user"],
    routes: [
      {
        path: "/",
        redirect: "/user/login"
      }, {
        path: "/landing",
        name: "landing",
        component: "./Landing/index",
        hideInMenu: true
      }, {
        path: "/authority",
        name: "系统设置",
        icon: "form",
        routes: [
          {
            path: "/authority/node_setting",
            name: "节点设置",
            component: "./Authority/node_setting"
          }, {
            path: "/authority/role_setting",
            name: "角色设置",
            component: "./Authority/role_setting"
          }, {
            path: "/authority/account_setting",
            name: "账号设置",
            component: "./Authority/account_setting"
          }, {
            path: "/authority/api_setting",
            name: "接口设置",
            component: "./Authority/api_setting"
          }, {
            path: "/authority/account_detail",
            name: "账号权限详情",
            component: "./Authority/account_detail"
          }, {
            path: "/authority/role_detail",
            name: "角色下代理商列表",
            component: "./Authority/role_detail"
          }, {
            path: "/authority/flowCoefficient_setting",
            name: "卡套餐系数自动调整",
            component: "./Authority/flowCoefficient_setting"
          }, {
            path: "/authority/cardExclude_setting",
            name: "卡排除设置",
            component: "./Authority/cardExclude_setting"
          }
        ]

      },//权限节点
      {
        path: "/flow",
        name: "流量池",
        routes: [{
          path: "/flow/flow_plan_setting",
          name: "流量池套餐",
          component: "./Flow/flow_plan_setting"
        }, {
          path: "/flow/flow_setting",
          name: "代理商流量池列表",
          component: "./Flow/flow_setting"
        }, {
          path: "/flow/flow_setting_total",
          name: "总流量池列表",
          component: "./Flow/flow_setting_total"
        }, {
          path: "/flow/flow_list_detail",
          name: "流量池详情",
          component: "./Flow/flow_list_detail"
        }, {
          path: "/flow/new_flow",
          name: "新增代理商流量池",
          component: "./Flow/new_flow"
        }, {
          path: "/flow/new_flow_total",
          name: "新增总流量池",
          component: "./Flow/new_flow_total"
        }]
      },// 流量池
      {
        path: "/om",
        name: "运维工具",
        routes: [{
          path: "/om/director",
          name: "主管版",
          component: "./Om/director"
        }, {
          path: "/om/plain",
          name: "客服版",
          component: "./Om/plain"
        }]
      },// 运维工具
      {
        path: "/base_setting",
        name: "基础设置",
        routes: [{
          path: "/base_setting/industry_list",
          name: "行业组设置",
          component: "./BaseSetting/industry"
        }, {
          path: "/base_setting/industry/partner_list",
          name: "行业组管理",
          component: "./BaseSetting/industry_member"
        },
          {
            path: "/base_setting/industry/plan_list",
            name: "套餐组管理",
            component: "./BaseSetting/plan_member"
          },
          {
            path: "/base_setting/speedup",
            name: "加速包设置",
            component: "./BaseSetting/speedup"
          }, {
            path: "/base_setting/recharge_plan_setting",
            name: "复充套餐设置",
            component: "./BaseSetting/recharge_plan"
          }, {
            path: "/base_setting/link_setting",
            name: "链接设置",
            component: "./BaseSetting/link_setting"
          }, {
            path: "/base_setting/source_setting",
            name: "卡源设置",
            component: "./BaseSetting/card_source"
          }, {
            path: "/base_setting/card_wrapper_setting",
            name: "卡套设置",
            component: "./BaseSetting/card_wrapper"
          }]
      },// 基础设置
      {
        path: "/financial_management",
        name: "财务数据",
        routes: [{
          path: "/financial_management/cost_importing",
          name: "成本录入",
          component: "./FinancialManagement/cost_importing"
        }, {
          path: "/financial_management/cost_statistic",
          name: "成本统计",
          component: "./FinancialManagement/cost_statistic"
        }, {
          path: "/financial_management/income",
          name: "预收转实收",
          component: "./FinancialManagement/income"
        }]
      },// 财务数据
      {
        name: "卡管理",
        path: "/card",
        routes: [{
          path: "/card/card_importing",
          name: "卡录入",
          component: "./Card/card_importing"
        }, {
          name: "批次卡录入详情",
          path: "/card/card_imported_detail",
          component: "./Card/card_imported_detail"
        }, {
          name: "卡到期管理",
          path: "/card/card_expired",
          component: "./Card/card_expired"
        }]
      },// 卡管理
      {
        name: "统计",
        path: "/statistics",
        routes: [{
          path: "/statistics/recharge_statistics",
          name: "复充统计",
          component: "./Statistics/recharge_statistics"
        }, {
          name: "用户访问统计",
          path: "/statistics/loss_rate",
          component: "./Statistics/loss_rate"
        }, {
          path: "/Statistics/profit_statistics",
          name: "盈亏统计",
          component: "./Statistics/profit_statistics"
        },
          {
            path: "/Statistics/profit_statistics_details",
            name: "盈亏统计详情",
            component: "./Statistics/profit_statistics_details"
          }]

      },// 统计
      {
        name: "系统工具",
        path: "/system_tool",
        routes: [{
          path: "/system_tool/search_card",
          name: "卡查询",
          component: "./SystemTool/check_card"
        }]
      },
      {
        name: "exception",
        icon: "warning",
        path: "/exception",
        hideInMenu: true,
        routes: [
          {
            path: "/exception/403",
            name: "not-permission",
            component: "./Exception/403"
          },
          {
            path: "/exception/404",
            name: "not-find",
            component: "./Exception/404"
          },
          {
            path: "/exception/500",
            name: "server-error",
            component: "./Exception/500"
          },
          {
            path: "/exception/trigger",
            name: "trigger",
            hideInMenu: true,
            component: "./Exception/TriggerException"
          }
        ]
      },
      {
        component: "404"
      }
    ]
  }
];
