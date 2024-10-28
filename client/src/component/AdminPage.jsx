// AdminPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const navigate = useNavigate();

  // Redirect non-admin users to the gallery page
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/gallery');
    }
  }, [navigate]);

  // Handle image selection and upload logic
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create image preview URL
      setCaption('');
      setUploadStatus('');
    } else {
      setUploadStatus("No file selected");
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setUploadStatus("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:8000/caption-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process image");

      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      if (data.caption) {
        setCaption(data.caption);
        setUploadStatus("Image uploaded successfully with caption!");
      } else {
        throw new Error("Caption not found in response");
      }
    } catch (error) {
      setUploadStatus("Error uploading image: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Admin Image Upload</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Upload Image
        </button>

        {uploadStatus && (
          <p className="mt-4 text-center text-green-500">{uploadStatus}</p>
        )}

        {/* Display the uploaded image if it exists */}
        {imagePreview && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Uploaded Image:</h3>
            <img
              src={imagePreview}
              alt="Uploaded"
              className="w-64 h-auto rounded-lg mt-2 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
            />
          </div>
        )}

        {/* Display the generated caption if it exists */}
        {caption && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Generated Caption:</h3>
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
