import React from "react";
import {
  Alert,
  Button,
  Select,
  TextInput,
  FormGroup,
  FormRow,
  Label,
} from "../../shared/components/common";

const AdUploadForm = ({
  adListingData,
  setAdListingData,
  stockAdData,
  setStockAdData,
  resellAdData,
  setResellAdData,
  selectedAdType,
  setSelectedAdType,
  onSubmit,
  onSkip,
  onFileUpload,
  uploadProgress,
  loading,
  error,
}) => {
  const PRODUCT_TYPES = ["goods", "service"];
  const STOCK_TYPES = ["fmcg", "nonFmcg"];
  const UNITS = [
    "Gram",
    "Kg",
    "Ltr",
    "Ml",
    "Pkt",
    "Pcs",
    "Box",
    "Dzn",
    "Nos",
    "Pair",
    "Mtr",
    "Ft",
    "SqFt",
    "Roll",
    "Bndl",
  ];

  // Get current data based on selected ad type
  const currentData =
    selectedAdType === "adlisting"
      ? adListingData
      : selectedAdType === "stockad"
        ? stockAdData
        : resellAdData;
  const setCurrentData =
    selectedAdType === "adlisting"
      ? setAdListingData
      : selectedAdType === "stockad"
        ? setStockAdData
        : setResellAdData;

  const handleChange = (e) => {
    setCurrentData({ ...currentData, [e.target.name]: e.target.value });
  };

  const handleBudgetChange = (field, value) => {
    if (selectedAdType === "adlisting") {
      setAdListingData({
        ...adListingData,
        budget: {
          ...adListingData.budget,
          [field]: value,
        },
      });
    }
  };

  const handleStockPriceChange = (index, field, value) => {
    if (selectedAdType === "stockad") {
      const newStockPrices = [...stockAdData.stockPrices];
      if (!newStockPrices[index]) {
        newStockPrices[index] = { moq: "", price: "" };
      }
      newStockPrices[index][field] = value;
      setStockAdData({ ...stockAdData, stockPrices: newStockPrices });
    }
  };

  const addStockPrice = () => {
    if (selectedAdType === "stockad" && stockAdData.stockPrices.length < 3) {
      setStockAdData({
        ...stockAdData,
        stockPrices: [...stockAdData.stockPrices, { moq: "", price: "" }],
      });
    }
  };

  const removeStockPrice = (index) => {
    if (selectedAdType === "stockad" && stockAdData.stockPrices.length > 1) {
      const newStockPrices = stockAdData.stockPrices.filter(
        (_, i) => i !== index,
      );
      setStockAdData({ ...stockAdData, stockPrices: newStockPrices });
    }
  };

  const handleFileChange = (e, type, index = null) => {
    const file = e.target.files[0];
    if (file) onFileUpload(file, type, index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate based on ad type
    if (selectedAdType === "adlisting") {
      const minBudget = parseFloat(adListingData.budget.min);
      const maxBudget = parseFloat(adListingData.budget.max);

      if (minBudget > maxBudget) {
        alert("Minimum budget cannot be greater than maximum budget");
        return;
      }
    } else if (selectedAdType === "stockad") {
      // Validate stockPrices - at least 1 required
      const validPrices = stockAdData.stockPrices.filter(
        (sp) => sp.moq && sp.price,
      );
      if (validPrices.length === 0) {
        alert("At least one stock price tier is required");
        return;
      }
    } else if (selectedAdType === "resellad") {
      const purchasePrice = parseFloat(resellAdData.purchasePrice);
      const sellingPrice = parseFloat(resellAdData.sellingPrice);
      if (!purchasePrice || !sellingPrice) {
        alert("Purchase price and selling price are required");
        return;
      }
      if (!resellAdData.purchaseDate) {
        alert("Purchase date is required");
        return;
      }
    }

    onSubmit();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Create Your First Ad</h2>
      <p className="text-sm text-slate-400 mb-6">Optional — you can skip this step and post an ad later</p>

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup>
          {/* Ad Type Selection */}
          <Select
            label="Ad Type"
            name="adType"
            value={selectedAdType}
            onChange={(e) => setSelectedAdType(e.target.value)}
            options={[
              { value: "adlisting", label: "Ad Listing (Services/Products)" },
              { value: "stockad", label: "Stock Ad (Inventory)" },
              { value: "resellad", label: "Resell Ad (Used Items)" },
            ]}
            required
            helpText={
              selectedAdType === "adlisting"
                ? "For services or product requirements"
                : selectedAdType === "stockad"
                  ? "For selling inventory/stock"
                  : "For reselling used/pre-owned items"
            }
          />

          {/* Title */}
          <TextInput
            label="Ad Title"
            name="title"
            value={currentData.title}
            onChange={handleChange}
            required
            placeholder={
              selectedAdType === "adlisting"
                ? "What are you looking for?"
                : selectedAdType === "stockad"
                  ? "What are you selling?"
                  : "What item are you reselling?"
            }
          />

          {/* Category */}
          <TextInput
            label="Category"
            name="category"
            value={currentData.category}
            onChange={handleChange}
            required
            placeholder={
              selectedAdType === "adlisting"
                ? "e.g., house maid, driver, electrician, laptop, mobile"
                : selectedAdType === "stockad"
                  ? "e.g., beverages, electronics, clothing"
                  : "e.g., electronics, furniture, vehicles"
            }
            helpText="Enter the specific category"
          />
        </FormGroup>

        {selectedAdType === "adlisting" && (
          <FormGroup>
            {/* Product Type (Tabs) */}
            <div>
              <Label>
                Type <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mt-3">
                {PRODUCT_TYPES.map((type) => (
                  <Button
                    key={type}
                    type="button"
                    onClick={() =>
                      setAdListingData({ ...adListingData, product: type })
                    }
                    variant={
                      adListingData.product === type ? "primary" : "secondary"
                    }
                    className="flex-1"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Choose whether you're looking for a good or service
              </p>
            </div>

            {/* Budget Range */}
            <div>
              <Label>
                Budget Range (₹) <span className="text-red-500">*</span>
              </Label>
              <FormRow cols={2}>
                <TextInput
                  type="number"
                  value={adListingData.budget.min}
                  onChange={(e) => handleBudgetChange("min", e.target.value)}
                  required
                  placeholder="Min amount"
                  inputProps={{ min: "0", step: "0.01" }}
                />
                <TextInput
                  type="number"
                  value={adListingData.budget.max}
                  onChange={(e) => handleBudgetChange("max", e.target.value)}
                  required
                  placeholder="Max amount"
                  inputProps={{ min: "0", step: "0.01" }}
                />
              </FormRow>
              <p className="text-xs text-slate-400 mt-1">
                Enter your budget range for this product/service
              </p>
            </div>

            {/* Budget Frequency */}
            <Select
              label="Budget Frequency"
              name="budgetFrequency"
              value={adListingData.budgetFrequency}
              onChange={handleChange}
              required
              options={["hourly", "daily", "weekly", "monthly", "yearly"]}
            />
          </FormGroup>
        )}

        {/* Experience - Only for service type */}
        {selectedAdType === "adlisting" &&
          adListingData.product === "service" && (
            <FormGroup>
              <TextInput
                label="Years of Experience Required (Optional)"
                type="number"
                name="experience"
                value={adListingData.experience}
                onChange={handleChange}
                placeholder="e.g., 2 or 3.5 years"
                inputProps={{ min: "0", step: "0.5" }}
                helpText="Enter minimum years of experience required for service providers"
              />
            </FormGroup>
          )}

        {/* Conditional Fields for Stock Ad */}
        {selectedAdType === "stockad" && (
          <FormGroup>
            {/* Stock Type (Tabs) */}
            <div>
              <Label>
                Stock Type <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mt-3">
                {STOCK_TYPES.map((type) => (
                  <Button
                    key={type}
                    type="button"
                    onClick={() =>
                      setStockAdData({ ...stockAdData, stockType: type })
                    }
                    variant={
                      stockAdData.stockType === type ? "primary" : "secondary"
                    }
                    className="flex-1"
                  >
                    {type.toUpperCase()}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                FMCG: Fast Moving Consumer Goods (food, beverages, etc.)
              </p>
            </div>

            {/* Brand Name */}
            <TextInput
              label="Brand Name"
              name="brandName"
              value={stockAdData.brandName}
              onChange={handleChange}
              required
              placeholder="e.g., Nestle, Samsung, etc."
            />

            {/* MRP and Unit */}
            <FormRow cols={2}>
              <TextInput
                label="MRP (₹)"
                type="number"
                name="mrp"
                value={stockAdData.mrp}
                onChange={handleChange}
                required
                placeholder="Maximum Retail Price"
                inputProps={{ min: "0", step: "0.01" }}
              />
              <Select
                label="Unit"
                name="unit"
                value={stockAdData.unit}
                onChange={handleChange}
                required
                options={UNITS}
              />
            </FormRow>

            {/* Stock Manufacturing Date */}
            <div>
              <Label htmlFor="stockMfg">
                Manufacturing Date <span className="text-red-500">*</span>
              </Label>
              <input
                type="date"
                id="stockMfg"
                name="stockMfg"
                value={stockAdData.stockMfg}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:outline-none text-sm transition-all"
              />
            </div>

            {/* Stock Expiry Date */}
            <div>
              <Label htmlFor="stockExp">
                Expiry Date{" "}
                {stockAdData.stockType === "fmcg" && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <input
                type="date"
                id="stockExp"
                name="stockExp"
                value={stockAdData.stockExp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:outline-none text-sm transition-all"
              />
              <p className="text-xs text-slate-400 mt-1">Optional field</p>
            </div>

            {/* Stock Prices (Dynamic) */}
            <div>
              <Label>
                Stock Price Tiers <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-gray-500 mb-3">Add 1-3 price tiers</p>
              {stockAdData.stockPrices.map((sp, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <TextInput
                    type="number"
                    value={sp.moq}
                    onChange={(e) =>
                      handleStockPriceChange(index, "moq", e.target.value)
                    }
                    required
                    placeholder="MOQ"
                    inputProps={{ min: "1", step: "1" }}
                  />
                  <TextInput
                    type="number"
                    value={sp.price}
                    onChange={(e) =>
                      handleStockPriceChange(index, "price", e.target.value)
                    }
                    required
                    placeholder="Price (₹)"
                    inputProps={{ min: "0", step: "0.01" }}
                  />
                  <div className="flex gap-2">
                    {index === stockAdData.stockPrices.length - 1 &&
                      stockAdData.stockPrices.length < 3 && (
                        <Button
                          type="button"
                          onClick={addStockPrice}
                          variant="success"
                          className="flex-1"
                        >
                          +
                        </Button>
                      )}
                    {stockAdData.stockPrices.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeStockPrice(index)}
                        variant="danger"
                        className="flex-1"
                      >
                        −
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-400 mt-1">
                Add price tiers based on minimum order quantity (MOQ)
              </p>
            </div>
          </FormGroup>
        )}

        {/* Conditional Fields for Resell Ad */}
        {selectedAdType === "resellad" && (
          <FormGroup>
            {/* Purchase & Selling Price */}
            <FormRow cols={2}>
              <TextInput
                label="Purchase Price (₹)"
                type="number"
                name="purchasePrice"
                value={resellAdData.purchasePrice}
                onChange={(e) =>
                  setResellAdData({ ...resellAdData, purchasePrice: e.target.value })
                }
                required
                placeholder="Original price"
                inputProps={{ min: "0", step: "0.01" }}
              />
              <TextInput
                label="Selling Price (₹)"
                type="number"
                name="sellingPrice"
                value={resellAdData.sellingPrice}
                onChange={(e) =>
                  setResellAdData({ ...resellAdData, sellingPrice: e.target.value })
                }
                required
                placeholder="Your asking price"
                inputProps={{ min: "0", step: "0.01" }}
              />
            </FormRow>

            {/* Purchase Date */}
            <div>
              <Label htmlFor="purchaseDate">
                Purchase Date <span className="text-red-500">*</span>
              </Label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={resellAdData.purchaseDate}
                onChange={(e) =>
                  setResellAdData({ ...resellAdData, purchaseDate: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:outline-none text-sm transition-all"
              />
            </div>

            {/* Invoice & Warranty Toggles */}
            <FormRow cols={2}>
              <div>
                <Label>Has Invoice?</Label>
                <div className="flex gap-2 mt-3">
                  {[true, false].map((val) => (
                    <Button
                      key={String(val)}
                      type="button"
                      onClick={() =>
                        setResellAdData({ ...resellAdData, withInvoice: val })
                      }
                      variant={
                        resellAdData.withInvoice === val ? "primary" : "secondary"
                      }
                      className="flex-1"
                    >
                      {val ? "Yes" : "No"}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Under Warranty?</Label>
                <div className="flex gap-2 mt-3">
                  {[true, false].map((val) => (
                    <Button
                      key={String(val)}
                      type="button"
                      onClick={() =>
                        setResellAdData({ ...resellAdData, underWarranty: val })
                      }
                      variant={
                        resellAdData.underWarranty === val ? "primary" : "secondary"
                      }
                      className="flex-1"
                    >
                      {val ? "Yes" : "No"}
                    </Button>
                  ))}
                </div>
              </div>
            </FormRow>
          </FormGroup>
        )}

        {/* Description (Common for all) */}
        <FormGroup>
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <textarea
            id="description"
            name="description"
            value={currentData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:outline-none text-sm transition-all resize-none"
            placeholder={
              selectedAdType === "adlisting"
                ? "Describe what you're looking for in detail..."
                : selectedAdType === "stockad"
                  ? "Describe your stock/product in detail..."
                  : "Describe the item's condition, accessories included, reason for selling..."
            }
          />
        </FormGroup>

        {/* Media Section (Common for both) */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Media Attachments <span className="text-slate-400 font-normal">(Optional)</span>
          </h3>

          {/* Video Upload */}
          <div className="mb-6">
            <Label>Video Presentation</Label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, "video")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                {currentData.media.video ? (
                  <span className="text-emerald-600 font-medium text-sm">✓ Video Uploaded</span>
                ) : (
                  <span className="text-slate-400 text-sm">Click to upload video</span>
                )}
              </div>
              {uploadProgress["video"] > 0 && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${uploadProgress["video"]}%` }}
                />
              )}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative group aspect-square border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 hover:bg-slate-100 overflow-hidden transition cursor-pointer"
              >
                {currentData.media.images[i] ? (
                  <img
                    src={currentData.media.images[i]}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-slate-400 text-xs font-medium">
                    Image {i + 1}
                  </span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image", i)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                {uploadProgress[`image_${i}`] > 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {uploadProgress[`image_${i}`]}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-slate-100">
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            fullWidth
            size="lg"
          >
            Create Ad & Complete
          </Button>

          <Button
            type="button"
            onClick={onSkip}
            disabled={loading}
            fullWidth
            size="lg"
            variant="secondary"
          >
            Skip for Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdUploadForm;
