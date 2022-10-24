import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/endpoints/auth/";
import React from "react";
import "./login.css";
import { useLoginContext } from "../../contexts/auth";

const Login = () => {
  const { login } = useLoginContext();
  let navigate = useNavigate();

  const onFinish = (values) => {
    auth.login(values).then(({ username, token }) => {
      login({
        username,
        token,
      });
      navigate("/boards");
    });
  };

  return (
    <div className="login-register-form-container">
      <Row justify="center" className="login-register-container">
        <Form
          style={{ color: "#4CACBC" }}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h1 className="login-register-header">Login Form</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#4CACBC" }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#4CACBC" }} />}
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item>
              <Button
                type="#13c2c2"
                htmlType="submit"
                className="login-register-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item style={{ color: "#256D85" }}>
              Or{" "}
              <Link className="login-register-link" to="/register">
                register now!
              </Link>
            </Form.Item>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default Login;
