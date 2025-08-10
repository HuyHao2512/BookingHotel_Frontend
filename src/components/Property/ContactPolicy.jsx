import { Card, Row, Col } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  ScissorOutlined,
} from "@ant-design/icons";

const PropertyPolicies = () => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "16px",
        background: "#fff",
      }}
    >
      <h2>Chính sách chỗ nghỉ</h2>
      <p>Trẻ em và giường phụ</p>
      <p>
        Giường phụ tùy thuộc vào loại phòng bạn chọn. Vui lòng kiểm tra sức chứa
        của từng phòng để biết thêm chi tiết.
      </p>
      <p>Tất cả trẻ em đều được chào đón.</p>

      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col xs={24} md={12}>
          <Card>
            <p>
              <UserOutlined style={{ marginRight: 8 }} />
              Trẻ em từ 0-6 tuổi
            </p>
            <p>Miễn phí nếu sử dụng giường sẵn có.</p>
            <small>Nếu cần giường phụ, sẽ tính thêm phụ phí.</small>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <p>
              <TeamOutlined style={{ marginRight: 8 }} />
              Khách từ 7 tuổi trở lên được tính là người lớn
            </p>
            <small>Phải sử dụng giường phụ và sẽ tính thêm phụ phí.</small>
          </Card>
        </Col>
      </Row>

      <h3>Khác</h3>
      <ul>
        <li>
          Khi đặt hơn 5 phòng, các chính sách và phụ phí khác có thể được áp
          dụng.
        </li>
      </ul>

      <h3>Một số thông tin hữu ích</h3>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <p>
            <FieldTimeOutlined style={{ marginRight: 8 }} />
            Nhận phòng từ: 14:00
          </p>
          <p>
            <FieldTimeOutlined style={{ marginRight: 8 }} />
            Trả phòng trước: 12:00
          </p>
          <p>
            <FieldTimeOutlined style={{ marginRight: 8 }} />
            Nhận phòng đến: 23:59
          </p>
        </Col>
        <Col xs={24} md={12}>
          <p>
            <HomeOutlined style={{ marginRight: 8 }} />
            Số lượng phòng: 10
          </p>
          <p>
            <ScissorOutlined style={{ marginRight: 8 }} />
            Phòng không hút thuốc: Có
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyPolicies;
