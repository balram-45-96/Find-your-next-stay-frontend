"use client";
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Layout from "../components/Layout";
import { Button, Card, Col, Form, Input, Row, Select, Space, Table, Tag } from "antd";
import countryList from "react-select-country-list";
import ProductModalForm from "../components/ProductModalForm";
import axios from "axios";

const products = [
  {
    id: 2,
    username: "balram patidar",
    email: "Description for Product 1",
    phone: 19.99,
    gender: "Male", // Provide the image path
    status: "In Active",
  },
];

const ProductPage = () => {
  const [form] = Form.useForm();
  const [products , setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const truncateWords = (text: string, numWords: number) => {
    // Split the text into an array of words
    const words = text.split(" ");

    // Slice the array to get the first numWords words
    const truncatedWords = words.slice(0, numWords);

    // Join the truncated words back into a single string
    return truncatedWords.join(" ");
  };

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:3005/users',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setProducts(response.data.data[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, [])


  const toggleStatus = (userId:any) => {
  console.log('userId: ', userId);
    // Find the user by ID

  };


  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Full Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val: any, record: any) => (
        <Tag
          color={val == "Active" ? "green" : "red"}
          key={val}
          onClick={() => toggleStatus(record.id)}
        >
          {val}
        </Tag>
      ),
    },
  ];

  return (
    <Layout>
     <Card>
     <div>
        <header
          style={{
            margin: "10px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontFamily: "initial",
              color: "#5f9ea0",
            }}
          >
            Find your next stay Search low prices on hotels, homes and much
            more...
          </h1>
        </header>
        <div>
          <Table
            title={() => "Users List"}
            columns={columns}
            dataSource={products}
          />
        </div>
      </div>
     </Card>
    </Layout>
  );
};

export default ProductPage;
