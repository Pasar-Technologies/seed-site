import React, { useState } from "react";

const JsonDataImporter = ({ onImport }) => {
  const [showImporter, setShowImporter] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState(null);

  const DEFAULT_SCHEDULE = [
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

  const handleImport = () => {
    try {
      setError(null);
      const data = JSON.parse(jsonInput);

      let scheduleData = DEFAULT_SCHEDULE;
      if (data.schedule && Array.isArray(data.schedule)) {
        scheduleData = data.schedule.map((daySchedule, index) => ({
          day: daySchedule.day || DEFAULT_SCHEDULE[index].day,
          isOpen: daySchedule.isOpen ?? DEFAULT_SCHEDULE[index].isOpen,
          start: {
            hour: daySchedule.start?.hour ?? DEFAULT_SCHEDULE[index].start.hour,
            minute:
              daySchedule.start?.minute ?? DEFAULT_SCHEDULE[index].start.minute,
          },
          end: {
            hour: daySchedule.end?.hour ?? DEFAULT_SCHEDULE[index].end.hour,
            minute:
              daySchedule.end?.minute ?? DEFAULT_SCHEDULE[index].end.minute,
          },
        }));
      }

      const addressFields = {
        houseOrFlat: data.address?.houseOrFlat || data.houseOrFlat || "",
        street: data.address?.street || data.street || "",
        area: data.address?.area || data.area || "",
        city: data.address?.city || data.city || "",
        district: data.address?.district || data.district || "",
        state: data.address?.state || data.state || "",
        pincode: data.address?.pincode || data.pincode || "",
        country: data.address?.country || data.country || "India",
      };

      const geoLocation = data.address?.geoLocation ||
        data.geoLocation || {
          type: "Point",
          coordinates: [0, 0],
        };
      if (geoLocation.coordinates && geoLocation.coordinates.length === 2) {
        geoLocation.coordinates = [
          parseFloat(geoLocation.coordinates[0]) || 0,
          parseFloat(geoLocation.coordinates[1]) || 0,
        ];
      }

      const adType =
        data.adType ||
        (data.stockType || data.stockPrices ? "stockad" : "adlisting");
      const title = data.title || "";
      const category = data.category || "";
      const description = data.description || "";
      const media = {
        video: data.media?.video || "",
        images: data.media?.images || [],
      };

      let adListingData = null;
      let stockAdData = null;

      if (adType === "adlisting") {
        adListingData = {
          title,
          category,
          description,
          media,
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
      } else if (adType === "stockad") {
        stockAdData = {
          title,
          category,
          description,
          media,
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
      }

      const importData = {
        registration: {
          fullName: data.fullName || "",
          phone: data.phone || "",
          email: data.email || "",
          password: data.password || "",
          accountType: "individual",
        },
        userDetails: {
          profilePic: data.profilePic || "",
          gender: data.gender || "",
          dob: data.dob || "",
          languages:
            Array.isArray(data.languages) && data.languages.length > 0
              ? data.languages
              : getRandomLanguages(),
          schedule: scheduleData,
        },
        address: { ...addressFields, geoLocation },
        adType,
      };

      if (adType === "adlisting") importData.adlisting = adListingData;
      else if (adType === "stockad") importData.stockad = stockAdData;

      onImport(importData);
      setShowImporter(false);
      setJsonInput("");
      setError(null);
    } catch (err) {
      setError(
        "Invalid JSON format. Please check your input and try again.\n" +
          err.message,
      );
    }
  };

  // ─── Common base data ────────────────────────────────────────────────────────
  const commonData = {
    fullName: "John Doe",
    phone: "9876543210",
    gender: "male",
    dob: "1990-01-15",
    address: {
      houseOrFlat: "Apt 101",
      street: "MG Road",
      area: "Koramangala",
      city: "Bangalore",
      district: "Bangalore Urban",
      pincode: "560034",
    },
    geoLocation: { type: "Point", coordinates: [77.6117, 12.9352] },
  };

  // ─── 4 Sample data objects ───────────────────────────────────────────────────

  // 1. Ad Listing — Goods (no experience, no budgetFrequency)
  const sampleAdListingGoodsJson = {
    ...commonData,
    fullName: "Rahul Sharma",
    phone: "9812345670",
    gender: "male",
    dob: "1988-03-22",
    address: {
      houseOrFlat: "12B",
      street: "Park Street",
      area: "Salt Lake",
      city: "Kolkata",
      district: "Kolkata",
      pincode: "700091",
    },
    geoLocation: { type: "Point", coordinates: [88.3639, 22.5726] },
    adType: "adlisting",
    title: "Brand New Office Chairs - Bulk Lot Available",
    category: "furniture",
    product: "goods",
    budget: { min: 2000, max: 5000 },
    description:
      "Selling a batch of brand new ergonomic office chairs. Ideal for offices, co-working spaces, or institutions. Available in bulk quantity.",
  };

  // 2. Ad Listing — Service (with experience & budgetFrequency)
  const sampleAdListingServiceJson = {
    ...commonData,
    fullName: "Priya Nair",
    phone: "9923456781",
    gender: "female",
    dob: "1993-07-10",
    address: {
      houseOrFlat: "Flat 302",
      street: "Linking Road",
      area: "Bandra West",
      city: "Mumbai",
      district: "Mumbai Suburban",
      pincode: "400050",
    },
    geoLocation: { type: "Point", coordinates: [72.8347, 19.0596] },
    adType: "adlisting",
    title: "Professional Graphic Designer for Hire",
    category: "creative & design",
    product: "service",
    budget: { min: 500, max: 1500 },
    budgetFrequency: "hourly",
    experience: 5,
    description:
      "Experienced graphic designer offering branding, social media creatives, and print design services. Available for freelance and long-term projects.",
  };

  // 3. Stock Ad — FMCG (with stockExp)
  const sampleStockFmcgJson = {
    ...commonData,
    fullName: "Amit Verma",
    phone: "9734567892",
    gender: "male",
    dob: "1985-11-05",
    address: {
      houseOrFlat: "Shop 7",
      street: "Gandhi Nagar Market",
      area: "Karol Bagh",
      city: "Delhi",
      district: "Central Delhi",
      pincode: "110005",
    },
    geoLocation: { type: "Point", coordinates: [77.1855, 28.6519] },
    adType: "stockad",
    title: "Parle-G Biscuits - Wholesale Stock",
    category: "food & beverages",
    stockType: "fmcg",
    brandName: "Parle",
    stockMfg: "2025-03-01",
    stockExp: "2026-02-28",
    mrp: 10,
    unit: "Pkt",
    stockPrices: [
      { moq: 200, price: 8 },
      { moq: 500, price: 7.5 },
      { moq: 1000, price: 7 },
    ],
    description:
      "Fresh batch of Parle-G biscuits available for wholesale. Ideal for distributors, kirana stores, and supermarkets. Delivery available within Delhi NCR.",
  };

  // 4. Stock Ad — Non-FMCG (no stockExp)
  const sampleStockNonFmcgJson = {
    ...commonData,
    fullName: "Sunita Patel",
    phone: "9645678903",
    gender: "female",
    dob: "1979-06-18",
    address: {
      houseOrFlat: "Unit 15",
      street: "GIDC Industrial Estate",
      area: "Vatva",
      city: "Ahmedabad",
      district: "Ahmedabad",
      pincode: "382445",
    },
    geoLocation: { type: "Point", coordinates: [72.6369, 22.9716] },
    adType: "stockad",
    title: "Stainless Steel Kitchen Utensils - Bulk Stock",
    category: "home & kitchen",
    stockType: "nonfmcg",
    brandName: "SteelCraft",
    stockMfg: "2024-10-01",
    mrp: 350,
    unit: "Set",
    stockPrices: [
      { moq: 50, price: 290 },
      { moq: 150, price: 270 },
      { moq: 300, price: 250 },
    ],
    description:
      "High-quality stainless steel kitchen utensil sets available in bulk. Suitable for retailers, wholesalers, and corporate gifting. No expiry — durable and long-lasting.",
  };

  // ─── Sample config for rendering buttons + detail panels ────────────────────
  const SAMPLES = [
    {
      key: "adlisting-goods",
      icon: "🛒",
      label: "Ad Listing (Goods)",
      data: sampleAdListingGoodsJson,
    },
    {
      key: "adlisting-service",
      icon: "🛠️",
      label: "Ad Listing (Service)",
      data: sampleAdListingServiceJson,
    },
    {
      key: "stockad-fmcg",
      icon: "📦",
      label: "Stock Ad (FMCG)",
      data: sampleStockFmcgJson,
    },
    {
      key: "stockad-nonfmcg",
      icon: "🔩",
      label: "Stock Ad (Non-FMCG)",
      data: sampleStockNonFmcgJson,
    },
  ];

  const copySampleJson = (data) => {
    setJsonInput(JSON.stringify(data, null, 2));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setJsonInput(e.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="mb-6 max-w-2xl mx-auto">
      {!showImporter ? (
        <button
          onClick={() => setShowImporter(true)}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Import JSON Data (Ad Listing / Stock Ad)
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Import JSON Data
            </h3>
            <button
              onClick={() => {
                setShowImporter(false);
                setError(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Paste your JSON data or upload a JSON file to automatically fill all
            form fields. Supports both Ad Listing and Stock Ad formats.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded whitespace-pre-wrap text-sm">
              {error}
            </div>
          )}

          {/* File Upload */}
          <div className="mb-4">
            <label className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition duration-200">
              <svg
                className="w-5 h-5 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Upload JSON File
              </span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Textarea */}
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
            placeholder='{"fullName": "John Doe", "phone": "9876543210", "adType": "adlisting", ...}'
          />

          {/* Action Buttons */}
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleImport}
              disabled={!jsonInput.trim()}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            >
              Import Data
            </button>
            <button
              onClick={() => {
                setShowImporter(false);
                setJsonInput("");
                setError(null);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
          </div>

          {/* ── 4 Collapsible JSON Example Panels ── */}
          <div className="mt-4 space-y-2">
            {SAMPLES.map(({ key, icon, label, data }) => (
              <details key={key}>
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium select-none">
                  {icon} View {label} JSON Example
                </summary>
                <div className="mt-2 relative">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify(data, null, 2),
                      );
                      alert(`${label} JSON copied to clipboard!`);
                    }}
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-700 px-3 py-1 rounded border border-gray-300 text-xs font-medium transition"
                  >
                    📋 Copy
                  </button>
                  <pre className="p-3 bg-gray-50 rounded text-xs overflow-x-auto border border-gray-200">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonDataImporter;
