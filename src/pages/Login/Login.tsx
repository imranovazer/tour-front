import "./styles/index.scss";
import Logo from "../../components/ui/Logo";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import AuthButton from "../../components/ui/AuthButton";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../axios";
import { setIsAuth, setUser } from "../../redux/reducers/userSlice";
import useLoading from "../../hooks/useLoading";

type FieldType = {
  email?: string;
  password?: string;
};
function Login() {
  const [loginRequest, isLoadingLoginRequest] = useLoading({
    callback: async (values: any) => {
      const user = await axiosInstance.post("/users/login", values);

      dispatch(
        displayAlert({ type: true, title: "You logged in successfully" })
      );
      dispatch(setUser(user.data.data.user));
      dispatch(setIsAuth(true));
    },
    onError: (error) => {
      dispatch(
        displayAlert({ type: false, title: error.response.data.message })
      );
    },
  });
  //@ts-ignore
  const onFinishFailed = (errorInfo: any) => {
    dispatch(displayAlert({ type: false, title: "Please fill all data" }));
  };
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    loginRequest(values);
  };

  return (
    <div className="w-full min-h-screen  bg-slate-200  dark:bg-slate-700">
      <div className="container flex justify-center items-center min-h-screen mx-auto px-3">
        <div className=" bg-white dark:bg-slate-950 w-full  max-w-[1000px] min-h-[600px]    rounded-3xl shadow-lg   overflow-hidden flex justify-center ">
          <div className="hidden clipLog w-1/2 bg-[url('/src/assets/Register.jpg')] dark:bg-[url('/src/assets/RegisterDark.jpg')] bg-cover bg-no-repeat md:block  "></div>
          <div className="flex md:w-1/2 w-full    p-6 flex-col   gap-12">
            <div className="w-full flex justify-between items-center">
              <Logo />
              <Link to="/" className="font-bold text-gray-400">
                Home
              </Link>
            </div>
            <div className="flex flex-col gap-5  pb-4 ">
              <span className="uppercase font-bold text-gray-400">
                Continue where you left{" "}
              </span>
              <h1 className="font-bold text-4xl dark:text-white">
                Sign in please <span className="text-sky-500 text-5xl">.</span>
              </h1>
              <span className="  text-gray-400">
                Don't have an account?{" "}
                <Link className="text-sky-500" to="/register">
                  Register
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
                <Form.Item<FieldType>>
                  <span className="dark:text-white ">
                    Forgot password?{" "}
                    <Link to="/forgot-password" className="text-sky-500">
                      Restore
                    </Link>
                  </span>
                </Form.Item>
                <Form.Item<FieldType>>
                  <AuthButton
                    onClick={null}
                    title={isLoadingLoginRequest ? "Processing..." : "Login"}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
