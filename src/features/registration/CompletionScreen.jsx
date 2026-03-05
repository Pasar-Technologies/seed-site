import React from "react";

const CompletionScreen = () => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">All done!</h2>
      <p className="text-slate-500 text-sm mb-8">
        Account created, ad posted, and plan applied successfully.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition duration-200 text-sm"
      >
        Register Another Account
      </button>
    </div>
  );
};

export default CompletionScreen;
