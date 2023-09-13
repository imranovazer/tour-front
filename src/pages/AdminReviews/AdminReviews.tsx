import { Button, Form, Table, Input, Select } from "antd";

import { useState, useEffect, useRef } from "react";
import { Review, Tour, User } from "../../types";
import useFetching from "../../hooks/useFetching";
import AdminReviewsApi from "./api/index";
import { ContainerLoading } from "../../components/Loading";
import ConfirmModal from "../../components/ConfirmModal";
import useLoading from "../../hooks/useLoading";
import { useDispatch } from "react-redux";
import { displayAlert } from "../../redux/reducers/alertSlice";
import AdminPanelModal from "../../components/AdminPanelModal";
import { Store } from "antd/es/form/interface";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [tourDropdowns, setTourDropdowns] = useState([]);

  const columns = [
    {
      title: "Tour",
      dataIndex: "tour",
      key: "tour",
      render: (tour: Tour) => tour?.name,
      filters: tourDropdowns ? tourDropdowns : [],
      filterSearch: true,
      onFilter: (value: string, record: any) =>
        record.tour?._id.indexOf(value) === 0,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: User) => user?.name,
      filters: userDropdowns ? userDropdowns : [],
      filterSearch: true,
      onFilter: (value: string, record: any) =>
        record.user?._id.indexOf(value) === 0,
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a: Review, b: any) => a.rating - b.rating,
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "edit",
      render: (review: Review) => (
        <Button type="default" onClick={() => handleReviewEditClick(review)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "delete",
      render: (review: Review) => (
        <Button
          type="primary"
          danger
          onClick={() => handleReviewDeleteClick(review._id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const [userToDelete, setUserToDelete] = useState("");
  const [reviewToEdit, setReviewToEdit] = useState<Review | undefined | Store>(
    undefined
  );
  const formRef: any = useRef();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "create" | undefined>();

  const [getAllUsers, getIsLoading] = useFetching(async () => {
    const res = await AdminReviewsApi.getAll();

    setReviews(res.data);
  });
  //@ts-ignore
  const [getDropDowns, getDropDownLoading] = useFetching(async () => {
    //@ts-ignore
    const [tours, users] = await AdminReviewsApi.getDropwdowns();

    const userss = users.map((item: any) => ({
      text: item.name,
      value: item._id,
    }));
    const tourss = tours.map((item: any) => ({
      text: item.name,
      value: item._id,
    }));

    setTourDropdowns(tourss);
    setUserDropdowns(userss);
  });
  //@ts-ignore
  const [createReview, isCreateReviewLoading] = useLoading({
    callback: async (data) => {
      const newUser = await AdminReviewsApi.createReview(data);

      setReviews((prevState: any) => {
        const newUsers = [...prevState, newUser.data];

        return newUsers;
      });
      setEditModal(false);

      dispatch(
        displayAlert({ type: true, title: "Review created successfully" })
      );
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to create ewview" }));
      console.log("Error");
    },
  });
  //@ts-ignore
  const [editReview, isEditReviewLoading] = useLoading({
    callback: async ({ id, data }) => {
      const newReview = await AdminReviewsApi.editReview(id, data);

      const newReviews = reviews.map((review) => {
        if (reviewToEdit?._id === review._id) {
          return newReview.data;
        } else {
          return review;
        }
      });
      setReviews(newReviews);
      setEditModal(false);
      setReviewToEdit(undefined);
      dispatch(displayAlert({ type: true, title: "User edited successfully" }));
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to edit user" }));
      console.log("Error");
    },
  });
  const handleReviewDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteModal(true);
  };
  const handleReviewEditClick = (review: Review) => {
    setModalMode("edit");
    setReviewToEdit({
      ...review,
      user: review.user._id,
      tour: review.tour._id,
    });
    setEditModal(true);
  };

  //@ts-ignore
  const [deleteReview, isDeleteLoading] = useLoading({
    callback: async (id) => {
      await AdminReviewsApi.deleteReview(id);
      setReviews((prev) => prev.filter((user) => user._id !== id));

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
    tour?: string;
    user?: number;
    rating?: string;
    review?: string;
  };

  const onFinish = (values: any) => {
    if (modalMode == "edit") {
      editReview({ id: reviewToEdit?._id, data: values });
    } else if (modalMode == "create") {
      createReview(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    getAllUsers(null);
    getDropDowns(null);
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
          Create review
        </button>
      </div>
      {getIsLoading ? (
        <ContainerLoading />
      ) : (
        //@ts-ignore
        <Table dataSource={reviews} columns={columns} />
      )}
      {deleteModal && (
        <ConfirmModal
          display={deleteModal}
          setDisplay={setDeleteModal}
          CallBack={() => deleteReview(userToDelete)}
          title="Confir user deleting"
          description="Are you sure that you want to delete user"
        />
      )}
      {editModal && (
        <AdminPanelModal
          handleOk={triggerSubmit}
          title={modalMode === "edit" ? "Edit review" : "Create review"}
          display={editModal}
          setDisplay={setEditModal}
        >
          <Form
            name="basic"
            ref={formRef}
            //labelCol={{ span: 8 }}
            //wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={modalMode === "edit" ? reviewToEdit : undefined}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="user"
              label="Select user"

              // rules={[{ required: true }]}
            >
              <Select
                placeholder="Selecet user"
                onChange={onRoleChange}
                allowClear
              >
                {userDropdowns &&
                  userDropdowns.map((item: any) => (
                    <Option value={item.value}>{item.text}</Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="tour"
              label="Select tour"

              // rules={[{ required: true }]}
            >
              <Select
                placeholder="Selecet tour"
                onChange={onRoleChange}
                allowClear
              >
                {tourDropdowns &&
                  tourDropdowns.map((item: any) => (
                    <Option value={item.value}>{item.text}</Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              name="review"
              label="Review"
              // rules={[
              //   { required: true, message: "Please input your username!" },
              // ]}
            >
              <TextArea rows={4} placeholder="Review" />
            </Form.Item>

            <Form.Item<FieldType>
              name="rating"
              label="Rating"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Input type="number" placeholder="Wallet amount" />
            </Form.Item>
          </Form>
        </AdminPanelModal>
      )}
    </div>
  );
}

export default AdminReviews;
