"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import { IoBagAddOutline } from "react-icons/io5";
import { MdStarHalf } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { addToBag } from '../../redux/bagSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'next/navigation';
import { selectBagProducts } from '@/app/redux/selector';
import { Product,Category, Rating, BagProduct } from '@/type/type'; // Import types from type.ts

const ProductDescription = () => {
  const dispatch = useDispatch();
  
  // Access Redux state with types
  const bagProducts = useSelector(selectBagProducts);
  const { productId } = useParams();
  console.log("i am product ID", productId);

  const state = useSelector(_ => _);

  useEffect(() => console.log({ state }), [state]);

  // Find the product from the store based on productId
  const product = useSelector((state: { productsStore: { products: Product[] } }) => 
    state.productsStore.products.find((item) => item._id === productId)
  );

  // If no product is found, return a fallback message
  if (!product) {
    return <p>Loading product details... If this takes too long, please go back and select the product again.</p>;
  }

  return (
    <div className='w-[65%] font-cabin '>
      <div><Link href="/" className='flex gap-2 items-center my-5 py-2 px-3'>
        <IoIosArrowBack />Back</Link>
      </div>

      <div className=''>
        <div className='flex gap-3 '>
          <div className='flex gap-4 justify-center ml-3'>
            <div className='flex flex-col items-center gap-2'>
              <div className='h-14 w-14 bg-white flex justify-center items-center rounded-xl py-2 px-2'>
                <img src={product.image} alt="" className='max-h-14 max-w-14 py-2 px-2 '/>
              </div>
              <div className='h-14 w-14 bg-white flex justify-center items-center rounded-xl'>
                <img src={product.image} alt="" className='max-h-14 max-w-14 py-2 px-2'/>
              </div>
              <div className='h-14 w-14 bg-white flex justify-center items-center rounded-xl'>
                <img src={product.image} alt="" className='max-h-14 max-w-14 py-2 px-2'/>
              </div>
            </div>

            <div className='h-60 w-56 bg-white flex justify-center items-center rounded-xl'>
              <img src={product.image} alt="" className='max-h-56 max-w-52 py-4 px-2 '/>
            </div>
          </div>

          <div className=''>
            <h1 className='font-bold text-4xl px-4'>{product.title}</h1>
            <h2 className=' text-2xl px-4 py-1 text-darkgrey'>{product.category.name}</h2>
            <div className='px-4 py-2 flex gap-3'>
              <ul className='flex items-center gap-1 text-darkgreen text-lg'>
                <li><MdStar /></li>
                <li><MdStar /></li>
                <li><MdStar /></li>
                <li><MdStar /></li>
                <li><MdStarHalf /></li>
              </ul>
              <p className='text-green text-lg'>{product.rating.rate}</p>
            </div>
            <h2 className=' text-2xl px-4 py-2 font-semibold font-cabin'>$ {product.price}</h2>
            <p className='px-4 font-cabin text-lg'>{product.description}</p>
          </div>

        </div>

        <div className='flex px-8 my-2 justify-end'>
          <button
            className='bg-gray-900 text-white px-4 py-1 rounded-2xl flex justify-center items-center gap-3'
            onClick={() => {
              // Check if the product is already in the bag
              const existingProduct = bagProducts.find((item) => item._id === product._id);
              if (existingProduct) {
                toast.error("This product is already in your bag!");
              } else {
                dispatch(addToBag({ ...product, count: 1 }));
                toast.success("Product added to your bag!");
              }
            }}
          >
            <IoBagAddOutline />Add to bag
          </button>
        </div>
      </div>

      <div className='border mt-2  border-lightgrey rounded-md '></div>

      <div className=' mb-4'>
        <h2 className='text-2xl font-semibold px-4 py-2 font-cabin'>Description</h2>
        <p className='px-4'>{product.description}</p>
      </div>

    </div>
  );
}

export default ProductDescription;