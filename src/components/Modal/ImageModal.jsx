import { Modal } from "antd";

const ImageModal = ({ isVisible, handleClose, images }) => {
  return (
    <Modal
      title="Tất cả hình ảnh"
      open={isVisible}
      footer={null}
      onCancel={handleClose}
      width={800}
    >
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Full Gallery ${index}`}
            className="w-full h-60 object-cover rounded-lg"
          />
        ))}
      </div>
    </Modal>
  );
};

export default ImageModal;
