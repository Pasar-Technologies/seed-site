import React, { useEffect } from "react";
import { TextInput, Alert, FormGroup, Button, Label } from "../../shared/components/common";

/**
 * RegistrationForm Component
 * Handles user account creation with email auto-generation
 * Uses reusable UI components with consistent styling
 */
const RegistrationForm = ({ data, setData, onSubmit, loading, error }) => {
  // Generate email from full name
  const generateEmail = (fullName) => {
    if (!fullName) return "";

    // Extract first name (first word)
    const firstName = fullName.trim().split(" ")[0].toLowerCase();

    // Generate random 2-3 digit number
    const randomDigits = Math.floor(Math.random() * 900) + 100; // 100-999

    // Randomly choose email provider
    const providers = ["gmail.com", "outlook.com"];
    const provider = providers[Math.floor(Math.random() * providers.length)];

    return `${firstName}${randomDigits}@${provider}`;
  };

  // Auto-generate email when fullName changes
  useEffect(() => {
    if (data.fullName && !data.email) {
      const generatedEmail = generateEmail(data.fullName);
      setData({ ...data, email: generatedEmail, password: "Abcd@123" });
    }
  }, [data.fullName]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName") {
      // Auto-generate email when full name changes
      const generatedEmail = generateEmail(value);
      setData({
        ...data,
        fullName: value,
        email: generatedEmail,
        password: "Abcd@123",
      });
    } else if (name === "phone") {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Create Account</h2>
      <p className="text-sm text-slate-400 mb-6">Fill in the details to register a new user</p>

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup>
          {/* Account Type - Display Only */}
          <div>
            <Label htmlFor="accountType">Account Type</Label>
            <div className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 text-sm font-medium">
              Individual
            </div>
            <p className="text-xs text-slate-400 mt-1">
              This is an individual account for personal use
            </p>
          </div>

          {/* Full Name */}
          <TextInput
            label="Full Name"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />

          {/* Phone Number */}
          <TextInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit phone number"
            helpText="10-digit mobile number"
          />

          {/* Email (Auto-generated) */}
          <TextInput
            label="Email (Auto-generated)"
            name="email"
            type="email"
            value={data.email}
            disabled
            placeholder="Will be generated from your name"
            helpText="Email is automatically generated from your first name"
          />

          {/* Password (Default) */}
          <TextInput
            label="Password (Default)"
            name="password"
            type="text"
            value={data.password || "Abcd@123"}
            disabled
            helpText="Default password: Abcd@123 (cannot be changed during registration)"
          />
        </FormGroup>

        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            fullWidth
            size="lg"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
