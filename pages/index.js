import "mapbox-gl/dist/mapbox-gl.css";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Head from "next/head";
import React, { useState, useRef, mapRef, useCallback } from 'react';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import axios from 'axios';
import Geocoder from "@mapbox/mapbox-gl-geocoder";
import Location from '../components/location';
import mapboxgl from "mapbox-gl";

export default function Home({ locations }) {


  const token = "pk.eyJ1IjoianVzdHludCIsImEiOiJja3ozamtlbHowN2N2Mm5ueDZtdWp0bWNzIn0.WFMsMJUnJlCGF_FK8R7nTg";
  const mapRef = useRef();

  const [lng, setLng] = useState(30.438255);
  const [lat, setLat] = useState(-84.280731);
  const [popupInfo, setPopupInfo] = useState(null);

  const [viewport, setViewport] = useState({
    longitude: lng,
    latitude: lat,
    zoom: 12,
    transitionDuration: 100,
  });

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  const localGeocoder = (locations) => {
    return locations;
  }



  return (
    <div>
      <Head>
        <title>Photo Scalp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app-view">
        <div className="container-fluid">
          <div className="row justify-content-center">

            <div className="col-12 col-md-6 list-view">
              <div className="container-fluid">
                <div className="row justify-content-start align-items-stretch">
                  {
                    locations.map(location => {
                      return (
                        <Location
                          key={location.id}
                          location={location}
                        />
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 map">
              <Map
                ref={mapRef}
                {...viewport}
                mapboxAccessToken={token}
                onViewportChange={handleViewportChange}
                style={{}}
                mapStyle="mapbox://styles/mapbox/light-v10"
              >
                <Geocoder
                  mapRef={mapRef}
                  onViewportChange={handleGeocoderViewportChange} // A function that updates viewport values after executing a query       
                  mapboxAccessToken={token}
                  position="top-left"
                  placeholder="Search for places"
                  mapboxgl={mapboxgl} 
                  localGeocoder={localGeocoder} // <--  A function that take as a input locations and performs local geocoding to supplement results from the Mapbox Geocoding API (This part is Enabled as you requested, if you want to use it set localGeocoderOnly to false ).
                  localGeocoderOnly={true} // <--  indicates that the localGeocoder results should be the only ones returned to the user />
                />
                {
                  // plot the locations from api
                  locations.map(location => {
                    return (
                      <Marker
                        key={location.id}
                        longitude={location.geometry.coordinates[0]}
                        latitude={location.geometry.coordinates[1]}
                      >
                        <span className="map-title">{location.properties.title}</span>
                      </Marker>
                    )
                  })
                }

                <NavigationControl />
                <GeolocateControl />
              </Map>
            </div>

          </div>
        </div>
      </div>

    </div>
  )

}

// get the data
export const getStaticProps = async () => {
  const results = await axios.get("https://photoscalp.wpengine.com/wp-json/ps/v1/posts");
  const data = await results.data;

  return {
    props: { locations: data.features }
  }
}
