/**
 * Image utility functions for cropping and processing
 */

// Get cropped image as blob
export const getCroppedImg = (image, crop) => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/jpeg",
      0.95,
    );
  });
};

// Validate image file
export const validateImageFile = (file) => {
  const errors = [];

  if (!file.type.startsWith("image/")) {
    errors.push("Please select a valid image file");
  }

  if (file.size > 5 * 1024 * 1024) {
    errors.push("Image size should be less than 5MB");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Load image file as data URL
export const loadImageAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
