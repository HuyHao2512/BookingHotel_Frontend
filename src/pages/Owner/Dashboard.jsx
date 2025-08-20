import { Layout, Card, Button, Statistic, Row, Col } from "antd";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../../services/owner.service";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Content } = Layout;

const Dashboard = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["propertyRevenue", id],
    queryFn: () => ownerService.getRevenue(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const transformedData = Object.entries(data.data).map(([month, values]) => ({
    Tháng: month,
    "Số lượt đặt": values.totalBookings,
    "Doanh thu (VND)": values.totalRevenue,
  }));

  // Calculate statistics
  const totalBookings = transformedData.reduce(
    (sum, item) => sum + item["Số lượt đặt"],
    0
  );
  const averageBookings = totalBookings / transformedData.length;
  const highestBookingMonth = transformedData.reduce(
    (max, item) => (item["Số lượt đặt"] > max["Số lượt đặt"] ? item : max),
    transformedData[0]
  );

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DoanhThu");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "bao_cao_doanh_thu.xlsx");
  };

  return (
    <Layout className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Content className="p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Thống kê số lượt đặt
          </h2>
          <Button type="primary" onClick={handleExportExcel}>
            Xuất Excel
          </Button>
        </div>
        {/* Statistics Section */}
        <Card className="shadow-lg rounded-xl p-4 bg-white mb-4">
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="Tổng số lượt đặt"
                value={totalBookings}
                suffix="lượt"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Trung bình mỗi tháng"
                value={averageBookings.toFixed(1)}
                suffix="lượt"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Tháng cao nhất"
                value={`${highestBookingMonth["Tháng"]} (${highestBookingMonth["Số lượt đặt"]} lượt)`}
              />
            </Col>
          </Row>
        </Card>
        {/* Chart Section */}
        <Card className="shadow-lg rounded-xl p-4 bg-white">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={transformedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="Tháng" />
              <YAxis
                yAxisId="left"
                allowDecimals={false}
                domain={[0, "auto"]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, "auto"]}
                tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`}
              />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="Số lượt đặt"
                fill="#4CAF50"
                barSize={40}
              />
              {/* Uncomment if you want to include the Line chart */}
              {/* <Line
                yAxisId="right"
                type="monotone"
                dataKey="Doanh thu (VND)"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                label={{ position: "top" }}
              /> */}
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
