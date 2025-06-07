import { useState, useRef, useEffect } from "react";
import { FloatButton } from "antd";
import {
  MinusOutlined,
  MinusSquareOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Thêm tin nhắn của người dùng vào danh sách
    const userMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    // Gửi yêu cầu đến webhook
    try {
      const response = await fetch(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: "user1",
            message: input.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Không thể kết nối đến server");
      }

      const data = await response.json();
      // Giả sử server trả về mảng các phản hồi, mỗi phản hồi có thuộc tính 'text'
      const botMessages = data.map((item) => ({
        from: "bot",
        text: item.text || "Bot không phản hồi nội dung.",
      }));

      // Thêm các phản hồi từ bot vào danh sách messages
      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Có lỗi xảy ra, vui lòng thử lại!" },
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsCollapsed(false); // Reset trạng thái thu gọn khi đóng
  };

  return (
    <>
      <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
        <FloatButton.BackTop visibilityHeight={0} />
        <FloatButton
          icon={<QuestionCircleOutlined />}
          onClick={() => setIsOpen(true)}
        />
      </FloatButton.Group>

      {/* Khung chat */}
      {isOpen && (
        <div
          className={`fixed bottom-0 right-20 z-50 w-80 max-w-full bg-white rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? "h-14" : "h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg font-semibold flex justify-between items-center">
            <span>Chatbot hỗ trợ</span>
            <div className="flex space-x-2">
              <button
                onClick={handleCollapse}
                aria-label={isCollapsed ? "Mở rộng chat" : "Thu gọn chat"}
                className="hover:text-gray-300"
              >
                {isCollapsed ? <MinusSquareOutlined /> : <MinusOutlined />}
              </button>
              <button
                onClick={handleClose}
                aria-label="Đóng chat"
                className="hover:text-gray-300"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-300 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
            <textarea
              rows={1}
              className="flex-1 resize-none border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
