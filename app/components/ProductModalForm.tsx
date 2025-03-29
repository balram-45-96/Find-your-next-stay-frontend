import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, notification, Upload } from 'antd';
import countryList from "react-select-country-list";
import axios from 'axios';

const { Option } = Select;

const ProductModalForm = ({ visible, onCancel, form , setProducts, initialValues} :any) => {
  const [api, contextHolder] = notification.useNotification();
  const [base64String, setBase64String] = useState('');
  const onFinish = (values:any) => {
  console.log('values:ssss ', values);
    // You can perform any necessary actions with the form data here
    var data = JSON.stringify({...values });
    
    var config = {
      method: 'post',
      url: 'http://localhost:3005/products',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
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
      api.success({
        message: `Success`,
        description:
          'Product add success fully !',
        placement: 'top',
      });
      onCancel();
    })
    .catch(function (error) {
      console.log(error);
      api.error
      ({
        message: `Success`,
        description:
          'Product add error !',
        placement: 'top',
      });
    });
    
    form.resetFields();
  };

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
    <>
    {contextHolder}
    <Modal
      visible={visible}
      title={!initialValues? 'Update Product': 'Create Product'}
      okText={!initialValues? 'Update Product': 'Create Product'}
      okButtonProps={{ className: 'btn-primary' }}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
          })
          .catch((info) => {
            console.error('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="product-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="id"
          style={{
            display: 'none'
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"

          rules={[{ required: true, message: 'Please enter the description' },  { min: 500, message: 'Description must be at least 500 characters' },
          { max: 1000, message: 'Description cannot exceed 1000 characters' },]}
        >
          <Input.TextArea  />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <Input type="number" />
        </Form.Item>


        <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter the city' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter the country' }]}>
        <Select
                  className="filterClass"
                  placeholder="Select a country"
                  style={{ width: "100%" }}
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

        <Form.Item label="Area" name="area" rules={[{ required: true, message: 'Please enter the area' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Pin Code" name="pinCode" rules={[{ required: true, message: 'Please enter the pin code' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Image upload" name="image" rules={[{ required: true, message: 'Please enter the image url' }]}>
          <Input  />
        </Form.Item>

        <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Select a type' }]}>
          <Select>
            <Option value="1 BHK">1 BHK</Option>
            <Option value="2 BHK">2 BHK</Option>
            {/* Add more options if needed */}
          </Select>
        </Form.Item>

        <Form.Item label="Kook Now Status" name="bookNow" rules={[{ required: true, message: 'Select a type' }]}>
          <Select>
            <Option value>Yes</Option>
            <Option value={false}>NO</Option>
            {/* Add more options if needed */}
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Select a status' }]}>
          <Select >
            <Option value="Active">Active</Option>
            <Option value="In Active">In Active</Option>
            {/* Add more options if needed */}
          </Select>
        </Form.Item>      </Form>
    </Modal>
    </>
  );
};

export default ProductModalForm;
