import React, { useState, useEffect } from "react";
import { TextInput, Alert, FormGroup, Button, FormRow } from "../../shared/components/common";

/**
 * AddressForm Component
 * Handles user address information and geolocation data
 * Uses reusable UI components with consistent styling
 */
const AddressForm = ({ data, setData, onSubmit, loading, error }) => {
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    setData({
      ...data,
      state: "Karnataka",
      country: "India",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setData({
          ...data,
          geoLocation: {
            type: "Point",
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
        });
        setGettingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve your location: " + error.message);
        setGettingLocation(false);
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!data.city) {
      alert("City is required");
      return;
    }

    // Validate coordinates
    if (
      data.geoLocation.coordinates[0] === 0 &&
      data.geoLocation.coordinates[1] === 0
    ) {
      alert("Please get your current location or enter coordinates manually");
      return;
    }

    onSubmit();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Add Your Address</h2>
      <p className="text-sm text-slate-400 mb-6">Where is this user based?</p>

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup>
          {/* House/Flat */}
          <TextInput
            label="House/Flat Number"
            name="houseOrFlat"
            value={data.houseOrFlat}
            onChange={handleChange}
            placeholder="Enter house or flat number"
          />

          {/* Street */}
          <TextInput
            label="Street"
            name="street"
            value={data.street}
            onChange={handleChange}
            placeholder="Enter street name"
          />

          {/* Area */}
          <TextInput
            label="Area/Locality"
            name="area"
            value={data.area}
            onChange={handleChange}
            placeholder="Enter area or locality"
          />

          {/* City and District */}
          <FormRow cols={2}>
            <TextInput
              label="City"
              name="city"
              value={data.city}
              onChange={handleChange}
              required
              placeholder="Enter city"
            />

            <TextInput
              label="District"
              name="district"
              value={data.district}
              onChange={handleChange}
              placeholder="Enter district"
            />
          </FormRow>

          {/* State and Pincode */}
          <FormRow cols={2}>
            <TextInput
              label="State (Default)"
              name="state"
              value="Karnataka"
              disabled
              helpText="Default state: Karnataka"
            />

            <TextInput
              label="Pincode"
              name="pincode"
              value={data.pincode}
              onChange={handleChange}
              maxLength={6}
              placeholder="Enter pincode"
            />
          </FormRow>

          {/* Country */}
          <TextInput
            label="Country (Default)"
            name="country"
            value="India"
            disabled
            helpText="Default country: India"
          />
        </FormGroup>

        {/* Geolocation Section */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            Location Coordinates <span className="text-red-500">*</span>
          </h3>

          <Button
            type="button"
            onClick={getCurrentLocation}
            disabled={gettingLocation}
            loading={gettingLocation}
            variant="success"
            fullWidth
            className="mb-4"
          >
            Get Current Location
          </Button>

          <FormRow cols={2}>
            <TextInput
              label="Longitude"
              type="number"
              inputProps={{ step: "any" }}
              value={data.geoLocation.coordinates[0]}
              onChange={(e) =>
                setData({
                  ...data,
                  geoLocation: {
                    ...data.geoLocation,
                    coordinates: [
                      parseFloat(e.target.value) || 0,
                      data.geoLocation.coordinates[1],
                    ],
                  },
                })
              }
              placeholder="Longitude"
            />

            <TextInput
              label="Latitude"
              type="number"
              inputProps={{ step: "any" }}
              value={data.geoLocation.coordinates[1]}
              onChange={(e) =>
                setData({
                  ...data,
                  geoLocation: {
                    ...data.geoLocation,
                    coordinates: [
                      data.geoLocation.coordinates[0],
                      parseFloat(e.target.value) || 0,
                    ],
                  },
                })
              }
              placeholder="Latitude"
            />
          </FormRow>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            fullWidth
            size="lg"
          >
            Complete Registration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
