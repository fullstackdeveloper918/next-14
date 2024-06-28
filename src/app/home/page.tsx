'use client';
import RecipeCard from '@/common/RecipeCard';
import { getRecipes, getRecipes1 } from '@/common/recipeService';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { CartIcon } from '../components/header/cart-icon/cart-icon';
import Image from 'next/image'
import Logout from "../../../public/img/icons8-logout-50.png"
import { Header } from '../components/header/header';
import Spinner from '@/common/spinner';
interface FoodData {

  label: string;
  calories: number;
  dietLabels: string[];
}
const page: React.FC = () => {
  const router = useRouter()
  const [recipes, setRecipes] = useState<any>([]);
  const [data, setData] = useState<FoodData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const storedUser = localStorage.getItem('user');
  console.log(storedUser, "storedUser")
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const data = await getRecipes();
        setRecipes(data);
        
      } catch (error) {
        console.log(error)
      }finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleAddToCart = () => {
    router.push('/cart');
  };
  console.log(data, 'sagdh')
  return (
    <>
      <div className='py-5 text-center'>
        <h1 className='mt-2'>Recipes</h1>
        <Header />
        <div>
          <div className="container">
            <div className="row  my-5">
              {/* <RecipeCard/> */}
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
            {loading?
            <Spinner/>:
            <div className="row g-3 ">
              {recipes?.hits?.map((recipe: any) => (
                <div className="col-12 col-sm-6 col-md-8 col-lg-4 col-xl-3">
                  <RecipeCard key={recipe.id} recipe={recipe} />
                </div>
              ))}
            </div>}
          </div>
        </div>
      </div>

    </>
  );
};

export default page;
