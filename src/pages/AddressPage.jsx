import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addressApi } from "../services/api/addressApi";
import { MdArrowBack, MdLocationOn, MdMap, MdHomeWork } from "react-icons/md";

const AddressPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await addressApi.getProfile(userId);
        // Based on your log: response.data.data is the array
        setAddresses(response.data.data || []);
      } catch (err) {
        console.error("Error fetching address:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [userId]);

  const openInGoogleMaps = (coords) => {
    // coordinates: [longitude, latitude]
    const [lng, lat] = coords;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="p-20 text-center font-bold text-blue-500">
        Loading Address...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-8 gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white rounded-full shadow-sm"
        >
          <MdArrowBack size={24} />
        </button>
        <h1 className="text-2xl font-bold">Location Details</h1>
      </div>

      {addresses.length > 0 ? (
        addresses.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-blue-600">
                <MdHomeWork size={24} />
                <span className="font-semibold uppercase text-sm tracking-wider">
                  Residential Address
                </span>
              </div>
              <button
                onClick={() => openInGoogleMaps(item.geoLocation.coordinates)}
                className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
              >
                <MdMap /> View on Map
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-gray-700">
              <div>
                <p className="text-xs text-gray-400 uppercase">
                  House/Flat No.
                </p>
                <p className="font-medium">{item.address.houseOrFlat}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Street / Area</p>
                <p className="font-medium">
                  Street {item.address.street}, {item.address.area}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">
                  City & District
                </p>
                <p className="font-medium">
                  {item.address.city}, {item.address.district}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">
                  State & Pincode
                </p>
                <p className="font-medium">
                  {item.address.state} - {item.address.pincode}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-[11px] text-gray-400">
              <span>
                Added: {new Date(item.createdAt).toLocaleDateString()}
              </span>
              <span>ID: {item._id}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20 text-gray-400">
          No address records found.
        </div>
      )}
    </div>
  );
};

export default AddressPage;
