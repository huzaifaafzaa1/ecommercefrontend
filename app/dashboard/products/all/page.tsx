"use client";
import React, { useState } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

const AllProducts = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { productsQuery, removeProductMutation } = useProduct();
  const { data: products, error, isLoading } = productsQuery;
  const { mutate: removeProduct } = removeProductMutation;

  const toggleMenu = (_id: string) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleRemove = (_id: string | undefined) => {
    if (_id) {
      removeProduct(_id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!products) return <div>No products found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <button
              onClick={() => toggleMenu(product._id!)}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>

            {openMenuId === product._id && (
              <div className="absolute top-10 right-2 bg-white border rounded-lg shadow-lg w-32 z-10">
                <Link href={`/dashboard/products/add?id=${product._id}`}>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                </Link>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="p-4">
              <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center">
                <img src={product.image} alt={product.title} className="h-40 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{product.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Category: {product.category.name}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;