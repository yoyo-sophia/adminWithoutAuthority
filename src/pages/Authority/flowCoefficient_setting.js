import React, { Component, PureComponent, Fragment } from "react";
import { connect } from "dva";
import router from "umi/router";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Modal,
  Divider,
  Button,
  message,
  Tree,
  DatePicker
} from "antd";
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import style from "./css/node-setting.less";
import { getDate } from "@/utils/utils";
import moment from "moment";

message.config({
  maxCount: 1
});

const FormItem = Form.Item;
const { TreeNode } = Tree;
const { MonthPicker } = DatePicker;




@Form.create()

@connect(({ menu, authority, user, loading,common }) => ({
  menuData: menu.menuData,
  authority,
  common,
  userInfo: user.currentUser,
  tableLoading: loading.effects["authority/show_coefficient"],
  tableLoading2: loading.effects["authority/show_card_coefficient"],
  firstRankPartner: loading.effects["common/firstRankPartner"],

}))


class flowCoefficient_setting extends Component {
  state = {

    modalVisible: false,
    selectedRows: [],
    formValues: {
      offset: 1,
      limit: 10,
      card: "",
      dls: "",
      timed: getDate("month"),
      sortname: "flow",
      sort: "0"
    },
    initialPagination: {
      current: 1,
      pageSize: 10
    },
    initDate: getDate("month"),
    selectedRowKeys: []
  };

  columns = [{
    dataIndex: "id",
    title: "序号"
  }, {
    dataIndex: "created_at",
    title: "时间"
  }, {
    dataIndex: "discharge",
    title: "流量",
    render: (text) => {
      return text + "G"
    }
  }, {
    dataIndex: "coefficient",
    title: "系数"
  }, {
    title: "操作",
    render: (text, record) => (
      <Fragment>
        <a onClick={() => this.removeCoefficient(record)}>删除</a>
      </Fragment>
    )
  }
  ];




  columns2 = [{
    dataIndex: "id",
    title: "序号"
  }, {
    dataIndex: "created_at",
    title: "时间"
  }, {
    dataIndex: "msisdn",
    title: "msisdn",

  }, {
    dataIndex: "iccid",
    title: "iccid",

  },
  {
    dataIndex: "flow",
    title: "流量",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.flow - b.flow,
    render: (text, record) => {
      return text + "G"
    }
  }, {
    dataIndex: "coefficient",
    title: "系数",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.coefficient - b.coefficient,
  }, {
    dataIndex: "nickname",
    title: "一级代理商",
  }, {
    title: "操作",
    render: (text, record) => (
      <Fragment>
        <a onClick={() => this.removeCardCoefficient(record)}>删除</a>
      </Fragment>
    )
  }
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const { initialPagination } = this.state;
    //流量系数列表
    dispatch({
      type: "authority/show_coefficient",
      payload: {
        limit: initialPagination.pageSize,
        offset: initialPagination.current
      }

    });

    //卡流量系数列表
    dispatch({
      type: "authority/show_card_coefficient",
      payload: {
        limit: initialPagination.pageSize,
        offset: initialPagination.current,
        card: "",
        dls: "",
        timed: this.state.initDate,
        sortname: "flow",
        sort: "0"
      }
    });

     // 获取一级代理商
     dispatch({
      type: "common/firstRankPartner"
    });
  }


  //增加流量系数
  addCoefficient = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    let _this = this;
    form.validateFields((err, fieldValue) => {
      if(!fieldValue.coefficient){
        message.error("请输入流量");        
        return false;
      }else if(!fieldValue.discharge){
        message.error("请输入系数");        
        return false;
      }
      dispatch({
        type: "authority/add_coefficient",
        payload: {
          params: {
            coefficient: parseFloat(fieldValue.coefficient),
            discharge: parseFloat(fieldValue.discharge),
          }
        },
        callback: (res) => {
          if (res.state === 1) {
            message.success("添加成功");
            _this.refreshTable();
          } else {
            message.error(res.msg);
          }
        }
      });

    });
  };

  //删除单个流量系数
  removeCoefficient = (data) => {
    const { dispatch } = this.props;
    let _this = this;
    let arrayData = [];
    arrayData.push(data.id);
    const modal = Modal.confirm({
      title: "操作",
      content: `确定要删除这条查询记录吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return new Promise((resolve, reject) => {
          dispatch({
            type: "authority/remove_coefficient",
            payload: {
              params: {
                ids: arrayData
              },
              resolve
            }
          });
        }).then(res => {
          if (res.state === 1) {
            modal.destroy();
            message.success("删除成功");
            // 刷新表格
            _this.refreshTable();
          } else {
            message.error(res.msg);
          }
        });
      }
    });

  }




  //清空流量系数设置
  emptyParams = () => {
    const { dispatch } = this.props;
    let _this = this;
    const modal = Modal.confirm({
      title: "操作",
      content: `确定要清除所有参数记录吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return new Promise((resolve, reject) => {
          dispatch({
            type: "authority/remove_all_coefficient",
            payload: {
              params: {
              },
              resolve
            }
          });
        }).then(res => {
          if (res.state === 1) {
            modal.destroy();
            message.success("清除成功");
            // 刷新表格
            _this.refreshTable();
          } else {
            message.error(res.msg);
          }
        });
      }
    });

  }



  //刷新表格
  refreshTable = (isFirstPage) => {
    const { dispatch, authority } = this.props;
    let pageSize = authority.show_coefficient_list.data.pagination.pageSize,
      current = isFirstPage ? 1 : authority.show_coefficient_list.data.pagination.current;
    dispatch({
      type: "authority/show_coefficient",
      payload: {
        limit: pageSize,
        offset: current
      }
    });
  };


  // 表格操作变化变化
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;

    dispatch({
      type: "authority/show_coefficient",
      payload: {
        offset: pagination.current,
        limit: pagination.pageSize,
      }
    });
  };


  // 获取禁用月份
  disabledDate = (current) => {
    return current && current > moment(getDate("month"), "YYYY-MM").endOf("month");
  };



  //删除卡流量系数
  removeCardCoefficient = (data) => {
    const { dispatch } = this.props;
    let _this = this;
    let arrayData = [];
    arrayData.push(data.id);
    const modal = Modal.confirm({
      title: "操作",
      content: `确定要删除这条查询记录吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return new Promise((resolve, reject) => {
          dispatch({
            type: "authority/remove_card_coefficient",
            payload: {
              params: {
                ids: arrayData
              },
              resolve
            }
          });
        }).then(res => {
          if (res.state === 1) {
            modal.destroy();
            message.success("删除成功");
            // 刷新表格

            _this.refreshBottomTable2();
          } else {
            message.error(res.msg);
          }
        });
      }
    });
  }


  //展示卡流量系数
  refreshBottomTable = (e) => {
    e.preventDefault();
    const { dispatch, authority, form } = this.props;
    const { formValues } = this.state;

    let pageSize = authority.show_coefficient_list.data.pagination.pageSize,
      current = 1;
    form.validateFields((err, fieldValue) => {
      dispatch({
        type: "authority/show_card_coefficient",
        payload: {
          limit: pageSize,
          offset: current,
          card: fieldValue.card,
          dls: fieldValue.dls,
          timed: moment(fieldValue.timed).format("YYYY-MM"),
          sortname: formValues.sortname,
          sort: formValues.sort
        }
      });
    })
  }
  refreshBottomTable2 = () => {
    const { dispatch, authority, form } = this.props;
    const { formValues } = this.state;
    form.validateFields((err, fieldValue) => {
      dispatch({
        type: "authority/show_card_coefficient",
        payload: formValues
      });
    })
  }



  //卡流量系数表格切换
  handleStandardTableChange2 = (pagination, filtersArg, sorter) => {
    const { dispatch, authority, form } = this.props;
    const { formValues } = this.state;

    form.validateFields((err, fieldValues) => {
      let sort;
      if (sorter.order == "ascend") {
        sort = 0;
      } else if (sorter.order == "descend") {
        sort = 1;
      } else {
        sort = "";
      }
      const params = {
        offset: pagination.current,
        limit: pagination.pageSize,
        card: fieldValues.card,
        dls: fieldValues.dls,
        timed: moment(fieldValues.timed).format("YYYY-MM"),
        sortname: sorter.columnKey,
        sort: sort
      };
      this.setState({
        formValues: params
      });
      dispatch({
        type: "authority/show_card_coefficient",
        payload: {
          limit: pagination.pageSize,
          offset: pagination.current,
          card: fieldValues.card,
          dls: fieldValues.dls,
          timed: moment(fieldValues.timed).format("YYYY-MM"),
          sortname: sorter.columnKey,
          sort: sort
        }
      });

    })

  }


  //跳转卡排除
  toDetailsList = (rowInfo) => {
    router.push("/authority/cardExclude_setting");
  };


  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  //批量删除
  batchRemove=()=>{
    const { dispatch } = this.props;
    const { selectedRowKeys } = this.state;
    let _this = this;
    const modal = Modal.confirm({
      title: "操作",
      content: `确定要删除这些查询记录吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return new Promise((resolve, reject) => {
          dispatch({
            type: "authority/remove_card_coefficient",
            payload: {
              params: {
                ids: _this.state.selectedRowKeys
              },
              resolve
            }
          });
        }).then(res => {
          if (res.state === 1) {
            modal.destroy();
            message.success("删除成功");
            // 刷新表格

            _this.refreshBottomTable2();
            _this.setState({ selectedRowKeys:[] });

          } else {
            message.error(res.msg);
          }
        });
      }
    });
  }
  render() {
    const {
      authority: { show_coefficient_list, show_card_coefficient_list },
      tableLoading,
      tableLoading2,
      form,
      common,
      firstRankPartner,
      
    } = this.props;

    const { getFieldDecorator } = form;

    const { modalVisible, defaultSelectedKeys, search,selectedRowKeys } = this.state;
    

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    return (
      <PageHeaderWrapper title="卡套餐系数自动调整">
        <Card bordered={false} className={style.settingWrap}>
          <div className={style.toolBar}>
            <Form layout="inline" onSubmit={this.addCoefficient}>
              <Button type="primary" onClick={() => this.toDetailsList()}>卡排除</Button>
              <Form.Item>
                {getFieldDecorator("discharge")(
                  <Input placeholder="请填写流量(单位:G)" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("coefficient")(
                  <Input placeholder="请填写系数" />
                )}
              </Form.Item>
              <Button htmlType="submit">添加</Button>
              <Button type="danger" className={style.removeStlye} onClick={() => this.emptyParams()}>清除全部设置</Button>

            </Form>
          </div>
          <StandardTable
            loading={tableLoading}
            data={show_coefficient_list.data}
            selectedRows={[]}
            columns={this.columns}
            onChange={this.handleStandardTableChange}

          />



        </Card>
        <Card bordered={false} className={style.settingWrap}>

          <div >
            <Form layout="inline" onSubmit={this.refreshBottomTable}>
              <Form.Item>
                {getFieldDecorator("card")(
                  <Input placeholder="请填写msisdn/iccid" />
                )}
              </Form.Item>
              <Form.Item>
              {form.getFieldDecorator("dls", {
                initialValue: ""
              })(
                <Select
                  loading={firstRankPartner}
                  showSearch
                  optionFilterProp="children"
                  placeholder="请选择一级代理商"
                  filterOption={(input, option) =>
                    option.props.children.indexOf(input) >= 0
                  }
                  style={{ width: 200 }}>
                  <Option value={""}>全部</Option>
                  {common.firstPartnerList.data.map((item, index) => {
                    return (
                      <Option value={item.nickname} key={index}>{item.nickname}</Option>
                    );
                  })}
                </Select>
              )}
               
              </Form.Item>
              <FormItem>
                {getFieldDecorator("timed", {
                  initialValue: moment(this.state.initDate, "YYYY-MM")
                })(
                  <MonthPicker disabledDate={this.disabledDate} placeholder="请选择时间" />
                )}
              </FormItem>
              <FormItem>
                <Button htmlType="submit" >查询</Button>
              </FormItem>

              <span style={{ marginLeft: 8 }} className={style.removeStlye}>
                {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
              </span>

              <Button type="danger" className={style.removeStlye} onClick={() => this.batchRemove()}>批量删除</Button>
              
            
            </Form>
          </div>


          <StandardTable
            loading={tableLoading2}
            data={show_card_coefficient_list.data}
            selectedRows={[]}
            columns={this.columns2}
            onChange={this.handleStandardTableChange2}
            rowSelection={rowSelection}

          />


        </Card>
      </PageHeaderWrapper>






    );

  }

}

export default flowCoefficient_setting;

