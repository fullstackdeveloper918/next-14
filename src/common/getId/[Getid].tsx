import { useParams } from 'next/navigation'
import React from 'react'
import RecipeCard from '../RecipeCard'
import Spinner from '../spinner'
import { getId1 } from '@/app/action'
interface GetidProps {
  id: any;
  decodedText: any,
  handleAddToCart: () => void;
}
const Getid: React.FC<GetidProps> = async ({ id, handleAddToCart }) => {

  const getdata = await getId1(id)
  const encodedText = id as any
  const decodedText = decodeURIComponent(encodedText);
  // const handleBack = () => {
  //   router.back()
  // }
  // const handleAddToCart = () => {
  //     router.push('/cart');
  //   };
  return (
    <div >
      <div className="text-center mt-5">

        <h1>Product's</h1>
      </div>
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
          <div className="row g-3 ">
            {getdata?.hits?.map((recipe: any) => (
              <div className="col-12 col-sm-6 col-md-8 col-lg-4 col-xl-3">
                <RecipeCard key={recipe.id} recipe={recipe} />
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  )
}
export default Getid;