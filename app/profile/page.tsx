"use client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, Form, Input, Select, Upload, notification } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, CardBody, Col, Container, FormGroup, Row } from "reactstrap";
import "./index.css";
import { useRouter } from 'next/navigation';
import axios from "axios";

const Profile = () => {
  // const history = useHistory();/
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const { Option } = Select;
  const user= JSON.parse(localStorage.getItem("user"));
  console.log('user: ', user);

  const [base64String, setBase64String] = useState('');
    console.log('base64String: ', base64String);
  const onFinish = (values: any) => {
    console.log('value:------- ', values);

    var data = JSON.stringify({
      ...values,
      image: base64String
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:3005/create-user',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      api.success({
        message: `Success`,
        description:
          'Update success fully !',
        placement: 'top',
      });
      localStorage.setItem('isLogin', 'isLogin');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('response.data.user: ', response.data.user);
      setTimeout(() => {
        window.location.reload();
      } ,2000)
    })
    .catch(function (error:any) {
      console.error(error);
      api.error({
        message: `Error`,
        description:
          'Update failed fully !',
        placement: 'top',
      });
    });
    
    }

  

    const handleFileChange = (e:any) => {
    console.log('e: ', e);
      // const file = e.files[0];
      const file = e.target.files[0];
      console.log('file: xxxxxxxx ', file);
  
      if (file) {
      console.log('file: ', file);
        convertFileToBase64(file);
      }
    };
  
    const convertFileToBase64 = (file:any) => {
      const reader = new FileReader();
  
      reader.onload = async (e:any) => {
        const base64 = e.target.result;
        
        setBase64String(base64);
      };
  
      reader.readAsDataURL(file);
    };
  return (
    <Layout>
      {contextHolder}
      <header
        style={{
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
      <Card style={{ borderRadius: "1%", backgroundColor: "moccasin" }}>
        <>
          <div
            className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={{
              backgroundImage:
                "url("+user?.image || "https://mediacdn.99acres.com/media1/22301/11/446031684M-1694967399717.jpg" + ")",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              borderRadius: "50%",
              height: "399px",
              width: "400px",
            }}
          ></div>
        </>
        <CardBody>
          <div style={{
            justifyContent: "space-between",
            display: "flex"
          }}>

          <h6 className="heading mb-4">User information</h6>
          <Button className="heading mb-3 " onClick={
            ()=> {
              console.log("User information");
              localStorage.clear();
              router.push('/')
              // window.location.reload();
            }
          }>Logout</Button>
          </div>
          <div className="pl-lg-4">
            <Form name="basic" onFinish={onFinish} initialValues={user}>
              <Row>
                <Col lg="6">
                  <Form.Item
                    name="username"
                    label='Full Name'
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="id"
                   style={{
                    display: "none",
                   }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg="6">
                  <Form.Item
                    name="gender"
                    label='Gender'
                    rules={[
                      { required: true, message: "Please select gender!" },
                    ]}
                  >
                    <Select placeholder="select your gender">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <Form.Item
                    name="email"
                    label='Email address'
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg="6">
                  <Form.Item
                    name="phone"
                    label='Phone No.'
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input type="number" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col lg="6">
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The new password that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col lg="6">
                <Form.Item name="image1" label="Upload Image">
                  {/* <Upload onChange={handleFileChange}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload> */}
                  <Input type="file" onChange={handleFileChange} />
                  {/* {base64String && <img src={base64String} alt="File" />} */}
                  </Form.Item>
                </Col>
                <Col lg="6">
                  <Button
                    htmlType="submit"
                    className="btn-primary"
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Profile;
