import { Alert, FormGroup, Radio, Checkbox, Button, Label } from "../../shared/components/common";
import ScheduleComponent from "../../shared/components/ScheduleComponent";
import ImageUploader from "../../shared/components/ImageUploader";

/**
 * UserDetailsForm Component
 * Collects user profile information including profile picture, gender, DOB, and language preferences
 * Uses reusable UI components with consistent styling
 */
const AVAILABLE_LANGUAGES = [
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
  "Other",
];

const UserDetailsForm = ({ data, setData, onSubmit, loading, error }) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLanguageToggle = (lang) => {
    const currentLanguages = data.languages || [];
    if (currentLanguages.includes(lang)) {
      setData({
        ...data,
        languages: currentLanguages.filter((l) => l !== lang),
      });
    } else {
      setData({
        ...data,
        languages: [...currentLanguages, lang],
      });
    }
  };

  const handleScheduleChange = (schedule) => {
    setData({ ...data, schedule });
  };

  const handleImageUpload = (secureUrl) => {
    setData({ ...data, profilePic: secureUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Complete Your Profile</h2>
      <p className="text-sm text-slate-400 mb-6">Add details to personalise the account</p>

      {error && <Alert type="error" message={error} className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormGroup>
          {/* Profile Picture Upload */}
          <div>
            <Label htmlFor="profilePic">Profile Picture</Label>
            <ImageUploader
              currentImage={data.profilePic}
              onImageUpload={handleImageUpload}
              folder="profile_pics"
              disabled={loading}
            />
          </div>

          {/* Gender - Radio Buttons */}
          <div>
            <Label>Gender</Label>
            <div className="space-y-3">
              <Radio
                name="gender"
                value="male"
                label="Male"
                checked={data.gender === "male"}
                onChange={handleChange}
              />
              <Radio
                name="gender"
                value="female"
                label="Female"
                checked={data.gender === "female"}
                onChange={handleChange}
              />
              <Radio
                name="gender"
                value="other"
                label="Other"
                checked={data.gender === "other"}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label>
              <Label htmlFor="dob">Date of Birth</Label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={data.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:outline-none text-sm transition-all"
              />
            </label>
          </div>

          {/* Languages - Checkboxes */}
          <div>
            <Label>Languages (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {AVAILABLE_LANGUAGES.map((lang) => (
                <Checkbox
                  key={lang}
                  name={`language-${lang}`}
                  label={lang}
                  checked={data.languages?.includes(lang)}
                  onChange={() => handleLanguageToggle(lang)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </FormGroup>

        {/* Schedule Component */}
        <div className="border-t border-slate-100 pt-6">
          <ScheduleComponent
            schedule={data.schedule || []}
            setSchedule={handleScheduleChange}
          />
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
            Continue to Address
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
