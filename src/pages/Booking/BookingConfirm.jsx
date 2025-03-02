import React from "react";
import StepsComponent from "../../components/Booking/StepsComponent";
import BookingInvoice from "../../components/Booking/BookingInvoice";

function BookingConfirm() {
  const customerInfo = {
    name: "Nguyễn Văn A",
    phone: "0987654321",
  };

  const roomInfo = {
    number: "101",
    type: "Deluxe",
  };

  return (
    <div className="w-full px-6 pd-8">
      <div className="max-w-screen-xl mx-auto relative">
        <div className="max-w-5xl mx-auto py-8">
          <h1>Hoang thnah</h1>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirm;
