import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import LoadingSpinner from './components/LoadingSpinner';
import useProducts from './hooks/useProducts';

function App() {
  const { products, loading, error, refetchProducts } = useProducts();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
                <button
                  onClick={refetchProducts}
                  className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ElectroMart Products</h1>
          <p className="mt-2 text-gray-600">Manage your electronic products inventory</p>
        </header>

        <ProductForm onProductAdded={refetchProducts} />
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
}

export default App;
