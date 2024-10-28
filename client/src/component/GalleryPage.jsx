// GalleryPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Adjust path as needed

const GalleryPage = () => {
  const { addToCart } = useCart();
  const [posts, setPosts] = useState([]);
  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/gallery?userId=${userID}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [userID]);

  const handleProductClick = (post) => {
    navigate(`/product/${post.article_id}`, { state: { post } }); // Passing product data in state
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-medium mb-12 text-center text-gray-800">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {posts.map((post) => (
          <div
            key={post.article_id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => handleProductClick(post)} // Passing entire product info on click
          >
            <img
              src={post.image_path}
              alt={post.product_name}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-500 transition-colors duration-200">
                {post.product_name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {post.description || "No description available"}
              </p>
              <p className="text-lg font-medium text-indigo-600 mt-3">
                {typeof post.price === 'number' ? `$${post.price.toFixed(2)}` : "N/A"}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when adding to cart
                  addToCart({ id: post.article_id, name: post.product_name, price: post.price });
                }}
                className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
