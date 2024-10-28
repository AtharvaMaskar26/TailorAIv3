// DisplayPage.js
import React from 'react';

const DisplayPage = ({ image, caption }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Generated Image and Caption</h2>

        {image && (
          <div className="mb-6">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        )}

        {caption && (
          <div className="mt-4 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-700">Generated Caption:</h3>
            <p className="text-gray-700 mt-2">{caption}</p>
          </div>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Upload Another Image
        </button>
      </div>
    </div>
  );
};

export default DisplayPage;
