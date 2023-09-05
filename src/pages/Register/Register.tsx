import "./styles/index.scss";
import Logo from "../../components/ui/Logo";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import AuthButton from "../../components/ui/AuthButton";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../axios";
import { setIsAuth } from "../../redux/reducers/userSlice";
import useLoading from "../../hooks/useLoading";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};
function Register() {
  const onFinishFailed = () => {
    dispatch(displayAlert({ type: false, title: "Please fill all data" }));
  };

  const [registerRequest, isReqisterRequstLoading] = useLoading({
    callback: async (values: any) => {
      await axiosInstance.post("/users/signup", values);
      dispatch(
        displayAlert({ type: true, title: "You registered successfully" })
      );
      dispatch(setIsAuth(true));
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to register" }));
    },
  });

  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    registerRequest(values);
  };

  return (
    <div className="w-full min-h-screen  bg-slate-200  dark:bg-slate-700">
      <div className="container flex justify-center items-center min-h-screen mx-auto px-3">
        <div className=" bg-white dark:bg-slate-950 w-full  max-w-[1000px] min-h-[600px]    rounded-3xl shadow-lg   overflow-hidden flex justify-center ">
          <div className="flex md:w-1/2 w-full    p-6 flex-col justify-between  ">
            <div className="w-full flex justify-between items-center">
              <Logo />
              <Link to="/" className="font-bold text-gray-400">
                Home
              </Link>
            </div>
            <div className="flex flex-col gap-5  pb-4 ">
              <span className="uppercase font-bold text-gray-400">
                Start for free{" "}
              </span>
              <h1 className="font-bold text-4xl dark:text-white">
                Create new account{" "}
                <span className="text-sky-500 text-5xl">.</span>
              </h1>
              <span className="  text-gray-400">
                Already a member?{" "}
                <Link className="text-sky-500" to="/login">
                  Login
                </Link>{" "}
              </span>
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
                <Form.Item<FieldType> // label="Username"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="username"
                    className="dark:bg-slate-700 dark:text-white dark:placeholder-slate-300"
                  />
                </Form.Item>
                <Form.Item<FieldType> // label="Username"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="email"
                    className="dark:bg-slate-700 dark:text-white dark:placeholder-slate-300"
                    type="email"
                    color="white"
                  />
                </Form.Item>

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
                    isReqisterRequstLoading ? "Processing..." : "Create account"
                  }
                />
              </Form>
            </div>
          </div>
          <div className="hidden clipReg w-1/2 bg-[url('/src/assets/Login.jpg')] dark:bg-[url('/src/assets/LoginDark.jpg')] bg-cover bg-no-repeat md:block  "></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
