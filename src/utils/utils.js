import moment from "moment";
import React from "react";
import nzh from "nzh/cn";
import md5 from "js-md5";
import sha1 from "js-sha1";

import { parse, stringify } from "qs";

export function twoDecimal(val) {
  let value = val.toString();
  if (value.indexOf(".") > 0) {
    let decimal = value.substr(value.indexOf(".") + 1, value.length),
      number = value.substr(0, value.indexOf("."));
    if (decimal.length === 1) {
      return value + "0";
    } else if (decimal.length === 2) {
      return value;
    } else if (decimal.length >= 3) {
      var new_value = parseFloat(value).toFixed(3);
      return new_value.substr(0, new_value.length - 1);
    }
  } else {
    return value + ".00";
  }
}

export function flowUNitToG(val) {
  if (val) {
    return twoDecimal(val / 1024);
  } else {
    return 0.00;
  }
}

function objKeySort(obj) {
  let newkey = Object.keys(obj).sort();
  let newObj = {};
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
}//排序参数

export function arrayIntersection(a, b) {
  let ai = 0, bi = 0;
  let result = new Array();
  while (ai < a.length && bi < b.length) {
    if (a[ai] < b[bi]) {
      ai++;
    } else if (a[ai] > b[bi]) {
      bi++;
    } else /* they're equal */
    {
      result.push(a[ai]);
      ai++;
      bi++;
    }
  }
  return result;
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === "today") {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === "week") {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === "month") {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, "months");
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = "") {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ""}`.replace(/\/+/g, "/");
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn("Two path are equal!"); // eslint-disable-line
  }
  const arr1 = str1.split("/");
  const arr2 = str2.split("/");
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ""));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split("?")[1]);
}

export function getQueryPath(path = "", query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return "";

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: "relative",
            top: -2,
            fontSize: 14,
            fontStyle: "normal",
            marginLeft: 2
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === "preview.pro.ant.design";
}

export const importCDN = (url, name) =>
  new Promise(resolve => {
    const dom = document.createElement("script");
    dom.src = url;
    dom.type = "text/javascript";
    dom.onload = () => {
      resolve(window[name]);
    };
    document.head.appendChild(dom);
  });

export function token(params) {
  (Object.prototype.toString.call(params) === "[object Object]") ? params : params = {};
  let paramsBak = {};
  for (var i in params) {
    if (Object.prototype.toString.call(params[i]) !== "[object Undefined]" &&
      Object.prototype.toString.call(params[i]) !== "[object Null]" &&
      Object.prototype.toString.call(params[i]) !== "[object Array]" &&
      Object.prototype.toString.call(params[i]) !== "[object String]"
    ) {
      paramsBak[i] = params[i];
    } else if (Object.prototype.toString.call(params[i]) === "[object String]") {
      paramsBak[i] = params[i].replace(/\s*/g, "");
    } else if (Object.prototype.toString.call(params[i]) === "[object Array]") {
      paramsBak[i] = JSON.stringify(params[i]);
    }
  }
  paramsBak.salt = "qhyl@#6688";

  let sortParams = objKeySort(paramsBak);
  let str = "";
  for (let i in sortParams) {
    str += `${i}=${sortParams[i]}&`;
  }
  str = str.substr(0, str.length - 1);

  str = sha1(str);
  str = md5(str);

  return str;
}

// 获取当前路径
export function GetUrlRelativePath() {
  let url = document.location.toString(),
    arrUrl = url.split("//"),
    start = arrUrl[1].indexOf("/"),
    relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") !== -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

// getBase64
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 获取日期
export function getDate(type, isLast, lastDay) {
  let date;
  if (lastDay) {
    date = new Date((new Date).getTime() - 24 * 60 * 60 * 1000);
  } else {
    date = new Date();
  }
  let curMonth = date.getMonth() + 1,
    curDate = date.getDate(),
    curYear = date.getFullYear();
  if (curMonth < 10) {
    curMonth = isLast ? curMonth - 1 : curMonth;
    curMonth = "0" + curMonth;
  }
  if (curDate < 10) {
    curDate = isLast ? curDate - 1 : curDate;
    curDate = "0" + curDate;
  }
  if (type === "date") {
    return `${curYear}-${curMonth}-${curDate}`;
  } else if (type === "month") {
    return `${curYear}-${curMonth}`;
  }
}

// 处理进度类数据
/*
* total 总数
* used 分数
* */
export function progressData(used, total) {
  let filterDecimal = /\d+(\.\d{1,2})?/g;
  let strNum = (used / total) * 100;
  let newNumArr = filterDecimal.exec(strNum);
  let newNum = 0;
  if (newNumArr) {
    newNum = parseFloat(newNumArr[0]);
  }
  return newNum;
}

// 小数点保留
export function Decimal(num, digit) {
  if (!digit) {
    throw new Error("Expected a number");
  }
  let newDigit = digit >= 1 ? digit : 2;
  let regStr = "\\d+(\\.\\d{1," + newDigit + "})?";
  let regDecimal = new RegExp(regStr, "g");
  if (num) {
    return num.toFixed(digit);
  } else {
    return 0;
  }
}

// 处理统计类数据
/*
* rowData 原始数据
* dataKey rowData中的键值
* echartType 柱状图/条形图
* */
export function handleChartData(rowData, dataKey, echartType) {
  let series = [];//echart数据格式;
  let legend = [];//echart头部数据信息
  let arr_date = [];//日期合集
  let arr_len = [];//每个日期中包含的套餐的长度--循环终止判断条件
  let all_name_arr = [];
  let cur_seris = {};

  // 方法
  const filterName = (str) => {
    return str.substring(0, str.indexOf("_"));
  };
  const pushSameData = (arr_mix_obj, unqiue_name_arr) => {
    let result = [];
    for (let i = 0; i < unqiue_name_arr.length; i++) {
      let num = unqiue_name_arr[i];
      let isExist = false;
      for (let j = 0; j < arr_mix_obj.length; j++) {
        var aj = arr_mix_obj[j];
        let n = aj[dataKey.name] + "_" + parseInt(aj[dataKey.id]);
        if (n == num) {
          isExist = true;
          break;
        }
      }
      if (isExist) {
        result.push({ "name": num, "total": (aj[dataKey.total]).toString() });
      }
    }
    return result;
  };// 同一个name下的数据
  const getTotalData = (arr_mix_obj, unqiue_name_arr, cur_seris) => {
    for (let i = 0; i < unqiue_name_arr.length; i++) {
      let num = unqiue_name_arr[i];
      let isExist = false;
      for (let j = 0; j < arr_mix_obj.length; j++) {
        var aj = arr_mix_obj[j];
        let n = aj.name;
        if (n === num) {
          isExist = true;
          break;
        }
      }
      if (isExist) {
        cur_seris[unqiue_name_arr[i]].push(aj.total);
      } else {
        cur_seris[unqiue_name_arr[i]].push("0.00");
      }
    }
  };// 获取echart格式需要的最终格式数据
  const filterData = (unique_name_arr, all_data, arr_date, count, count_num, cur_seris, arr_len) => {
    // count 递归计数
    // count_num 循环终止条件
    // arr_date 横轴坐标
    // arr_len 当前日期下的真实数据
    if (count >= arr_date.length) {
      return;
    } else {
      let theSameDateRecharge = pushSameData(all_data[arr_date[count]], unique_name_arr);
      getTotalData(theSameDateRecharge, unique_name_arr, cur_seris);
      //递归循环
      for (let j in cur_seris) {
        if (cur_seris[j][count] !== "0.00") {
          if (cur_seris[j][count] >= 0) {//0 需要设置为变量，为count /非补位数据的位数在当前循环的个数
            count_num++;
          }
        }
      }
      if (count > 0) {
        count_num = count_num - arr_len[count - 1];
      }
      if (count_num === arr_len[count]) {
        count++;
        filterData(unique_name_arr, all_data, arr_date, count, count_num, cur_seris, arr_len);
      }
    }
  };// 递归处理echart数据

  for (let i in rowData) {
    arr_date.push(i);// 横轴数据
    rowData[i].map(item => {
      let name = `${item[dataKey.name]}_${item[dataKey.id]}`;
      all_name_arr.push(name);
      if (!cur_seris[name]) {
        cur_seris[name] = [];
      }
    });

    arr_len.push(rowData[i].length);
  }
  let unique_name_arr = all_name_arr.filter((item, index, self) => {
    return self.indexOf(item) === index;
  });
  legend = unique_name_arr.map(item=>{
    return filterName(item);
  });

  let pushDataCount = 0;
  let count_num = 0;//记录push的data数据与当前日期数据的长度是否相符

  filterData(unique_name_arr, rowData, arr_date, pushDataCount, count_num, cur_seris, arr_len);

  for (let i in cur_seris) {
    let serie = {};
    serie.name = filterName(i);
    serie.type = echartType;
    serie.data = cur_seris[i];
    series.push(serie);
  }

  return {
    legend: legend,
    xData: arr_date,
    series: series
  };
}

// echart 图标 toolti排序 sort函数参数
/*
* rev true为升序排列，false降序排序
* */
export function compare(attr, rev) {
  if (Object.prototype.toString.call(rev) === "[object Undefined]") {
    rev = 1;
  } else {
    rev = (rev) ? 1 : -1;
  }
  return function(a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  };
}