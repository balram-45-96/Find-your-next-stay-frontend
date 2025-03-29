import { Button, Form, Input, Modal, Select, notification } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

type SingInType ={
    isModalOpen: boolean
    setIsModalOpen: any
}
const SingIn = ({
    isModalOpen, setIsModalOpen
}: SingInType) => {

  const [api, contextHolder] = notification.useNotification();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { Option } = Select;

  const onFinish = (values: any) => {
  console.log('value: ', values);
  var data = JSON.stringify(values);
  
  var config = {
    method: 'post',
    url: 'http://localhost:3005/login',
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
        'Sing In success fully !',
      placement: 'top',
    });
    handleOk();
    localStorage.setItem('isLogin', 'isLogin');
    localStorage.setItem('user', JSON.stringify(response.data.user));   
    console.log('response.data: ', response.data);
    console.log('values: ', values);
    if(values.email === 'admin@gmail.com') {
    console.log('values.emailzzzzzzzzzzzzz: ', values.email);
      localStorage.setItem('isAdmin',"true")
    }
    setTimeout(() => {
      // window.location.reload();
    } ,2000)
  })
  .catch(function (error) {
    console.log(error);
    api.error({
      message: `Error`,
      description:
      error.response.data.error,
      placement: 'top',
    });
  });
  }

  return (
    <>
    {contextHolder}
      <Modal title="Sing In" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input type="email" />
    </Form.Item>

    
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
      </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" className='btn-primary'>
        Submit
      </Button>
      <Button  className='btn-primary'>
        Cancel
      </Button>
    </Form.Item>
  </Form>
      </Modal>
    </>
  );
};

export default SingIn;