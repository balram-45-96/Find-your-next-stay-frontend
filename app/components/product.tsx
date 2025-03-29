// components/ProductCard.js
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Rate,
  Row,
  notification,
} from "antd";
import { useRouter } from "next/navigation";
import Meta from "antd/es/card/Meta";
import { FaWhatsappSquare } from "react-icons/fa";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
// import {} from "../../public/download (1).jpeg"

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  city?: string;
  country?: string;
  area?: string;
  pinCode?: string;
  type?: string;
}

interface ProductCardProps {
  product: Product;
  bookNow: any;
}

const ProductCard = ({ product, bookNow }: ProductCardProps) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const isLogin = localStorage.getItem("isLogin");
  const truncateWords = (text: string, numWords: number) => {
    // Split the text into an array of words
    const words = text.split(" ");

    // Slice the array to get the first numWords words
    const truncatedWords = words.slice(0, numWords);

    // Join the truncated words back into a single string
    return truncatedWords.join(" ");
  };
  

  return (
    <
    >
      {contextHolder}
   
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6 ">
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src={product.image} />
        </div>
        <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{product.name}</h2>
        <p className="text-base leading-relaxed mt-2"> Address : {' '}
                  {product?.country} {' '}
                  {product?.city} {' '}
                  {product?.area} {' '}
                  {product?.pinCode}</p>
                  <p className="text-base text-aline-center leading-relaxed ">
                  {product.description.split(' ').slice(0, 20).join(' ')}
                  </p>
        <div className="mt-1">
          <p className="mt-1">{product?.type}</p>
          <p className="mt-1">INR ₹{product.price}</p>

        </div>
        <a className="text-indigo-500 inline-flex items-center mt-3"> More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

    </>
  );
};

export default ProductCard;
