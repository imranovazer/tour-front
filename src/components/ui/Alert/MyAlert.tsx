import { Alert } from "antd";
import { useAppDispatch } from "../../../redux/store/hooks";
import { useEffect } from "react";
import { closeAlert } from "../../../redux/reducers/alertSlice";

import "./Alert.scss";
interface MyAlertProps {
  type?: boolean;
  title: string;
}
function MyAlert({ type, title }: MyAlertProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(closeAlert());

      return () => clearTimeout(timeout);
    }, 5000);
  }, []);

  return (
    <Alert
      className="Alert fixed top-3 right-3 min-w-[250px]  z-50"
      message={type ? "Success" : "Error"}
      description={title}
      type={type ? "success" : "error"}
      showIcon
    />
  );
}

export default MyAlert;
