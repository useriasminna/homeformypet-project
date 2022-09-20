import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Input, Checkbox } from "antd";
import { auth } from "../utils/firebase";
import { useHistory } from "react-router";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import FormLogo from "../components/common/FormLogo";
import FormMainContainer from "../components/common/FormMainContainer";
import FormFooterContainer from "../components/common/FormFooterContainer";

const LogInBody = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fae6c1;
  background-image: linear-gradient(to right, #fae6c1, #ffffff);
  overflow: overlay;
`;
const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Error = styled.span`
  color: red;
`;

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async () => history.push("/home"))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <LogInBody>
      <CenteredWrap>
        <FormMainContainer onSubmit={handleLogin}>
          <Form>
            <FormLogo />

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please introduce your email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                type="email"
                value={email}
                style={{ width: 400, marginTop: 30 }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <div style={{ width: 400, whiteSpace: "normal", height: 35 }}>
                <Error>{errorMessage}</Error>
              </div>
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox checked>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="/resetpassword">
                Forgot password?
              </a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleLogin}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </FormMainContainer>
        <FormFooterContainer>
          <span>
            Don&apos;t have an account?&nbsp;
            <a href="/signup" onClick={(e) => navigateToPage(e, "/signup")}>
              <strong>Sign-up</strong>
            </a>
          </span>
        </FormFooterContainer>
      </CenteredWrap>
    </LogInBody>
  );
}
export default LogIn;
