import mockjs from "mockjs";

const titles = [
  "Alipay",
  "Angular",
  "Ant Design",
  "Ant Design Pro",
  "Bootstrap",
  "React",
  "Vue",
  "Webpack"
];
const avatars = [
  "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", // Alipay
  "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", // Angular
  "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", // Ant Design
  "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", // Ant Design Pro
  "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", // Bootstrap
  "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", // React
  "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", // Vue
  "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" // Webpack
];

const avatars2 = [
  "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
  "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
  "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
  "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
  "https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png",
  "https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png",
  "https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png"
];

const covers = [
  "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
  "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
  "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
  "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png"
];
const desc = [
  "那是一种内在的东西， 他们到达不了，也无法触及的",
  "希望是一个好东西，也许是最好的，好东西是不会消亡的",
  "生命就像一盒巧克力，结果往往出人意料",
  "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
  "那时候我只会想自己想要什么，从不想自己拥有什么"
];

const user = [
  "付小小",
  "曲丽丽",
  "林东东",
  "周星星",
  "吴加好",
  "朱偏右",
  "鱼酱",
  "乐哥",
  "谭小仪",
  "仲尼"
];

function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ["active", "exception", "normal"][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: "https://ant.design",
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
      members: [
        {
          avatar: "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
          name: "曲丽丽",
          id: "member1"
        },
        {
          avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
          name: "王昭君",
          id: "member2"
        },
        {
          avatar: "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
          name: "董娜娜",
          id: "member3"
        }
      ]
    });
  }

  return list;
}

let sourceData;

function getFakeList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req, res) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData;

  switch (method) {
    case "delete":
      result = result.filter(item => item.id !== id);
      break;
    case "update":
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = Object.assign(item, body);
        }
      });
      break;
    case "post":
      result.unshift({
        body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime()
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

const getNotice = [
  {
    id: "xxx1",
    title: titles[0],
    logo: avatars[0],
    description: "那是一种内在的东西，他们到达不了，也无法触及的",
    updatedAt: new Date(),
    member: "科学搬砖组",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx2",
    title: titles[1],
    logo: avatars[1],
    description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
    updatedAt: new Date("2017-07-24"),
    member: "全组都是吴彦祖",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx3",
    title: titles[2],
    logo: avatars[2],
    description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
    updatedAt: new Date(),
    member: "中二少女团",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx4",
    title: titles[3],
    logo: avatars[3],
    description: "那时候我只会想自己想要什么，从不想自己拥有什么",
    updatedAt: new Date("2017-07-23"),
    member: "程序员日常",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx5",
    title: titles[4],
    logo: avatars[4],
    description: "凛冬将至",
    updatedAt: new Date("2017-07-23"),
    member: "高逼格设计天团",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx6",
    title: titles[5],
    logo: avatars[5],
    description: "生命就像一盒巧克力，结果往往出人意料",
    updatedAt: new Date("2017-07-23"),
    member: "骗你来学计算机",
    href: "",
    memberLink: ""
  }
];

const getActivities = [
  {
    id: "trend-1",
    updatedAt: new Date(),
    user: {
      name: "曲丽丽",
      avatar: avatars2[0]
    },
    group: {
      name: "高逼格设计天团",
      link: "http://github.com/"
    },
    project: {
      name: "六月迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  },
  {
    id: "trend-2",
    updatedAt: new Date(),
    user: {
      name: "付小小",
      avatar: avatars2[1]
    },
    group: {
      name: "高逼格设计天团",
      link: "http://github.com/"
    },
    project: {
      name: "六月迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  },
  {
    id: "trend-3",
    updatedAt: new Date(),
    user: {
      name: "林东东",
      avatar: avatars2[2]
    },
    group: {
      name: "中二少女团",
      link: "http://github.com/"
    },
    project: {
      name: "六月迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  },
  {
    id: "trend-4",
    updatedAt: new Date(),
    user: {
      name: "周星星",
      avatar: avatars2[4]
    },
    project: {
      name: "5 月日常迭代",
      link: "http://github.com/"
    },
    template: "将 @{project} 更新至已发布状态"
  },
  {
    id: "trend-5",
    updatedAt: new Date(),
    user: {
      name: "朱偏右",
      avatar: avatars2[3]
    },
    project: {
      name: "工程效能",
      link: "http://github.com/"
    },
    comment: {
      name: "留言",
      link: "http://github.com/"
    },
    template: "在 @{project} 发布了 @{comment}"
  },
  {
    id: "trend-6",
    updatedAt: new Date(),
    user: {
      name: "乐哥",
      avatar: avatars2[5]
    },
    group: {
      name: "程序员日常",
      link: "http://github.com/"
    },
    project: {
      name: "品牌迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  }
];

function getFakeCaptcha(req, res) {
  return res.json("captcha-xxx");
}

export default {
  "GET /api/project/notice": getNotice,
  "GET /api/activities": getActivities,
  "POST /api/forms": (req, res) => {
    res.send({ message: "Ok" });
  },
  "GET /api/tags": mockjs.mock({
    "list|100": [{ name: "@city", "value|1-100": 150, "type|0-2": 1 }]
  }),
  "GET /api/fake_list": getFakeList,
  "POST /api/fake_list": postFakeList,
  "GET /api/captcha": getFakeCaptcha,


  // 角色操作
  "POST /api/deleteRole": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  }, // 移除角色
  "POST /api/editRole": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  }, // 编辑角色
  "POST /api/dispatchAuthorityToRole": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  }, // 分配权限给角色
  "GET /api/getCurRoleAuthority": {
    state: 1,
    data: ["/dashboard"]
  },

  // 流量池
  "GET /api/v1/flowpools/pools": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        partner_name: "测试",
        name: "测试流量池",
        operator: "联通",
        cards_total: 1000,
        active_total: 800,
        shutdown_total: 200,
        flow_total: 5000,
        used_flow_total: 452.3,
        type: 0,
        status: "启用",
        over_handle: 0,
        over_limit: 500
      }, {
        id: 2,
        partner_name: "测试",
        name: "测试流量池",
        operator: "联通",
        cards_total: 500,
        active_total: 480,
        shutdown_total: 20,
        flow_total: 400,
        used_flow_total: 24.6,
        type: 1,
        status: "停用",
        over_handle: 1,
        over_limit: 500
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 11
      }
    }
  },
  "GET /api/v1/getFlowInfo": {
    state: 1,
    data: {
      over_handle: 1,
      over_limit: 400
    }
  },
  "GET /api/v1/flow/detail/list": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        iccid: "89860111345673333",
        status: 1,
        name: "测试流量池"
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 11
      }
    }
  },
  "GET /api/v1/flow/plan/list": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        name: "测试套餐",
        type: 0
      }, {
        id: 1,
        name: "测试套餐1",
        type: 1
      }, {
        id: 1,
        name: "测试套餐1",
        type: 2
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 11
      }
    }
  },
  "POST /api/v1/add/bulk/iccid": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/delete/bulk/iccid": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/delete/oneCard": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/flowpools/edit_pool": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },

  // 加速包
  "GET /api/v1/plans/show_plan": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        rating_id: 34,
        name: "测试加速包"
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "GET /api/v1/plans/plan_gourp_to_partner": {
    state: 1,
    data: [{
      id: 1,
      name: "流量组"
    }, {
      id: 2,
      name: "手表组"
    }]
  },
  "GET /api/v1/plans/plan_to_partner": {
    state: 1,
    data: [{
      id: 1,
      name: "测试套餐11"
    }, {
      id: 2,
      name: "测试套餐22"
    }]
  },
  "POST /api/v1/plans/to_plan_add_accelerate": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/plans/delete_plan": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },

  // 立即复充套餐
  "GET /api/v1/baseSetting/RepeatRechargePrice": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        partner_name: "测试账号",
        rating_name: "测试套餐",
        rating_id: 1122,
        repeat_recharge_price: 23.33
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/baseSetting/addRepeatRechargePrice": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/baseSetting/delRepeatRechargePrice": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/baseSetting/editRepeatRechargePrice": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "GET /api/v1/plans/target_partner_plans": {
    state: 1,
    data: [{
      id: 1,
      name: "测试套餐",
      price: 11.22
    }]
  },
  "GET /api/v1/batch/pid_list": {
    state: 1,
    data: [{
      value: 1,
      name: "咪咪兔"
    }, {
      value: 2,
      name: "a1"
    }]
  },

  // 二维码设置
  "GET /api/v1/qrcode/retrieve": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        business_type: "watch",
        business_type_name: "手表",
        alipay_url: "https://baidu.com",
        wechat_url: "https://baidu.com",
        browser_url: "https://baidu.com",
        transfer_url: "https://baidu.com"
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/qrcode/create": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/qrcode/update": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },

  // 引流设置
  "GET /api/v1/baseSetting/requestNum": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        link: "https://baidu.com",
        new_link: "https://baidu.com",
        old_link: "https://baidu.com",
        request_degree: "10",
        total_degree: "1000",
        date: "2019-06-05"
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/baseSetting/addRequestNum": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/baseSetting/editRequestNum": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },

  // 卡源设置
  "GET /api/v1/baseSetting/sourceSetting": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        card_name: "联通-阿里-江苏常州1402",
        rate_discount_rate: "1.6",
        call_settlement_price: "0",
        sms_settlement_price: "0",
        operators: 2
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/baseSetting/addSource": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/baseSetting/editSource": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },

  // 卡套
  "GET /api/v1/card_img/card_img_list": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        name: "测试卡套",
        describe: "测试",
        imgs: [{
          id: 2,
          name: "xxx.png",
          status: "done",
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }, {
          uid: "2",
          name: "ceshi.png",
          status: "done",
          id: 69,
          group_id: 26,
          url: "http://pkimg.b0.upaiyun.com/upload/20140618/367d9bbf07ba196c44c3a3a618326914.jpeg",
          thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          is_deleted: 0
        }, {
          id: 67,
          group_id: 25,
          url: "http://www.51modo.cc/upload/kindeditor/image/20160325/20160325171740_12408.jpg",
          thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          status: "done",
          is_deleted: 0
        }]
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/card_img/add_card_img": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/card_img/edit_card_img": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/card_img/delete_card_img": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },

  // 成本
  "GET /api/v1/cost/list": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        card_name: "联通-阿里-江苏常州1402",
        date: "2019-06",
        flow_cost: 200,
        call_cost: 400,
        sms_cost: 500,
        total_cost: 1100
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/edit/cost": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },

  // 行业组相关
  "GET /api/v1/industry/list": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        name: "mifi线上",
        num: 20
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/new/industry": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/edit/industry": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/delete/industry": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "GET /api/v1/industry/member/list": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        nickname: "a1"
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "POST /api/v1/industry/add/member": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "POST /api/v1/industry/remove/member": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  // 成本统计相关
  "GET /api/v1/account/statement/list": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        industry: "手表行业",
        partners: "手表线上",
        source: "阿里联通",
        date: "2019年5月",
        preRevenue: 5000,
        realRevenue: 50000,
        cost: 40000,
        benefit: 4000
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "GET /api/v1/account/statement/chart": {
    state: 1,
    data: {
      "2019-06-23": {
        preRevenue: 200,
        realRevenue: 400,
        benefit: 400
      },
      "2019-06-24": {
        preRevenue: 400,
        realRevenue: 800,
        benefit: 500
      },
      "2019-06-25": {
        preRevenue: 800,
        realRevenue: 1200,
        benefit: 600
      }
    }
  },
  // 预收转实收
  "GET /api/getIncomeList":{
    state:1,
    data:{
      rows:[{
        id:1,
        source:"test",
      }]
    }
  },
  "GET /api/getIncomeChart":{
    state:1,
    data: {
      "2019-06-23": {
        preRevenue: 200,
        realRevenue: 400,
        benefit: 400
      },
      "2019-06-24": {
        preRevenue: 400,
        realRevenue: 800,
        benefit: 500
      },
      "2019-06-25": {
        preRevenue: 800,
        realRevenue: 1200,
        benefit: 600
      }
    }
  },
  // 卡录入
  "GET /api/v1/getCardImportedDetail": {
    state: 1,
    data: {
      rows: [{
        id: 1,
        iccid: 8986123456789012345,
        status: "激活"
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "GET /api/v1/card_manage/schedule_handle": {
    state: 1,
    data: {
      rows: [{
        id: "1",
        source_name: "测试",
        card_total: "200",
        card_inventory: "200",
        expired_date: "2019-04-01",
        remind_day: "13",
        status: "已处理"
      }, {
        id: "2",
        source_name: "测试1",
        card_total: "200",
        card_inventory: "200",
        expired_date: "2019-05-01",
        remind_day: "15",
        status: "未处理"
      }]
    }
  },
  "GET /api/v1/getAllCardExpiredList": {
    state: 1,
    data: {
      rows: [{
        id: "1",
        source_name: "测试",
        card_total: "200",
        expired_date: "2019-04-01",
        remind_day: "13",
        status: "已处理"
      }],
      pagination: {
        current: 1,
        page_size: 10,
        total: 10
      }
    }
  },
  "GET /api/v1/getAllCardExpiredChart": {
    state: 1,
    data: {
      "2019-06-06": [
        {
          "source": 339,
          "source_name": "a1",
          "cards_total": "1.0"
        },
        {
          "source": 345,
          "source_name": "测试",
          "cards_total": "1.0"
        },
        {
          "source": 651,
          "source_name": "a2",
          "cards_total": "0.1646"
        },
        {
          "source": 895,
          "source_name": "a3",
          "cards_total": "0.3333"
        }
      ],
      "2019-06-07": [
        {
          "source": 339,
          "source_name": "a1",
          "cards_total": "0.0"
        },
        {
          "source": 536,
          "source_name": "a4",
          "cards_total": "0.0"
        },
        {
          "source": 651,
          "source_name": "a2",
          "cards_total": "0.1837"
        },
        {
          "source": 895,
          "source_name": "a3",
          "cards_total": "0.0"
        }
      ]
    }
  },
  "POST /api/v1/card_manage/load_cards": (req, res) => {
    res.send({
      state: 1,
      msg: "ok"
    });
  },
  "GET /api/test/bar": {
    state: 1,
    data: {
      cards_total: 200,
      success_total: 100,
      fail_total: 100,
      loaded_time: "2019-06-17 16:24:53"
    }
  }
};