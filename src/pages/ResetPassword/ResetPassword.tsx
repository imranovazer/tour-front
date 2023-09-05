import { useState, useEffect } from "react";
import Logo from "../../components/ui/Logo";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Form, Input } from "antd";
import AuthButton from "../../components/ui/AuthButton";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../axios";

import useLoading from "../../hooks/useLoading";
import Loading from "../../components/Loading";

type FieldType = {
  password?: string;
  passwordConfirm?: string;
};
function ResetPassword() {
  const navigate = useNavigate();
  const onFinishFailed = () => {
    dispatch(displayAlert({ type: false, title: "Please fill all data" }));
  };
  const { token } = useParams();
  const [state, setState] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  const [chechkToken] = useLoading({
    callback: async () => {
      await axiosInstance.post(`/users/check-reset-token/${token}`);

      setState(true);
      setLoading(false);
    },
    onError: () => {
      setState(false);
      setLoading(false);
      // navigate("/");
    },
  });
  useEffect(() => {
    chechkToken(1);
  }, []);

  const [registerRequest, isReqisterRequstLoading] = useLoading({
    callback: async (values: any) => {
      await axiosInstance.patch(`/users/reset-password/${token}`, values);
      dispatch(
        displayAlert({
          type: true,
          title: "Your password changed successfully",
        })
      );
      navigate("/login");
    },
    onError: () => {
      dispatch(
        displayAlert({ type: false, title: "Unable to change password" })
      );
    },
  });

  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    registerRequest(values);
  };

  return loading ? (
    <Loading />
  ) : state ? (
    <div className="w-full min-h-screen  bg-slate-200  dark:bg-slate-700">
      <div className="container flex justify-center items-center min-h-screen mx-auto px-3">
        <div className=" bg-white dark:bg-slate-950 w-full  max-w-[1000px] min-h-[600px]    rounded-3xl shadow-lg   overflow-hidden flex justify-center ">
          <div className="flex md:w-1/2 w-full    p-6 flex-col gap-16  ">
            <div className="w-full flex justify-between items-center">
              <Logo />
              <Link to="/" className="font-bold text-gray-400">
                Home
              </Link>
            </div>
            <div className="flex flex-col gap-5  pb-4 ">
              <h1 className="font-bold text-4xl dark:text-white">
                Reset password <span className="text-sky-500 text-5xl">.</span>
              </h1>

              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  // label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    className="password-input"
                    placeholder="password"
                    autoComplete="false"
                  />
                </Form.Item>
                <Form.Item<FieldType>
                  // label="Password"
                  name="passwordConfirm"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="confirm password"
                    className="password-input"
                  />
                </Form.Item>

                <AuthButton
                  onClick={null}
                  title={
                    isReqisterRequstLoading ? "Processing..." : "Reset password"
                  }
                />
              </Form>
            </div>
          </div>
          <div className="hidden clipReg w-1/2 bg-[url('/src/assets/Login.jpg')] dark:bg-[url('/src/assets/LoginDark.jpg')] bg-cover bg-no-repeat md:block  "></div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default ResetPassword;
