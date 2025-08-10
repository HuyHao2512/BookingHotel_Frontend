const features = [
  {
    img: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1754835319/SearchDesktop_ybmch3.svg", // thay bằng đường dẫn ảnh
    title: "Tìm dễ dàng",
    desc: "Dễ dàng tìm kiếm hàng triệu khách sạn chỉ trong vài giây.",
  },
  {
    img: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1754835319/SaveDesktop_zs0jtt.svg",
    title: "Tự tin so sánh",
    desc: "So sánh giá phòng từ nhiều trang web cùng lúc.",
  },
  {
    img: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1754835319/CompareDesktop_dvdkuk.svg",
    title: "Tiết kiệm nhiều",
    desc: "Khám phá ưu đãi hấp dẫn để đặt trên trang web đối tác của chúng tôi.",
  },
];

const BookingGuide = () => {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {features.map((f, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={f.img}
                alt={f.title}
                className="w-48 h-32 object-contain"
              />
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingGuide;
