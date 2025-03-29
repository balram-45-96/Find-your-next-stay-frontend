"use client"
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Layout from "../components/Layout";
import { Button, Card, Col, Form, Image, Input, Row, Select, Space, Table, Tag } from "antd";
import countryList from "react-select-country-list";
import ProductModalForm from "../components/ProductModalForm";
import axios from "axios";

const products = [
  {
    id: 1,
    name: "Product 1",
    status: "Active",
    description:
      "Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1Description for Product 1",
    price: 19.99,
    image:
      "https://mediacdn.99acres.com/media1/22301/11/446031684M-1694967399717.jpg", // Provide the image path
  },
  {
    id: 2,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
    status: "In Active",
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "", // Provide the image path
  },

  // Add more product objects as needed
];


const ProductPage = () => {
  const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialValues , setInitialValues] = useState(false);
    const truncateWords = (text : string, numWords: number) => {
        // Split the text into an array of words
        const words = text.split(' ');
    
        // Slice the array to get the first numWords words
        const truncatedWords = words.slice(0, numWords);
    
        // Join the truncated words back into a single string
        return truncatedWords.join(' ');
      }

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
      const columns = [
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (value: string) => <Image
          width={50}
          height={60}
           alt="example"
           // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
           src={value || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
         />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (value: string) => <samp className="product-price">{value}</samp>
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value: string) => <samp className="product-price">{value}</samp>
          },
          {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
          },
          {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
          },
          {
            title: 'Book Now',
            dataIndex: 'bookNow',
            key: 'bookNow',
            render: (val: any) => <Tag color={val ? "green": "red"} key={val}>
            {val ? "Yes": "NO"}
          </Tag>
          },
          
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'PIN Code',
            dataIndex: 'pinCode',
            key: 'pinCode',
          },
          {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
          },
          

          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (val: any) => <samp>{truncateWords(val, 10)}</samp>
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (val: any) => <Tag color={val=='Active'? "green": "red"} key={val}>
            {val}
          </Tag>
          },
          
          {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id: any) => (
                <Space size="middle">
                  <Tag  key="edit" onClick={()=>{
                     form.resetFields();
                    const val = products.find(product => product.id === id)
                    console.log(val);
                    form.setFieldsValue(val)
                    setIsModalOpen(true)
                    setInitialValues(false);
                  }}>
            Edit
          </Tag>
                </Space>
              ),
          },
    ]
    const [products , setProducts] = useState([]);

    useEffect(()=>{
      var config = {
        method: 'get',
        url: 'http://localhost:3005/products',
        headers: { 
          'Content-Type': 'application/json'
        },
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setProducts(response.data[0])
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }, [])
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
              color: "cadetblue",
            }}
          >
            Find your next stay Search low prices on hotels, homes and much
            more...
          </h1>
        </header>
          <div>
            <Table title={() => <ul style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <li>
                    Product list
                </li>
                <li>
                    <Button className="btn-primary" onClick={()=> {setIsModalOpen(true)
                    form.resetFields();
                    setInitialValues(true)
                    } } > Add Product</Button>
                </li>
            </ul>} columns={columns} dataSource={products} />
          </div>
      </div>
      <ProductModalForm visible={isModalOpen} form={form} setProducts={setProducts} onCancel={()=> setIsModalOpen(false)} initialValues={initialValues} initialValues={initialValues}/>
    
      </Card>
     </Layout>
  )
};

export default ProductPage;
