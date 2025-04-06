// src/services/paymentService.js
import axios from "axios";

const API_URL = "http://localhost:3000/payment"; // Thay bằng URL backend của bạn

export const createPayment = async (amount) => {
  try {
    const response = await axios.get(`${API_URL}/create?amount=${amount}`);
    return response.data.paymentUrl;
  } catch (error) {
    console.error("Error creating payment:", error);
    return null;
  }
};
