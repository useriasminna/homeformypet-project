import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Form, Button, Input, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import firebase, { db, auth } from "../utils/firebase";
import { useHistory } from "react-router";
import FormLogo from "../components/common/FormLogo";

const SignUpBody = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fae6c1;
  background-image: linear-gradient(to right, #fae6c1, #ffffff);
  position: relative;
  overflow: overlay;
`;

const CenteredWrap = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2%;
`;
const MainContainer = styled.div`
  width: 570px;
  border: 1px solid #ffefdf;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 30px;
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
  button {
    width: 100%;
  }
`;
const FooterContainer = styled.div`
  width: 570px;
  border: 1px solid #ffefdf;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 24px;
  margin-top: 10px;
  margin-bottom: 30px;

  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
const Title = styled.div`
  display: flex;
  align-self: center;
  color: #1890ff;
  font-size: 25px;
  font-weight: bolder;
`;

const NameContainer = styled.div`
  margin-top: 30px;
  width: 502px;
  display: flex;
  justify-content: space-between;
  input {
    width: 155px;
  }
`;
const Error = styled.span`
  color: red;
`;

const CityInput = styled.input`
  border: 1px solid #d9d9d9;
  padding: 4px 11px;
  width: 100%;
  transition: all 0.3s;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  :hover {
    border-color: #40a9ff;
    border-right-width: 1px;
  }
  :focus {
    border-color: #40a9ff;
    border-right-width: 1px;
    outline: 0;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
  }
`;
const Required = styled.span`
  color: red;
  font-size: 17px;
`;

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "ro" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
}

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const autoCompleteRef = useRef(null);

  const history = useHistory();

  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCq_jXEmB0Pcyqi966HrXpjhax8iigQHLQ&libraries=places`,
      () => handleScriptLoad(setCity, autoCompleteRef)
    );
  }, [setCity]);
  const { Option } = Select;

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        await db
          .collection("users")
          .doc(authUser.user.uid)
          .set({
            id: authUser.user.uid,
            email: authUser.user.email,
            type: "",
            firstName: firstName,
            lastName: lastName,
            country: "Romania",
            city: city,
            phoneNumber: "40" + phoneNumber,
            profilePicture: "",
            experience: "",
            slogan: "",
            userCreated: firebase.firestore.FieldValue.serverTimestamp(),
            userLastActive: firebase.firestore.FieldValue.serverTimestamp(),
          });
      })
      .then(async () => history.push("/welcome"))
      .catch((err) => setErrorMessage(err.message));
  };
  return (
    <SignUpBody>
      <CenteredWrap>
        <MainContainer>
          <FormLogo />
          <Title>JOIN US NOW!</Title>
          <Form>
            <NameContainer>
              <FormItem
                label="First Name"
                name="firstname"
                rules={[
                  { required: true, message: "This field is required!" },
                  {
                    type: "string",
                    message: "Not a valid type!",
                  },
                ]}
              >
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormItem>
              <FormItem
                label="Last Name"
                name="lasttname"
                rules={[
                  { required: true, message: "This field is required!" },
                  {
                    type: "string",
                    message: "Not a valid type!",
                  },
                ]}
              >
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormItem>
            </NameContainer>
            <FormItem
              label="Email"
              name="email"
              rules={[
                { required: true, message: "This field is required!" },
                { type: "email", message: "Email type invalid" },
              ]}
            >
              <Input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormItem>
            <Form.Item
              name="select"
              label="Country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select
                value={country}
                defaultValue="Romania"
                onChange={(e) => setCountry(e.target.value)}
                disabled
              >
                <Option value="romania">Romania</Option>
              </Select>
            </Form.Item>
            <div className="search-location-input">
              <FormItem
                label={
                  <span>
                    <Required>* </Required>City
                  </span>
                }
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <CityInput
                  ref={autoCompleteRef}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder=""
                  value={city}
                />
              </FormItem>
            </div>
            <FormItem
              type="number"
              label="Phone Number"
              name="phoneNumber"
              style={{ marginBottom: "0" }}
            >
              <Input.Group compact>
                <Input style={{ width: "15%" }} defaultValue="+40" disabled />
                <FormItem
                  type="number"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "This field is required!" },
                  ]}
                >
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ width: "55%" }}
                    placeholder="000 000 000"
                    maxLength={9}
                  />
                </FormItem>
              </Input.Group>
            </FormItem>
            <FormItem
              label="Password"
              name="password"
              rules={[{ required: true, message: "This field is required!" }]}
            >
              <Input.Password
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </FormItem>
            <Error>{errorMessage}</Error>
            <FormItem>
              <Button type="primary" htmlType="submit" onClick={handleSignup}>
                Sign up
              </Button>
            </FormItem>
          </Form>
        </MainContainer>
        <FooterContainer>
          <span>
            Have an account?&nbsp;
            <a href="/login" onClick={(e) => navigateToPage(e, "/login")}>
              <strong>Log in</strong>
            </a>
          </span>
        </FooterContainer>
      </CenteredWrap>
    </SignUpBody>
  );
}

export default SignUp;
