import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { CameraOutlined, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import AvatarUploadModal from "components/AvatarUploadModal";
import { useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaCat, FaDog } from "react-icons/fa";

const ProfileBody = styled.div`
  width: 100%;
  height: fit-content;
  background-color: white;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
`;

const ProfileDetailsUpSection = styled.div`
  display: flex;
  width: 70%;
  height: 240px;
  align-items: center;
  justify-items: baseline;
  margin-bottom: 20px;
  margin-top: 40px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 5px;
`;
const Type = styled.span`
  font-size: 13px;
  margin-bottom: 5px;
`;
const Slogan = styled.span`
  font-size: 15px;
  font-style: italic;
  margin-bottom: 15px;
`;
const City = styled.span`
  font-size: 18px;
  margin-bottom: 5px;
`;
const ProfileDetailsDownSection = styled.div`
  display: flex;
  width: 70%;
  padding: 30px;
  height: fit-content;
  justify-items: baseline;
  margin-bottom: 80px;
  justify-content: space-between;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
const Experience = styled.span`
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-style: italic;
  height: fit-content;
  width: 60%;
  margin-bottom: 30px;
  strong {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;
const ContactSection = styled.span`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 35%;
  height: fit-content;
  background-color: lightgray;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  strong {
    font-size: 20px;
    margin-bottom: 20px;
    justify-self: center;
    align-self: center;
  }
`;
const ContactElement = styled.span`
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: 20px;
`;
const Animals = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
// const ProfileStats = styled.span`
//   font-size: 16px;
// `;

// const ProfilePosts = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 900px;
// `;
const PetContainer = styled.div`
  width: 500px;
  border: 1px solid whitesmoke;
  margin-bottom: 20px;
  padding: 20px 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const PetInfo = styled.div`
  padding: 0px 30px 10px 30px;
  height: fit-content;
  margin-bottom: 30px;

  border-bottom: 1px solid lightgray;

  :nth-child(3n + 3) {
    margin-right: 0;
  }
  /*  */
`;
const PetDescription = styled.div`
  padding: 0 30px;

  font-size: 13px;
  font-style: italic;
`;
const CatIcon = styled(FaCat)`
  height: 50px;
`;
const DogIcon = styled(FaDog)`
  height: 50px;
`;
function Profile() {
  //   const [alreadyFollowed, setAlreadyFollowed] = useState("");
  // const [followers, setFollowers] = useState([]);
  // const [following, setFollowing] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
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
      .where("id", "==", id)
      .get()
      .then((userData) => {
        setProfileId(userData.docs[0].id);
        setProfilePicture(userData.docs[0].data().profilePicture);
        setFirstName(userData.docs[0].data().firstName);
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

        db.collection("users")
          .doc(userData.docs[0].data().id)
          .collection("pets")
          .onSnapshot(async (snapshot) => {
            const petsCollection = snapshot.docs;
            // console.log(filteredPets);

            return Promise.all(
              petsCollection.map(async (pet) => {
                return {
                  id: pet.id,
                  ...pet.data(),
                };
              })
            ).then(setPets);
          });
      });
  }, [id]);

  // console.log(pets);
  const renderUserAnimals = () => {
    if (pets.length) {
      return pets.map((pet, index) => {
        return (
          <PetContainer key={index}>
            <PetInfo>
              {firstName} owns a
              {pet.petType.toLowerCase() === "cat" ? (
                <CatIcon size={70} />
              ) : pet.petType.toLowerCase() === "dog" ? (
                <DogIcon size={70} />
              ) : (
                pet.petType.toLowerCase()
              )}
              named <strong>{pet.name.toUpperCase()}</strong>, age {pet.age}
            </PetInfo>
            <PetDescription>
              <q>{pet.description}</q>
            </PetDescription>
          </PetContainer>
        );
      });
    }
  };

  return (
    <ProfileBody>
      <ProfileContainer>
        <ProfileDetailsUpSection>
          <AvatarWrapper>
            <CameraIcon onClick={() => setIsModalOpen(true)} />
            <MyAvatar size={180} src={profilePicture}></MyAvatar>
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
              <div>
                <q>{experience}</q>
              </div>
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
