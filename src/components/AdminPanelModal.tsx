import { Button, Modal } from "antd";

const AdminPanelModal = ({
  children,
  display,
  setDisplay,
  title,
  handleOk,
}: {
  children: any;
  display: boolean;
  setDisplay: any;
  title: string;
  handleOk: any;
}) => {
  const showModal = () => {
    setDisplay(true);
  };

  const handleCancel = () => {
    setDisplay(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={title}
        open={display}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#279EFF" } }}
      >
        {children}
      </Modal>
    </>
  );
};

export default AdminPanelModal;
