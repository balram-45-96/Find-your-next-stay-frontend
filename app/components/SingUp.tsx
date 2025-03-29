import { Button, Form, Input, Modal, Select, notification } from 'antd';
import React, { useState } from 'react';
import  axios  from 'axios';


type SingInType ={
    isModalOpen: boolean
    setIsModalOpen: any
}
const SingUp = ({
    isModalOpen, setIsModalOpen
}: SingInType) => {

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
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values: any) => {
  console.log('value: ', values);
  var data = JSON.stringify(values);
  
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
        'Sing Up success fully !',
      placement: 'top',
    });
    handleOk();
    localStorage.setItem('isLogin', 'isLogin');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    console.log('response.data.user: ', response.data.user);
    if(values.email === 'admin@gmail.com') {
      localStorage.setItem('isAdmin',"true")
    }
    setTimeout(() => {
      window.location.reload();
    } ,2000)
  })
  .catch(function (error:any) {
    console.error(error);
    api.error({
      message: `Error`,
      description:
        'Sing Up failed fully !',
      placement: 'top',
    });
    handleOk();
  });
  
  }

  return (
    <>
      {contextHolder}
      <Modal title="Sing Up" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
      label="Full Name"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input type='number' style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder="select your gender">
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

       <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
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

export default SingUp;