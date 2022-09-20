import React, { useState, useRef, useEffect } from "react";
import { Modal, Input } from "antd";
import styled from "styled-components";
import { db } from "./../utils/firebase";
import FormItem from "antd/lib/form/FormItem";
import Form from "antd/lib/form/Form";
// import PlacesAutocomplete from "./common/PlacesAutocomplete";
const { TextArea } = Input;

// const Item = styled.div`
//   div {
//     display: inline-block;
//     margin-bottom: 3px;
//     opacity: 0.9;
//     font-weight: 600;
//   }
//   span {
//     color: red;
//   }
//   & + & {
//     margin-top: 10px;
//   }
// `;
// const NameContainer = styled.div`
//   margin-top: 30px;
//   width: 470px;
//   display: flex;
//   justify-content: space-between;
//   input {
//     width: 155px;
//   }
// `;
const Error = styled.span`
  color: red;
`;

const CityInput = styled.input`
  width: 100%;
  border: 1px solid #d9d9d9;
  padding: 4px 11px;
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
const ElementInput = styled(Input)``;
// let autoComplete;

// const loadScript = (url, callback) => {
//   let script = document.createElement("script");
//   script.type = "text/javascript";

//   if (script.readyState) {
//     script.onreadystatechange = function () {
//       if (script.readyState === "loaded" || script.readyState === "complete") {
//         script.onreadystatechange = null;
//         callback();
//       }
//     };
//   } else {
//     script.onload = () => callback();
//   }

//   script.src = url;
//   document.getElementsByTagName("head")[0].appendChild(script);
// };

// function handleScriptLoad(updateQuery, autoCompleteRef) {
//   autoComplete = new window.google.maps.places.Autocomplete(
//     autoCompleteRef.current,
//     { types: ["(cities)"], componentRestrictions: { country: "ro" } }
//   );
//   autoComplete.setFields(["address_components", "formatted_address"]);
//   autoComplete.addListener("place_changed", () =>
//     handlePlaceSelect(updateQuery)
//   );
// }

// async function handlePlaceSelect(updateQuery) {
//   const addressObject = autoComplete.getPlace();
//   const query = addressObject.formatted_address;
//   updateQuery(query);
//   // console.log(addressObject);
// }

function EditProfileModal({
  title,
  isOpen,
  setIsOpen,
  userid,
  firstName,
  lastName,
  city,
  phoneNumber,
  email,
  slogan,
  experience,
  type,
}) {
  const [firstNameState, setFirstNameState] = useState(firstName);
  const [lastNameState, setLastNameState] = useState(lastName);
  const [cityState, setCityState] = useState(city);

  const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);
  const [emailState, setEmailState] = useState(email);
  const [sloganState, setSloganState] = useState(slogan);
  const [experienceState, setExperienceState] = useState(experience);
  const [error, setError] = useState("");
  const placeInputRef = useRef(null);
  useEffect(() => {
    setFirstNameState(firstName);
    setLastNameState(lastName);
    setCityState(city);
    setPhoneNumberState(phoneNumber);
    setEmailState(email);
    setSloganState(slogan);
    setExperienceState(experience);
  }, [firstName, lastName, city, phoneNumber, email, slogan, experience]);

  const handleEdit = (e) => {
    e.preventDefault();
    db.collection("users")
      .where("id", "==", userid)
      .get()
      .then((doc) => {
        if (type === "owner") {
          db.collection("users").doc(userid).set(
            {
              firstName: firstNameState,
              lastName: lastNameState,
              city: cityState,
              phoneNumber: phoneNumberState,
              email: emailState,
            },
            { merge: true }
          );
        } else {
          db.collection("users").doc(userid).set(
            {
              firstName: firstNameState,
              lastName: lastNameState,
              city: cityState,
              phoneNumber: phoneNumberState,
              email: emailState,
              slogan: sloganState,
              experience: experienceState,
            },
            { merge: true }
          );
        }

        setIsOpen(false);
        setError("");
      });
  };
  useEffect(() => {
    initPlaceAPI();
  }, []);

  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(
      placeInputRef.current,
      { componentRestrictions: { country: "ro" }, types: ["(regions)"] }
    );
    new window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function () {
        let place = autocomplete.getPlace().formatted_address;
        setCityState(place);
      }
    );
  };
  // console.log(cityState);
  return (
    <Modal
      title={title}
      visible={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={handleEdit}
    >
      <Form>
        <FormItem
          label="First Name"
          name="firstname"
          rules={[
            {
              type: "string",
              message: "Not a valid type!",
            },
          ]}
        >
          <ElementInput
            defaultValue={firstNameState}
            value={firstNameState}
            onChange={(e) => setFirstNameState(e.target.value)}
          />
        </FormItem>
        <FormItem
          label="Last Name"
          name="lastname"
          rules={[
            {
              type: "string",
              message: "Not a valid type!",
            },
          ]}
        >
          <ElementInput
            defaultValue={lastNameState}
            value={lastNameState}
            onChange={(e) => setLastNameState(e.target.value)}
          />
        </FormItem>

        <div className="search-location-input">
          <FormItem label={<span>City</span>}>
            <CityInput
              id="cityInputAutocomplete"
              onChange={(event) => setCityState(event.target.value)}
              placeholder=""
              defaultValue={cityState}
              value={cityState}
              type="text"
              ref={placeInputRef}
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
            <FormItem type="number" name="phoneNumber">
              <ElementInput
                defaultValue={phoneNumberState.substring(2, 10)}
                value={phoneNumberState.substring(2, 10)}
                onChange={(e) => setPhoneNumberState(e.target.value)}
                style={{ width: "55%" }}
                placeholder="000 000 000"
                maxLength={9}
              />
            </FormItem>
          </Input.Group>
        </FormItem>
        {type === "sitter" ? (
          <div>
            <FormItem label="Slogan">
              <ElementInput
                placeholder="no more than 80 characters"
                name="slogan"
                defaultValue={sloganState}
                value={sloganState}
                onChange={(e) => setSloganState(e.target.value)}
                maxLength={80}
              />
            </FormItem>
            <FormItem label="Experience">
              <TextArea
                placeholder="describe your experience with animals"
                name="experience"
                defaultValue={experienceState}
                value={experienceState}
                onChange={(e) => setExperienceState(e.target.value)}
                autoSize={{ minRows: 4, maxRows: 10 }}
                maxLength={1000}
              />
            </FormItem>
          </div>
        ) : undefined}
        <Error>{error}</Error>
      </Form>
    </Modal>
  );
}

export default EditProfileModal;
