/**
 * Sample JSON data for testing imports
 */

const COMMON_BASE_DATA = {
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

// 1. Ad Listing — Goods
export const SAMPLE_AD_LISTING_GOODS = {
  ...COMMON_BASE_DATA,
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

// 2. Ad Listing — Service
export const SAMPLE_AD_LISTING_SERVICE = {
  ...COMMON_BASE_DATA,
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

// 3. Stock Ad — FMCG
export const SAMPLE_STOCK_AD_FMCG = {
  ...COMMON_BASE_DATA,
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

// 4. Stock Ad — Non-FMCG
export const SAMPLE_STOCK_AD_NON_FMCG = {
  ...COMMON_BASE_DATA,
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
  stockType: "nonFmcg",
  brandName: "SteelCraft",
  stockMfg: "2024-10-01",
  mrp: 350,
  unit: "Pcs",
  stockPrices: [
    { moq: 50, price: 290 },
    { moq: 150, price: 270 },
    { moq: 300, price: 250 },
  ],
  description:
    "High-quality stainless steel kitchen utensil sets available in bulk. Suitable for retailers, wholesalers, and corporate gifting. No expiry — durable and long-lasting.",
};

// 5. Resell Ad
export const SAMPLE_RESELL_AD = {
  ...COMMON_BASE_DATA,
  fullName: "Vikram Reddy",
  phone: "9556789014",
  gender: "male",
  dob: "1991-08-25",
  address: {
    houseOrFlat: "Flat 204",
    street: "Jubilee Hills Road No. 36",
    area: "Jubilee Hills",
    city: "Hyderabad",
    district: "Hyderabad",
    pincode: "500033",
  },
  geoLocation: { type: "Point", coordinates: [78.4067, 17.4319] },
  adType: "resellad",
  title: "MacBook Pro 14\" M3 Pro - Like New",
  category: "electronics",
  withInvoice: true,
  underWarranty: true,
  purchaseDate: "2024-06-15",
  purchasePrice: 199900,
  sellingPrice: 159000,
  description:
    "Selling my MacBook Pro 14-inch with M3 Pro chip, 18GB RAM, 512GB SSD. Purchased from Apple Store with original invoice. AppleCare+ valid till June 2026. Mint condition, barely used.",
};

// Sample config for rendering buttons
export const SAMPLE_DATA_CONFIG = [
  {
    key: "adlisting-goods",
    icon: "🛒",
    label: "Ad Listing (Goods)",
    data: SAMPLE_AD_LISTING_GOODS,
  },
  {
    key: "adlisting-service",
    icon: "🛠️",
    label: "Ad Listing (Service)",
    data: SAMPLE_AD_LISTING_SERVICE,
  },
  {
    key: "stockad-fmcg",
    icon: "📦",
    label: "Stock Ad (FMCG)",
    data: SAMPLE_STOCK_AD_FMCG,
  },
  {
    key: "stockad-nonfmcg",
    icon: "🔩",
    label: "Stock Ad (Non-FMCG)",
    data: SAMPLE_STOCK_AD_NON_FMCG,
  },
  {
    key: "resellad",
    icon: "🔄",
    label: "Resell Ad",
    data: SAMPLE_RESELL_AD,
  },
];

export const ALL_SAMPLES = {
  adListingGoods: SAMPLE_AD_LISTING_GOODS,
  adListingService: SAMPLE_AD_LISTING_SERVICE,
  stockAdFmcg: SAMPLE_STOCK_AD_FMCG,
  stockAdNonFmcg: SAMPLE_STOCK_AD_NON_FMCG,
  resellAd: SAMPLE_RESELL_AD,
};
