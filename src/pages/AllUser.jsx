import React, { useEffect, useState } from "react";
import axiosInstance from "../apiConfig";
import { Table } from "antd";
const AllUsers = () => {
  const [user, setUsers] = useState([]);
  const [IsLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    axiosInstance
      .get("/users")
      .then((res) => {
        console.log(res);
        setIsLoding(false);
        setUsers(res.data.error);
      })
      .catch((err) => {
        setIsLoding(false);
        console.log(err);
      });
  }, []);
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      width: 50,
      resposnive: ["md"],
    },

    {
      title: "Name",
      dataIndex: "name",
      width: "45%",
      resposnive: ["md"],
    },
    {
      title: "User Name",
      dataIndex: "username",
      width: 160,
      resposnive: ["md"],
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 60,
      resposnive: ["md"],
      filters: [
        {
          text: "User",
          value: "user",
        },
        {
          text: "Admin",
          value: "admin",
        },
      ],
      onFilter: (value, record) => record.role === value,
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px auto" }}>All Users</h1>
      <Table
        columns={columns}
        dataSource={user}
        loading={IsLoding}
        style={{
          width: "60%",
          margin: `5px auto auto auto`,
        }}
        caption={true}
        size="small"
      />
    </div>
  );
};
export default AllUsers;
