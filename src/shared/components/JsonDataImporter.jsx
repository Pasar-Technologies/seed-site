import { useState } from "react";
import { transformImportData } from "../services/jsonImportUtils";
import { SAMPLE_DATA_CONFIG } from "../services/sampleJsonData";

const JsonDataImporter = ({ onImport }) => {
  const [showImporter, setShowImporter] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState(null);

  const handleImport = () => {
    try {
      setError(null);
      const data = JSON.parse(jsonInput);
      const importData = transformImportData(data);

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
          Import JSON Data (Ad Listing / Stock Ad / Resell Ad)
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
            form fields. Supports Ad Listing, Stock Ad, and Resell Ad formats.
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
            {SAMPLE_DATA_CONFIG.map(({ key, icon, label, data }) => (
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
