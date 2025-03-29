// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Layout from "../components/Layout";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import countryList from "react-select-country-list";
import axios from "axios";
import { useRouter } from "next/navigation";

// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     description:
//       "Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1",
//     price: 19.99,
//     image:
//       "https://mediacdn.99acres.com/media1/22301/11/446031684M-1694967399717.jpg", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description for Product 1",
//     price: 19.99,
//     image: "", // Provide the image path
//   },

//   // Add more product objects as needed
// ];

const HomePage = () => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const isLogin = localStorage.getItem("isLogin");
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    var config = {
      method: "get",
      url: `http://localhost:3005/products-home`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const reset = () => {
    form.resetFields();
    var config = {
      method: "get",
      url: `http://localhost:3005/products-home`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const bookNow = (pid: any) => {
    var data = JSON.stringify({
      userId: user.id,
      productId: pid,
    });
    var config = {
      method: "post",
      url: "http://localhost:3005/user-product",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        api.success({
          message: `Success`,
          description: "Booking Success fully !",
          placement: "top",
        });
        // window.location.reload();
        var config = {
          method: "get",
          url: `http://localhost:3005/products-home`,
          headers: {
            "Content-Type": "application/json",
          },
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setProducts(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        api.error({
          message: `Error`,
          description: "Booking failed !",
          placement: "top",
        });
      });
  };

  const onFinish = (values: any) => {
    console.log("value: ", values);
    var data = JSON.stringify(values);

    var config = {
      method: "get",
      url: `http://localhost:3005/products-home?country=${values.country}&city=${values.city}&area=${values.area}&pinCode=${values.pinCode}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Layout>
      {contextHolder}
      <div>
        <header className="text-gray-600 body-font container px-5 py-10 mx-auto">
          <div className="text-2xl  text-cadet-blue font-serif ">
            Find your next stay Search low prices on hotels, homes and much
            more...
          </div>
          <div className="container flex py-5 flex-wrap flex-col md:flex-row items-center">
            <nav className="  md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <Form onFinish={onFinish} form={form}>
                <Row gutter={[16, 16]}>
                  <a className="mr-5 hover:text-gray-900">
                    {" "}
                    <Form.Item name="country">
                      <Select
                        className="w-64 h-10 text-sm"
                        placeholder="Select a country"
                        showSearch
                        options={countryList()
                          .getData()
                          .map((item) => {
                            return {
                              value: item.value,
                              label: item.label,
                            };
                          })}
                      />
                    </Form.Item>
                  </a>
                  <a className="mr-5 hover:text-gray-900">
                    <Form.Item name="city">
                      <Input
                        className="filterclassName"
                        placeholder="Enter a city"
                      />
                    </Form.Item>
                  </a>
                  <a className="mr-5 hover:text-gray-900">
                    <Form.Item name="area">
                      <Input
                        className="filterclassName"
                        placeholder="Enter  a area"
                      />
                    </Form.Item>
                  </a>
                  <a className="mr-5 hover:text-gray-900">
                    {" "}
                    <Form.Item name="pinCode">
                      <Input
                        className="filterclassName"
                        placeholder="Enter a pin code"
                      />
                    </Form.Item>
                  </a>
                  <a className="mr-5 hover:text-gray-900">
                    <Form.Item>
                      <Button className="text-black-900" htmlType="submit">
                        Search
                      </Button>
                    </Form.Item>
                  </a>
                  <a className="mr-5 hover:text-gray-900">
                    <Form.Item>
                      <Button
                        //  className="filterclassName btn-primary"
                        onClick={() => reset()}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                  </a>
                </Row>
              </Form>
            </nav>
          </div>
        </header>
        <section className="text-gray-600 body-font">
          <div className="container px-5  mx-auto">
           
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {products &&
              products.map((product) => (
                  <Product product={product} bookNow={bookNow} />
              ))}
              {products &&
              products.map((product) => (
                  <Product product={product} bookNow={bookNow} />
              ))}
              {products &&
              products.map((product) => (
                  <Product product={product} bookNow={bookNow} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
