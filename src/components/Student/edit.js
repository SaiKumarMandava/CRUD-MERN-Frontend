import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState({});

  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:5000/api/student/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res.student));
  }, [id]);

  //setting form fileds value after fetching
  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,

      phone_number: data?.phone_number,
      email: data?.email,
      address: data?.address,
      age: data?.age,
    });
  }, [data]);
  const onFinish = (value) => {
    console.log(value);

    const obj = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(value),
    };
    try {
      fetch(`http://localhost:5000/api/Student/${id}`, obj)
        .then((res) => res.json())
        .then((res) => toast.success(res.msg));
      nav(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
      }}
    >
      <div class="form-container" style={{ padding: "10px" }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: "360px",
            padding: "10px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Edit Student</h2>

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
            <Input placeholder="input Customer Name" />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "This Field  Required",
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
    </div>
  );
};
export default App;
