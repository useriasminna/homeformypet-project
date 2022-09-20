import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Input, notification } from "antd";
import { auth } from "../utils/firebase";
import { useHistory } from "react-router";
import { MailOutlined } from "@ant-design/icons";
import FormLogo from "../components/common/FormLogo";
import FormMainContainer from "../components/common/FormMainContainer";

const ResetBody = styled.body`
  background-color: #fae6c1;
  background-image: linear-gradient(to right, #fae6c1, #ffffff);
`;
const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ResetLabel = styled.span`
  display: flex;
  align-self: flex-start;
  margin-left: 25px;
  margin-bottom: 20px;
`;
const Error = styled.span`
  color: red;
`;
const ButtonWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-basis: 200px;
  justify-content: space-between;

  button {
    width: 190px;
  }
`;

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  const handleSendResetEmail = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        const args = {
          description: "Please verify your email adress",
        };
        notification.open(args);
      })
      .then(
        setTimeout(async () => {
          history.push("login/");
        }, 9000)
      )
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <ResetBody>
      <CenteredWrap>
        <FormMainContainer>
          <FormLogo />
          <ResetLabel>
            <strong>Insert your email adress to reset your password</strong>
          </ResetLabel>
          <Form
            name="reset-password"
            className="reset-password-form"
            initialValues={{
              remember: true,
            }}
            onSubmit={handleSendResetEmail}
          >
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ width: 400, whiteSpace: "normal", height: 35 }}>
                <Error>{errorMessage}</Error>
              </div>
            </Form.Item>
            <ButtonWrapper>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSendResetEmail}
                >
                  Send
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  onClick={(e) => navigateToPage(e, "/login")}
                >
                  Cancel
                </Button>
              </Form.Item>
            </ButtonWrapper>
          </Form>
        </FormMainContainer>
      </CenteredWrap>
    </ResetBody>
  );
}
export default ResetPassword;
