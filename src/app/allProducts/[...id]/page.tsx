'use client';
import RecipeCard from '@/common/RecipeCard';
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
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
 
    const searchParam = useParams();
    const id = searchParam.id;
    // const cleanUrl = id.replace(/_rsc=1cy4d(&|$)/, '')
    console.log(id,"router")
    const fetchData = async (id: any) => {
        const url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${id}`;
    
        try {
          setLoading(true);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          setData(data);
          setError(null);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };
      useEffect(()=>{
        fetchData(id)
      },[])
      const handleAddToCart = () => {
        router.push('/cart');
      };
      const encodedText = id as any
const decodedText = decodeURIComponent(encodedText);
const handleBack = () => {
  router.back()
}
  return (
    <div >
      <div className="text-center mt-5">

    <h1>Product's</h1>
      </div>
      {/* <div className="px-5">

        <button className="mb-3" onClick={handleBack}><i className="fa-solid fa-backward"></i> Back</button>
      </div> */}
   
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {/* {data.hits > 0 && ( */}
      <div className=''>
        
      <div className="row  my-5">
              {/* <RecipeCard/> */}
              <div className="col-12">
                <div className="d-flex  justify-content-between">

                  <h3 className="px-5">{decodedText} listing</h3>
                  <button className='btn btn-success' onClick={handleAddToCart}>
                    <i className="fa-solid fa-cart-shopping me-1"></i>  Cart
                  </button>
                </div>
                <hr className='mb-0' />
              </div>
            </div>
        <ul>
        {loading ? ( // Render spinner while loading is true
       <Spinner/>
      ) :
        <div className="row g-3 ">
              {data?.hits?.map((recipe: any) => (
                <div className="col-12 col-sm-6 col-md-8 col-lg-4 col-xl-3">
                <RecipeCard key={recipe.id} recipe={recipe} />
              </div>
              ))}
            </div>}
        </ul>
      </div>
    {/* )} */}
  </div>
  )
}

export default page