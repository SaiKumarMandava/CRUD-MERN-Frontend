import React from "react";
import { useState, useEffect } from "react";
import { Space, Table, Button, Form, message } from "antd";
import "./style.css";
import { toast } from "react-toastify";

import { Link, NavLink } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchedDataLength, setFetchedDataLength] = useState(0);
  const [form] = Form.useForm();
  const getData = () => {
    fetch("http://localhost:5000/api/student")
      .then((res) => res.json())
      .then((data) => {
        setData(data?.student);
        setFetchedData(fetchedData?.student);
        const length = data?.student?.length;
        setFetchedDataLength(length);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "S.No",
      align: "center",
      key: "index",
      className: "tableHeader",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      className: "tableHeader",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
      className: "tableHeader",
    },

    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_no",
      align: "center",
      className: "tableHeader",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      className: "tableHeader",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      text: "center",
      align: "center",
      className: "tableHeader ",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      className: "tableHeader",

      render: (record) => (
        <Space size="middle">
          <Link to={`/edit/${record._id}`}>
            <Button
              style={{
                backgroundColor: "blue",
                color: "white",
                fontFamily: "bold",
                fontSize: "15px",
              }}
            >
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => deleteHan(record._id)}
            style={{
              backgroundColor: "Red",
              color: "white",
              fontFamily: "bold",
              fontSize: "15px",
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  //delete method
  const deleteHan = async (id) => {
    console.log(id);

    fetch(`http://localhost:5000/api/student/${id}`, { method: "DELETE" })
      .then((res) => res.json())

      .then((res) => toast.success(res?.msg));

    getData();
  };

  return (
    <div>
      <br />

      <div style={{ width: "88vw", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            width: "85vw",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}>Students</p>

          <p style={{ fontSize: "20px", marginTop: "2px" }}>
            Total number of students :{" "}
            <span style={{ fontFamily: "serif" }}>{fetchedDataLength}</span>{" "}
          </p>
          <NavLink to="/add">
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "bold",
                fontSize: "15px",
              }}
            >
              Create Student
            </Button>
          </NavLink>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            onChange(current) {
              setPage(current);
            },
          }}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};
export default App;
