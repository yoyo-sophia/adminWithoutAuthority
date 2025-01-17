import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";
import router from "umi/router";
import Authorized from "@/utils/Authorized";
import { menu } from "../defaultSettings";
import { getMockMenu, getMenu } from "@/services/api";
import { GetUrlRelativePath } from "../utils/utils";

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = "menu";
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name : item.name;
      // : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children) // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
  namespace: "menu",

  state: {
    menuData: [],
    breadcrumbNameMap: {}
  },

  effects: {
    * getMenuData({ payload }, { put }) {
      const { routes, authority, path } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority, path);
      const menuData = filterMenuData(originalMenuData);
      let curPath = GetUrlRelativePath();
      let firstMenuHasChild = menuData[0].children.length ? true : false ;
      if (curPath === "/landing") {
        firstMenuHasChild ? router.push(menuData[0].children[0].path) : router.push("/exception/403");
      }
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
      yield put({
        type: "save",
        payload: { menuData, breadcrumbNameMap, routerData: routes }
      });
    }
    // *getMenuData({ payload }, {call, put }) {
    //   const { routes, authority } = payload;
    //   const response = yield call(getMenu, payload);
    //   if(response.state === 1){
    //     const menuData = filterMenuData(memoizeOneFormatter(response.data, authority));
    //     const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
    //     // 重定向当前角色首个路径
    //     if(response.data.length){
    //       let curPath = GetUrlRelativePath();
    //       let firstMenuHasChild = menuData[0].children.length ? true : false ;
    //       if(curPath === '/landing'){
    //         firstMenuHasChild ? router.push(menuData[0].children[0].path) : router.push('/exception/403')
    //       }
    //     }
    //     // else{
    //     //   router.push('/exception/404');
    //     // }
    //     yield put({
    //       type: 'save',
    //       payload: { menuData, breadcrumbNameMap },
    //     });
    //   }
    // },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};
