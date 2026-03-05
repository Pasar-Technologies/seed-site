import { useState } from "react";
import { cloudinaryService, CLOUDINARY_FOLDERS } from "../../shared/services/cloudinaryApi";
import authApi from "./authApi";
import { usersApi } from "../users/usersApi";
import { addressApi } from "../address/addressApi";
import { adPostApi } from "../ads/listingsApi";

export const useRegistration = () => {
  const [step, setStep] = useState("initial");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [otpFromServer, setOtpFromServer] = useState(null);
  const [createdAddressId, setCreatedAddressId] = useState(null);
  const [selectedAdType, setSelectedAdType] = useState("adlisting");

  const [createdAdId, setCreatedAdId] = useState(null);
  const [adPlans, setAdPlans] = useState(null);

  // Function to select random languages
  const getRandomLanguages = () => {
    const availableLanguages = [
      "English",
      "Hindi",
      "Bengali",
      "Telugu",
      "Marathi",
      "Tamil",
      "Gujarati",
      "Urdu",
      "Kannada",
      "Malayalam",
      "Punjabi",
    ];

    const count = Math.random() < 0.5 ? 2 : 3;
    const shuffled = [...availableLanguages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    accountType: "individual",
  });

  const [otpData, setOtpData] = useState({
    otp: "",
  });

  const [userDetails, setUserDetails] = useState({
    profilePic: "",
    gender: "",
    dob: "",
    languages: getRandomLanguages(),
    schedule: [
      {
        day: "Monday",
        isOpen: true,
        start: { hour: 9, minute: 0 },
        end: { hour: 17, minute: 0 },
      },
      {
        day: "Tuesday",
        isOpen: true,
        start: { hour: 9, minute: 0 },
        end: { hour: 17, minute: 0 },
      },
      {
        day: "Wednesday",
        isOpen: true,
        start: { hour: 9, minute: 0 },
        end: { hour: 17, minute: 0 },
      },
      {
        day: "Thursday",
        isOpen: true,
        start: { hour: 9, minute: 0 },
        end: { hour: 17, minute: 0 },
      },
      {
        day: "Friday",
        isOpen: true,
        start: { hour: 9, minute: 0 },
        end: { hour: 17, minute: 0 },
      },
      {
        day: "Saturday",
        isOpen: true,
        start: { hour: 9, minute: 0 },
        end: { hour: 17, minute: 0 },
      },
      {
        day: "Sunday",
        isOpen: false,
        start: { hour: 9, minute: 0 },
        end: { hour: 17, minute: 0 },
      },
    ],
  });

  const [addressData, setAddressData] = useState({
    houseOrFlat: "",
    street: "",
    area: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    country: "India",
    geoLocation: {
      type: "Point",
      coordinates: [0, 0],
    },
  });

  const [uploadProgress, setUploadProgress] = useState({});

  // Ad Listing specific data
  const [adListingData, setAdListingData] = useState({
    title: "",
    category: "",
    product: "", // "goods" or "service"
    budget: {
      min: "",
      max: "",
    },
    budgetFrequency: "daily", // "hourly", "daily", "weekly", "monthly", "yearly"
    description: "",
    experience: "", // only for product == "service"
    media: {
      video: "",
      images: [],
    },
  });

  // Stock Ad specific data
  const [stockAdData, setStockAdData] = useState({
    title: "",
    category: "",
    description: "",
    stockType: "", // "fmcg" or "nonFmcg"
    brandName: "",
    stockMfg: "", // required - Date
    mrp: "",
    unit: "", // 'Gram', 'Kg', 'Ltr', 'Ml', 'Pkt', 'Pcs', 'Box', 'Dzn', 'Nos', 'Pair', 'Mtr', 'Ft', 'SqFt', 'Roll', 'Bndl'
    stockPrices: [
      // required - at least 1 entry, max 3
      // { moq: Number, price: Number }
    ],
    stockExp: "", // Date - optional
    media: {
      video: "",
      images: [],
    },
  });

  // Resell Ad specific data
  const [resellAdData, setResellAdData] = useState({
    title: "",
    category: "",
    description: "",
    withInvoice: false,
    underWarranty: false,
    purchaseDate: "",
    purchasePrice: "",
    sellingPrice: "",
    media: {
      video: "",
      images: [],
    },
  });

  const handleRegistration = () =>
    execAsync(async () => {
      const res = await authApi.register(registrationData);
      // Dev: server may echo OTP in response.data.otp
      if (res?.data?.otp) setOtpFromServer(res.data.otp);
      setStep("otp");
    });

  const handleOTPVerification = () =>
    execAsync(async () => {
      await authApi.verifyRegister({
        phone: registrationData.phone,
        otp: otpData.otp,
      });
      // Token is saved inside authApi.verifyRegister
      setSuccessMessage("OTP verified successfully!");
      setStep("userDetails");
    });

  const handleResendOTP = async () =>
    execAsync(async () => {
      const res = await authApi.register(registrationData);
      if (res?.data?.otp) setOtpFromServer(res.data.otp);
      setSuccessMessage("OTP resent successfully!");
    });

  const handleUserDetailsSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const personalData = {};
      if (userDetails.profilePic)
        personalData.profilePic = userDetails.profilePic;
      if (userDetails.gender) personalData.gender = userDetails.gender;
      if (userDetails.dob) personalData.dob = userDetails.dob;

      if (Object.keys(personalData).length > 0) {
        await usersApi.updatePersonalInfo(personalData);
      }

      if (userDetails.languages.length > 0) {
        await usersApi.updateLanguages(userDetails.languages);
      }

      if (userDetails.schedule.length > 0) {
        await usersApi.updateSchedule(userDetails.schedule);
      }

      setSuccessMessage("Profile details saved successfully!");
      setStep("address");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update user details",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await addressApi.createAddress(addressData);
      // addressApi.createAddress returns res.data (the envelope)
      if (response?.data?._id) {
        setCreatedAddressId(response.data._id);
      }

      setSuccessMessage("Address saved successfully!");
      setStep("adlisting");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to create address",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdListingSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const adData = {
        addressId: createdAddressId,
        geoLocation: addressData.geoLocation,
        media: {
          video: "",
          images: [],
        },
      };

      // Build ad data based on selected ad type
      if (selectedAdType === "adlisting") {
        adData.title = adListingData.title;
        adData.category = adListingData.category;
        adData.description = adListingData.description;
        adData.product = adListingData.product;
        adData.budget = {
          min: parseFloat(adListingData.budget.min),
          max: parseFloat(adListingData.budget.max),
        };
        adData.budgetFrequency = adListingData.budgetFrequency;
        adData.media = {
          video: adListingData.media.video || "",
          images: adListingData.media.images.filter((img) => img),
        };

        // Only add experience if product type is service and experience is provided
        if (
          adListingData.product === "service" &&
          adListingData.experience &&
          adListingData.experience !== ""
        ) {
          adData.experience = parseFloat(adListingData.experience);
        }
      } else if (selectedAdType === "stockad") {
        adData.title = stockAdData.title;
        adData.category = stockAdData.category;
        adData.description = stockAdData.description;
        adData.stockType = stockAdData.stockType;
        adData.brandName = stockAdData.brandName;
        adData.stockMfg = new Date(stockAdData.stockMfg).toISOString(); // required
        adData.mrp = parseFloat(stockAdData.mrp);
        adData.unit = stockAdData.unit;
        adData.media = {
          video: stockAdData.media.video || "",
          images: stockAdData.media.images.filter((img) => img),
        };

        // Add stockExp if provided (optional)
        if (stockAdData.stockExp) {
          adData.stockExp = new Date(stockAdData.stockExp).toISOString();
        }

        // Add stockPrices array - at least 1 required, max 3 entries
        if (stockAdData.stockPrices && stockAdData.stockPrices.length > 0) {
          adData.stockPrices = stockAdData.stockPrices
            .slice(0, 3) // max 3 entries
            .map((sp) => ({
              moq: parseInt(sp.moq),
              price: parseFloat(sp.price),
            }))
            .filter((sp) => sp.moq && sp.price); // only include valid entries
        }
      } else if (selectedAdType === "resellad") {
        adData.title = resellAdData.title;
        adData.category = resellAdData.category;
        adData.description = resellAdData.description;
        adData.withInvoice = resellAdData.withInvoice;
        adData.underWarranty = resellAdData.underWarranty;
        adData.purchaseDate = new Date(resellAdData.purchaseDate).toISOString();
        adData.purchasePrice = parseFloat(resellAdData.purchasePrice);
        adData.sellingPrice = parseFloat(resellAdData.sellingPrice);
        adData.media = {
          video: resellAdData.media.video || "",
          images: resellAdData.media.images.filter((img) => img),
        };
      }

      // adPostApi.createAd returns the unwrapped ad object (data.data)
      const createdAd = await adPostApi.createAd(selectedAdType, adData);

      if (createdAd?._id) {
        setCreatedAdId(createdAd._id);
        // Fetch billing plans to let user pick one
        const plans = await adPostApi.getPlans();
        setAdPlans(plans);
      }

      setSuccessMessage("Ad created successfully! Now choose your plan.");
      setStep("adplans");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to create ad listing",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, type, index = null) => {
    const progressKey = index !== null ? `${type}_${index}` : type;

    // Show local preview immediately
    const localPreviewUrl = URL.createObjectURL(file);
    const setCurrentAdData = (setter) => setter((prev) => {
      if (type === "video") return { ...prev, media: { ...prev.media, video: localPreviewUrl } };
      const newImages = [...prev.media.images];
      newImages[index] = localPreviewUrl;
      return { ...prev, media: { ...prev.media, images: newImages } };
    });
    if (selectedAdType === "adlisting") setCurrentAdData(setAdListingData);
    else if (selectedAdType === "stockad") setCurrentAdData(setStockAdData);
    else if (selectedAdType === "resellad") setCurrentAdData(setResellAdData);

    try {
      setError(null);
      setUploadProgress((prev) => ({ ...prev, [progressKey]: 1 }));

      // 1. Get Signature from backend
      const folder = type === "video" ? CLOUDINARY_FOLDERS.adVideos : CLOUDINARY_FOLDERS.adImages;
      const sigData = await cloudinaryService.getSignature(folder);

      // 2. Upload to Cloudinary with progress callback
      const secureUrl = await cloudinaryService.uploadFile(
        file,
        sigData,
        (percent) => {
          setUploadProgress((prev) => ({ ...prev, [progressKey]: percent }));
        },
      );

      // 3. Update state based on type and selected ad type
      if (selectedAdType === "adlisting") {
        setAdListingData((prev) => {
          if (type === "video") {
            return { ...prev, media: { ...prev.media, video: secureUrl } };
          } else {
            const newImages = [...prev.media.images];
            newImages[index] = secureUrl;
            return { ...prev, media: { ...prev.media, images: newImages } };
          }
        });
      } else if (selectedAdType === "stockad") {
        setStockAdData((prev) => {
          if (type === "video") {
            return { ...prev, media: { ...prev.media, video: secureUrl } };
          } else {
            const newImages = [...prev.media.images];
            newImages[index] = secureUrl;
            return { ...prev, media: { ...prev.media, images: newImages } };
          }
        });
      } else if (selectedAdType === "resellad") {
        setResellAdData((prev) => {
          if (type === "video") {
            return { ...prev, media: { ...prev.media, video: secureUrl } };
          } else {
            const newImages = [...prev.media.images];
            newImages[index] = secureUrl;
            return { ...prev, media: { ...prev.media, images: newImages } };
          }
        });
      }
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      // Clear progress bar after brief delay
      setTimeout(() => {
        setUploadProgress((prev) => {
          const next = { ...prev };
          delete next[progressKey];
          return next;
        });
      }, 2000);
    }
  };

  const handleAdPlansSubmit = async (plansData) => {
    try {
      setLoading(true);
      setError(null);

      // plansData should be { planId: "..." }
      await adPostApi.applyPlan(selectedAdType, createdAdId, plansData.planId);

      setSuccessMessage("Plans applied successfully! Registration complete.");
      setStep("complete");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to apply plans",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkipAdListing = () => {
    setStep("complete");
  };

  const execAsync = async (callback) => {
    setLoading(true);
    setError(null);
    try {
      await callback();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    loading,
    error,
    successMessage,
    handleResendOTP,
    otpData,
    setOtpData,
    handleFileUpload,
    otpFromServer,
    registrationData,
    setRegistrationData,
    userDetails,
    setUserDetails,
    addressData,
    setAddressData,
    adListingData,
    setAdListingData,
    stockAdData,
    setStockAdData,
    resellAdData,
    setResellAdData,
    uploadProgress,
    handleRegistration,
    handleOTPVerification,
    handleUserDetailsSubmit,
    handleAddressSubmit,
    handleAdListingSubmit,
    handleSkipAdListing,
    createdAdId,
    adPlans,
    handleAdPlansSubmit,
    selectedAdType,
    setSelectedAdType,
  };
};
