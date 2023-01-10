import React, { useEffect, useState } from "react";
import homeCover from "../assets/homeCover2.jpg";
import styled from "styled-components";
import { auth, db } from "../utils/firebase";
import PlacesAutocomplete from "../components/common/PlacesAutocomplete";

import { BsSearch } from "react-icons/bs";
import { ImSad } from "react-icons/im";
import { AiFillStar } from "react-icons/ai";

import Avatar from "antd/lib/avatar/avatar";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { useHistory } from "react-router";
import Map from "../components/Map";
import Geocode from "react-geocode";
import AppFooter from "../components/common/AppFooter";
import { Marker } from "@react-google-maps/api";

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const HomeCover = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  z-index: 2;
  img {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }
  overflow: overlay;
`;
const CityContainer = styled.div`
  width: 240px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 18%;
  z-index: 2;
  box-shadow: rgb(248 248 224) 0px 0px 0px 3px, rgb(246 238 195) 0px 0px 0px 6px,
    rgb(238 205 144) 0px 0px 0px 9px, rgb(215 178 151) 0px 0px 0px 12px;
`;
const CoverTitle = styled.div`
  width: fit-content;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
  letter-spacing: 2px;
  font-style: italic;
  font-weight: bold;
  font-family: "Pacifico", cursive;
  top: 6%;
  z-index: 2;
  color: #802c2b;
`;
const CoverButton = styled.button`
  width: 20px;
  height: 27px;
  position: absolute;
  left: 56%;
  font-size: 16px;
  font-style: italic;
  font-weight: bold;
  top: 116px;
  background-color: white;
  border: none;
  z-index: 5;
  color: gray;
  border-left: 1px solid lightgray;
  :hover {
    cursor: pointer;
  }
`;
const DownSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fbf2e9;
  position: relative;
`;
const ExploreSittersContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  padding: 40px;
  margin-bottom: 10px;
`;
const ExploreTitle = styled.div`
  font-size: 25px;
  margin: 28px 25px;
  font-weight: bold;
  color: #a26847;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 6%;
`;
const Sitters = styled.div`
  margin-top: 100px;
  width: 60%;
  height: 530px;
  border-right: 1px solid #b48c1875;
  border-left: 1px solid #b48c1875;
  padding: 20px;
`;
const NoSittersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;

  strong {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 25px;
    margin: 0 auto;
    z-index: 10;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
    margin: 0 auto;
  }
`;
const User = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 24px;
  margin-bottom: 20px;
  background: rgba(255 255 255);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
const UserPhoto = styled(Avatar)`
  margin-right: 20px;
`;

const UserDetails = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.45;
  position: relative;
  .username {
    font-weight: 600;
  }
  .fullname {
    opacity: 0.75;
  }
  div:nth-child(1) {
    font-weight: bold;
    margin-bottom: 5px;
  }
  div:nth-child(2) {
    color: #802c2b;
    margin-bottom: 3px;
    font-weight: bold;
  }
  div:nth-child(3) {
    font-size: 15px;
    font-style: italic;
  }
`;
const FavouriteStateContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 6%;
  svg {
    font-size: 25px;
  }
`;
const MapContainer = styled.div`
  width: 37%;
  height: 500px;
  position: absolute;
  top: 22%;
  right: 2%;
`;

const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCq_jXEmB0Pcyqi966HrXpjhax8iigQHLQ&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};

function Home() {
  const [city, setCity] = useState("");
  const [sitters, setSitters] = useState("");
  // const [following, setFollowing] = useState([]);
  const [arrayState, setArrayState] = useState([]);

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [loadMap, setLoadMap] = useState(false);
  const history = useHistory();
  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((userData) => {
        setCity(userData.data().city);
      });
  }, []);

  useEffect(() => {
    db.collection("follows").onSnapshot((snapshot) => {
      Promise.all(
        snapshot.docs
          .filter((doc) => doc.data().follower === auth.currentUser.uid)
          .map(async (doc) => {
            await db
              .collection("users")
              .doc(doc.data().following)
              .get()
              .then((userDoc) => {
                setArrayState((arrayState) => [...arrayState, userDoc.id]);
              });
          })
      );
    });
  }, []);

  useEffect(() => {
    db.collection("users")
      .where("id", "!=", auth.currentUser.uid)
      .where("type", "==", "sitter")
      .where("city", "==", city)
      .onSnapshot(async (snapshot) => {
        const sittersCollection = snapshot.docs;
        // console.log(filteredPets);

        return Promise.all(
          sittersCollection.map(async (user) => {
            return {
              id: user.id,
              ...user.data(),
            };
          })
        ).then(setSitters);
      });
  }, [city]);

  const handleClick = () => {
    const val = document.getElementById("autocompleteInput").value;
    setCity(val);
    window.location.replace("#section");
  };

  Geocode.setApiKey("AIzaSyCq_jXEmB0Pcyqi966HrXpjhax8iigQHLQ");

  Geocode.setRegion("ro");
  useEffect(() => {
    Geocode.fromAddress(city).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  });
  const renderSittersCollection = () => {
    if (sitters) {
      if (sitters.length !== 0) {
        return sitters.map((sitter) => {
          let favourite = "";
          if (arrayState.indexOf(sitter.id) > -1) {
            favourite = "true";
          } else {
            favourite = "false";
          }
          return (
            <User
              key={sitter.id}
              {...sitter}
              onClick={(e) => navigateToPage(e, "/profile/" + sitter.id)}
            >
              <UserPhoto
                size={100}
                src={sitter.profilePicture}
                alt={sitter.firstName + " " + sitter.lastName}
              >
                {sitter.firstName?.[0]?.toUpperCase()}
              </UserPhoto>
              <UserDetails>
                <div className="fullName">
                  {sitter.firstName + " " + sitter.lastName}
                </div>
                <div>{sitter.slogan}</div>
                <div>{'"' + sitter.experience.substring(0, 200) + '..."'}</div>
                <FavouriteStateContainer>
                  {" "}
                  {favourite === "true" ? <AiFillStar /> : undefined}
                </FavouriteStateContainer>
              </UserDetails>
            </User>
          );
        });
      } else if (sitters.length === 0) {
        return (
          <NoSittersContainer>
            <ImSad />
            <strong>
              Sorry, we couldn&apos;t find any pet sitters in this area
            </strong>
          </NoSittersContainer>
        );
      }
    }
  };
  return (
    <HomeContainer>
      <HomeCover>
        <img src={homeCover} alt="pet cover"></img>
        <CoverTitle>
          The pet sitters you&apos;re looking for are here{" "}
        </CoverTitle>
        <CityContainer>
          {!loadMap ? (
            <div>Loading...</div>
          ) : (
            <PlacesAutocomplete city={city}></PlacesAutocomplete>
          )}
        </CityContainer>
        <CoverButton onClick={handleClick}>
          <BsSearch />
        </CoverButton>
      </HomeCover>
      <DownSection>
        <ExploreSittersContainer id="section">
          {sitters.length !== 0 ? (
            <ExploreTitle>
              Pet sitters found in {city.substring(0, city.length - 9)}:
            </ExploreTitle>
          ) : undefined}

          <Sitters>
            <SimpleBar style={{ maxHeight: 500 }}>
              <div style={{ width: "95%", margin: "0 auto", height: 500 }}>
                {renderSittersCollection()}
              </div>
            </SimpleBar>
          </Sitters>
        </ExploreSittersContainer>
        <MapContainer id="map">
          <Map city={city}>
            {/* <Marker
              position={[+latitude, +longitude]}
              style={{ zIndex: "10" }}
            ></Marker> */}
          </Map>
        </MapContainer>
      </DownSection>

      <AppFooter />
    </HomeContainer>
  );
}

export default Home;
