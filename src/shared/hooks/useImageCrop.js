import { useState } from "react";

/**
 * Custom hook for managing image crop state and operations
 */
export const useImageCrop = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 80,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const resetCrop = () => {
    setSelectedImage(null);
    setCompletedCrop(null);
    setCrop({
      unit: "%",
      width: 80,
      aspect: 1,
    });
  };

  const startCrop = (imageDataUrl) => {
    setSelectedImage(imageDataUrl);
  };

  return {
    selectedImage,
    crop,
    completedCrop,
    setSelectedImage,
    setCrop,
    setCompletedCrop,
    resetCrop,
    startCrop,
  };
};

export default useImageCrop;
