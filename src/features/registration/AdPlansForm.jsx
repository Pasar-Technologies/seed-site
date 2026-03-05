import React, { useEffect, useState } from "react";
import { Alert, Button } from "../../shared/components/common";

/**
 * AdPlansForm Component
 * Allows users to select base and prime plans for their advertisements
 * Uses reusable UI components with consistent styling
 */
const AdPlansForm = ({ adId, plans, onSubmit, onSkip, loading, error }) => {
  const [selectedBasePlan, setSelectedBasePlan] = useState(null);
  const [selectedPrimePlan, setSelectedPrimePlan] = useState(null);

  // API returns flat array: [{ _id, name, type: "base"|"prime", durationDays, price, ... }]
  const basePlans = plans?.filter((p) => p.type === "base") || [];
  const primePlans = plans?.filter((p) => p.type === "prime") || [];

  // Auto-select highest duration base plan on mount
  useEffect(() => {
    if (basePlans.length > 0) {
      const highestDuration = basePlans.reduce((prev, current) =>
        current.durationDays > prev.durationDays ? current : prev,
      );
      setSelectedBasePlan(highestDuration);
    }
  }, [basePlans.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedBasePlan) {
      alert("Please select a base plan");
      return;
    }

    // Apply base plan first; prime plan (if selected) must be applied separately
    onSubmit({ planId: selectedBasePlan._id });
  };

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `₹${price}`;
  };

  const PlanCard = ({ plan, isSelected, color, onClick }) => {
    const colorStyles = {
      blue: {
        border: isSelected
          ? "border-indigo-500 bg-indigo-50"
          : "border-slate-200 hover:border-indigo-300",
        icon: "text-indigo-500",
        text: "text-indigo-600",
      },
      purple: {
        border: isSelected
          ? "border-violet-500 bg-violet-50"
          : "border-slate-200 hover:border-violet-300",
        icon: "text-violet-500",
        text: "text-violet-600",
      },
    };

    const style = colorStyles[color];

    return (
      <div
        onClick={onClick}
        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${style.border}`}
      >
        {isSelected && (
          <div className="absolute top-2 right-2">
            <svg
              className={`w-6 h-6 ${style.icon}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <h4 className="font-bold text-sm text-slate-800">{plan.name}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{plan.durationDays} days</p>
        <p className={`text-lg font-bold ${style.text} mt-2`}>
          {formatPrice(plan.price)}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Choose Your Ad Plans</h2>
      <p className="text-sm text-slate-400 mb-6">Select a base plan and optionally boost with a prime plan</p>

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Base Plans */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Base Plans <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basePlans.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                isSelected={selectedBasePlan?._id === plan._id}
                color="blue"
                onClick={() => setSelectedBasePlan(plan)}
              />
            ))}
          </div>
        </div>

        {/* Prime Plans */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Prime Plans <span className="text-slate-400 font-normal">(Optional)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {primePlans.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                isSelected={selectedPrimePlan?._id === plan._id}
                color="purple"
                onClick={() =>
                  setSelectedPrimePlan(
                    selectedPrimePlan?._id === plan._id ? null : plan,
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Summary */}
        {selectedBasePlan && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Base ({selectedBasePlan.name})</span>
                <span className="font-medium text-slate-800">{formatPrice(selectedBasePlan.price)}</span>
              </div>
              {selectedPrimePlan && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Prime ({selectedPrimePlan.name})</span>
                  <span className="font-medium text-slate-800">{formatPrice(selectedPrimePlan.price)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
                <span className="text-slate-700">Total</span>
                <span className="text-indigo-600">
                  {formatPrice(selectedBasePlan.price + (selectedPrimePlan?.price || 0))}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <Button
            type="submit"
            disabled={loading || !selectedBasePlan}
            loading={loading}
            fullWidth
            size="lg"
          >
            Confirm & Complete
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

      {/* Help Text */}
      <Alert
        type="info"
        title="Tip"
        message="Base plans determine how long your ad stays active. Prime plans boost your ad's visibility for a shorter period. You can always upgrade later!"
        className="mt-6"
        dismissible={false}
      />
    </div>
  );
};

export default AdPlansForm;
