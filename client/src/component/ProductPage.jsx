// ProductPage.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.post; // Retrieve product details from location state

  useEffect(() => {
    if (!product) {
      navigate('/gallery');
    }
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image_path}
            alt={product.product_name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">{product.product_name}</h1>
          <p className="text-gray-600 mb-6">{product.description || "No description available."}</p>
          <div className="text-2xl font-bold text-indigo-700 mb-4">
            ${product.price ? product.price.toFixed(2) : "N/A"}
          </div>
          <button
            onClick={() => console.log('Add to Cart:', product.article_id)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
