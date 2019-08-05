import React, { Component } from "react";
import { connect } from "dva";
import { Row, Col, Tree, Card, Form, Input, Radio, Button, message, Modal } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import style from "./css/node-setting.less";

message.config({
  maxCount: 1
});

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const confirm = Modal.confirm;

@connect(({ menu, authority, loading }) => ({
  authority,
  menuData: menu.menuData
}))


class node_setting extends Component {
  state = {
    isAdd: false, // true:新增节点 false 删除节点
    initialSelectKeys: [],

    curSelectNodeID: "",
    curSelectNodeName: "",
    curSelectKey: [],
    curSelectMenuData: null,

    currentNodeIndex: "",
    currentNodeChildrenLength: 0, // 主节点下的子节点菜单数量
    nodeList: [],
    node_radio_data: {
      menu: 1,
      role: 1,
      status: 1
    },
    newMenuList: []
  };

  componentDidMount() {

  }

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name)
      .map(item => this.getSubMenuOrItem(item, parent))
      .filter(item => item);
  };
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && item.children.some(child => child.name)) {
      return (
        <TreeNode
          title={item.name}
          key={item.menu_id}>
          {this.getNavMenuItems(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.menu_id} isLeaf/>;
  };

  // 扁平化菜单数据
  getItem = (data) => {
    data.map(item => {
      if (!item.children) {
        this.state.newMenuList.push(item);
      } else {
        this.state.newMenuList.push(item);
        this.getItem(item.children);
      }
    });
  };

  // 编辑节点事件
  editNode() {
    const { dispatch, routes, form } = this.props;
    const { curSelectMenuData } = this.state;

    if (!curSelectMenuData) {
      message.error("请选择需要修改的节点");
      return;
    }
    if (curSelectMenuData.is_top && !curSelectMenuData.icon) {
      message.error("主节点必须设置图标");
      return;
    }

    form.validateFields((err, values) => {
      if (!err) {
        if (values.node_role === 2 && values.node_icon) {
          message.error("子节点不允许设置图标");
          return;
        }
        dispatch({
          type: "authority/editMenuNode",
          payload: {
            name: values.node_name,
            url: values.node_url,
            position: parseInt(values.node_sort),
            is_top: values.node_role === 1 ? 1 : 0,
            icon: values.node_icon,
            menu_id: curSelectMenuData.menu_id
          },
          callback: (res) => {
            if (res.state === 1) {
              message.success("编辑节点成功");
              dispatch({
                type: "menu/getMenuData",
                payload: { routes }
              });
            } else {
              message.error(res.msg);
            }
          }
        });
      }
    });
  };


  /*dom结构渲染*/
  render() {
    const { nodeList, currentNodeIndex, curSelectKey, curSelectMenuData } = this.state;
    const { authority, menuData } = this.props;

    // 表单
    const { getFieldDecorator } = this.props.form;

    // FormLayout
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    // 新增节点
    const newNode = () => {
      const { setFieldsValue } = this.props.form;
      setFieldsValue({
        "node_name": "",
        "node_url": "",
        "node_sort": "",
        "node_icon": "",
        "is_menu": this.state.node_radio_data.menu,
        "node_role": this.state.node_radio_data.role,
        "node_state": this.state.node_radio_data.status
      });
      this.setState({
        isAdd: true,
        curSelectNodeID: "",
        curSelectNodeName: ""
      });
    };

    // 删除节点
    const deleteNode = () => {
      const { dispatch, routes, form } = this.props;
      const { curSelectNodeID, curSelectNodeName } = this.state;
      if (!curSelectNodeID) {
        message.error("请选择需要删除的节点");
      } else {
        Modal.confirm({
          title: "删除节点",
          content: `是否删除 '${curSelectNodeName}' 菜单`,
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            dispatch({
              type: "authority/deleteMenuNode",
              payload: {
                menu_id: curSelectNodeID
              },
              callback: (res) => {
                return new Promise((resolve, reject) => {
                  if (res.state === 1) {
                    message.success("删除节点成功");
                    form.resetFields();
                    dispatch({
                      type: "menu/getMenuData",
                      payload: { routes }
                    });
                    resolve;
                  } else {
                    message.error(res.msg);
                    reject;
                  }
                });

              }
            });
          }
        });
      }
    };

    // 选择节点
    const onSelect = (selectedKeys) => {
      this.setState({
        newMenuList: []
      });

      this.getItem(menuData);

      let choose_menu_data = {};
      this.state.newMenuList
        .map(item => {
          if (selectedKeys[0] == item.menu_id) {
            choose_menu_data = item;
          }
        });

      // 获取当前子节点的长度
      if (choose_menu_data.is_top === 0) {
        let secondSlantingBarPosition = choose_menu_data.path.indexOf("/", choose_menu_data.path.indexOf("/") + 1);
        let parentPath = choose_menu_data.path.substr(0, secondSlantingBarPosition);
        let mainChildrenLength = 0;

        for (let i = 0; i < menuData.length; i++) {
          if (menuData[i].path === parentPath) {
            mainChildrenLength = menuData[i].children.length;
            break;
          }
        }
        this.setState({
          currentNodeChildrenLength: mainChildrenLength
        });
      } else {
        this.setState({
          currentNodeChildrenLength: choose_menu_data.children.length
        });
      }


      this.props.form.setFieldsValue({
        node_url: choose_menu_data.path,
        node_name: choose_menu_data.name,
        node_icon: choose_menu_data.icon ? choose_menu_data.icon : "",
        node_role: choose_menu_data.is_top === 1 ? 1 : 2,
        node_sort: choose_menu_data.position
      });

      this.setState({
        curSelectNodeID: choose_menu_data.menu_id,
        curSelectNodeName: choose_menu_data.name,
        isAdd: false,
        curSelectKey: selectedKeys,
        curSelectMenuData: choose_menu_data,
        initialSelectKeys: selectedKeys
      });
    };

    // 提交表单
    const handleSubmit = e => {
      const { isAdd, curSelectMenuData, currentNodeChildrenLength } = this.state;
      const { dispatch, routes, form } = this.props;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (parseInt(values.node_sort) > currentNodeChildrenLength.length - 1) {
            message.error("请勿设置非连续性节点顺序");
            return;
          }
          if (parseInt(values.node_role) === 1 && !values.node_icon) {
            message.error("主节点必须设置图标");
            return;
          }
          if (isAdd) {
            let parent_menu_id = curSelectMenuData ? (curSelectMenuData.is_top === 1 ? curSelectMenuData.menu_id : "") : "",
              params = {
                name: values.node_name,
                url: values.node_url,
                position: parseInt(values.node_sort),
                is_top: values.node_role === 1 ? 1 : 0,
                icon: values.node_icon

              };
            if (parent_menu_id) params.parent_menu_id = parent_menu_id;

            if (curSelectMenuData && curSelectMenuData.is_top !== 1 && values.node_role === 2) {
              message.error("请选择主节点后，新增子节点");
              return;
            }

            if (values.node_role === 2 && values.node_icon) {
              message.error("子节点不允许设置图标");
              return;
            }

            dispatch({
              type: "authority/createMenuNode",
              payload: params,
              callback: (res) => {
                if (res.state === 1) {
                  message.success("新增节点成功");
                  form.resetFields();
                  dispatch({
                    type: "menu/getMenuData",
                    payload: { routes }
                  });
                } else {
                  message.error(res.msg);
                }
              }
            });
          } else {
            this.editNode();
          }
        }
      });
    };

    return (
      <PageHeaderWrapper title="节点设置">
        <Card bordered={false} className={style["node-setting"]}>
          <Row gutter={24}>

            <Col span={8}>
              <div className={style["tree-node-wrap"]}>
                <p className={style.title}>节点列表</p>
                <div className={style["operation-wrap"]}>
                  <span onClick={newNode}>新增节点</span>
                  <span onClick={deleteNode}>删除节点</span>
                </div>
              </div>

              <DirectoryTree
                defaultSelectedKeys={[]}
                onSelect={onSelect}
                selectedKeys={this.state.initialSelectKeys}
                switcherIcon=''
              >
                {this.getNavMenuItems(menuData)}
              </DirectoryTree>
            </Col>

            <Col span={16}>
              <Form onSubmit={handleSubmit}>
                <Form.Item {...formItemLayout} label="节点名称">
                  {getFieldDecorator("node_name", {
                    rules: [{
                      required: true,
                      message: "请输入节点名称"
                    }, {
                      min: 2,
                      max: 10,
                      message: "字符长度为2-10"
                    }]
                  })(
                    <Input placeholder="请填写节点名称"/>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="节点地址">
                  {getFieldDecorator("node_url", {
                    rules: [{
                      required: true,
                      message: "请输入节点地址"
                    }]
                  })(
                    <Input placeholder="请输入节点地址"/>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="节点排序">
                  {getFieldDecorator("node_sort", {
                    rules: [{
                      required: true,
                      message: "请输入节点排序"
                    }, {
                      pattern: /^[+]{0,1}(\d+)$/,
                      message: "节点排序为大于等于0的正整数"
                    }]
                  })(
                    <Input placeholder="请输入节点排序,节点顺序从0开始"/>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="节点图标">
                  {getFieldDecorator("node_icon", {
                    rules: [{
                      // required: true,
                      message: "请输入图标名"
                    }]
                  })(
                    <Input placeholder="请输入图标名"/>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="菜单">
                  {getFieldDecorator("is_menu", {
                    initialValue: this.state.node_radio_data.menu
                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="层级">
                  {getFieldDecorator("node_role", {
                    initialValue: this.state.node_radio_data.role
                  })(
                    <Radio.Group>
                      <Radio value={1}>主节点</Radio>
                      <Radio value={2}>子节点</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="状态">
                  {getFieldDecorator("node_state", {
                    initialValue: this.state.node_radio_data.status
                  })(
                    <Radio.Group>
                      <Radio value={1}>开启</Radio>
                      <Radio value={2}>关闭</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <div className={style.btnSubmit}>
                  <Button id="btnAddNode" type="primary" htmlType="submit">提交</Button>
                </div>

              </Form>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );

  }
}

node_setting = Form.create({})(node_setting);
export default node_setting;