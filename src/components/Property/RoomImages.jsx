import { Carousel } from "antd";

const RoomImages = ({
  images,
  selectedImage,
  setSelectedImage,
  carouselRef,
}) => (
  <div className="w-1/2">
    <Carousel
      autoplay
      dots={false}
      arrows
      infinite={false}
      beforeChange={(_, newIndex) => setSelectedImage(newIndex)}
      ref={carouselRef}
    >
      {images.map((image, index) => (
        <div key={index} className="flex justify-center">
          <img
            src={image.url}
            alt={`Room ${index + 1}`}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
      ))}
    </Carousel>
    <div className="flex gap-2 mt-3 overflow-x-auto">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={`Thumb ${index + 1}`}
          className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
            selectedImage === index ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => {
            setSelectedImage(index);
            carouselRef.current.goTo(index);
          }}
        />
      ))}
    </div>
  </div>
);

export default RoomImages;
