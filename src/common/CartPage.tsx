'use client';
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import { useRouter } from 'next/navigation';
const CartPage = () => {
    const router = useRouter()
    const [cartRecipes, setCartRecipes] = useState<any[]>([]);
    console.log(cartRecipes, "asaq")

    React.useEffect(() => {
        const existingRecipes = localStorage.getItem('cartRecipes');
        if (existingRecipes) {
            setCartRecipes(JSON.parse(existingRecipes));
        }
    }, []);

    const handleRemoveFromCart = (index: number) => {
        const updatedRecipes = [...cartRecipes];
        updatedRecipes.splice(index, 1);
        setCartRecipes(updatedRecipes);
        localStorage.setItem('cartRecipes', JSON.stringify(updatedRecipes));
    };
    console.log(cartRecipes, "awwsasa")
    const handleBack = () => {
        router.back()
    }
    return (
        <div className='py-5 text-center'>
            <div className="">

                <h1 className='mt-2 mb-5'>Add to Cart Recipes</h1>
            </div>
            <div>
                <div className="mb-4" style={{ paddingRight: "1200px" }}>

                    <button className="" onClick={handleBack}><i className="fa-solid fa-backward"></i> Back</button>
                </div>
                <div className="container">
                    {cartRecipes[0] ?
                        <div className="row g-3 ">
                            {cartRecipes?.map((recipe: any, index: number) => (

                                <div className="col-12 col-sm-6 col-md-8 col-lg-4 col-xl-3" key={index}>
                                    <RecipeCard key={recipe.id} recipe={recipe} handleRemoveFromCart={handleRemoveFromCart} />

                                </div>
                            ))}
                        </div>
                        : "Not Found Cart Data"}

                </div>
            </div>
        </div>
    )
}

export default CartPage;