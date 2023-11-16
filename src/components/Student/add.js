import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const App = () => {
  const [form] = Form.useForm();

  const nav = useNavigate();
  const onFinish = async (value) => {
    console.log(value);

    const obj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(value),
    };

    try {
      const response = await fetch("http://localhost:5000/api/student", obj);
      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        nav(-1);
        form.resetFields();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <div
      class="form-container"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          width: "380px",
          padding: "10px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create New Student</h2>

        <Form.Item
          label="Student Name"
          name="name"
          rules={[
            {
              required: true,
              message: "This Field Required",
            },
          ]}
        >
          <Input placeholder="input student name" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: "This Field  Required",
            },
            {
              message: "Age must be a number",
            },
          ]}
        >
          <Input placeholder="input age" type="number" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "This Field  Required",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a 10-digit phone number",
            },
          ]}
        >
          <Input placeholder="input Number" type="number" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "This Field  Required",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="input email address" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "This Field Required",
            },
          ]}
        >
          <Input placeholder="input address" />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <NavLink to="/table">
            <Button
              htmlType="cancel"
              style={{
                backgroundColor: "red",
                color: "white",
                fontFamily: "bold",
              }}
            >
              Cancel
            </Button>
          </NavLink>

          <Button
            htmlType="sumbit"
            style={{
              backgroundColor: "green",
              color: "white",
              fontFamily: "bold",
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default App;
