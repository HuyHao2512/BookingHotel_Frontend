import { Layout, Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useFindByOwner from "../../hooks/useFindByOwner";
import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../../services/owner.service";
const { Content } = Layout;
const Dashboard = () => {
  const { data: propertyData } = useFindByOwner();
  const propertyId = propertyData?.data[0]?._id; // Lấy propertyId từ dữ liệu chủ nhà
  const { data, isLoading, isError } = useQuery({
    queryKey: ["propertyRevenue", propertyId],
    queryFn: () => ownerService.getRevenue(propertyId),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  console.log("data", data.data);
  const transformedData = Object.entries(data.data).map(([month, values]) => ({
    name: month,
    totalBookings: values.totalBookings,
    totalRevenue: values.totalRevenue,
  }));
  return (
    <Layout className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Content className="p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Thống kê doanh thu
        </h2>
        <Card className="shadow-lg rounded-xl p-4 bg-white">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={transformedData} // Sử dụng dữ liệu đã chuyển đổi
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
              <Legend />
              <Bar dataKey="totalBookings" fill="#4CAF50" name="Số lượt đặt" />
              <Bar dataKey="totalRevenue" fill="#3B82F6" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
