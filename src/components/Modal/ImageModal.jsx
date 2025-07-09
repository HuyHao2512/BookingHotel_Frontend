import { Image, Modal } from "antd";

const ImageModal = ({ isVisible, handleClose, images }) => {
  return (
    <Modal
      title="Tất cả hình ảnh"
      open={isVisible}
      footer={null}
      onCancel={handleClose}
      width={1200}
    >
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Full Gallery ${index}`}
            height="100%"
            width="100%"
            style={{ objectFit: "cover" }}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ImageModal;
