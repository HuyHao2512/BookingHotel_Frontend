import { Layout, Card, Statistic } from "antd";
import {
  DollarOutlined,
  WalletOutlined,
  FileDoneOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;
const CountUpStatistic = ({ title, value, prefix }) => (
  <Card className="shadow">
    <Statistic
      title={title}
      valueRender={() => (
        <CountUp start={0} end={value} duration={2} separator="," />
      )}
      prefix={prefix}
    />
  </Card>
);
const Dashboard = () => {
  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-6">
        {/* Thống kê nhanh */}
        <div className="grid grid-cols-3 gap-6">
          <CountUpStatistic
            title="Số lượt đặt phòng tháng này"
            value={120}
            prefix={<FileDoneOutlined />}
          />
          <CountUpStatistic
            title="Số lượt đặt phòng quý này"
            value={50}
            prefix={<WalletOutlined />}
            CountUpStatistic
          />
          <CountUpStatistic
            title="Doanh thu tháng"
            value="50,000,000 VND"
            prefix={<DollarOutlined />}
          />
          <CountUpStatistic
            title="Số lượng phòng "
            value="200"
            prefix={<FieldNumberOutlined />}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
