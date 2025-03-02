import React from "react";
const Explore = () => {
  return (
    <div>
      <div className="w-full px-6">
        <div className="max-w-screen-xl mx-auto relative">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Mừng Sinh Nhật, Sale đậm hết ga
            </h2>
            <img
              src="public/images/birthday.jpg"
              alt="HCM"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="mt-20">
            <h2 className="text-xl font-semibold">MÙA SALE HOA ANH ĐÀO</h2>
            <h3 className="text-lg text-gray-500 font-semibold">
              Coupon giảm đến 1 TRIỆU VNĐ
            </h3>
            <img
              src="public/images/sale.jpg"
              alt="HCM"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
