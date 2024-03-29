import * as React from 'react';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import "./App.css"
function App() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_TOKEN}
      initialViewState={{
        longitude: 48,
        latitude: 17,
        zoom: 4.5
      }}
      style={{width: "100%", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={48.5} latitude={16.6} offsetLeft={-20} offsetTop={-10} > 
      <LocationOnIcon style={{ color: 'red', fontSize: "70px"}} />
      {showPopup && (
      <Popup longitude={48.5} latitude={16.6}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        <div className='Card'>
          <label>Place: </label>
          <h4 className='place'>Dubai</h4>
          <label>Rating: </label>
          <div className='stars'>
            <StarIcon/>
            <StarIcon/>
          </div>
          <label>Review: </label>
          <p className='review'>This is a Beautiful place with lot of peace and neatness..</p>
          <label>Information: </label>
          <div className='user-details'>
            <span className='username'>Created By <b>Uday</b></span> <br/>
            <span className='date'>Date: <b>23-03-2023</b></span>
          </div>
        </div>
      </Popup>)}
    </Marker>
  </Map>
  );
}

export default App;