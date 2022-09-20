import React, { useState, useEffect } from "react";
import { Avatar, Button } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { auth, db } from "../utils/firebase";
import AvatarUploadModal from "../components/AvatarUploadModal";
import { useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaCat, FaDog } from "react-icons/fa";
import { AiFillStar, AiFillEdit, AiOutlinePhone } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { RiDeleteBin5Fill, RiEmotionSadLine } from "react-icons/ri";
import { useHistory } from "react-router";
import EditProfileModal from "../components/EditProfileModal";
import { GrAdd } from "react-icons/gr";
import AddPetModal from "../components/AddPetModal";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import AppFooter from "../components/common/AppFooter";

const ProfileBody = styled.div`
  width: 100%;
  height: fit-content;
  background-color: white;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
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
  margin-right: 25px;
  margin-left: 35px;
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
  height: 650px;
  margin-bottom: 40px;
  justify-items: baseline;
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
  text-align: justify;
  height: fit-content;
  width: 60%;
  margin-bottom: 30px;
  margin-top: 20px;
  strong {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const PetsSection = styled.div`
  width: 63%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
  position: relative;
  strong {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;
const AddPetButton = styled(Button)`
  width: 30%;
  margin: 0 auto;
  font-size: 14px;
  border-color: lightgray;

  svg {
    margin-bottom: -2px;
    margin-right: 2px;
    font-size: 14px;
  }
  :hover,
  :focus,
  :active {
    outline: none;
    color: black;
    border-color: lightgray;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;
const PetsOverflow = styled.div`
  height: 420px;
  width: 100%;
  padding: 0 10px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  margin-top: 20px;
`;
const PetContainer = styled.div`
  width: 450px;
  border: 1px solid whitesmoke;
  margin: 20px auto;
  padding: 20px 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  font-size: 13px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const PetsContainer = styled.div`
  width: 100%;
`;
const DeletePetButton = styled(Button)`
  position: absolute;
  right: 5%;
  top: 5%;
  border: none;
  :hover,
  :after,
  :focus {
    color: green;
    outline: none;
    border: none;
  }
`;
const PetInfo = styled.div`
  padding: 0px 30px 10px 30px;
  height: fit-content;
  margin-bottom: 30px;

  border-bottom: 1px solid lightgray;

  :nth-child(3n + 3) {
    margin-right: 0;
  }
  strong {
    font-size: 16px;
  }
`;
const PetDescription = styled.div`
  padding: 0 30px;

  font-size: 13px;
  font-style: italic;
`;
const NoPetsContainer = styled.div`
  position: absolute;
  margin: 0 auto;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  top: 50%;
  font-size: 20px;
  svg {
    font-size: 50px;
    margin: 0 auto;
  }
`;
const ActionContainer = styled.div`
  width: 250px;
  height: 100%;
`;
const EditProfileButton = styled.button`
  padding: 5px;
  font-size: 15px;
  width: 150px;
  border: 1px solid #e6e6e6;
  margin: 55px 4px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  svg {
    margin-bottom: -2px;
    margin-right: 5px;
    font-size: 15px;
  }
  :hover {
    border: 1px solid #d5d5d5;
    color: black;
    cursor: pointer;
  }
`;
const FollowContainer = styled.div`
  width: 155px;
  display: flex;
  flex-direction: column;
  margin: 55px 0px;
  span {
    font-size: 11px;
    text-align: justify;
    color: gray;
  }
`;
const FollowButton = styled.button`
  padding: 5px;
  font-size: 15px;
  width: 155px;
  margin-bottom: 5px;
  font-weight: 400;
  text-align: center;
  background-color: #809861;
  border: 1px solid #809861;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  :hover {
    background-color: #809861;
    border: 1px solid #809861;
    opacity: 0.7;
    cursor: pointer;
  }
  svg {
    margin-bottom: -2px;
    font-size: 15px;
    margin-right: 5px;
    color: yellow;
    outline: lightgray;
  }
`;
const UnfollowContainer = styled.div`
  width: 155px;
  display: flex;
  flex-direction: column;
  margin: 55px 0px;
  span {
    font-size: 11px;
    text-align: justify;
    color: gray;
  }
`;

const UnfollowButton = styled.button`
  padding: 5px;
  font-size: 15px;
  width: 155px;
  margin-bottom: 5px;

  text-align: center;
  border: 1px solid #e6e6e6;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  :hover {
    border: 1px solid #d5d5d5;
    color: black;
    cursor: pointer;
  }
  svg {
    margin-bottom: -2px;
    font-size: 15px;
    margin-right: 5px;
    color: black;
  }
`;

const SideSection = styled.span`
  width: 280px;
  height: fit-content;
`;
const ContactSection = styled.span`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 111px;
  height: fit-content;
  background-color: lightgray;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  strong {
    font-size: 20px;
    margin-bottom: 20px;
    justify-self: center;
    align-self: center;
    font-style: italic;
  }
`;
const ContactElement = styled.span`
  font-size: 13px;
  margin-bottom: 10px;
  margin-left: 20px;
  strong {
    font-size: 13px;

    margin-bottom: 20px;
    justify-self: center;
    align-self: center;
  }
  svg {
    margin-bottom: -4px;
    font-size: 18px;
  }
  span {
    color: gray;
  }
`;
const FavouritesContainer = styled.div`
  width: 100%;
  height: 272px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  padding: 15px;
  border: 1px solid #ededed;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  span {
    margin-bottom: 5px;
  }
`;
const Favourites = styled.div`
  height: 270px;
  width: 90%;
  border-top: 1px solid lightgray;
  margin: 0 auto;
  font-size: 12px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 24px;
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const UserPhoto = styled(Avatar)`
  margin-right: 10px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.45;
  .username {
    font-weight: 600;
  }
  .fullname {
    opacity: 0.75;
  }
`;
const EmptyUserContainer = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  text-align: center;
  font-style: italic;
  svg {
    font-size: 28px;
    margin: 0 auto;
  }
`;
function Profile() {
  const [alreadyFollowed, setAlreadyFollowed] = useState("");
  // const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [profileId, setProfileId] = useState("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAddPet, setIsModalOpenAddPet] = useState(false);

  // const [isModalOpenFollowers, setIsModalOpenFollowers] = useState(false);
  // const [isModalOpenFollowing, setIsModalOpenFollowing] = useState(false);
  // const [userExists, setUserExists] = useState(true);
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  useEffect(() => {
    db.collection("users")
      .where("id", "==", id)
      .get()
      .then((userData) => {
        setProfileId(userData.docs[0].id);
        setProfilePicture(userData.docs[0].data().profilePicture);
        setFirstName(userData.docs[0].data().firstName);
        setLastName(userData.docs[0].data().lastName);
        setType(userData.docs[0].data().type);
        setSlogan(userData.docs[0].data().slogan);
        setExperience(userData.docs[0].data().experience);
        setEmail(userData.docs[0].data().email);
        setPhoneNumber(userData.docs[0].data().phoneNumber);
        setCity(userData.docs[0].data().city);

        db.collection("follows").onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (
              doc.data().follower === auth.currentUser?.uid &&
              doc.data().following === userData.docs[0].id
            )
              setAlreadyFollowed(doc.id);
          });
        });

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
  }, []);

  useEffect(() => {
    db.collection("follows").onSnapshot((snapshot) => {
      Promise.all(
        snapshot.docs
          .filter((doc) => doc.data().follower === auth.currentUser.uid)
          .map(async (doc) => {
            let firstName = "";
            let lastName = "";
            let profilePicture = "";
            await db
              .collection("users")
              .doc(doc.data().following)
              .get()
              .then((userDoc) => {
                firstName = userDoc.data().firstName;
                lastName = userDoc.data().lastName;
                profilePicture = userDoc.data().profilePicture;
              });

            return {
              id: doc.id,
              userId: doc.data().following,
              firstName: firstName,
              lastName: lastName,
              profilePicture: profilePicture,
            };
          })
      ).then(setFollowing);
    });
  }, []);

  const handleFollow = async () => {
    if (!!alreadyFollowed) {
      await db.collection("follows").doc(alreadyFollowed).delete();
      setAlreadyFollowed("");
    } else {
      db.collection("follows").add({
        follower: auth.currentUser.uid,
        following: profileId,
      });
    }
  };
  const handleDeletePet = async (id) => {
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("pets")
      .doc(id)
      .delete();
  };
  const renderUserPets = () => {
    if (pets.length) {
      return pets.map((pet, index) => {
        return (
          <PetContainer key={index}>
            {profileId === auth.currentUser.uid ? (
              <DeletePetButton onClick={() => handleDeletePet(pet.id)}>
                <RiDeleteBin5Fill />
              </DeletePetButton>
            ) : undefined}
            <PetInfo>
              {profileId === auth.currentUser.uid
                ? "You own"
                : firstName + " owns"}{" "}
              a
              {pet.petType.toLowerCase() === "cat" ? (
                <FaCat size={40} />
              ) : pet.petType.toLowerCase() === "dog" ? (
                <FaDog size={40} />
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
    } else {
      return (
        <NoPetsContainer>
          <RiEmotionSadLine />
          {profileId === auth.currentUser.uid ? (
            <span>You don&#39;t have any pets at the moment.</span>
          ) : (
            <div>
              {firstName}
              <span> doesn&#39;t have any pets at the moment.</span>
            </div>
          )}{" "}
        </NoPetsContainer>
      );
    }
  };
  const renderFavouriteUsers = () =>
    following.length !== 0 ? (
      following.map((user) => (
        <User
          key={user.id}
          {...user}
          onClick={(e) => navigateToPage(e, "/profile/" + user.userId)}
        >
          <UserPhoto
            size={35}
            src={user.profilePicture}
            alt={user.firstName + " " + user.lastName}
          >
            {user.firstName?.[0]?.toUpperCase()}
          </UserPhoto>
          <UserDetails>
            <div className="fullName">
              {user.firstName + " " + user.lastName}
            </div>
          </UserDetails>
        </User>
      ))
    ) : (
      <EmptyUserContainer>
        <span>You didn&#39;t add any user yet.</span>
      </EmptyUserContainer>
    );

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
              <strong>{firstName + " " + lastName}</strong>
            </FullName>
            <Type>-Registered as pet {type}-</Type>
            {type === "sitter" ? <Slogan>{slogan}</Slogan> : undefined}
            <City>
              <MdLocationOn /> {city}
            </City>
          </ProfileInfo>
          <ActionContainer>
            {profileId === auth.currentUser?.uid ? (
              <EditProfileButton onClick={() => setIsModalOpenEdit(true)}>
                <AiFillEdit /> Edit profile
                <EditProfileModal
                  title="Edit Profile"
                  isOpen={isModalOpenEdit}
                  setIsOpen={setIsModalOpenEdit}
                  userid={auth.currentUser.uid}
                  firstName={firstName}
                  lastName={lastName}
                  city={city}
                  phoneNumber={phoneNumber}
                  email={email}
                  slogan={slogan}
                  experience={experience}
                  type={type}
                />
              </EditProfileButton>
            ) : alreadyFollowed ? (
              <UnfollowContainer>
                <UnfollowButton onClick={handleFollow}>
                  <AiFillStar />
                  Remove favourite
                </UnfollowButton>
                <span>* Now you can chat with this user.</span>
              </UnfollowContainer>
            ) : (
              <FollowContainer>
                <FollowButton type="primary" onClick={handleFollow}>
                  <AiFillStar /> Add to favourites
                </FollowButton>
                <span>* This user is not in your contacts list.</span>
              </FollowContainer>
            )}
          </ActionContainer>
        </ProfileDetailsUpSection>
        <ProfileDetailsDownSection>
          {type === "sitter" ? (
            <Experience>
              <strong>Experience</strong>
              <div>
                <q>{experience}</q>
              </div>
            </Experience>
          ) : profileId === auth.currentUser.uid ? (
            <PetsSection>
              {pets.length !== 0 ? <strong>Pets</strong> : undefined}
              <AddPetButton onClick={() => setIsModalOpenAddPet(true)}>
                <GrAdd /> Add Pet
              </AddPetButton>

              <PetsOverflow>
                <SimpleBar style={{ maxHeight: 420 }}>
                  <PetsContainer>{renderUserPets()}</PetsContainer>
                </SimpleBar>
              </PetsOverflow>

              <AddPetModal
                title="Edit Profile"
                isOpen={isModalOpenAddPet}
                setIsOpen={setIsModalOpenAddPet}
              />
            </PetsSection>
          ) : (
            <PetsSection style={{ marginTop: 43 }}>
              {pets.length !== 0 ? <strong>Pets</strong> : undefined}

              <PetsOverflow>
                <SimpleBar style={{ maxHeight: 420 }}>
                  <PetsContainer>{renderUserPets()}</PetsContainer>
                </SimpleBar>
              </PetsOverflow>

              <AddPetModal
                title="Edit Profile"
                isOpen={isModalOpenAddPet}
                setIsOpen={setIsModalOpenAddPet}
              />
            </PetsSection>
          )}
          <SideSection>
            {type === "sitter" ? (
              <ContactSection style={{ marginTop: 85 }}>
                <strong>Contact details</strong>
                <ContactElement>
                  <GoMail /> <span>email:</span> <strong>{email}</strong>
                </ContactElement>
                <ContactElement>
                  <AiOutlinePhone /> <span>phone:</span>{" "}
                  <strong>{phoneNumber}</strong>
                </ContactElement>
              </ContactSection>
            ) : (
              <ContactSection>
                <strong>Contact details</strong>
                <ContactElement>
                  <GoMail /> <span>email:</span> <strong>{email}</strong>
                </ContactElement>
                <ContactElement>
                  <AiOutlinePhone /> <span>phone:</span>{" "}
                  <strong>{phoneNumber}</strong>
                </ContactElement>
              </ContactSection>
            )}

            {profileId === auth.currentUser?.uid ? (
              <FavouritesContainer>
                <span>FAVOURITES</span>

                <Favourites>
                  <SimpleBar style={{ maxHeight: 210 }}>
                    <div>{renderFavouriteUsers()}</div>
                  </SimpleBar>
                </Favourites>
              </FavouritesContainer>
            ) : undefined}
          </SideSection>
        </ProfileDetailsDownSection>
        <AvatarUploadModal
          isOpened={isModalOpen}
          setIsOpen={setIsModalOpen}
          setAvatar={setProfilePicture}
          updateDb="true"
        />
      </ProfileContainer>
      <AppFooter />
    </ProfileBody>
  );
}

export default Profile;
