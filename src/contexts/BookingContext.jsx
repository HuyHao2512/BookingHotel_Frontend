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
    totalPrice: "",
    finalPrice: "",
    isPaid: false,
  });

  // Hàm cập nhật thông tin đặt phòng
  const updateBooking = (newBookingData) => {
    setBooking((prev) => ({ ...prev, ...newBookingData }));
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
