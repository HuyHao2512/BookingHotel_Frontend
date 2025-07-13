import { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    rooms: [],
    property: "",
    propertyName: "",
    propertyAddress: "",
    user: "",
    userName: "",
    checkIn: "",
    checkOut: "",
    name: "",
    email: "",
    phone: "",
    description: "",
    paymentMethod: "",
    discount: "",
    discountCode: "",
    totalPrice: "",
    finalPrice: "",
    isPaid: false,
  });

  // Hàm cập nhật thông tin đặt phòng
  const updateBooking = (newBookingData) => {
    setBooking((prev) => {
      const merged = { ...prev, ...newBookingData };

      const total = parseFloat(merged.totalPrice) || 0;
      const discountPercent = parseFloat(merged.discount) || 0;

      const finalPrice = total - (total * discountPercent) / 100;

      return { ...merged, finalPrice };
    });
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
