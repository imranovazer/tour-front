import { Button, Table } from "antd";

import { useState, useEffect } from "react";
import { User } from "../../types";
import useFetching from "../../hooks/useFetching";
import usersApi from "./api";
import { ContainerLoading } from "../../components/Loading";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a: User, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    //reder :
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    sorter: (a: User, b: any) => a.role.localeCompare(b.name),
  },
  {
    title: "Edit",
    dataIndex: "",
    key: "edit",
    render: () => <Button type="default">Edit</Button>,
  },
  {
    title: "Delete",
    dataIndex: "",
    key: "delete",
    render: () => (
      <Button type="primary" danger>
        Delete
      </Button>
    ),
  },
];
function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [getAllUsers, getIsLoading] = useFetching(async () => {
    const res = await usersApi.getUsers();

    setUsers(res.data);
  });

  useEffect(() => {
    getAllUsers(null);
  }, []);

  return (
    <div>
      {getIsLoading ? (
        <ContainerLoading />
      ) : (
        <Table dataSource={users} columns={columns} />
      )}
    </div>
  );
}

export default AdminUsers;
