import { routerRedux } from "dva/router";
import { stringify } from "qs";
import { iotLogin, iotLogout, getUniqueToken, getLoginCode } from "@/services/api";
import { setAuthority } from "@/utils/authority";
// import { getPageQuery } from '@/utils/utils';
// import { reloadAuthorized } from "@/utils/Authorized";

export default {
  namespace: "login",

  state: {
    status: undefined,
    token: "",
    loginCode: ""
  },

  effects: {
    * userToken({ payload, callback }, { call, put }) {
      const response = yield call(getUniqueToken);
      if (response.state === 1) {
        yield put({
          type: "saveToken",
          payload: response.data
        });
      }
      callback(response);
    },
    * getLoginCode({ payload }, { call, put }) {
      const response = yield call(getLoginCode, payload);
      yield put({
        type: "saveLoginCode",
        payload: response.data || null
      });
    },
    * login({ payload, callback }, { call, put }) {
      const { resolve } = payload;
      const response = yield call(iotLogin, payload.params);
      if (response.state !== 1) {
        resolve(response);
      }
      if (response.state === 1) {
        yield put({
          type: "loginSuccess",
          payload: response
        });
        yield put(routerRedux.replace("/landing"));
      }
    },
    * logout(_, { call, put }) {
      const response = yield call(iotLogout);
      if (response.state === 1) {
        localStorage.clear();
        yield put(
          routerRedux.push({
            pathname: "/user/login",
            search: stringify({
              redirect: window.location.href
            })
          })
        );
      }
    }
  },

  reducers: {
    loginSuccess(state, { payload }) {
      localStorage.setItem("token", state.token);
      return {
        ...state
      };
    },
    changeLoginStatus(state, { payload }) {
      // setAuthority("admin");
      // setAuthority(payload.currentAuthority);
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        status: payload.status,
        type: payload.type
      };
    },
    saveLoginCode(state, { payload }) {
      return {
        ...state,
        loginCode: payload
      };
    },
    saveToken(state, { payload }) {
      return {
        ...state,
        token: payload
      };
    }
  }
};
