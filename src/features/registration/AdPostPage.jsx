import AdPlansForm from "./AdPlansForm";
import AdUploadForm from "./AdUploadForm";
import AddressForm from "./AddressForm";
import CompletionScreen from "./CompletionScreen";
import JsonDataImporter from "../../shared/components/JsonDataImporter";
import OTPVerificationForm from "./OTPVerificationForm";
import RegistrationForm from "./RegistrationForm";
import UserDetailsForm from "./UserDetailsForm";
import { useRegistration } from "./useRegistration";

function AdPostPage() {
  const {
    step,
    loading,
    error,
    successMessage,
    otpFromServer,
    registrationData,
    setRegistrationData,
    otpData,
    setOtpData,
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
    selectedAdType,
    setSelectedAdType,
    handleRegistration,
    handleOTPVerification,
    handleResendOTP,
    handleUserDetailsSubmit,
    handleAddressSubmit,
    handleAdListingSubmit,
    handleSkipAdListing,
    uploadProgress,
    handleFileUpload,
    createdAdId,
    adPlans,
    handleAdPlansSubmit,
  } = useRegistration();

  const handleJsonImport = (importedData) => {
    if (importedData.registration) {
      setRegistrationData((prev) => ({
        ...prev,
        ...importedData.registration,
      }));
    }

    if (importedData.userDetails) {
      setUserDetails((prev) => ({
        ...prev,
        ...importedData.userDetails,
      }));
    }

    if (importedData.address) {
      setAddressData((prev) => ({
        ...prev,
        ...importedData.address,
      }));
    }

    // Handle ad data based on type
    if (importedData.adType === "adlisting" && importedData.adlisting) {
      setSelectedAdType("adlisting");
      setAdListingData((prev) => ({
        ...prev,
        ...importedData.adlisting,
      }));
    } else if (importedData.adType === "stockad" && importedData.stockad) {
      setSelectedAdType("stockad");
      setStockAdData((prev) => ({
        ...prev,
        ...importedData.stockad,
      }));
    } else if (importedData.adType === "resellad" && importedData.resellad) {
      setSelectedAdType("resellad");
      setResellAdData((prev) => ({
        ...prev,
        ...importedData.resellad,
      }));
    }
  };

  // Step config — order defines progress
  const STEPS = [
    { key: "initial", label: "Register" },
    { key: "otp", label: "Verify" },
    { key: "userDetails", label: "Profile" },
    { key: "address", label: "Address" },
    { key: "adlisting", label: "First Ad" },
    { key: "adplans", label: "Plans" },
    { key: "complete", label: "Done" },
  ];
  const currentIdx = STEPS.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Import banner */}
        {step !== "complete" && (
          <div className="mb-5">
            <JsonDataImporter onImport={handleJsonImport} />
          </div>
        )}

        {/* Success toast */}
        {successMessage && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMessage}
          </div>
        )}

        {/* Progress stepper */}
        {step !== "complete" && (
          <div className="mb-6 bg-white rounded-2xl border border-slate-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              {STEPS.slice(0, -1).map((s, i) => {
                const done = i < currentIdx;
                const active = i === currentIdx;
                return (
                  <div key={s.key} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                        ${done ? "bg-emerald-500 text-white" : active ? "bg-indigo-600 text-white ring-4 ring-indigo-100" : "bg-slate-100 text-slate-400"}`}>
                        {done ? "✓" : i + 1}
                      </div>
                      <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${active ? "text-indigo-600" : done ? "text-emerald-600" : "text-slate-400"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 2 && (
                      <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all ${done ? "bg-emerald-400" : "bg-slate-200"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Form Steps */}
        {step === "initial" && (
          <RegistrationForm
            data={registrationData}
            setData={setRegistrationData}
            onSubmit={handleRegistration}
            loading={loading}
            error={error}
          />
        )}

        {step === "otp" && (
          <OTPVerificationForm
            data={otpData}
            setData={setOtpData}
            onSubmit={handleOTPVerification}
            onResend={handleResendOTP}
            loading={loading}
            error={error}
            phone={registrationData.phone}
            otpFromServer={otpFromServer}
          />
        )}

        {step === "userDetails" && (
          <UserDetailsForm
            data={userDetails}
            setData={setUserDetails}
            onSubmit={handleUserDetailsSubmit}
            loading={loading}
            error={error}
          />
        )}

        {step === "address" && (
          <AddressForm
            data={addressData}
            setData={setAddressData}
            onSubmit={handleAddressSubmit}
            loading={loading}
            error={error}
          />
        )}

        {step === "adlisting" && (
          <AdUploadForm
            adListingData={adListingData}
            setAdListingData={setAdListingData}
            stockAdData={stockAdData}
            setStockAdData={setStockAdData}
            resellAdData={resellAdData}
            setResellAdData={setResellAdData}
            selectedAdType={selectedAdType}
            setSelectedAdType={setSelectedAdType}
            onSubmit={handleAdListingSubmit}
            onSkip={handleSkipAdListing}
            loading={loading}
            error={error}
            uploadProgress={uploadProgress}
            onFileUpload={handleFileUpload}
          />
        )}

        {step === "adplans" && (
          <AdPlansForm
            adId={createdAdId}
            plans={adPlans}
            onSubmit={handleAdPlansSubmit}
            onSkip={handleSkipAdListing}
            loading={loading}
            error={error}
          />
        )}

        {step === "complete" && <CompletionScreen />}
      </div>
    </div>
  );
}

export default AdPostPage;
