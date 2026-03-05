import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Label } from "../../shared/components/common";
import { DEV_CONFIG } from "../../config/config";

/**
 * OTPVerificationForm Component
 * Handles OTP verification with support for manual entry and auto-filling
 * Uses reusable UI components with consistent styling
 */
const OTPVerificationForm = ({
  data,
  setData,
  onSubmit,
  onResend,
  loading,
  error,
  phone,
  otpFromServer, // For development - shows OTP in UI
}) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [autoVerifying, setAutoVerifying] = useState(false);
  const inputRefs = useRef([]);
  const hasAutoFilled = useRef(false);

  // Auto-fill OTP when it's received from server (development mode)
  useEffect(() => {
    if (
      otpFromServer &&
      !hasAutoFilled.current &&
      !loading &&
      DEV_CONFIG.AUTO_VERIFY_OTP
    ) {
      hasAutoFilled.current = true;

      // First update the OTP state
      setData({ ...data, otp: otpFromServer });
    }
  }, [otpFromServer, loading]);

  // Separate effect to trigger auto-verification after OTP is filled
  useEffect(() => {
    let timer;

    if (
      hasAutoFilled.current &&
      data.otp.length === 6 &&
      !loading &&
      !autoVerifying &&
      DEV_CONFIG.AUTO_VERIFY_OTP
    ) {
      // Auto-verify after configured delay
      console.log("Starting auto-verify for OTP:", data.otp);
      setAutoVerifying(true);

      timer = setTimeout(() => {
        console.log("Calling onSubmit with OTP:", data.otp);
        onSubmit();
        // Reset auto-verifying after a short delay
        setTimeout(() => setAutoVerifying(false), 300);
      }, DEV_CONFIG.AUTO_VERIFY_DELAY);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data.otp]);

  // Reset hasAutoFilled when OTP changes (for resend functionality)
  useEffect(() => {
    if (!otpFromServer) {
      hasAutoFilled.current = false;
    }
  }, [otpFromServer]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    // Update the OTP data
    const otpArray = data.otp.split("");
    otpArray[index] = value;
    const newOtp = otpArray.join("");
    setData({ ...data, otp: newOtp });

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !data.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    setData({ ...data, otp: pastedData });

    const focusIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.otp.length === 6) {
      onSubmit();
    }
  };

  const handleResend = async () => {
    if (canResend && !loading && onResend) {
      setCanResend(false);
      setCountdown(60);
      setData({ ...data, otp: "" });
      hasAutoFilled.current = false;
      await onResend();
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Verify Phone</h2>
        <p className="text-sm text-slate-500">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-slate-700">{phone}</span>
        </p>
      </div>

      {/* Development Helper - Shows OTP from server */}
      {otpFromServer && DEV_CONFIG.SHOW_OTP_IN_UI && (
        <Alert
          type="warning"
          title="Development Mode"
          message={`OTP: ${otpFromServer}${DEV_CONFIG.AUTO_VERIFY_OTP ? ` - Auto-Verify enabled (${DEV_CONFIG.AUTO_VERIFY_DELAY / 1000}s)` : ""}`}
          className="mb-6"
          dismissible={false}
        />
      )}

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Fields */}
        <div>
          <Label className="text-center block">Enter OTP</Label>
          <div className="flex justify-center gap-2 mt-3 mb-2">
            {data.otp
              .padEnd(6, " ")
              .split("")
              .map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit.trim()}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                  disabled={loading}
                />
              ))}
          </div>
          <p className="text-xs text-slate-400 text-center">
            Paste the 6-digit code or enter it manually
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || data.otp.length !== 6 || autoVerifying}
          loading={loading || autoVerifying}
          fullWidth
          size="lg"
        >
          Verify OTP
        </Button>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-2">Didn't receive the code?</p>
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm hover:underline disabled:text-slate-400 disabled:no-underline"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-sm text-slate-400">
              Resend available in{" "}
              <span className="font-semibold text-slate-600">{countdown}s</span>
            </p>
          )}
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-xs text-slate-400 text-center">
          Having trouble? Make sure you entered the correct phone number and
          check your messages.
        </p>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
