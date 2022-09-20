import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CameraOutlined } from "@ant-design/icons";
import AvatarUploadModal from "../components/AvatarUploadModal";
import { auth, db } from "../utils/firebase";
import SectionBreak from "../components/common/SectionBreak";
import { Form, Input, Button, Divider, Avatar, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useHistory } from "react-router";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const OwnerFormBody = styled.body`
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
  div {
    font-size: 18px;
  }
`;
const MyAvatar = styled(Avatar)`
  align-self: center;
  span {
    font-size: 48px;
  }
`;
const PetsDetails = styled.div`
  > div {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;
const AnimalsContainer = styled.div`
  height: 410px;
  padding: 50px;
`;
const AnimalFormContainer = styled.div`
  margin-bottom: 30px;
  border: 1px solid lightgray;
  padding: 15px;
  background-color: #fcfcfc;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
const RemoveButton = styled(Button)`
  background-color: #e4e4e4;
  margin-right: 10px;
  :hover {
    background-color: lightgray;
    color: white;
    border: 1px solid lightgray;
  }
`;
const AddButton = styled(Button)`
  background-color: darkgreen;
  color: white;
  :hover {
    background-color: #00b700;
    color: white;
    border: 1px solid #00b700;
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
const Required = styled.span`
  color: red;
  font-size: 17px;
`;

const { TextArea } = Input;

function OwnerForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const history = useHistory();

  const [animalsList, setAnimalsList] = useState([
    {
      petType: "",
      name: "",
      age: "",
      description: "",
    },
  ]);
  var batch = db.batch();

  useEffect(
    () => auth.onAuthStateChanged((user) => setProfilePicture(user.photoURL)),
    [profilePicture]
  );

  const openNotificationPetDetailsError = (type) => {
    notification[type]({
      message: "Notification Title",
      description: "You cannot submit until you complete your pet details",
    });
  };
  const openNotificationAvatarError = (type) => {
    notification[type]({
      message: "Notification Title",
      description: "You cannot submit until you complete your pet details",
    });
  };

  const handleSubmitOwnerForm = async () => {
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .set(
        {
          profilePicture: profilePicture,
          type: "owner",
        },
        { merge: true }
      )
      .then(() => setProfilePicture(auth.currentUser.photoUrl));

    const list = animalsList.filter(
      (animal) =>
        animal.petType.length !== 0 &&
        animal.name.length !== 0 &&
        animal.age.length !== 0 &&
        animal.description.length !== 0
    );

    list.forEach((animal) => {
      var docRef = db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("pets")
        .doc(); //automatically generate unique id
      batch.set(docRef, animal);
    });

    if (!(list.length === animalsList.length)) {
      openNotificationPetDetailsError("error");
    } else if (!profilePicture) {
      openNotificationAvatarError("error");
    } else {
      await batch.commit();
      history.push("/home");
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...animalsList];
    list[index][name] = value;
    setAnimalsList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...animalsList];
    list.splice(index, 1);
    setAnimalsList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setAnimalsList([
      ...animalsList,
      {
        petType: "",
        name: "",
        age: "",
        description: "",
      },
    ]);
  };

  return (
    <OwnerFormBody>
      <FormContainer>
        <FormDivider orientation="left">
          <strong>BECOME PET OWNER</strong>{" "}
        </FormDivider>
        <UserDetails>
          <AvatarWrapper>
            <CameraIcon onClick={() => setIsModalOpen(true)} />
            <MyAvatar size={200} src={profilePicture}>
              {auth.currentUser?.displayName?.[0]?.toUpperCase()}
            </MyAvatar>
          </AvatarWrapper>
          <div>
            <strong>
              <Required>* </Required>1. A photo is necesary to create a
              trustworthy profile{" "}
            </strong>
          </div>
          <AvatarUploadModal
            isOpened={isModalOpen}
            setIsOpen={setIsModalOpen}
            setAvatar={setProfilePicture}
            updateDb="false"
          />
        </UserDetails>
        <SectionBreak />
        <PetsDetails>
          {" "}
          <div>
            <strong style={{ marginLeft: 50 }}>
              <Required>* </Required>2. Complete the details about your pet/pets{" "}
            </strong>
          </div>
          <SimpleBar style={{ maxHeight: 410 }}>
            <AnimalsContainer>
              {animalsList.map((x, i) => {
                return (
                  <AnimalFormContainer key={i} className="box">
                    <Form>
                      <FormItem
                        label="Animal"
                        rules={[
                          {
                            required: true,
                            message: "this field is required",
                          },
                        ]}
                      >
                        <Input
                          placeholder="cat/dog/other"
                          name="petType"
                          value={x.petType}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </FormItem>
                      <FormItem
                        label="Name"
                        rules={[
                          {
                            required: true,
                            message: "this field is required",
                          },
                        ]}
                      >
                        <Input
                          name="name"
                          value={x.name}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </FormItem>

                      <Form.Item
                        label="Age"
                        rules={[
                          { required: true, message: "Missing description" },
                        ]}
                      >
                        <Input
                          name="age"
                          value={x.age}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Description"
                        rules={[
                          { required: true, message: "Missing description" },
                        ]}
                      >
                        <TextArea
                          name="description"
                          value={x.description}
                          onChange={(e) => handleInputChange(e, i)}
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                      </Form.Item>

                      <div className="btn-box">
                        {animalsList.length !== 1 && (
                          <RemoveButton
                            className="mr10"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </RemoveButton>
                        )}
                        {animalsList.length - 1 === i && (
                          <AddButton onClick={handleAddClick}>
                            Add another pet
                          </AddButton>
                        )}
                      </div>
                    </Form>
                  </AnimalFormContainer>
                );
              })}
            </AnimalsContainer>
          </SimpleBar>
          <FormItem>
            <SubmitButton
              type="primary"
              htmlType="submit"
              onClick={handleSubmitOwnerForm}
            >
              Finish
            </SubmitButton>
          </FormItem>
        </PetsDetails>
      </FormContainer>
    </OwnerFormBody>
  );
}

export default OwnerForm;
