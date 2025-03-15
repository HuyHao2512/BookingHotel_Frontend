// import React, { useState, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import {
//   Modal,
//   Form,
//   Input,
//   Select,
//   Upload,
//   Button,
//   Spin,
//   Checkbox,
//   message,
//   Image,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import useTypeRoom from "../../hooks/useTypeRoom";
// import useConveniences from "../../hooks/useConveniences";
// import useFindByOwner from "../../hooks/useFindByOwner";
// import * as ownerService from "../../services/owner.service";

// const UpdateRoomModal = ({ isUpdateRoomModalOpen, handleCancel, room }) => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { data: typeRoomData, isLoading: isLoadingTypeRoom } = useTypeRoom();
//   const { data: conveniencesData, isLoading: isLoadingConveniences } =
//     useConveniences();
//   const { data: ownerData, isLoading: isLoadingOwner } = useFindByOwner();
//   const [propertyId, setPropertyId] = useState(null);
//   const [roomData, setRoomData] = useState({
//     name: "",
//     typeroom: "",
//     property: null,
//     conveniences: [],
//     price: "",
//     isAvailable: true,
//     quantity: "",
//     area: "",
//     capacity: "",
//     bed: "",
//     direction: "",
//     totalRoom: "",
//     files: [],
//   });

//   useEffect(() => {
//     if (ownerData && ownerData.data && ownerData.data.length > 0) {
//       setPropertyId(ownerData.data[0]._id);
//       setRoomData((prev) => ({
//         ...prev,
//         property: ownerData.data[0]._id,
//       }));
//     }
//   }, [ownerData]);

//   useEffect(() => {
//     if (room && conveniencesData) {
//       const conveniencesIds = Array.isArray(room.conveniences)
//         ? room.conveniences.map((item) => item._id || item)
//         : [];

//       setRoomData({
//         name: room.name || "",
//         typeroom: room.typeroom || "",
//         conveniences: conveniencesIds,
//         price: room.price || "",
//         isAvailable: room.isAvailable || true,
//         quantity: room.quantity || "",
//         area: room.area || "",
//         capacity: room.capacity || "",
//         bed: room.bed || "",
//         direction: room.direction || "",
//         totalRoom: room.totalRoom || "",
//         files: room.files || [],
//       });

//       form.setFieldsValue({
//         name: room.name,
//         typeroom: room.typeroom,
//         price: room.price,
//         quantity: room.quantity,
//         area: room.area,
//         capacity: room.capacity,
//         bed: room.bed,
//         direction: room.direction,
//         conveniences: conveniencesIds,
//       });

//       if (room.files) {
//         setFileList(
//           room.files.map((file, index) => ({
//             uid: index,
//             name: `image-${index}`,
//             url: file,
//           }))
//         );
//       }
//     }
//   }, [room, conveniencesData, form]);

//   const updateRoomMutation = useMutation({
//     mutationFn: (formData) => ownerService.updateRoom(room._id, formData),
//     onSuccess: () => {
//       message.success("Cập nhật phòng thành công!");
//       handleCancel();
//     },
//     onError: (error) => {
//       console.error("Lỗi khi cập nhật phòng:", error);
//       message.error("Có lỗi xảy ra khi cập nhật phòng!");
//     },
//   });

//   const handleChange = (e) => {
//     setRoomData({ ...roomData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   const handleSubmit = () => {
//     if (
//       !roomData.name ||
//       !roomData.typeroom ||
//       !roomData.price ||
//       !roomData.quantity ||
//       !roomData.area ||
//       !roomData.capacity ||
//       !roomData.bed ||
//       !roomData.direction ||
//       !roomData.files
//     ) {
//       message.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
//       return;
//     }
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("name", roomData.name);
//     formData.append("typeroom", roomData.typeroom);
//     formData.append("price", roomData.price);
//     formData.append("quantity", roomData.quantity);
//     formData.append("property", roomData.property);
//     formData.append("isAvailable", roomData.isAvailable);
//     formData.append("totalRoom", roomData.totalRoom);
//     formData.append("area", roomData.area);
//     formData.append("capacity", roomData.capacity);
//     formData.append("bed", roomData.bed);
//     formData.append("direction", roomData.direction);

//     // Gửi từng ID trong mảng conveniences
//     roomData.conveniences.forEach((id) => {
//       formData.append("conveniences[]", id);
//     });

//     fileList.forEach((file) => {
//       if (file.originFileObj) {
//         formData.append("files", file.originFileObj);
//       }
//     });

//     updateRoomMutation.mutate(formData, {
//       onSettled: () => setIsSubmitting(false),
//     });
//   };

//   return (
//     <Modal
//       title="Cập Nhật Phòng"
//       open={isUpdateRoomModalOpen}
//       onOk={() => form.submit()}
//       onCancel={handleCancel}
//       width={800}
//       confirmLoading={isSubmitting}
//     >
//       <Form
//         form={form}
//         layout="horizontal"
//         onFinish={handleSubmit}
//         autoComplete="off"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Form.Item
//             label="Tên Phòng"
//             name="name"
//             rules={[{ required: true, message: "Nhập tên phòng!" }]}
//           >
//             <Input name="name" onChange={handleChange} />
//           </Form.Item>

//           <Form.Item
//             label="Loại Phòng"
//             name="typeroom"
//             rules={[{ required: true, message: "Chọn loại phòng!" }]}
//           >
//             <Select
//               placeholder="Chọn loại phòng"
//               onChange={(value) =>
//                 setRoomData({ ...roomData, typeroom: value })
//               }
//             >
//               {isLoadingTypeRoom ? (
//                 <Select.Option disabled>Đang tải...</Select.Option>
//               ) : (
//                 typeRoomData?.map((type) => (
//                   <Select.Option key={type._id} value={type._id}>
//                     {type.name}
//                   </Select.Option>
//                 ))
//               )}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Giá (VND)"
//             name="price"
//             rules={[{ required: true, message: "Nhập giá phòng!" }]}
//           >
//             <Input type="number" name="price" onChange={handleChange} />
//           </Form.Item>

//           <Form.Item
//             label="Số Lượng"
//             name="quantity"
//             rules={[{ required: true, message: "Nhập số lượng!" }]}
//           >
//             <Input type="number" name="quantity" onChange={handleChange} />
//           </Form.Item>
//         </div>

//         <Form.Item label="Tiện ích" name="conveniences">
//           {isLoadingConveniences ? (
//             <Spin />
//           ) : (
//             <Checkbox.Group
//               value={roomData.conveniences}
//               onChange={(values) =>
//                 setRoomData({ ...roomData, conveniences: values })
//               }
//             >
//               <div className="grid grid-cols-2 gap-2">
//                 {conveniencesData?.map((item) => (
//                   <Checkbox key={item._id} value={item._id}>
//                     {item.name}
//                   </Checkbox>
//                 ))}
//               </div>
//             </Checkbox.Group>
//           )}
//         </Form.Item>

//         <Form.Item label="Hướng" name="direction">
//           <Select
//             onChange={(value) => setRoomData({ ...roomData, direction: value })}
//           >
//             <Select.Option value="Đông">Đông</Select.Option>
//             <Select.Option value="Tây">Tây</Select.Option>
//             <Select.Option value="Nam">Nam</Select.Option>
//             <Select.Option value="Bắc">Bắc</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Hình Ảnh">
//           <Upload
//             beforeUpload={() => false}
//             multiple
//             onChange={handleImageUpload}
//             fileList={fileList}
//           >
//             <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
//           </Upload>
//           <div className="grid grid-cols-4 gap-4 mt-4">
//             {room?.images &&
//               room?.images.map((file, index) => (
//                 <div key={index}>
//                   <Image
//                     src={file.url}
//                     alt={`image-${index}`}
//                     className="w-32"
//                   />
//                 </div>
//               ))}
//           </div>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default UpdateRoomModal;
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Spin,
  Checkbox,
  message,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useTypeRoom from "../../hooks/useTypeRoom";
import useConveniences from "../../hooks/useConveniences";
import useFindByOwner from "../../hooks/useFindByOwner";
import * as ownerService from "../../services/owner.service";

const UpdateRoomModal = ({ isUpdateRoomModalOpen, handleCancel, room }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [removeImageIds, setRemoveImageIds] = useState([]); // State mới để lưu publicId của ảnh cần xóa
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: typeRoomData, isLoading: isLoadingTypeRoom } = useTypeRoom();
  const { data: conveniencesData, isLoading: isLoadingConveniences } =
    useConveniences();
  const { data: ownerData, isLoading: isLoadingOwner } = useFindByOwner();
  const [propertyId, setPropertyId] = useState(null);
  const [roomData, setRoomData] = useState({
    name: "",
    typeroom: "",
    property: null,
    conveniences: [],
    price: "",
    isAvailable: true,
    quantity: "",
    area: "",
    capacity: "",
    bed: "",
    direction: "",
    totalRoom: "",
    files: [],
  });

  useEffect(() => {
    if (ownerData && ownerData.data && ownerData.data.length > 0) {
      setPropertyId(ownerData.data[0]._id);
      setRoomData((prev) => ({
        ...prev,
        property: ownerData.data[0]._id,
      }));
    }
  }, [ownerData]);

  useEffect(() => {
    if (room && conveniencesData) {
      const conveniencesIds = Array.isArray(room.conveniences)
        ? room.conveniences.map((item) => item._id || item)
        : [];

      setRoomData({
        name: room.name || "",
        typeroom: room.typeroom || "",
        conveniences: conveniencesIds,
        price: room.price || "",
        isAvailable: room.isAvailable || true,
        quantity: room.quantity || "",
        area: room.area || "",
        capacity: room.capacity || "",
        bed: room.bed || "",
        direction: room.direction || "",
        totalRoom: room.totalRoom || "",
        files: room.files || [],
      });

      form.setFieldsValue({
        name: room.name,
        typeroom: room.typeroom,
        price: room.price,
        quantity: room.quantity,
        area: room.area,
        capacity: room.capacity,
        bed: room.bed,
        direction: room.direction,
        conveniences: conveniencesIds,
      });

      if (room.images) {
        // Sửa từ room.files thành room.images để khớp với backend
        setFileList(
          room.images.map((file, index) => ({
            uid: index,
            name: `image-${index}`,
            url: file.url,
            publicId: file.publicId, // Lưu publicId để sử dụng khi xóa
          }))
        );
      }
    }
  }, [room, conveniencesData, form]);

  const updateRoomMutation = useMutation({
    mutationFn: (formData) => ownerService.updateRoom(room._id, formData),
    onSuccess: () => {
      message.success("Cập nhật phòng thành công!");
      handleCancel();
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật phòng:", error);
      message.error("Có lỗi xảy ra khi cập nhật phòng!");
    },
  });

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  // Hàm xử lý khi chọn/bỏ chọn ảnh để xóa
  const handleRemoveImage = (publicId) => {
    setRemoveImageIds((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  const handleSubmit = () => {
    if (
      !roomData.name ||
      !roomData.typeroom ||
      !roomData.price ||
      !roomData.quantity ||
      !roomData.area ||
      !roomData.capacity ||
      !roomData.bed ||
      !roomData.direction
    ) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", roomData.name);
    formData.append("typeroom", roomData.typeroom);
    formData.append("price", roomData.price);
    formData.append("quantity", roomData.quantity);
    formData.append("property", roomData.property);
    formData.append("isAvailable", roomData.isAvailable);
    formData.append("totalRoom", roomData.totalRoom);
    formData.append("area", roomData.area);
    formData.append("capacity", roomData.capacity);
    formData.append("bed", roomData.bed);
    formData.append("direction", roomData.direction);

    // Gửi từng ID trong mảng conveniences
    roomData.conveniences.forEach((id) => {
      formData.append("conveniences[]", id);
    });

    // Gửi file mới
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    // Gửi danh sách publicId của ảnh cần xóa
    if (removeImageIds.length > 0) {
      formData.append("removeImageIds", JSON.stringify(removeImageIds));
    }

    updateRoomMutation.mutate(formData, {
      onSettled: () => setIsSubmitting(false),
    });
  };

  return (
    <Modal
      title="Cập Nhật Phòng"
      open={isUpdateRoomModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      width={800}
      confirmLoading={isSubmitting}
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {/* Các Form.Item khác giữ nguyên */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Tên Phòng"
            name="name"
            rules={[{ required: true, message: "Nhập tên phòng!" }]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>
          {/* Các field khác như typeroom, price, quantity... */}
        </div>

        <Form.Item label="Tiện ích" name="conveniences">
          {isLoadingConveniences ? (
            <Spin />
          ) : (
            <Checkbox.Group
              value={roomData.conveniences}
              onChange={(values) =>
                setRoomData({ ...roomData, conveniences: values })
              }
            >
              <div className="grid grid-cols-2 gap-2">
                {conveniencesData?.map((item) => (
                  <Checkbox key={item._id} value={item._id}>
                    {item.name}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          )}
        </Form.Item>

        <Form.Item label="Hướng" name="direction">
          <Select
            onChange={(value) => setRoomData({ ...roomData, direction: value })}
          >
            <Select.Option value="Đông">Đông</Select.Option>
            <Select.Option value="Tây">Tây</Select.Option>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Bắc">Bắc</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Hình Ảnh">
          <Upload
            beforeUpload={() => false}
            multiple
            onChange={handleImageUpload}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {room?.images &&
              room.images.map((file, index) => (
                <div key={index} className="relative">
                  <Image
                    src={file.url}
                    alt={`image-${index}`}
                    className="w-32"
                  />
                  <Checkbox
                    className="absolute top-2 left-2"
                    checked={removeImageIds.includes(file.publicId)}
                    onChange={() => handleRemoveImage(file.publicId)}
                  >
                    Xóa
                  </Checkbox>
                </div>
              ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateRoomModal;
