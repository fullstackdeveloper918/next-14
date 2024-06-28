'use client';
import React, { useState, useEffect } from 'react';
import banner from '../../src/logo.svg'
// import { useRouter } from 'next/router';
import { getId, getRecipeById } from '@/common/recipeService';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const page: React.FC = () => {
  const [recipe1, setRecipe1] = useState<any>('');
  const [recipe, setRecipe] = useState<any>([]);
  const router =useRouter()
//   const match = useMatch(`recipe/:id`)

const searchParam = useParams();
  const id = searchParam.id;
const fetchRecipe = async () => {
  console.log(id,"gsdjfgsjdfgsgd");
    // let id= router?.back
    try {
      const data = await getRecipeById(id as any);
      console.log(data,"sd")
      setRecipe1(data?.recipe);
      setRecipe(data?.recipe);
      
    } catch (error) {
      console.log(error)
    }
  };
const fetchRecipe1 = async () => {
  console.log(id,"gsdjfgsjdfgsgd");
    // let id= router?.back
    try {
      const data = await getId(id as any);
      console.log(data,"WERWERWERWER")
      setRecipe1(data?.recipe);
      setRecipe(data?.recipe);
      
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchRecipe();
    fetchRecipe1();
  }, [id]);
console.log(recipe,"checnk")
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <section className='info-section py-5'>
    <div className="container">
        <div className="row">
            <div className="col-12">
              <h3 className="mb-5 mt-3">Recipe Details</h3>
                <div className="details border rounded-4 p-3">
                    <div className="banner mb-3">
                        <img src={recipe1?.image} className="border rounded-3 " style={{width:'100%',height:300,objectFit:"cover"}}/>
                    </div>
                    <div className="info text-start">
                        <h5>{recipe1?.label}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className="row g-3 ">
          <h2 className="mt-5  text-start">Ingredients</h2>
              {recipe?.ingredients?.map((recipe: any) => (
                <div className="col-12 col-sm-6 col-md-8 col-lg-4 col-xl-3 mt-2">
                  {/* <RecipeCard key={recipe.id} recipe={recipe} /> */}
            <div className="card p-2 rounded-4 h-100 shadow-sm">
                <div className="card-image">
                  <img src={recipe?.image} className="img-fluid rounded-3" />
                </div>
                <div className="card-body b-2 d-flex flex-column">
                  <h5 className="card-title fs-6 text-start mb-4">{recipe?.food}</h5>
                  <h5 className="card-title fs-6 text-start ">{recipe?.foodCategory}</h5>

                </div>
                <div className="card-body pb-2 d-flex flex-column">
                  <h5 className="card-title fs-6 text-start mb-4">{recipe?.text}</h5>

                </div>
              </div>
               </div>
              ))}
            </div>

    </div>
</section>
  );
};

export default page;
