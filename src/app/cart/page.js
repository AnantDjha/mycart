"use client";
import "./Cart.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { products } from "@/product";
import Link from "next/link";
import emptyCart from "../../../public/emptyCart.png";
import Image from "next/image";
import { decreaseQuantity, getSession, increaseQuantity, removeItem } from "@/actions/server";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [prod, setProd] = useState([]);
  const [cartProduct, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [minQuantity, setMinQ] = useState(null);
  const [maxQuantity, setMaxQ] = useState(null);
  const {cartDetail,setCartDetail} = useCart()
  const router = useRouter()


  const fetcher = () => {
    console.log("running fetch");
    
    let arr =  cartDetail
    setProd(arr)
    const updatedCart = arr
    .map((element) => products.find((a) => a.id === element.id))
    .filter((item) => item !== undefined);
    
    setCart(updatedCart);
  };

  useEffect(() => {
    getSession().then((res) => {
      if (!res) {
        router.push("/login") 
      }
    })
    fetcher();
    
  }, [cartDetail]);

  useEffect(() => {
    let getPrice = 0;
    prod.forEach((e) => {
      const foundProduct = products.find((a) => a.id === e.id);
      if (foundProduct) {
        getPrice += foundProduct.price * e.quantity;
      }
    });
    setPrice(getPrice);
  }, [prod]);

  const handleIncrease = (itemId, quantity) => {
    if (quantity >= 10) return;
    increaseQuantity(itemId).then((data)=>{
      if(data.length == 0)
      {
        alert("something went wrong")
        return
      }
      
      setCartDetail(data)
    })
    // fetcher()
  };

  const handleDecrease = (itemId, quantity) => {
    if (quantity <= 1) return;
   
    decreaseQuantity(itemId).then((data)=>{
      if(data.length == 0)
      {
        alert("something went wrong")
        return
      }
      
      setCartDetail(data)
    })
  };

  const handleRemove = (itemId) => {
    removeItem(itemId).then((data)=>{
      setCartDetail(data)
    })
  }

  if (cartProduct.length === 0) {
    return (
      <div
        className="cartEmpty"
        style={{
          height: "90vh",
          width: "100vw",
          backgroundColor: "#F8F8F8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Image src={emptyCart} alt="Empty Cart" />
        <button
          className="btnAddMore"
          onClick={() => {
            router.push("/");
          }}
        >
          ADD PRODUCTS
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mainCart">
        <h3>Order Summary</h3>
        <div className="cartContent">
          <div className="itemSummary">
            <p>
              <b className="text-lg">Products</b>
            </p>
            <div className="item">
              {cartProduct.map((item, i) => (
                <div className="itemBoxCart relative" key={i}>
                  <div className="temper">
                    <img src={item.url} alt={item.name} />
                    <Link
                      href=""
                      className="itemDetailCart"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <h4>
                        {item.name} - {item.quantity}
                      </h4>
                      <span>{item.detail}</span>
                      <h3>₹ {item.price}</h3>
                      <span>
                        <i>save {item.discount}</i>
                      </span>
                      <h5>Delivery within two days</h5>
                    </Link>
                  </div>
                  <div className="buttonToIncrease">
                    <FontAwesomeIcon
                      className="text-red-500"
                      icon={faTrashAlt}
                      onClick={() => handleRemove(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="buttons relative">
                      <button
                        style={{ border: prod.find((a) => a.id == item.id)?.quantity == 1 && "2px solid gray" }}
                        // disabled={prod.find((a) => a.id == item.id)?.quantity <= 1}
                        onMouseEnter={() => { setMinQ(item.id) }}
                        onMouseLeave={() => { setMinQ(null) }}
                        onClick={() => handleDecrease(item.id, prod.find((a) => a.id == item.id)?.quantity || 0)}>
                        -
                      </button>
                      <b>{prod.find((a) => a.id == item.id)?.quantity}</b>
                      <button
                        onMouseEnter={() => { setMaxQ(item.id) }}
                        onMouseLeave={() => { setMaxQ(null) }}
                        style={{ border: prod.find((a) => a.id == item.id)?.quantity == 10 && "2px solid gray" }}
                        onClick={() => handleIncrease(item.id, prod.find((a) => a.id == item.id)?.quantity || 0)}>
                        +
                      </button>

                      {(item.id === maxQuantity && prod.find((a) => a.id == item.id)?.quantity >= 10) && (
                        <span className="absolute text-sm w-fit text-red-500 bg-white bg-opacity-90 px-2 py-1 rounded-md shadow-lg bottom-9 right-0">
                          Not more than 10 at a time
                        </span>

                      )}
                      {(item.id === minQuantity && prod.find((a) => a.id == item.id)?.quantity <= 1) && (
                        <span className="absolute text-sm text-red-500 bg-white bg-opacity-90 px-2 py-1 rounded-md shadow-lg bottom-9  right-0">
                          Minimum quantity must be 1
                        </span>

                      )}
                    </div>
                  </div>


                </div>
              ))}
            </div>
            <p
              className="ulta"
              onClick={() => {
                router.push("/products");
              }}
            >
              <b>Add more product</b>
              <b style={{ marginRight: "1rem" }}>+</b>
            </p>
          </div>
          <div className="priceSummary">
            <div className="priceDetail">
              <h5>PAYMENT DETAIL</h5>
              <ul>
                <li>
                  <b>MRP Total</b>{" "}
                  <span>₹ {(price + (12 / 100) * price).toFixed(2)}</span>
                </li>
                <li>
                  <b>Additional Discount</b>{" "}
                  <span>₹ {((12 / 100) * price).toFixed(2)}</span>
                </li>
                <li>
                  <b>Total Amount</b> <span>₹ {price.toFixed(2)}</span>
                </li>
                <li>
                  <b>Shipping/Delivery charge</b> <span>₹ 0.00</span>
                </li>
              </ul>
              <p>
                <b>Total Payable</b>
                <span style={{ fontWeight: "bold" }}>₹ {price.toFixed(2)}</span>
              </p>
              <span>
                <p>
                  <i>Payable amount</i>
                  <b>₹{price.toFixed(2)}</b>
                </p>
                <Link href="">Proceed</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
