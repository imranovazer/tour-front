import { useState, useRef } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
// import { WebMercatorViewport } from "viewport-mercator-project";
import "mapbox-gl/dist/mapbox-gl.css";
import AdminPanelModal from "../../../components/AdminPanelModal";

import { Checkbox, Form, Input } from "antd";
import { IoLocationSharp } from "react-icons/io5";

interface Coordinate {
  lng: number;
  lat: number;
  address?: string;
  description?: string;
  day?: number;
  startLocation?: boolean;
}
function CoordinatePicker({
  coordinates,
  setCoordinates,
}: {
  coordinates: Coordinate[];
  setCoordinates: any;
}) {
  const formRef: any = useRef();
  const triggerSubmit = () => {
    formRef.current.submit();
  };
  const [viewport, setViewPort] = useState(
    coordinates.length > 0
      ? {
          longitude: coordinates[0].lng,
          latitude: coordinates[0].lat,
          zoom: 6,
        }
      : {
          longitude: 48.012600968680594,
          latitude: 41.277459573738255,
          zoom: 6,
        }
  );
  const [modalMode, setModalMode] = useState<"edit" | "create" | undefined>(
    undefined
  );

  const [cordinateToEdit, setCordinateToEdit] = useState<{}>();
  const [modal, setModal] = useState<boolean>(false);

  const handleMapClick = (e: any) => {
    const { lng, lat }: { lng: number; lat: number } = e.lngLat;

    setCordinateToEdit({ lng: lng, lat: lat });
    setModalMode("create");
    setModal(true);
  };
  type FieldType = {
    lng: number;
    lat: number;
    address: string;
    description: string;
    day: number;
    startLocation: boolean;
  };
  const onFinish = (data: FieldType) => {
    if (modalMode == "create") {
      setCoordinates((prevState: any) => [...prevState, data]);
    }
    if (modalMode == "edit") {
      setCoordinates((prevState: any) => {
        const newData = prevState.map((item: any) => {
          if (item.lat === data.lat && item.lng == data.lng) {
            return data;
          } else {
            return item;
          }
        });
        return newData;
      });
    }
    setModal(false);
  };
  const onFinishFailed = (err: any) => {
    console.log(err);
  };

  return (
    <div className="w-full h-[300px]">
      <ReactMapGl
        {...viewport}
        onMove={({ viewState }) => setViewPort(viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX}
        mapStyle={"mapbox://styles/imranovazer/cll83z2ux00np01pmcivy6uoq"}
        onClick={handleMapClick}
      >
        {coordinates &&
          coordinates.map((item, index: any) => (
            <Marker
              key={index}
              anchor="bottom"
              longitude={item.lng}
              latitude={item.lat}
            >
              <p
                className="text-[30px] cursor-pointer text-black "
                onClick={(e) => {
                  e.stopPropagation();
                  setModalMode("edit");
                  setCordinateToEdit(item);
                  setModal(true);
                }}
              >
                <IoLocationSharp />
              </p>
            </Marker>
          ))}
      </ReactMapGl>
      {modal && (
        <AdminPanelModal
          handleOk={triggerSubmit}
          title={
            modalMode == "edit" ? "Edit a coordinate" : "Pick a coordinate"
          }
          display={modal}
          setDisplay={setModal}
        >
          <Form
            name="basic"
            ref={formRef}
            //labelCol={{ span: 8 }}
            //wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={cordinateToEdit}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="address"
              label="Address"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item<FieldType>
              name="lat"
              label="Latitude"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Input type="number" placeholder="Latitude" />
            </Form.Item>
            <Form.Item<FieldType>
              name="lng"
              label="Langitude"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Input type="number" placeholder="Langitude" />
            </Form.Item>
            <Form.Item<FieldType>
              name="description"
              label="Descriptoin"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Input placeholder="Descriptoin" />
            </Form.Item>
            <Form.Item<FieldType>
              name="day"
              label="Day"
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Input placeholder="Number" type="number" />
            </Form.Item>
            <Form.Item<FieldType> name="startLocation" valuePropName="checked">
              <Checkbox>Start location</Checkbox>
            </Form.Item>
          </Form>
        </AdminPanelModal>
      )}
    </div>
  );
}

export default CoordinatePicker;
