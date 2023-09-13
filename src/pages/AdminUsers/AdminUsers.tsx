import { Button, Form, Table, Input, Select } from "antd";

import { useState, useEffect, useRef } from "react";
import { User } from "../../types";
import useFetching from "../../hooks/useFetching";
import usersApi from "./api";
import { ContainerLoading } from "../../components/Loading";
import ConfirmModal from "../../components/ConfirmModal";
import useLoading from "../../hooks/useLoading";
import { useDispatch } from "react-redux";
import { displayAlert } from "../../redux/reducers/alertSlice";
import AdminPanelModal from "../../components/AdminPanelModal";
import { Store } from "antd/es/form/interface";

const { Option } = Select;
function AdminUsers() {
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
      render: (user: User) => (
        <Button type="default" onClick={() => handleUserEditClick(user)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "delete",
      render: (user: User) => (
        <Button
          type="primary"
          danger
          onClick={() => handleUserDeleteClick(user._id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const [userToDelete, setUserToDelete] = useState("");
  const [userToEdit, setUserToEdit] = useState<User | undefined | Store>(
    undefined
  );
  const formRef: any = useRef();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [modalMode, setModalMode] = useState<"edit" | "create" | undefined>();
  const [getAllUsers, getIsLoading] = useFetching(async () => {
    const res = await usersApi.getUsers();

    setUsers(res.data);
  });
  //@ts-ignore
  const [createUser, isCreateUserLoading] = useLoading({
    callback: async (data) => {
      const newUser = await usersApi.createUser(data);

      setUsers((prevState: any) => {
        const newUsers = [...prevState, newUser.data];

        return newUsers;
      });
      setEditModal(false);

      dispatch(
        displayAlert({ type: true, title: "User created successfully" })
      );
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to create user" }));
      console.log("Error");
    },
  });
  //@ts-ignore
  const [editUser, isEditUserLoading] = useLoading({
    callback: async ({ id, data }) => {
      const newUser = await usersApi.editUser(id, data);

      const newUsers = users.map((user) => {
        if (userToEdit?._id === user._id) {
          return newUser.data;
        } else {
          return user;
        }
      });
      setUsers(newUsers);
      setEditModal(false);
      setUserToEdit(undefined);
      dispatch(displayAlert({ type: true, title: "User edited successfully" }));
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to edit user" }));
      console.log("Error");
    },
  });
  const handleUserDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteModal(true);
  };
  const handleUserEditClick = (user: User) => {
    setModalMode("edit");
    setUserToEdit(user);
    setEditModal(true);
  };

  //@ts-ignore
  const [deleteUser, isDeleteLoading] = useLoading({
    callback: async (id) => {
      await usersApi.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));

      dispatch(
        displayAlert({ type: true, title: "User deleted successfully!" })
      );
      setDeleteModal(false);
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable delete user" }));
      setDeleteModal(false);
    },
  });
  type FieldType = {
    name?: string;
    wallet?: number;
    email?: string;
    password?: string;
    role?: "user" | "guide" | "lead-guide" | "admin";
  };

  const onFinish = (values: any) => {
    if (modalMode == "edit") {
      editUser({ id: userToEdit?._id, data: values });
    } else if (modalMode == "create") {
      createUser(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    getAllUsers(null);
  }, []);
  const triggerSubmit = () => {
    formRef.current.submit();
  };
  const onRoleChange = () => {};
  return (
    <div>
      <div className="border  shadow-sm rounded-lg p-5 mb-5">
        <button
          onClick={() => {
            setModalMode("create");
            setEditModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-500/80 transition-colors rounded-lg ho py-1 px-3 font-bold text-white"
        >
          Create user
        </button>
      </div>
      {getIsLoading ? (
        <ContainerLoading />
      ) : (
        <Table dataSource={users} columns={columns} />
      )}
      {deleteModal && (
        <ConfirmModal
          display={deleteModal}
          setDisplay={setDeleteModal}
          CallBack={() => deleteUser(userToDelete)}
          title="Confir user deleting"
          description="Are you sure that you want to delete user"
        />
      )}
      {editModal && (
        <AdminPanelModal
          handleOk={triggerSubmit}
          title={modalMode === "edit" ? "Edit user" : "Create user"}
          display={editModal}
          setDisplay={setEditModal}
        >
          <Form
            name="basic"
            ref={formRef}
            //labelCol={{ span: 8 }}
            //wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={modalMode === "edit" ? userToEdit : undefined}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="name"
              // rules={[
              //   { required: true, message: "Please input your username!" },
              // ]}
            >
              <Input placeholder="name" />
            </Form.Item>
            <Form.Item<FieldType>
              name="email"
              // rules={[
              //   { required: true, message: "Please input your username!" },
              // ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              // rules={[
              //   { required: true, message: "Please input your password!" },
              // ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item<FieldType>
              name="wallet"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Input type="number" placeholder="Wallet amount" />
            </Form.Item>

            <Form.Item
              name="role"
              // label="Gender"

              // rules={[{ required: true }]}
            >
              <Select
                placeholder="Selecet role"
                onChange={onRoleChange}
                allowClear
              >
                <Option value="user">user</Option>
                <Option value="guide">guide</Option>
                <Option value="lead-guide">lead-guide</Option>
                <Option value="admin">admin</Option>
              </Select>
            </Form.Item>
          </Form>
        </AdminPanelModal>
      )}
    </div>
  );
}

export default AdminUsers;
