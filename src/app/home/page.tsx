
import RecipeCard from '@/common/RecipeCard';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { CartIcon } from '../components/header/cart-icon/cart-icon';
import Image from 'next/image'
import Logout from "../../../public/img/icons8-logout-50.png"
import { Header } from '../components/header/header';
import Spinner from '@/common/spinner';
import axios from 'axios';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { getRecipes } from '../action';
import SecondaryHeader from '@/common/SecondaryHeader';
interface FoodData {

  label: string;
  calories: number;
  dietLabels: string[];
}

const page: React.FC = async () => {
  const getData = await getRecipes()
  console.log(getData, "hhhhh")

  return (
    <>
      <div className='py-5 text-center'>
        <h1 className='mt-2'>Recipes</h1>
        <Header />
        <div>
          <div className="container">
            <SecondaryHeader />
            <div className="row g-3 ">
              {getData.hits.map((res: any) =>
                <div className="col-12 col-sm-6 col-md-8 col-lg-4 col-xl-3">
                  <RecipeCard key={res.id} recipe={res} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default page;
