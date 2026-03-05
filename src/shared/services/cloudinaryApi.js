import axios from "axios";
import axiosClient from "./axiosClient";

// Allowed folder values per API docs MEDIA_CONSTANTS.ALLOWED_FOLDERS
export const CLOUDINARY_FOLDERS = {
  profilePics: "profile_pics",
  userIdProofs: "user_id_proofs",
  businessIdProofs: "business_id_proofs",
  adImages: "ad_images",
  adVideos: "ad_videos",
  businessMedia: "business_media",
};

export const cloudinaryService = {
  // GET /utility/media/cloudinary-signature/:folder
  // Returns { data: { timestamp, signature, apiKey, cloudName, folder } }
  getSignature: async (folder) => {
    const { data } = await axiosClient.get(
      `/utility/media/cloudinary-signature/${folder}`,
    );
    return data.data; // unwrap envelope → { timestamp, signature, apiKey, cloudName, folder }
  },

  uploadFile: async (file, sig, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", sig.timestamp);
    formData.append("signature", sig.signature);
    formData.append("api_key", sig.apiKey);
    formData.append("folder", sig.folder);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/upload`,
      formData,
      {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          if (onProgress) onProgress(percent);
        },
      },
    );
    return data.secure_url;
  },
};
