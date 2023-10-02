// MapPage

import React, { useState } from 'react'; // Import useState hook
import { Box, Input, Button, Container, Paper, Stack, styled } from "@mui/material";
import GoogleMapReact from 'google-map-react';
import CircularProgress from "@mui/material/CircularProgress";
import SpinnerOfDoom from "../HomePage/SpinnerOfDoom";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Grid2 from "@mui/material/Unstable_Grid2";


const API_KEY = process.env.REACT_APP_API_KEY;
const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));


// Define the MapComponent
function MapPage(props) {
    
    const [locationData, setLocationData] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [mapOptions, setMapOptions] = useState({
      center: { lat: -33.4039951, lng: -70.5100492 },
      zoom: 15,
    });

    const handleLocationSearch = async () => {
        try {
          
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`);
          const data = await response.json();
          
        
          if (data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setMapOptions({
              center: { lat: location.lat, lng: location.lng },
              zoom: 15,
            });
            setLocationData(location);
          } else {
            console.error('Location not found.');
          }
        } catch (error) {
          console.error('Error searching for location:', error);
        }
      };

    const handleGetCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const userLocation = { lat, lng };
          setLocationData(userLocation);

          setMapOptions({
            center: userLocation,
            zoom: 15,
          });
        });
      } else {
        console.error('Geolocation is not supported in this browser.');
      }
    };

    const searchContainerStyle = {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '10px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1,
      };

  return (
    <div style={{ position: 'relative', height: '500px', width: '100%' }}>
      <div style={searchContainerStyle}>
        <Box display="flex" alignItems="center">
          <Input
            type="text"
            placeholder="Enter location name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
          <Button variant="contained" onClick={handleLocationSearch}>
            Search
          </Button>
          <Button variant="contained" onClick={handleGetCurrentLocation}>
            Get My Location
          </Button>
        </Box>
      </div>
      <GoogleMapReact
      
        
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={mapOptions.center}
        defaultZoom={mapOptions.zoom}
        center={locationData || mapOptions.center}
      >
        {/* Add markers or other map components here */}
      </GoogleMapReact>
    </div>
  );
}
  
 


function MapPages(props) {
    return (
        <Box>
            < SpinnerOfDoom color={'secondary.main'} />
        </Box>
    );
}

export default MapPage;