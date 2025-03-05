const Footer = () => {
  return (
    <footer className=" py-6">
      <div className="w-full px-6 mt-6 py-8">
        <div className="max-w-screen-xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Hỗ trợ */}
            <div>
              <h3 className="font-bold mb-2">Hỗ trợ</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Các câu hỏi thường gặp về COVID-19</li>
                <li>Quản lí các chuyến đi của bạn</li>
                <li>Liên hệ Dịch vụ Khách hàng</li>
                <li>Trung tâm thông tin bảo mật</li>
              </ul>
            </div>

            {/* Khám phá thêm */}
            <div>
              <h3 className="font-bold mb-2">Khám phá thêm</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Chương trình khách hàng thân thiết Genius</li>
                <li>Ưu đãi theo mùa và dịp lễ</li>
                <li>Bài viết về du lịch</li>
                <li>Booking.com dành cho Doanh Nghiệp</li>
                <li>Traveller Review Awards</li>
                <li>Cho thuê xe hơi</li>
              </ul>
            </div>

            {/* Điều khoản và cài đặt */}
            <div>
              <h3 className="font-bold mb-2">Điều khoản và cài đặt</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Bảo mật & Cookie</li>
                <li>Điều khoản và điều kiện</li>
                <li>Tranh chấp đối tác</li>
                <li>Chính sách chống Nô lệ Hiện đại</li>
              </ul>
            </div>

            {/* Dành cho đối tác */}
            <div>
              <h3 className="font-bold mb-2">Dành cho đối tác</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Đăng nhập vào trang Extranet</li>
                <li>Trợ giúp đối tác</li>
                <li>Đăng chỗ nghỉ của Quý vị</li>
                <li>Trở thành đối tác phân phối</li>
              </ul>
            </div>

            {/* Về chúng tôi */}
            <div>
              <h3 className="font-bold mb-2">Về chúng tôi</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Về Booking.com</li>
                <li>Chúng tôi hoạt động như thế nào</li>
                <li>Du lịch bền vững</li>
                <li>Truyền thông</li>
                <li>Cơ hội việc làm</li>
                <li>Liên hệ công ty</li>
              </ul>
            </div>
          </div>

          {/* Currency & Language */}
          <div className="mt-6 flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dsfajbqyx/image/upload/v1741069874/t27rkfzasuv6jnswqjhl.png"
              style={{ height: "50px" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
