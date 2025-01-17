import React, { Component, Fragment } from "react";
import { connect } from "dva";
import { Row, Col, Tree, Card, Form, Input, Button, Divider, Checkbox, Modal, message } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import StandardTable from "@/components/StandardTable";
import router from "umi/router";
import style from "./css/node-setting.less";

message.config({
  maxCount: 1
});


const FormItem = Form.Item;

// 分配角色权限
const DispatchRoleModal = Form.create()((props) => {
  const {
    form,
    modalVisible, // 控制弹窗显隐
    handleAdd, // 分配角色确实时间
    handleModalVisible, // 关闭弹窗事件
    roleLists, // 当前账号下所有角色数据
    roleInitialLists, // 当前账号下初始存在的角色数据
    dispatchModalLoading // 提交按钮loading
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldValue) => {
      if (err) return;
      handleAdd(fieldValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="分配角色"
      confirmLoading={dispatchModalLoading}
      maskClosable={false}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem>
        {
          form.getFieldDecorator("roleListItem", {
            initialValue: roleInitialLists
          })(
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                {
                  roleLists.map((item, index) => {
                    return (
                      <Col key={index} span={8}>
                        <Checkbox value={item.id}>{item.name}</Checkbox>
                      </Col>
                    );
                  })
                }
              </Row>
            </Checkbox.Group>
          )
        }
      </FormItem>
    </Modal>
  );
});
// 创建账号
const CreateTopPartner = Form.create()((props) => {
  const {
    form,
    modalVisible,
    handleModalVisible,
    submitCreateAccount,//提交数据
    createAccountData,// 初始数据
    createModalLoading // 提交按钮loading
  } = props;

  const submit = () => {
    form.validateFields((err, fieldValue) => {
      if (err) return;
      submitCreateAccount(fieldValue);
    });
  };

  return (
    <Modal
      title="创建账号"
      destroyOnClose
      maskClosable={false}
      visible={modalVisible}
      onOk={submit}
      confirmLoading={createModalLoading}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="账号名称">
        {form.getFieldDecorator("nickname", {
          initialValue: createAccountData.nickname,
          rules: [{
            required: true,
            message: "请输入代理商名称"
          }, {
            pattern: /^[A-Za-z0-9-_\u4e00-\u9fa5]{2,15}$/,
            message: "命名规则为中/英文开头可含数字，特殊符号只能包含_-，长度为2-15位"
          }]
        })(<Input placeholder="请输入代理商名称"/>)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="账号密码">
        {form.getFieldDecorator("password", {
          initialValue: createAccountData.password,
          rules: [{ required: true, message: "请输入密码" }, {
            min: 6, message: "密码长度6-18位"
          }, { max: 18, message: "密码长度6-18位" }]
        })(<Input type="password" placeholder="请输入密码"/>)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="手机号码">
        {form.getFieldDecorator("mobile", {
          initialValue: createAccountData.mobile,
          rules: [{ required: true, message: "请输入手机号码" }, {
            pattern: /^1[345678]{1}[0-9]{9}$/, message: "请输入有效的手机号码"
          }]
        })(<Input placeholder="请输入手机号码"/>)}
      </FormItem>

    </Modal>
  );


});

@Form.create()

@connect(({ authority, user, loading }) => ({
  user,
  authority,
  tableLoading: loading.effects["authority/fetch_account_list"]//table loading
}))

class account_setting extends Component {
  state = {
    search: "",
    selectedRows: [],
    // 分配角色相数据
    rowInfo: {},
    roleLists: [], // 角色数据列表
    roleInitialLists: [], // 当前账号已有角色数据
    modalVisible: false, // 分配角色弹窗控制参数
    dispatchModalLoading: false, // 分配角色确定loading
    // 创建账号相关参数
    createModalVisible: false, // 创建账号弹窗控制参数
    createModalLoading: false, // 创建账号提交loading
    createAccountData: {
      nickname: "",
      password: "",
      mobile: ""
    },
    // 表格相关数据
    formValues: {}, // table其他参数
    initialPagination: {
      current: 1,
      pageSize: 10
    }
  };

  columns = [{
    title: "序号",
    dataIndex: "id"
  }, {
    title: "账号名称",
    dataIndex: "nickname"
  }, {
    title: "角色",
    dataIndex: "authority_list",
    render: (text, record) => {
      if (!record.authority_list.length) {
        return "-";
      } else {
        let roleStr = "";
        record.authority_list.map(item => {
          roleStr += `${item.authority_name},`;
        });
        return roleStr;
      }
    }
  }, {
    title: "手机号码",
    dataIndex: "mobile"
  }, {
    title: "账号状态",
    dataIndex: "status",
    render: (text, record) => (
      <Button onClick={() => this.changeAccountStatus(record)}
              type={record.status === 0 ? "primary" : ""}>{record.status === 0 ? "关闭" : "开启"}</Button>
    )
  }, {
    title: "操作",
    render: (text, record) => (
      <Fragment>
        <a onClick={() => this.handleRoles(true, record)}>分配角色</a>
        <Divider type="vertical"/>
        <a onClick={() => this.checkUserRole(record)}>查看账号权限</a>
      </Fragment>
    )
  }];

  componentDidMount() {
    const { dispatch } = this.props;
    const { initialPagination } = this.state;
    dispatch({
      type: "authority/fetch_account_list",
      payload: {
        limit: initialPagination.pageSize,
        offset: initialPagination.current
      }
    });
  };

  // 刷新表格
  refreshTable = (isFirstPage, params) => {
    const { dispatch, authority } = this.props;
    let pageSize = authority.accountData.data.pagination.pageSize,
      // let pageSize = authority.accountData.data.pagination.page_size ? authority.accountData.data.pagination.page_size : initialPagination.pageSize,
      current = isFirstPage ? 1 : authority.accountData.data.pagination.current;
    dispatch({
      type: "authority/fetch_account_list",
      payload: {
        ...params,
        limit: pageSize,
        offset: current
      }
    });
  };

  /*
  * 列表操作相关
  * */

  // 分配角色权限
  handleRoles = (flag, rowInfo) => {
    const { dispatch, authority } = this.props;
    const { roleLists } = this.state;
    // 清楚默认数据
    this.setState({
      roleInitialLists: []
    });

    if (rowInfo) {
      //获取角色列表及当前账号已有角色数据

      // 处理当前账号已有的角色数据
      let curAccountRoleList = [];
      if (rowInfo.authority_list.length) {
        rowInfo.authority_list.map(item => {
          curAccountRoleList.push(item.authority_id);
        });

        this.setState({
          roleInitialLists: curAccountRoleList,
          rowInfo: rowInfo
        });
      } else {
        this.setState({
          rowInfo: rowInfo
        });
      }

      if (!roleLists.length) {
        new Promise(resolve => {
          dispatch({
            type: "authority/fetch_role_list",
            payload: {
              resolve
            }
          });
        }).then((res) => {
          if (res.state === 1) {
            if (!res.data.rows.length) {
              message.error("暂无角色数据");
              return;
            } else {
              this.setState({
                roleLists: res.data.rows,
                modalVisible: !!flag
              });
            }
          } else {
            message.error(res.msg);
          }
        });// 请求所有角色数据
      } else {
        this.setState({
          modalVisible: !!flag
        });
      }
    } else {
      this.setState({
        modalVisible: !!flag
      });
    }
  };

  // 查看用户详细功能
  checkUserRole = (rowInfo) => {
    if (!rowInfo.authority_list.length) {
      message.error("此账号下无任何权限");
      return;
    }
    if (rowInfo.status === 1) {
      message.error("此账号已关闭，无法查看权限详情");
      return;
    }
    localStorage.setItem("accountAuthorityDetail", JSON.stringify({
      id: rowInfo.id,
      nickname: rowInfo.nickname
    }));
    router.push("/authority/account_detail");
  };

  // 控制分配角色弹窗显示隐藏
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
      dispatchModalLoading: false
    });
  };

  // 启用或关闭账号
  changeAccountStatus = (rowInfo) => {
    const { dispatch } = this.props;
    let _this = this;
    new Promise(resolve => {
      dispatch({
        type: "authority/change_account_status",
        payload: {
          params: {
            partner_id: rowInfo.id,
            status: rowInfo.status === 1 ? 0 : 1
          },
          resolve
        }
      });
    }).then(res => {
      if (res.state === 1) {
        message.success("修改账号状态成功");
        // 刷新操作
        _this.refreshTable();
      } else {
        message.error(res.msg);
      }
    });
  };

  // 分配角色给账号
  dispatchRoleToAccount = (params) => {
    const { dispatch } = this.props;
    const { rowInfo } = this.state;
    let _this = this;

    this.setState({
      dispatchModalLoading: true
    });

    new Promise(resolve => {
      dispatch({
        type: "authority/dispatch_role_to_account",
        payload: {
          params: {
            partner_id: rowInfo.id,
            authority_id_list: params.roleListItem
          },
          resolve
        }
      });
    }).then(res => {
      this.setState({
        dispatchModalLoading: false
      });
      if (res.state === 1) {
        message.success("分配角色成功");
        this.handleModalVisible();
        // 刷新列表
        _this.refreshTable();
      } else {
        message.error(res.msg);
      }
    });
  };

  /*
  * 创建账号相关操作
  * */

  // 控制创建账号弹窗
  createAccountHandleModal = (flag) => {
    this.setState({
      createModalVisible: !!flag,
      createAccountData: {
        nickname: "",
        password: "",
        mobile: ""
      }
    });
  };

  // 创建顶级代理商确定事件
  submitCreateAccount = (fieldValue) => {
    const { dispatch } = this.props;
    let _this = this;
    this.setState({
      createModalLoading: true
    });
    new Promise(resolve => {
      dispatch({
        type: "authority/create_top_account",
        payload: {
          params: {
            nickname: fieldValue.nickname,
            password: fieldValue.password,
            mobile: fieldValue.mobile
          },
          resolve
        }
      });
    }).then(res => {
      // 关闭按钮loading
      this.setState({
        createModalLoading: false
      });
      if (res.state === 1) {
        message.success("创建账号成功");
        this.createAccountHandleModal(false);
        // 刷新列表
        _this.refreshTable(true);
      } else {
        message.error(res.msg);
      }
    });
  };

  // 创建顶级代理商账号
  createTopPartner = () => {
    this.createAccountHandleModal(true);
  };

  // 创建账号按钮dom接口
  createTopButton() {
    return (
      <Button type="primary" onClick={this.createTopPartner}>创建顶级代理商</Button>
    );
  };

  // 创建账号
  renderCreateButton() {
    let currentUser = JSON.parse(localStorage.getItem("userInfo")),
      curLoginAccountId = currentUser.authority_list[0].authority_id;
    if (curLoginAccountId === 1) {
      return this.createTopButton();
    } else {
      return "";
    }
  };

  // 表格操作变化变化
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      offset: pagination.current,
      limit: pagination.pageSize,
      ...formValues
    };

    dispatch({
      type: "authority/fetch_account_list",
      payload: params
    });
  };

  // 表格搜索
  tableSearch = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldValue) => {
      if (fieldValue.search) {
        this.setState({
          formValues: {
            search: fieldValue.search
          }
        });
        // 刷新表格
        this.refreshTable(true, {
          search: fieldValue.search
        });
      } else {
        this.setState({
          formValues: {
            search: null
          }
        });
        // 刷新表格
        this.refreshTable(true, {});
      }
    });
  };


  /*dom结构渲染*/
  render() {
    const { authority: { accountData }, tableLoading, form } = this.props;
    const { selectedRows, roleLists, roleInitialLists, modalVisible } = this.state;
    const { getFieldDecorator } = form;

    // 分配角色参数数据
    const dispatchMethod = {
      dispatchModalLoading: this.state.dispatchModalLoading,
      handleAdd: this.dispatchRoleToAccount,
      handleModalVisible: this.handleModalVisible,
      editRoleData: this.state.editRoleData,
      roleLists: roleLists,
      roleInitialLists: roleInitialLists
    };

    // 创建账号相关参数
    const createAccountParams = {
      createModalLoading: this.state.createModalLoading,
      modalVisible: this.state.createModalVisible,
      handleModalVisible: this.createAccountHandleModal,
      submitCreateAccount: this.submitCreateAccount,
      createAccountData: this.state.createAccountData
    };

    return (
      <PageHeaderWrapper title="账号设置">
        <Card className={style.settingWrap}>

          <div className={style.toolBar}>
            <Form layout="inline" onSubmit={this.tableSearch}>
              {this.renderCreateButton()}
              <Form.Item>
                {getFieldDecorator("search")(
                  <Input placeholder="请输入账号名称"/>
                )}
              </Form.Item>
              <Button htmlType="submit">查询</Button>
            </Form>
          </div>

          <StandardTable
            selectedRows={selectedRows}
            loading={tableLoading}
            data={accountData.data}
            columns={this.columns}
            onChange={this.handleStandardTableChange}
          />

          {/*分配权限*/}
          <DispatchRoleModal {...dispatchMethod} modalVisible={modalVisible}/>

          {/*创建账号*/}
          <CreateTopPartner {...createAccountParams}/>

        </Card>
      </PageHeaderWrapper>
    );

  }
}

export default account_setting;
