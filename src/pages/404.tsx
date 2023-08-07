import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="dark:bg-slate-700 h-screen flex justify-center items-center ">
      <Result
        className="dark:text-white"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            className="bg-sky-600"
            onClick={() => navigate("/")}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
