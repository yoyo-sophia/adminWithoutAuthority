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

@connect(({ menu, authority, user, loading }) => ({
  menuData: menu.menuData,
  authority,
  userInfo: user.currentUser,
  tableLoading: loading.effects["authority/show_card_discharge"],
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
    dataIndex: "iccid",
    title: "排除记录"
  },{
    title: "操作",
    render: (text, record) => (
      <Fragment>
        <a onClick={() => this.removeCoefficient(record)}>删除</a>
      </Fragment>
    )
  }
  ];





  componentDidMount() {
    const { dispatch } = this.props;
    const { initialPagination } = this.state;
    //流量系数列表
    dispatch({
      type: "authority/show_card_discharge",
      payload: {
        limit: initialPagination.pageSize,
        offset: initialPagination.current
      }

    });

  
  }


  //增加流量系数
  addCoefficient = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    let _this = this;
    form.validateFields((err, fieldValue) => {

      dispatch({
        type: "authority/add_card_discharge",
        payload: {
          params: {
            iccid: fieldValue.iccid,
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
            type: "authority/remove_card_discharge",
            payload: {
              params: {
                iccid_list: arrayData
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







  //刷新表格
  refreshTable = (isFirstPage) => {
    const { dispatch, authority } = this.props;
    let pageSize = authority.show_card_discharge_list.data.pagination.pageSize,
      current = isFirstPage ? 1 : authority.show_card_discharge_list.data.pagination.current;
    dispatch({
      type: "authority/show_card_discharge",
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
      type: "authority/show_card_discharge",
      payload: {
        offset: pagination.current,
        limit: pagination.pageSize,
      }
    });
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
            type: "authority/remove_card_discharge",
            payload: {
              params: {
                iccid_list: _this.state.selectedRowKeys
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
      authority: {  show_card_discharge_list },
      tableLoading,
      form,
    } = this.props;

    const { getFieldDecorator } = form;

    const { modalVisible, defaultSelectedKeys, search,selectedRowKeys } = this.state;
    
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <PageHeaderWrapper title="卡排除">
        <Card bordered={false} className={style.settingWrap}>
          <div className={style.toolBar}>
            <Form layout="inline" onSubmit={this.addCoefficient}>
             
              <Form.Item>
                {getFieldDecorator("iccid")(
                  <Input placeholder="请填写ICCID" />
                )}
              </Form.Item>
              <Button htmlType="submit">添加</Button>

              <span style={{ marginLeft: 8 }} className={style.removeStlye}>
                {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
              </span>

              <Button type="danger" className={style.removeStlye} onClick={() => this.batchRemove()}>批量删除</Button>
              
            </Form>
          </div>
          <StandardTable
            loading={tableLoading}
            data={show_card_discharge_list.data}
            selectedRows={[]}
            columns={this.columns}
            onChange={this.handleStandardTableChange}
            rowSelection={rowSelection}

          />



        </Card>
       
      </PageHeaderWrapper>






    );

  }

}

export default flowCoefficient_setting;

