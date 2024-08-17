"use client"
import { getSession, logout } from "@/actions/server"
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function NavBar() {
    const navRef = useRef(null)
    const {cartDetail} = useCart()
   
  
    return (
        <div className="w-full bg-black sticky top-0 z-50">
            <nav className="flex justify-between max-w-screen-lg h-16 items-center text-white mx-auto px-4">
                <div className="text-lg font-semibold">
                    <span><Link href="/">MEDIFY</Link></span>
                </div>
                <div className="flex space-x-4" ref={navRef}>
                <span>
                        <button
                            className="px-4 cursor-pinter border border-white rounded-lg active:scale-110 duration-200"
                            onClick={async () => {
                                if (await getSession()) {
                                    await logout();
                                    window.location.href = "/login"
                                }

                            }}
                        >
                            logout
                        </button>
                    </span>
                    <span className="w-6 h-6 cursor-pointer relative">
                        <Link href="/cart" className="text-xl"><FontAwesomeIcon icon={faShoppingCart}/></Link>

                        <p className="absolute rounded-full flex items-center justify-center bg-red-400 h-4 w-4 top-0 left-4 text-white text-xs">{cartDetail.length}</p>
                    </span>
                </div>
            </nav>
           
        </div>
    );
}
