"use client";
import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./ecommerce-category-product.css";
import Layout from "../components/Layout";
import { Button, Card, Rate, notification } from "antd";
import axios from "axios";

function App() {
  // const product = JSON.parse(localStorage.getItem("product"));
  const[product, setProducts] =  useState(JSON.parse(localStorage.getItem("product")))
  console.log('product: ', product);
  console.log('product: ', product);
  const [api, contextHolder] = notification.useNotification();

  const user= JSON.parse(localStorage.getItem("user"));

  
  

  const bookNow =() => {

    var data = JSON.stringify({
      "userId": user.id,
      "productId": product.id
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3005/user-product',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      api.success({
        message: `Success`,
        description:
          'Booking Success fully !',
        placement: 'top',
      });
      const res = product;
      res.bookNow = false;
      console.log('res: ', res);
      localStorage.setItem('product', JSON.stringify(res));
      setProducts(res)
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
      api.error({
        message: `Error`,
        description:
          'Booking failed !',
        placement: 'top',
      });
    });
    
  }
  return (
    <Layout>
      {contextHolder}
      <header
        style={{
          margin: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontFamily: "initial",
            color: "cadetblue",
          }}
        >
          Find your next stay Search low prices on hotels, homes and much
          more...
        </h1>
      </header>
      <Card>
        <div className="card-main">
          <div className=" NP-card">
            <img
              className="NP-card-img-main"
              src={product.image}
              alt="..."
            />
            {/* <div className="NP-card-details">
              <img
                src="https://mediacdn.99acres.com/media1/22301/11/446031684M-1694967399717.jpg"
                alt="np"
                className="NP-card-details-img"
              />
              <img
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                alt="np"
                className="NP-card-details-img"
              />
            </div> */}
          </div>
          <div className="NP-card-item-details">
            <div className="NP-card-item-rating"> <Rate allowHalf defaultValue={5} /></div>
            <div className="NP-card-item-name">{product.name}</div>
            <div className="NP-card-item-address">Address :  <span>
              <samp>{product?.country} india</samp>
              <samp>{product?.city} indore</samp>
              <samp>{product?.area} bholaram</samp>
              <samp>{product?.pinCode} 1345</samp></span></div>
            <div className="NP-card-item-desc">{product.description}</div>
            <div className="NP-card-item-mult">
              <div className="NP-card-item-price">INR ₹ <span>{product.price}/-</span></div>
              <div className="NP-card-item-type">{product.type}</div>
            </div>
            <div className="NP-card-item-mult">
              <Button className="NP-card-item-btn">Back</Button>
              <Button className="NP-card-item-type" disabled={!product.bookNow} onClick={bookNow}>Book Now</Button>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}

export default App;
