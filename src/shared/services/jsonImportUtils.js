/**
 * Constants and utilities for JSON data import
 */

export const DEFAULT_SCHEDULE = [
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
];

export const AVAILABLE_LANGUAGES = [
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

/**
 * Get random languages for default data
 */
export const getRandomLanguages = () => {
  const count = Math.random() < 0.5 ? 2 : 3;
  const shuffled = [...AVAILABLE_LANGUAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Parse and transform schedule from import data
 */
export const parseSchedule = (scheduleData) => {
  if (!scheduleData || !Array.isArray(scheduleData)) {
    return DEFAULT_SCHEDULE;
  }

  return scheduleData.map((daySchedule, index) => ({
    day: daySchedule.day || DEFAULT_SCHEDULE[index]?.day || "",
    isOpen: daySchedule.isOpen ?? DEFAULT_SCHEDULE[index]?.isOpen ?? true,
    start: {
      hour:
        daySchedule.start?.hour ?? DEFAULT_SCHEDULE[index]?.start?.hour ?? 9,
      minute:
        daySchedule.start?.minute ??
        DEFAULT_SCHEDULE[index]?.start?.minute ??
        0,
    },
    end: {
      hour: daySchedule.end?.hour ?? DEFAULT_SCHEDULE[index]?.end?.hour ?? 17,
      minute:
        daySchedule.end?.minute ?? DEFAULT_SCHEDULE[index]?.end?.minute ?? 0,
    },
  }));
};

/**
 * Parse address fields from import data
 */
export const parseAddressFields = (data) => {
  return {
    houseOrFlat: data?.houseOrFlat || data?.address?.houseOrFlat || "",
    street: data?.street || data?.address?.street || "",
    area: data?.area || data?.address?.area || "",
    city: data?.city || data?.address?.city || "",
    district: data?.district || data?.address?.district || "",
    state: data?.state || data?.address?.state || "Karnataka",
    pincode: data?.pincode || data?.address?.pincode || "",
    country: data?.country || data?.address?.country || "India",
  };
};

/**
 * Parse geo location from import data
 */
export const parseGeoLocation = (data) => {
  const geoLocation = data?.geoLocation ||
    data?.address?.geoLocation || {
      type: "Point",
      coordinates: [0, 0],
    };

  if (
    geoLocation.coordinates &&
    geoLocation.coordinates.length === 2 &&
    Array.isArray(geoLocation.coordinates)
  ) {
    geoLocation.coordinates = [
      parseFloat(geoLocation.coordinates[0]) || 0,
      parseFloat(geoLocation.coordinates[1]) || 0,
    ];
  }

  return geoLocation;
};

/**
 * Determine ad type from import data
 */
export const determineAdType = (data) => {
  if (data.adType) return data.adType;
  if (data.stockType || data.stockPrices) return "stockad";
  if (data.sellingPrice !== undefined || data.purchasePrice !== undefined) return "resellad";
  return "adlisting";
};

/**
 * Parse ad listing data
 */
export const parseAdListingData = (data) => {
  const adListingData = {
    title: data.title || "",
    category: data.category || "",
    description: data.description || "",
    media: {
      video: data.media?.video || "",
      images: data.media?.images || [],
    },
    product: data.product || "",
    budgetFrequency: data.budgetFrequency || "daily",
    experience: data.experience || "",
    budget: { min: "", max: "" },
  };

  const budgetData = data.budget;
  if (budgetData) {
    if (typeof budgetData === "object" && budgetData.min !== undefined) {
      adListingData.budget = {
        min: budgetData.min?.toString() || "",
        max: budgetData.max?.toString() || "",
      };
    } else if (
      typeof budgetData === "string" ||
      typeof budgetData === "number"
    ) {
      const budgetValue = budgetData.toString();
      adListingData.budget = { min: budgetValue, max: budgetValue };
    }
  }

  return adListingData;
};

/**
 * Parse stock ad data
 */
export const parseStockAdData = (data) => {
  const stockAdData = {
    title: data.title || "",
    category: data.category || "",
    description: data.description || "",
    media: {
      video: data.media?.video || "",
      images: data.media?.images || [],
    },
    stockType: data.stockType || "",
    brandName: data.brandName || "",
    stockMfg: data.stockMfg || "",
    mrp: data.mrp || "",
    unit: data.unit || "",
    stockExp: data.stockExp || "",
    stockPrices: [],
  };

  if (data.stockPrices && Array.isArray(data.stockPrices)) {
    stockAdData.stockPrices = data.stockPrices.slice(0, 3).map((sp) => ({
      moq: sp.moq?.toString() || "",
      price: sp.price?.toString() || "",
    }));
  } else {
    stockAdData.stockPrices = [{ moq: "", price: "" }];
  }

  return stockAdData;
};

/**
 * Parse resell ad data
 */
export const parseResellAdData = (data) => {
  return {
    title: data.title || "",
    category: data.category || "",
    description: data.description || "",
    media: {
      video: data.media?.video || "",
      images: data.media?.images || [],
    },
    withInvoice: data.withInvoice ?? false,
    underWarranty: data.underWarranty ?? false,
    purchaseDate: data.purchaseDate || "",
    purchasePrice: data.purchasePrice?.toString() || "",
    sellingPrice: data.sellingPrice?.toString() || "",
  };
};

/**
 * Transform raw import data into structured format
 */
export const transformImportData = (rawData) => {
  const scheduleData = parseSchedule(rawData.schedule);
  const addressFields = parseAddressFields(rawData);
  const geoLocation = parseGeoLocation(rawData);
  const adType = determineAdType(rawData);

  const importData = {
    registration: {
      fullName: rawData.fullName || "",
      phone: rawData.phone || "",
      accountType: "individual",
    },
    userDetails: {
      profilePic: rawData.profilePic || "",
      gender: rawData.gender || "",
      dob: rawData.dob || "",
      languages:
        Array.isArray(rawData.languages) && rawData.languages.length > 0
          ? rawData.languages
          : getRandomLanguages(),
      schedule: scheduleData,
    },
    address: { ...addressFields, geoLocation },
    adType,
  };

  if (adType === "adlisting") {
    importData.adlisting = parseAdListingData(rawData);
  } else if (adType === "stockad") {
    importData.stockad = parseStockAdData(rawData);
  } else if (adType === "resellad") {
    importData.resellad = parseResellAdData(rawData);
  }

  return importData;
};
