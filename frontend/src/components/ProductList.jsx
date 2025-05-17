import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No products available.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <div key={product.productid} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">${product.price}</span>
                <span className="text-sm text-gray-500">Stock: {product.stockquantity}</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <span>Brand ID: {product.brandid}</span>
                <span className="ml-2">Category ID: {product.categoryid}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 