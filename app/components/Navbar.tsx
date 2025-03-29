"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Button, Image } from "antd";
import SingUp from "./SingUp";
import SingIn from "./SingIn";
import { UserSwitchOutlined } from "@ant-design/icons";

// import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  //   const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenIn, setIsModalOpenIn] = useState(false);
  const isLogin = localStorage.getItem("isLogin");
  console.log("isLogin: ", isLogin);
  const isAdmin = localStorage.getItem("isAdmin");
  console.log("isAdmin: ", isAdmin);
  return (
    <header className="text-gray-400 bg-white-100 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex  title-font font-medium items-center text-white mb-4 text-3xl font-sans md:mb-0">
          <Link
            href="/"
            style={{
              border: "1px solid black",
            }}
            className="text-custom-blue"
          >
            Find your next stay
          </Link>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">
            <Link href="/">
              {" "}
              <Button style={{ backgroundColor: "white" }}>Home</Button>
            </Link>
          </a>
          {isAdmin && isAdmin && (
            <a className="mr-5 hover:text-white">
              <Link href="/product">
                {" "}
                <Button style={{ backgroundColor: "white" }}>
                  Product Lists
                </Button>{" "}
              </Link>
            </a>
          )}
          {isAdmin && isAdmin && (
            <a className="mr-5 hover:text-white">
              <Link href="/users">
                <Button style={{ backgroundColor: "white" }}>User Lists</Button>{" "}
              </Link>
            </a>
          )}
          {!isLogin && (
            <a className="mr-5 hover:text-white">
              <Link href="" onClick={setIsModalOpen} disabled={isLogin}>
                <Button style={{ backgroundColor: "white" }}>Register</Button>
              </Link>
            </a>
          )}
          {!isLogin && (
            <a className="mr-5 hover:text-white">
              <Link href="" onClick={setIsModalOpenIn} disabled={isLogin}>
                <Button style={{ backgroundColor: "white" }}>Sign in</Button>
              </Link>
            </a>
          )}
          {isLogin && (
      <li className="mr-5 hover:text-red text-black">
        <Link href="/profile">
          {" "}
          <UserSwitchOutlined />
        </Link>
      </li>
    )}
        </nav>
      </div>
      <SingUp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <SingIn isModalOpen={isModalOpenIn} setIsModalOpen={setIsModalOpenIn} />
    </header>
  );
};

export default Navbar;
