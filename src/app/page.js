"use client"
import Image from "next/image";
import bannerMadi from "../../public/bannerMedi.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { products } from "@/product";
import ProductBox from "./components/ProductBox";
import NavBar from "./components/NavBar";
import { createContext, useContext, useEffect, useState } from "react";
import { getCart, getSession } from "@/actions/server";
import { CartProvider, useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter()
  const {cartDetail , setCartDetail} = useCart()

  useEffect(() => {
    getSession().then((res) => {
      
      if (!res) {
        router.push("/login") 
      }
      getCart().then((data)=>{setCartDetail(data)})
    })
    

  }, [])

  

  return (
    <>
      <NavBar  />
      <div className="w-full min-h-screen flex justify-center overflow-auto bg-gray-100">
        <div className="w-full max-w-screen-lg mt-4 px-4">

          {/* Banner Section */}
          <div className="banner  sm: h-28 w-full h-36 relative flex items-center justify-between bg-white shadow-sm rounded-lg p-4">
            <div className="flex flex-col justify-center ">
              <h3 className=" text-20 font-bold ml-8 sm:ml-3">Get up to <span className="text-green-500 text-18 bg-white px-2">40% off</span></h3>
              <p className="text-gray-600 ml-8 sm:ml-3 text-18">Grab the deal now</p>
            </div>
            <div className="flex w-1/3 justify-end ">
              <Image src={bannerMadi} alt="Banner" className="w-40 h-auto  mr-8  sm:ml-3" />
            </div>
          </div>

          {/* Filter and Sort Buttons */}
          <div className="flex justify-between mt-6">
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-100">
              <span className="w-4"><FontAwesomeIcon icon={faFilter} /></span> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-100">
              <span className="w-3"><FontAwesomeIcon icon={faSort} /></span> Sort
            </button>
          </div>

          {/* Product Grid */}
          <div className="mt-6 grid  grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {products.map(item => (
              <ProductBox key={item.id} item={item} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
