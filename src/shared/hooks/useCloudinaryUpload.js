import { useState } from "react";
import { cloudinaryService } from "../services/cloudinaryApi";

/**
 * Custom hook for handling Cloudinary image uploads
 */
export const useCloudinaryUpload = (folder = "profile_pics") => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file, onProgress) => {
    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Step 1: Get signature from backend
      const sigData = await cloudinaryService.getSignature(folder);

      // Step 2: Upload to Cloudinary with progress callback
      const secureUrl = await cloudinaryService.uploadFile(
        file,
        sigData,
        (percent) => {
          setUploadProgress(percent);
          if (onProgress) onProgress(percent);
        },
      );

      setUploadProgress(100);
      return { success: true, url: secureUrl };
    } catch (err) {
      const errorMsg = err.message || "Failed to upload image";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setUploading(false);
      // Clear progress after brief delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return {
    uploading,
    uploadProgress,
    error,
    uploadFile,
    setError,
  };
};

export default useCloudinaryUpload;
