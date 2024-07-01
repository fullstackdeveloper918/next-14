'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductDetail from '@/common/ProductDetails/ProductDetail';

const page: React.FC = () => {
  const router = useRouter()
  const searchParam = useParams();
  const id = searchParam.id;

  const handleBack = () => {
    router.back()
  }

  return (
    <section className='info-section py-5'>
      <ProductDetail id={id} handleBack={handleBack} />
    </section>
  );
};

export default page;
