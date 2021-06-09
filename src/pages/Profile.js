import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { CameraOutlined, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import AvatarUploadModal from "components/AvatarUploadModal";
import { useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ProfileBody = styled.body`
  overflow: auto;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileDetailsUpSection = styled.div`
  top: 20%;
  display: flex;
  width: 80%;
  height: 300px;
  align-items: center;
  justify-items: baseline;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 50px;
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
  position: relative;
  margin-right: 75px;
  margin-left: 25px;
  ${CameraIcon} {
    display: none;
  }
  :hover {
    ${CameraIcon} {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
`;

const MyAvatar = styled(Avatar)`
  align-self: center;
  span {
    font-size: 48px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  flex-grow: 1;
  justify-items: center;
`;

const FullName = styled.span`
  font-size: 40px;
  font-weight: 300;
  margin-bottom: 5px;
`;
const Type = styled.span`
  font-size: 13px;
  margin-bottom: 5px;
`;
const Slogan = styled.span`
  font-size: 19px;
  font-style: italic;
  margin-bottom: 15px;
`;
const City = styled.span`
  font-size: 18px;
  margin-bottom: 5px;
`;
const ProfileDetailsDownSection = styled.div`
  display: flex;
  width: 80%;
  height: 500px;
  justify-items: baseline;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 50px;
  justify-content: space-between;
`;
const Experience = styled.span`
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  height: 200px;
  width: 60%;
  strong {
    font-size: 25px;
    margin-bottom: 20px;
  }
`;
const ContactSection = styled.span`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: fit-content;
  background-color: lightgray;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  strong {
    font-size: 25px;
    margin-bottom: 20px;
    justify-self: center;
    align-self: center;
  }
`;
const ContactElement = styled.span`
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 20px;
`;
const Animals = styled.div`
  height: 500px;
`;
const ProfileStats = styled.span`
  font-size: 16px;
`;

const ProfilePosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
`;

const PostContainer = styled.div`
  width: 280px;
  height: 280px;
  margin-bottom: 30px;
  margin-right: 30px;
  :nth-child(3n + 3) {
    margin-right: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Profile() {
  //   const [alreadyFollowed, setAlreadyFollowed] = useState("");
  // const [followers, setFollowers] = useState([]);
  // const [following, setFollowing] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [profileId, setProfileId] = useState("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  // const [isModalOpenFollowers, setIsModalOpenFollowers] = useState(false);
  // const [isModalOpenFollowing, setIsModalOpenFollowing] = useState(false);
  // const [userExists, setUserExists] = useState(true);
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  // const [petType, setPetType] = useState("");
  // const [petName, setPetName] = useState("");
  // const [petAge, stePetAge] = useState("");
  // const [petDescription, setPetDescription] = useState("");

  useEffect(() => {
    db.collection("users")
      .where("id", "==", "1f20BTJSKVcCkrJwyfjTv7KYzWr1")
      .get()
      .then((userData) => {
        setProfileId(userData.docs[0].id);
        setProfilePicture(userData.docs[0].data().profilePicture);
        setFullName(
          userData.docs[0].data().firstName +
            " " +
            userData.docs[0].data().lastName
        );
        setType(userData.docs[0].data().type);
        setSlogan(userData.docs[0].data().slogan);
        setExperience(userData.docs[0].data().experience);
        setEmail(userData.docs[0].data().email);
        setPhoneNumber(userData.docs[0].data().phoneNumber);
        setCity(userData.docs[0].data().city);

        db.collection("pets").onSnapshot(async (snapshot) => {
          const filteredPets = snapshot.docs.filter(
            (doc) => doc.data().petId === userData.docs[0].data().id
          );

          return Promise.all(
            filteredPets.map(async (pet) => {
              return {
                id: pet.id,
                ...pets.data(),
              };

            })
          ).then(setPets);
        });
      });
  }, [pets]);

  const renderUserAnimals = () => {
    if (pets.length)
      return pets.map((pet, index) => {
        return <PostContainer key={index}>{pet.name}</PostContainer>;
      });
    return null;
  };

  return (
    <ProfileBody>
      <ProfileContainer>
        <ProfileDetailsUpSection>
          <AvatarWrapper>
            <CameraIcon onClick={() => setIsModalOpen(true)} />
            <MyAvatar size={200} src={profilePicture}></MyAvatar>
          </AvatarWrapper>
          <ProfileInfo>
            <FullName>
              <strong>{fullName}</strong>
            </FullName>
            <Type>-Registered as pet {type}-</Type>
            {type === "sitter" ? <Slogan>{slogan}</Slogan> : undefined}
            <City>
              <MdLocationOn /> {city}
            </City>
          </ProfileInfo>
        </ProfileDetailsUpSection>
        <ProfileDetailsDownSection>
          {type === "sitter" ? (
            <Experience>
              <strong>Experience</strong>
              <div>{experience}</div>
            </Experience>
          ) : (
            <Animals>{renderUserAnimals()}</Animals>
          )}
          <ContactSection>
            <strong>Contact details</strong>
            <ContactElement>
              <MailTwoTone style={{ fontSize: "17px" }} />{" "}
              <span style={{ color: "gray" }}>email:</span> {email}
            </ContactElement>
            <ContactElement>
              <PhoneTwoTone style={{ fontSize: "18px" }} />{" "}
              <span style={{ color: "gray" }}>phone:</span> {phoneNumber}
            </ContactElement>
          </ContactSection>
        </ProfileDetailsDownSection>
        <AvatarUploadModal
          isOpened={isModalOpen}
          setIsOpen={setIsModalOpen}
          setAvatar={setProfilePicture}
        />
      </ProfileContainer>
    </ProfileBody>
  );
}

export default Profile;
