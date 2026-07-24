import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images || [];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-[500px]">
      <img
        className="w-full h-[500px] object-cover"
        src={images[activeImage]}
      />
      <div className="w-full h-[100px] flex justify-center items-center gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setActiveImage(index)}
            className={`w-[80px] h-[80px] object-cover cursor-pointer ${
              activeImage === index ? "border-[2px] border-accent" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
