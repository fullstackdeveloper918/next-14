import { getRecipeById } from '@/app/action'
import React from 'react'
interface GetidByProps {
    id: any; 
    handleBack: () => void;
  }
const ProductDetail: React.FC<GetidByProps> =async({id,handleBack})=> {

    const getDataById = await getRecipeById(id)
    console.log(getDataById);
    
  return (
    <div className="container">
    <div className="row">
        <div className="col-12">
          <h3 className="mb-5 mt-3">Recipe Details</h3>
          <button className="mb-3" onClick={handleBack}><i className="fa-solid fa-backward"></i> Back</button>
          {/* <Button className="mb-3 " >Back</button> */}
            <div className="details border rounded-4 p-3">
                <div className="banner mb-3">
                    <img src={getDataById?.recipe?.image} className="border rounded-3 " style={{width:'100%',height:300,objectFit:"cover"}}/>
                </div>
                <div className="info text-start">
                    <h5>{getDataById?.recipe?.label}</h5>
                </div>
            </div>
        </div>
    </div>
    <div className="row g-3 ">
      <h2 className="mt-5  text-start">Ingredients</h2>
          {getDataById?.recipe?.ingredients?.map((recipe: any) => (
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
  )
}

export default ProductDetail