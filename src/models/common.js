import {
  commonUpload,// 公共上传
  firstRankPartner,// 一级代理
  cardSource,//卡源
  getAccountList,// 当前登录账号下的代理商
  getPartnerList,// 获取代理商组
  getRechargeParList,//具备复充套餐的代理商列表
  getPlanList,   //当前账号下的套餐组
  getAllPlan,    //顶级代理商创建套餐列表
} from "@/services/api";

import {
  getIndustryList// 行业组列表
} from "@/services/base_setting";

import { message } from "antd";

message.config({ maxCount: 1 });

export default {
  namespace: "common",
  state: {
    firstPartnerList: {
      data: []
    },
    cardSource: [],// 卡源
    subPartnerList: [], // 当前账号下的子代理
    partnerList: [],// 代理商组
    industryList: [],// 行业组
    rechargeParList:{//具备复充套餐的代理商列表
      data:[]
    },
    allPanList:{
      data:{rows:[]}
    }, 
    planList: [] //套餐组
  },
  effects: {
    * commonUpload({ payload }, { call, put }) {
      const { resolve } = payload;
      const response = yield call(commonUpload, payload.params);
      resolve(response);
    },// 公共上传
    * firstRankPartner({ payload }, { call, put }) {
      const response = yield call(firstRankPartner, payload);
      if (response.state === 1) {
        yield put({
          type: "saveFirstPartner",
          payload: response
        });
      }
    },// 一级代理商
    * getRechargeParList({ payload }, { call, put }) {
      const response = yield call(getRechargeParList, payload);
      if (response.state === 1) {
        yield put({
          type: "getRechargePartner",
          payload: response
        });
      }
    },// 具备复充套餐的代理商列表
    
    * getAllPlan({ payload }, { call, put }) {
      const response = yield call(getAllPlan, payload);
      if (response.state === 1) {
        yield put({
          type: "getAllPlanList",
          payload: response
        });
      }
    },// 顶级代理商创建套餐列表
    * getCardSource({ payload }, { call, put }) {
      const response = yield call(cardSource, payload);
      if (response.state === 1) {
        yield put({
          type: "saveCardSourceList",
          payload: response.data
        });
      }
    },// 卡源
    * getSubPartner({ payload }, { call, put }) {
      const response = yield call(getAccountList);
      if (response.state === 1) {
        yield put({
          type: "saveSubPartner",
          payload: response.data.rows
        });
      }
    },// 当前登录账号下的代理商
    * getPlanList({ payload }, { call, put }) {
      const response = yield call(getPlanList, payload);
      if (response.state === 1) {
        yield put({
          type: "savePlanList",
          payload: response.data.rows
        });
      }
    },// 获取套餐组
    * getPartnerList({ payload }, { call, put }) {
      const response = yield call(getPartnerList, payload);
      if (response.state === 1) {
        yield put({
          type: "savePartnerList",
          payload: response.data.rows
        });
      }
    },//获取代理商分组
    * getIndustryList({ payload }, { call, put }) {
      const response = yield call(getIndustryList, payload);
      if (response.state === 1) {
        yield put({
          type: "saveIndustryList",
          payload: response.data.rows
        });
      } else {
        message.error(response.msg);
      }
    }// 行业组
  },
  reducers: {
    saveFirstPartner(state, action) {
      return {
        ...state,
        firstPartnerList: action.payload
      };
    },// 一级代理商
    getRechargePartner(state, action) {
      return {
        ...state,
        rechargeParList: action.payload
      };
    },// 具备复充套餐的代理商列表
    getAllPlanList(state, action) {
      return {
        ...state,
        allPanList: action.payload
      };
    },// 顶级代理商创建套餐列表
    saveSubPartner(state, action) {
      return {
        ...state,
        subPartnerList: action.payload
      };
    },// 当前登录账号下的代理商

 
    saveCardSourceList(state, action) {
      return {
        ...state,
        cardSource: action.payload
      };
    },// 卡源
    savePlanList(state, action) {
      return {
        ...state,
        planList: action.payload
      };
    },// 套餐组分组
    savePartnerList(state, action) {
      return {
        ...state,
        partnerList: action.payload
      };
    },// 代理商分组
    saveIndustryList(state, action) {
      return {
        ...state,
        industryList: action.payload
      };
    }// 行业组列表
  }
};

