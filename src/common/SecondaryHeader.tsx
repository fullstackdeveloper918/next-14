"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

export default function SecondaryHeader() {
  const router = useRouter()
  const handleAddToCart = () => {
    router.push('/cart');
  };
  return (
    <div className="row  my-5">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="">Product's Listing</h3>
          <button className='btn btn-success' onClick={handleAddToCart}>
            <i className="fa-solid fa-cart-shopping me-1"></i>  Cart
          </button>
        </div>
        <hr className='mb-0' />
      </div>
    </div>
  )
}
