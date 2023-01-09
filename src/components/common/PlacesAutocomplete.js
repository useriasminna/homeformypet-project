import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CityInput = styled.input`
  width: 100%;
  padding: 5px 40px 5px 25px;
  border: 1px solid lightgray;
  :focus-visible {
    outline: none;
  }
`;
const PlacesAutocomplete = (city) => {
  const placeInputRef = useRef(null);
  const [cityState, setCityState] = useState(city);

  useEffect(() => {
    setCityState(city);
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
        let place = autocomplete.getPlace();
        setCityState({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    );
  };

  return (
    <CityInput
      id="autocompleteInput"
      placeholder={"Enter a city location "}
      type="text"
      ref={placeInputRef}
      defaultValue={city.city}
    />
  );
};

export default PlacesAutocomplete;
