"use client"
import { products } from "@/product"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactStars from "react-stars"
import { motion, useAnimate, useAnimation } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { addItemToCart, getCart } from "@/actions/server"

export default function ProductBox({ item }) {
    const animation = useAnimation()
    const {cartDetail , setCartDetail} = useCart()


const addItem = async (id)=>{
    try{
        await addItemToCart(id)
    }
    catch(e){
        alert(e)
    }

    
}
const helper= async (id)=>{
    addItem(id)
    
    let cartData = await getCart();
    setCartDetail(cartData)
}
    const handleAddToCart = async(id) => {
        animation.start({
            width: 0,
            opacity: [1, 0],

            transition: { duration: 0.4, ease: 'easeInOut' }
        })
        
            await helper(id);
          
            animation.start({
                width: "100%",
                position: "relative",
                top: ["3rem", 0],
                opacity: [0, 1],
                transition: { duration: 0.3, ease: 'easeInOut' }
            })
        }

    return (
        <div href="/" className="block p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200  w-84 bg-white">
            <img src={item.url} alt={item.name} className="w-full h-auto rounded-md " />
            <div className="mt-4">
                <h2 className="text-lg font-bold flex justify-between ">
                    {item.name} <span className=" text-sm text-gray-600 ">{item.tag[0]}</span>
                </h2>
                <p className="text-gray-700">{item.quantity}</p>
                <h4 className="text-lg font-semibold text-red-600">₹ {item.price} <span className="text-sm font-normal text-gray-500">M.R.P</span></h4>
                <p className="text-green-600 font-medium">Get up to <b>{item.discount}</b></p>
                <div className="flex items-center mt-2">
                    <ReactStars
                        count={5}
                        value={4.5}
                        size={24}
                        color2={'#ffd700'}
                    />
                </div>
                <div className="mt-2 mb-2 flex justify-center">
                    <motion.button className="w-full h-10 border text-white rounded-lg border-black pt-1 pb-1 overflow-hidden bg-black disabled:border-0 disabled:bg-white disabled:text-black " disabled={cartDetail.find(a => a.id == item.id) != null} onClick={() => handleAddToCart(item.id)} animate={animation}>
                        {cartDetail.find(a => a.id == item.id) != null  ? <span><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /> Added</span> : <span>Add to cart </span>}
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
