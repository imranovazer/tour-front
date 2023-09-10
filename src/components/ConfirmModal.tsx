import React from "react";
import { Modal } from "antd";

const ConfirmModal: React.FC<{
  display: boolean;
  setDisplay: any;
  CallBack: any;
  title: string;
  description: string;
}> = ({ display, setDisplay, CallBack, title, description }) => {
  const onOkHandler = () => {
    CallBack();
  };

  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: "#279EFF" } }}
        title={title}
        centered
        open={display}
        onOk={() => onOkHandler()}
        onCancel={() => setDisplay(false)}
      >
        <p>{description}</p>
      </Modal>
    </>
  );
};

export default ConfirmModal;
