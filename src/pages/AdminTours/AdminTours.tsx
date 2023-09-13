import { Button, Form, Table, Input, Select, Upload, UploadFile } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { useState, useEffect, useRef } from "react";
import { Tour, User } from "../../types";
import useFetching from "../../hooks/useFetching";
import usersApi from "./api";
import { ContainerLoading } from "../../components/Loading";
import ConfirmModal from "../../components/ConfirmModal";
import useLoading from "../../hooks/useLoading";
import { useDispatch } from "react-redux";
import { displayAlert } from "../../redux/reducers/alertSlice";
import AdminPanelModal from "../../components/AdminPanelModal";
import { Store } from "antd/es/form/interface";
import TextArea from "antd/es/input/TextArea";
import MulripleFileUpload from "../../components/MultipleFileUpload";
import adminToursApi from "./api";
import CoordinatePicker from "./components/CoordinatePicker";


const { Option } = Select;
function AdminTours() {
  // const [startDate, setStartDate] = useState<any>(null);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Tour, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      //reder :
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
      sorter: (a: Tour, b: any) => a.price - b.price,
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "edit",
      render: (tour: Tour) => (
        <Button type="default" onClick={() => handleTourEditClick(tour)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "delete",
      render: (tour: Tour) => (
        <Button
          type="primary"
          danger
          onClick={() => handleTourDeleteClick(tour._id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [tourToDelete, settourToDelete] = useState("");
  const [tourToEdit, setTourToEdit] = useState<Tour | undefined | Store>(
    undefined
  );

  interface Coordinate {
    lng: number;
    lat: number;
    address?: string;
    description?: string;
    day?: number;
    startLocation?: boolean;
  }
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const formRef: any = useRef();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [tours, setTours] = useState<User[]>([]);
  const [modalMode, setModalMode] = useState<"edit" | "create" | undefined>();
  const [getAllTours, getIsLoading] = useFetching(async () => {
    const res = await usersApi.getTours();

    setTours(res.data);
  });
  //@ts-ignore
  const [createTour, isCreateTourLoading] = useLoading({
    callback: async (data: FieldType) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "imageCover") {
          formData.append(key, value[0].originFileObj);
        } else {
          formData.append(key, value);
        }
      });
      if (fileList) {
        fileList.forEach((item) => {
          //@ts-ignore
          formData.append("images", item.originFileObj);
        });
      }
      if (coordinates) {
        var counter = 0;
        coordinates.forEach((item) => {
          if (item.startLocation) {
            //@ts-ignore
            formData.append(`startLocation[coordinates][0]`, item.lng);
            //@ts-ignore
            formData.append(`startLocation[coordinates][1]`, item.lat);
            //@ts-ignore
            formData.append(`startLocation[description]`, item.description);
            //@ts-ignore
            formData.append(`startLocation[address]`, item.address);
          } else {
            //@ts-ignore
            formData.append(`locations[${counter}][coordinates][0]`, item.lng);
            //@ts-ignore
            formData.append(`locations[${counter}][coordinates][1]`, item.lat);
            formData.append(
              `locations[${counter}][description]`,
              //@ts-ignore
              item.description
            );
            //@ts-ignore
            formData.append(`locations[${counter}][day]`, item.day);
            counter = counter + 1;
          }
        });
      }
      const newTour = await adminToursApi.createTour(formData);

      setTours((prevState: any) => {
        const newTours = [...prevState, newTour.data];

        return newTours;
      });
      setEditModal(false);

      dispatch(
        displayAlert({ type: true, title: "Tour created successfully" })
      );
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to create tour" }));
      console.log("Error");
    },
  });
  //@ts-ignore
  const [editTour, isEditTourLoading] = useLoading({
    callback: async ({ id, data }) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "imageCover" && Array.isArray(value)) {
          //@ts-ignore

          if (value[0]) {
            //@ts-ignore
            formData.append(key, value[0].originFileObj);
          }
        } else {
          //@ts-ignore
          formData.append(key, value);
        }
      });
      if (fileList) {
        fileList.forEach((item) => {
          //@ts-ignore
          if (item.notSend) {
            formData.append("editedImages", item.name);
          } else {
            //@ts-ignore

            formData.append("images", item.originFileObj);
          }
        });
      }
      //----------------------
      const newUser = await usersApi.editTour(id, formData);

      const newUsers = tours.map((tour) => {
        if (tourToEdit?._id === tour._id) {
          return newUser.data;
        } else {
          return tour;
        }
      });
      setTours(newUsers);
      setEditModal(false);
      setTourToEdit(undefined);
      dispatch(displayAlert({ type: true, title: "User edited successfully" }));
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to edit user" }));
      console.log("Error");
    },
  });
  const handleTourDeleteClick = (id: string) => {
    settourToDelete(id);
    setDeleteModal(true);
  };
  const handleTourEditClick = (tour: Tour) => {
    setModalMode("edit");
    const newFileList: UploadFile[] = tour.images.map((image, index) => ({
      uid: `${index}`,
      name: image,
      status: "done",
      url: `${import.meta.env.VITE_TOUR_IMG_URL}/${image}`,
      notSend: true,
    }));

    const newCoordinates: any = tour.locations.map((item) => ({
      lat: item.coordinates[1],
      lng: item.coordinates[0],
      description: item.description,
      day: item.day,
      startLocation: false,
    }));
    const haha = [
      ...newCoordinates,
      {
        lat: tour.startLocation.coordinates[1],
        lng: tour.startLocation.coordinates[0],
        description: tour.startLocation.description,
        address: tour.startLocation.address,
        startLocation: true,
      },
    ];

    // setStartDate(moment(tour.startDates[0]));

    setCoordinates(haha);
    setFileList(newFileList);

    setTourToEdit(tour);

    setEditModal(true);
  };

  //@ts-ignore
  const [deleteTour, isDeleteLoading] = useLoading({
    callback: async (id) => {
      await usersApi.deleteTour(id);
      setTours((prev) => prev.filter((tour) => tour._id !== id));

      dispatch(
        displayAlert({ type: true, title: "Tour deleted successfully!" })
      );
      setDeleteModal(false);
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable delete tour" }));
      setDeleteModal(false);
    },
  });
  type FieldType = {
    // startDate?: Date;
    imageCover?: any;
    name: string;
    description: string;
    difficulty?: "medium " | "easy" | "diffucult";
    summary?: string;
    maxGroupSize?: number;
    price: number;
  };

  const onFinish = (values: any) => {
    if (modalMode == "edit") {
      editTour({ id: tourToEdit?._id, data: values });
    } else if (modalMode == "create") {
      createTour(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    getAllTours(null);
  }, []);
  const triggerSubmit = () => {
    formRef.current.submit();
  };
  const onDifficultyChange = () => {};
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const multipleImagesGet = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCoordinateDelete = (coordinate: any) => {
    setCoordinates((prevState) => {
      const newCoordinates = prevState.filter((item) => item !== coordinate);
      return newCoordinates;
    });
  };
  return (
    <div>
      <div className="border  shadow-sm rounded-lg p-5 mb-5">
        <button
          onClick={() => {
            setFileList([]);
            setCoordinates([]);
            setModalMode("create");
            setEditModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-500/80 transition-colors rounded-lg ho py-1 px-3 font-bold text-white"
        >
          Create tour
        </button>
      </div>
      {getIsLoading ? (
        <ContainerLoading />
      ) : (
        //@ts-ignore
        <Table dataSource={tours} columns={columns} />
      )}
      {deleteModal && (
        <ConfirmModal
          display={deleteModal}
          setDisplay={setDeleteModal}
          CallBack={() => deleteTour(tourToDelete)}
          title="Confirm tour deleting"
          description="Are you sure that you want to delete tour"
        />
      )}
      {editModal && (
        <AdminPanelModal
          handleOk={triggerSubmit}
          title={modalMode === "edit" ? "Edit tour" : "Create tour"}
          display={editModal}
          setDisplay={setEditModal}
        >
          <Form
            name="basic"
            ref={formRef}
            labelWrap={true}
            style={{ maxWidth: 600 }}
            initialValues={modalMode === "edit" ? tourToEdit : undefined}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input tour name!",
                },
                {
                  min: 10,
                  message: "Name should contain at least 10 character!",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item<FieldType>
              name="summary"
              // rules={[
              //   { required: true, message: "Please input your username!" },
              // ]}
            >
              <Input placeholder="Summary" />
            </Form.Item>
            <div className="flex gap-2 justify-between">
              <Form.Item<FieldType>
                name="maxGroupSize"
                label="Group size"
                // rules={[
                //   { required: true, message: "Please input your username!" },
                // ]}
              >
                <Input placeholder="Max group size" type="number" />
              </Form.Item>
              <Form.Item<FieldType>
                name="price"
                label="Price"
                // rules={[
                //   { required: true, message: "Please input your username!" },
                // ]}
              >
                <Input placeholder="Price" type="number" />
              </Form.Item>
            </div>

            <Form.Item name="description">
              <TextArea rows={4} placeholder="Description" />
            </Form.Item>
            <div className="flex gap-2 justify-between">
              <Form.Item
                name="difficulty"
                label="Dificulty"

                // rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select difficulty"
                  onChange={onDifficultyChange}
                  allowClear
                >
                  <Option value="easy">Easy</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="difficult">Difficulty</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="duration"
                label="Duration"

                // rules={[{ required: true }]}
              >
                <Input type="number"></Input>
              </Form.Item>
            </div>
            {/* <Form.Item label="DatePicker">
              <DatePicker
                value={startDate && startDate}
                onChange={(date, dateString) => setStartDate(date)}
              />
            </Form.Item> */}
            <Form.Item>
              <Form.Item
                name="imageCover"
                valuePropName="imageCover"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  beforeUpload={() => false}
                  action={undefined}
                  name="files"
                  listType="picture"
                  maxCount={2}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Uload cover image</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <p className="pb-3">Upload images: </p>
            <Form.Item
              // label="Upload images"
              //name="images"
              //valuePropName="images"
              getValueFromEvent={multipleImagesGet}
            >
              <MulripleFileUpload
                fileList={fileList}
                setFileList={setFileList}
              />
            </Form.Item>
            <p className="font-bold text-[20px]">Pick location:</p>
            <Form.Item>
              <CoordinatePicker
                coordinates={coordinates}
                setCoordinates={setCoordinates}
              />
            </Form.Item>
            <ul className="p-3 w-full rounded-lg bg-slate-200 flex flex-col items-center  gap-2 overflow-x-auto">
              {coordinates &&
                coordinates.map((item, index) => (
                  <li
                    key={index}
                    className="w-full flex justify-between items-center gap-2 p-1 rounded bg-white"
                  >
                    <p className="break-keep">{item.description} </p>
                    <div
                      className=" rounded-full w-5 h-5 text-white bg-red-400  flex items-center justify-center p-1 cursor-pointer"
                      onClick={() => handleCoordinateDelete(item)}
                    >
                      x
                    </div>
                  </li>
                ))}
            </ul>
          </Form>
        </AdminPanelModal>
      )}
    </div>
  );
}

export default AdminTours;
