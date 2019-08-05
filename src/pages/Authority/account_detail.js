import React, { Component } from "react";
import { Input, Select, Card } from "antd";
import { connect } from "dva/index";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import StandardTable from "@/components/StandardTable";

@connect(({ authority, loading }) => ({
  authority,
  tableLoading: loading.effects["authority/fetch_account_detail"]
}))

class account_detail extends Component {

  state = {
    selectedRows: [],
    curPartnerMenuList: [],
    accountDetailInfo: JSON.parse(localStorage.getItem("accountAuthorityDetail"))
  };

  columns = [{
    title: "序号",
    dataIndex: "menu_id"
  }, {
    title: "拥有权限",
    dataIndex: "name"
  }];

  componentDidMount() {
    const { dispatch } = this.props;
    const { accountDetailInfo } = this.state;
    dispatch({
      type: "authority/fetch_account_detail",
      payload: {
        partner_id: accountDetailInfo.id
      }
    });
  };

  render() {
    const { authority: { accountDetailData }, tableLoading } = this.props;
    const {  accountDetailInfo } = this.state;

    return (
      <PageHeaderWrapper title={`'${accountDetailInfo.nickname}'-权限详情`}>
        <Card>
          <StandardTable
            selectedRows={[]}
            loading={tableLoading}
            data={accountDetailData.data}
            columns={this.columns}
          />
        </Card>
      </PageHeaderWrapper>
    );

  }

}

export default account_detail;
