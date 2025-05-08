import { useState, useEffect } from "react";

interface Props {
  images: string[];
  mainImage: string;
}

export default function ProductImageGallery({ images, mainImage }: Props) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  // تحديث selectedImage عندما تتغير mainImage
  useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage]);

  // إزالة التكرار لو mainImage ضمن images
  const uniqueImages = Array.from(new Set([mainImage, ...images]));

  return (
    <div>
      <img
        src={selectedImage}
        alt="Main product"
        className="w-full h-80 object-cover rounded mb-4"
        loading="lazy"
      />
      <div className="flex gap-2 overflow-x-auto">
        {uniqueImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i}`}
            onClick={() => setSelectedImage(img)}
            className={`h-20 w-20 object-cover rounded border cursor-pointer transition duration-200 ${
              selectedImage === img ? "border-blue-500 scale-105" : "border-gray-300"
            }`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}