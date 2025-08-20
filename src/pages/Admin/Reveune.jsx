import React, { useState } from "react";
import {
  Layout,
  Card,
  Button,
  Row,
  Col,
  Statistic,
  Select,
  Table,
  Tag,
  DatePicker,
  Spin,
  Alert,
  Tabs,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import {
  DownloadOutlined,
  FilterOutlined,
  DollarOutlined,
  ShoppingOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import * as adminService from "../../services/admin.service";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const Revenue = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [dateRange, setDateRange] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allRevenue"],
    queryFn: () => adminService.getRevenue(),
  });

  const {
    data: revenueData,
    isLoading: isLoadingRevenue,
    isError: isErrorRevenue,
  } = useQuery({
    queryKey: ["revenueCity"],
    queryFn: () => adminService.getRevenueCity(),
  });

  if (isLoading || isLoadingRevenue) return <div>Loading...</div>;
  if (isError || isErrorRevenue) return <div>Error loading data</div>;

  // Dữ liệu doanh thu theo tháng
  const revenueByMonth = Object.entries(data.data).map(([month, values]) => ({
    Tháng: month,
    "Số lượt đặt": values.totalBookings,
    "Doanh thu (VND)": values.totalRevenue,
    "Doanh thu (triệu VND)": Math.round(values.totalRevenue / 1000000),
  }));

  // Dữ liệu doanh thu theo thành phố
  const cityRevenueData = revenueData?.data
    ? Object.entries(revenueData.data).map(([city, revenue]) => ({
        name: city,
        value: revenue,
      }))
    : [];

  // Dữ liệu số lượt đặt theo thành phố
  const cityBookingsData = revenueData?.data
    ? Object.entries(revenueData.data).map(([city, months]) => {
        const totalBookings = Object.values(months).reduce(
          (sum, count) => sum + count,
          0
        );
        return { name: city, value: totalBookings };
      })
    : [];

  // Tính tổng doanh thu
  const totalRevenue = revenueByMonth.reduce(
    (sum, item) => sum + item["Doanh thu (VND)"],
    0
  );

  // Tính tổng số lượt đặt
  const totalBookings = revenueByMonth.reduce(
    (sum, item) => sum + item["Số lượt đặt"],
    0
  );

  // Tính số lượt đặt trung bình mỗi tháng
  const avgMonthlyBookings = totalBookings / revenueByMonth.length;

  // Tìm tháng có số lượt đặt cao nhất
  const bestMonth = revenueByMonth.reduce(
    (max, item) =>
      item["Số lượt đặt"] > max.bookings
        ? { month: item.Tháng, bookings: item["Số lượt đặt"] }
        : max,
    { month: "", bookings: 0 }
  );

  // Chuẩn bị dữ liệu cho bảng doanh thu theo thành phố
  const prepareCityTableData = () => {
    if (!revenueData?.data) return [];

    return Object.entries(revenueData.data).map(([city, months]) => {
      const cityData = { city };
      let totalRevenue = 0;
      let totalBookings = 0;

      Object.entries(months).forEach(([month, bookings]) => {
        cityData[month] = bookings;
        totalBookings += bookings;
        // Giả sử doanh thu trung bình mỗi booking là 1,000,000 VND
        totalRevenue += bookings * 1000000;
      });

      return {
        ...cityData,
        totalBookings,
        totalRevenue,
        totalRevenueFormatted: `${(totalRevenue / 1000000).toFixed(
          1
        )} triệu VND`,
      };
    });
  };

  const cityTableData = prepareCityTableData();
  const allMonths = revenueData?.data
    ? Array.from(
        new Set(
          Object.values(revenueData.data).flatMap((months) =>
            Object.keys(months)
          )
        )
      ).sort()
    : [];

  // Cột cho bảng doanh thu theo thành phố
  const cityTableColumns = [
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
      fixed: "left",
      width: 150,
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    ...allMonths.map((month) => ({
      title: month,
      dataIndex: month,
      key: month,
      render: (count) =>
        count > 0 ? (
          <Tag color="blue" className="text-center min-w-[40px]">
            {count}
          </Tag>
        ) : (
          <span className="text-gray-300">
            <Tag className="text-center min-w-[40px]">0</Tag>
          </span>
        ),
    })),
    {
      title: "Tổng lượt đặt",
      dataIndex: "totalBookings",
      key: "totalBookings",
      render: (total) => (
        <Tag color="green" className="font-bold">
          {total}
        </Tag>
      ),
    },
  ];

  // Xuất dữ liệu ra Excel
  const handleExportExcel = () => {
    const worksheet1 = XLSX.utils.json_to_sheet(revenueByMonth);
    const worksheet2 = XLSX.utils.json_to_sheet(cityTableData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Doanh thu theo tháng");
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet2,
      "Doanh thu theo thành phố"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "bao_cao_doanh_thu.xlsx");
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Thống kê doanh thu và lượt đặt
          </h2>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExportExcel}
          >
            Xuất Excel
          </Button>
        </div>

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card className="text-center shadow-md">
              <Statistic
                title="Tổng lượt đặt"
                value={totalBookings}
                valueStyle={{ color: "#1890ff" }}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="text-center shadow-md">
              <Statistic
                title="Số lượt đặt trung bình/tháng"
                value={avgMonthlyBookings}
                precision={0}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ShoppingOutlined />}
                formatter={(value) => `${value.toFixed(0)} lượt`}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="text-center shadow-md">
              <Statistic
                title="Tháng đặt nhiều nhất"
                value={bestMonth.bookings}
                precision={0}
                valueStyle={{ color: "#722ed1" }}
                prefix={<ShoppingOutlined />}
                formatter={() =>
                  `${bestMonth.month} (${bestMonth.bookings} lượt)`
                }
              />
            </Card>
          </Col>
        </Row>

        {/* Tabs cho các loại biểu đồ */}
        <Tabs defaultActiveKey="1" onChange={setActiveTab} className="mb-6">
          <TabPane tab="Doanh thu theo tháng" key="1">
            <Card className="shadow-md">
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  data={revenueByMonth}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="Tháng" />
                  <YAxis
                    yAxisId="left"
                    allowDecimals={false}
                    domain={[0, "auto"]}
                    label={{
                      value: "Số lượt đặt",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, "auto"]}
                    label={{
                      value: "Doanh thu (triệu VND)",
                      angle: -90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "Doanh thu (triệu VND)") {
                        return [value, "Doanh thu (triệu VND)"];
                      }
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="Số lượt đặt"
                    fill="#4CAF50"
                    barSize={40}
                    name="Số lượt đặt"
                  />
                  {/* <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="Doanh thu (triệu VND)"
                    stroke="#ff7300"
                    name="Doanh thu (triệu VND)"
                    strokeWidth={2}
                  /> */}
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </TabPane>
          <TabPane tab="Phân bố theo thành phố" key="2">
            <Row gutter={16}>
              {/* <Col span={12}>
                <Card title="Doanh thu theo thành phố" className="shadow-md">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={cityRevenueData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {cityRevenueData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `${(value / 1000000).toFixed(1)} triệu ₫`,
                          "Doanh thu",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col> */}
              <Col span={24}>
                <Card title="Số lượt đặt theo thành phố" className="shadow-md">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={cityBookingsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {cityBookingsData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} lượt đặt`, "Số lượt"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        {/* Bảng dữ liệu chi tiết */}
        <Card title="Chi tiết số lượt đặt theo thành phố" className="shadow-md">
          <Table
            columns={cityTableColumns}
            dataSource={cityTableData}
            scroll={{ x: 1000 }}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Revenue;
