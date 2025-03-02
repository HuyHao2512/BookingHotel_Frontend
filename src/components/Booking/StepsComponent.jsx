import { Steps } from "antd";

const StepsComponent = ({ currentStep }) => {
  return (
    <div>
      <Steps current={currentStep}>
        <Steps.Step title="Bạn chọn" />
        <Steps.Step title="Nhập thông tin" />
        <Steps.Step title="Xác nhận đặt phòng của bạn" />
      </Steps>
    </div>
  );
};
export default StepsComponent;
