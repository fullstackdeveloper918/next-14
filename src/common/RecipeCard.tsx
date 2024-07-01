'use client';
import Link from 'next/link';
import { useState } from 'react';

const RecipeCard = (recipe: any) => {
    const url = recipe?.recipe?.recipe?.uri || recipe?.recipe?.recipe?.recipe?.uri || recipe;
    const uri = url.split('_').pop();
    console.log(recipe?.recipe?.recipe?.recipe?.uri, "check")
    const [state, setState] = useState<number>(0)
    const [cartRecipes, setCartRecipes] = useState<any[]>([]);
    const handleAddToCart = () => {
        const existingRecipes = localStorage.getItem('cartRecipes');
        let updatedRecipes: any[] = [];
        setState((prevCount: any) => prevCount + 1)
        if (existingRecipes) {
            updatedRecipes = JSON.parse(existingRecipes);
        }
        updatedRecipes.push(recipe);
        localStorage.setItem('cartRecipes', JSON.stringify(updatedRecipes));
        console.log(updatedRecipes, "checkCart");

    };
    const handleRemoveFromCart = () => {
        const existingRecipes = localStorage.getItem('cartRecipes');
        let updatedRecipes: any[] = [];

        if (existingRecipes) {
            updatedRecipes = JSON.parse(existingRecipes);
            if (updatedRecipes.length > 0) {
                updatedRecipes.pop(); 
                setState((prevCount) => Math.max(0, prevCount - 1));
                localStorage.setItem('cartRecipes', JSON.stringify(updatedRecipes));
                setCartRecipes(updatedRecipes);
                console.log(updatedRecipes, "checkCart");
            }
        }
    };
    console.log(state, "12");

    return (
        <>
            <div className="card p-2 rounded-4 h-100 shadow-sm">
                <div className="card-image " >
                    <img 
                    src={recipe?.recipe?.recipe?.image || recipe?.recipe?.recipe?.recipe?.image || recipe?.image||recipe?.recipe?.image}
                     className="w-100 h-80 rounded-3" />
                </div>
                <div className="card-body pb-2 d-flex flex-column">
                    <h5 className="card-title fs-6 text-start mb-4">{recipe?.recipe?.recipe?.label || recipe?.recipe?.recipe?.recipe?.label || recipe?.recipe?.lable}</h5>
                    <div className="d-flex align-items-center flex-nowrap gap-2 mt-auto">
                        {recipe?.recipe?.recipe?.recipe ?
                            <button className='btn btn-primary w-80' onClick={recipe?.handleRemoveFromCart}> <i className="fa-solid fa-cart-shopping me-1"></i> Remove</button>
                            : <div>
                                {state === 0 ?
                                    <span className='btn btn-primary w-100' onClick={handleAddToCart}>
                                        {state > 0 ? `+ ${state}` : <i className="fa-solid fa-cart-shopping me-1"></i>} Add Cart
                                    </span> :
                                    <>
                                        <button className='btn btn-danger w-20 ' onClick={handleRemoveFromCart}>
                                            <span className="">
                                                -
                                            </span>
                                        </button>
                                        <span className='mx-2'>{state}</span>
                                        <button className='btn btn-primary w-20' onClick={handleAddToCart}>
                                            <span className="">
                                                +
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                        }

                        <Link href={`/product/${encodeURIComponent(uri)}`} className='d-block w-50'>
                            <button className='btn btn-success fw-600 w-100'><i className="fa-solid fa-eye me-1"></i>Details</button>
                        </Link>
                    </div>
                </div>
            </div>


        </>
    );
};
export default RecipeCard;
