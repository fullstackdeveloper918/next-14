import { Urbanist } from 'next/font/google'
import { Burger } from '@/app/components/header/burger/burger'
import { CartIcon } from './cart-icon/cart-icon'
import Link from 'next/link'
import Logout from "../../../../public/img/icons8-logout-50.png"
import Image from 'next/image'
import { useState } from 'react'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

export const Header = () => {
  const router=useRouter()
  // const [state,setState]=useState<any>("")
  const storedUser = localStorage.getItem('user');
  // setState(storedUser)
  const logout = async () => {
    // setState(null as any)
    destroyCookie(null, "COOKIES_USER_ACCESS_TOKEN", {
        maxAge: 0,
        path: "/",
    });
    // toast.success('Logout successful! Redirecting to Sign In page.', {
    //   onClose: () => router.replace(`/signin`)
    // });
    router.replace(`/signin`)
}
  return (
    <>
     <ToastContainer />
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link" >Products</a>
              </li>
              <li>
              <a className="nav-link" href='/allProducts/calories'>Fetch Calories Data</a>
              </li>
              <li>
              <a className="nav-link" href='/allProducts/diet'>Fetch Diet Data</a>
              </li>
              <li>
              <a className="nav-link" href='/allProducts/Chicken Stir-Fry'>Chicken Stir-Fry</a>
              </li>
              <li>
              <a className="nav-link" href='/allProducts/Grilled Chicken'>Grilled Chicken</a>
              </li>
              <li className="">
              <a className="nav-link" href='/allProducts/Chicken'>Chicken</a>

              </li>
            </ul>
            {/* <button className=""> */}
            {/* </button> */}
            <form className="d-flex gap-4" role="search">
              {storedUser ?
                <button type="button" className="btn " onClick={logout}>
                  <Image src={Logout} style={{
                    height: 25, width: 25, marginTop: 8
                  }} alt="" className="" />
                </button>
                :
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a href="/signin" className="nav-link" >SignUp</a>
                  </li>
                </ul>
              }
            </form>
          </div>
        </div>
      </nav>
    </div>
    </>
  )
}
