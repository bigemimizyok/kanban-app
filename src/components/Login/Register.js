import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/endpoints/auth";
import "./login.css";

const Register = () => {
  let navigate = useNavigate();

  const onFinish = (values) => {
    auth.register(values).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="login-register-form-container">
      <Row justify="center" className="login-register-container">
        {/*   <Col>
          <img
            className="login-register-logo"
            src={require("./images/logo.png")}
            alt="logo"
          />
        </Col> */}
        <Col>
          <Form
            style={{ color: "#4CACBC" }}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <h1 className="login-register-header">Register Form</h1>
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
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#4CACBC" }} />}
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="passwordConfirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#4CACBC" }} />}
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item>
                <Button
                  type="#13c2c2"
                  htmlType="submit"
                  className="login-register-form-button"
                >
                  Register
                </Button>
              </Form.Item>
              <Form.Item style={{ color: "#256D85" }}>
                Or{" "}
                <Link className="login-register-link" to="/login">
                  login
                </Link>
              </Form.Item>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
