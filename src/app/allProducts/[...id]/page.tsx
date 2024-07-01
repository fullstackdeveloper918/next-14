'use client';
import RecipeCard from '@/common/RecipeCard';
import Getid from '@/common/getId/[Getid]';
import Spinner from '@/common/spinner';
import dynamic from 'next/dynamic';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface FoodData {
  label: string;
  calories: number;
  dietLabels: string[];
}
function page() {
  const router = useRouter()

  const searchParam = useParams();
  const id = searchParam.id;
  console.log(id, "router")

  const handleAddToCart = () => {
    router.push('/cart');
  };
  const encodedText = id as any
  const decodedText = decodeURIComponent(encodedText);
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <Getid id={id} decodedText={decodedText} handleAddToCart={handleAddToCart}  />
    </>
  )
}

export default page