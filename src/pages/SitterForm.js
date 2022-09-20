import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CameraOutlined } from "@ant-design/icons";
import AvatarUploadModal from "../components/AvatarUploadModal";
import { auth, db } from "../utils/firebase";
import SectionBreak from "../components/common/SectionBreak";
import { Form, Input, Button, Divider, Avatar, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useHistory } from "react-router";

const SitterFormBody = styled.body`
  background-color: #fffaf0;
  align-content: center;
  justify-content: center;
  position: relative;
  overflow: auto;
`;
const FormContainer = styled.div`
  position: absolute;
  margin: 40px 0 40px 0;
  height: auto;
  padding: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: white;
  border: 1px solid floralwhite;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;
const CameraIcon = styled(CameraOutlined)`
  font-size: 56px;
  color: #fff;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 30px 30px 70px;
  ${CameraIcon} {
    display: none;
  }
  :hover {
    ${CameraIcon} {
      position: absolute;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
  @media (max-width: 735px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;
const FormDivider = styled(Divider)`
  strong {
    font-size: 25px;
  }
`;
const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;
const Required = styled.span`
  color: red;
  font-size: 17px;
`;

const MyAvatar = styled(Avatar)`
  align-self: center;
  span {
    font-size: 48px;
  }
`;
const SubmitButton = styled(Button)`
  width: 150px;
  font-size: 16px;
  font-weight: bold;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
`;
const { TextArea } = Input;

function SitterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [slogan, setSlogan] = useState("");
  let [experience, setExperience] = useState("");
  const history = useHistory();

  useEffect(
    () => auth.onAuthStateChanged((user) => setProfilePicture(user.photoURL)),
    [profilePicture]
  );

  const openNotificationAvatarError = (type) => {
    notification[type]({
      message: "Notification Title",
      description: "You cannot submit until you choose a profile photo",
    });
  };
  const openNotificationSloganError = (type) => {
    notification[type]({
      message: "Notification Title",
      description:
        "You cannot submit until you omplete all your profile details",
    });
  };
  const openNotificationExperienceError = (type) => {
    notification[type]({
      message: "Notification Title",
      description:
        "You cannot submit until you complete all your profile details",
    });
  };
  const handleSubmitSitterForm = async () => {
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .set(
        {
          profilePicture: profilePicture,
          type: "sitter",
          slogan: slogan,
          experience: experience,
        },
        { merge: true }
      )
      .then(() => setProfilePicture(auth.currentUser.photoUrl));

    if (!profilePicture) {
      openNotificationAvatarError("error");
    } else if (!slogan) {
      openNotificationSloganError("error");
    } else if ((experience = "")) {
      openNotificationExperienceError("error");
    } else {
      history.push("/home");
    }
  };

  return (
    <SitterFormBody>
      <FormContainer>
        <FormDivider orientation="left">
          <strong>BECOME PET SITTER</strong>{" "}
        </FormDivider>
        <UserDetails>
          <AvatarWrapper>
            <CameraIcon onClick={() => setIsModalOpen(true)} />
            <MyAvatar size={200} src={profilePicture}>
              {auth.currentUser?.displayName?.[0]?.toUpperCase()}
            </MyAvatar>
          </AvatarWrapper>
          <Title>
            <strong>
              <Required>* </Required>1. A photo is necesary to create a
              trustworthy profile{" "}
            </strong>
          </Title>
          <AvatarUploadModal
            isOpened={isModalOpen}
            setIsOpen={setIsModalOpen}
            setAvatar={setProfilePicture}
            updateDb="false"
          />
        </UserDetails>
        <SectionBreak />{" "}
        <Title>
          <strong>
            <Required>* </Required>2. Complete your profile details{" "}
          </strong>
        </Title>
        <Form name="basic">
          <FormItem label="Slogan">
            <Input
              placeholder="no more than 80 characters"
              name="slogan"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              maxLength={80}
            />
          </FormItem>
          <FormItem label="Experience">
            <TextArea
              placeholder="describe your experience with animals"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              autoSize={{ minRows: 4, maxRows: 10 }}
              maxLength={1000}
            />
          </FormItem>
          <FormItem>
            <SubmitButton
              type="primary"
              htmlType="submit"
              onClick={handleSubmitSitterForm}
            >
              Finish
            </SubmitButton>
          </FormItem>
        </Form>
      </FormContainer>
    </SitterFormBody>
  );
}

export default SitterForm;
