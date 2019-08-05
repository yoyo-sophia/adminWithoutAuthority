import { stringify } from "qs";
import OriginalRequest from "@/utils/request";
import request from "@/utils/newRequest";

export async function queryProjectNotice() {
  return request("/api/project/notice");
}

export async function queryActivities() {
  return request("/api/activities");
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getMockMenu() {
  return OriginalRequest("/api/menu");
}


//---------------------大型公共接口分割线------------------

// 一级代理商数据 admin账号权限
export async function firstRankPartner(params) {
  return request("/iot/v1/flowpools/partners", {
    method: "GET",
    payload: params
  });
};

// 公共上传文件api

export async function commonUpload(params) {
  return request("/iot/upload", {
    method: "POST",
    body: params
  });
};

// 卡源接口
export async function cardSource(params) {
  return request("/iot/v1/cards/card_source_name", {
    method: "GET",
    payload: params
  });
}

// 获取当前账号下子代理商
export async function getSubPartner(params) {
  return request("/api/v1/batch/pid_list", {
    method: "GET",
    payload: params
  });
}

// 获取获取代理商分组
export async function getPartnerList(params) {
  return request("/iot/v1/partners/partner_group_list", {
    method: "GET",
    payload: params
  });
}
//获取套餐组
export async function getPlanList(params) {
  return request("/iot/v1/meal_plans/top_agent_plans", {
    method: "GET",
    payload: params
  });
}

// 具备复充套餐的代理商列表
export async function getRechargeParList(params) {
  return request("/iot/v1/partners/repeat_recharge/partner_list", {
    method: "GET",
    payload: params
  });
}

//顶级代理商创建套餐列表
export async function getAllPlan(params) {
  return request("/iot/v1/statistics/get_all_plan", {
    method: "GET",
    payload: params
  });
}

//---------------------大型分割线现场----------------------

// 菜单数据
export async function getMenu() {
  return request("/iot/v1/partners/menu_list", {
    method: "GET"
  });
}

/*
* About Login
* */

// 获取标识符
export async function getUniqueToken() {
  return request("/iot/unique", {
    method: "GET"
  });
}

// 获取图文验证码
export async function getLoginCode(payload) {
  return request("/iot/code_img", {
    method: "GET",
    payload: payload
  });
}

// 登录接口
export async function iotLogin(params) {
  // let paramFormData = new FormData();
  // paramFormData.append('data',JSON.stringify(params));
  return request("/iot/v1/partners/login", {
    method: "POST",
    body: params
  });
}

// 登出接口
export async function iotLogout() {
  return request("/iot/v1/partners/logout", {
    method: "GET"
  });
}

/*
* 菜单设置
* */

// 添加节点
export async function createMenuNode(payload) {
  return request("/iot/v1/menus/create", {
    method: "POST",
    body: payload
  });
}

// 修改节点
export async function editMenuNode(payload) {
  return request("/iot/v1/menus/update", {
    method: "POST",
    body: payload
  });
}

// 删除节点
export async function deleteMenuNode(payload) {
  return request("/iot/v1/menus/delete", {
    method: "POST",
    body: payload
  });
}

/*
* end 菜单设置
* */


/*
*  角色相关
* */

// 角色列表
export async function getRoleList(params) {
  return request("/iot/v1/authorities/list", {
    method: "GET",
    payload: params
  });
}

// 新增角色
export async function addRole(params) {
  return request("/iot/v1/authorities/create", {
    method: "POST",
    body: {
      ...params
    }
  });
}

// 删除角色
export async function deleteRole(params) {
  return request("/iot/v1/authorities/delete", {
    method: "POST",
    body: {
      ...params
    }
  });
}

// 编辑角色
export async function editRole(params) {
  return request("/iot/v1/authorities/update", {
    method: "POST",
    body: {
      ...params
    }
  });
}

//  分配角色权限
export async function dispatchAuthorityToRole(params) {
  return request("/iot/v1/authorities/menu/allocation", {
    method: "POST",
    body: {
      ...params
    }
  });
}

// 获取当前角色的权限列表
export async function getCurRoleAuthority(params) {
  return request("/iot/v1/authorities/menu_list", {
    method: "GET",
    payload: params
  });
}

// 获取角色下的代理商列表
export async function getRolePartnerList(params) {
  return request("/iot/v1/partners/authority/partner_list", {
    method: "GET",
    payload: params
  });
}


/*
* 账号相关
* */

// 账号列表
export async function getAccountList(params) {
  return request("/iot/v1/partners/partner_list", {
    method: "GET",
    payload: params
  });
}



// 账号权限详情
export async function getAccountDetail(params) {
  return request("/iot/v1/partners/menu_list", {
    method: "GET",
    payload: params
  });
}

//创建顶级账号
export async function createTopAccount(params) {
  return request("/iot/v1/partners/create_top", {
    method: "POST",
    body: params
  });
}

// 给账号分配角色
export async function dispatchRoleToAccount(params) {
  return request("/iot/v1/partners/authority/allocation", {
    method: "POST",
    body: params
  });
}

// 修改账号状态
export async function changeAccountStatus(params) {
  return request("/iot/v1/partners/update_status", {
    method: "POST",
    body: params
  });
}

/*
* 接口设置相关
* */

// 获取接口列表
export async function apiList(params) {
  return request("/iot/v1/rules/list", {
    method: "GET",
    payload: params
  });
}

// 为菜单配置接口
export async function dispatchApiToMenu(params) {
  return request("/iot/v1/menus/rule/allocation", {
    method: "POST",
    body: params
  });
}

// 当前菜单已有api列表
export async function getMenuCurApi(params) {
  return request("/iot/v1/menus/rule_list", {
    method: "GET",
    payload: params
  });
}

// 移除当前菜单中的api
export async function deleteMenuApi(params) {
  return request("/iot/v1/menus/rule/remove", {
    method: "POST",
    body: params
  });
}
