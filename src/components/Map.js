import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect } from "react/cjs/react.development";
import { Marker } from "google-maps-react";

const containerStyle = {
  width: "99%",
  height: "500px",
  margin: "0 auto",
};

function Map(city) {
  console.log(city.city);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  Geocode.setApiKey("AIzaSyCq_jXEmB0Pcyqi966HrXpjhax8iigQHLQ");
  Geocode.setRegion("ro");

  useEffect(() => {
    Geocode.fromAddress(city.city).then(
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

  const center = {
    lat: +latitude,
    lng: +longitude,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCq_jXEmB0Pcyqi966HrXpjhax8iigQHLQ",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {<Marker position={[" 47.1584549", "27.6014418"]} map={map}></Marker>}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
