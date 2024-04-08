import * as React from 'react';
import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import "./App.css";
import axios from "axios";
import { format } from "timeago.js";
import Register from './components/Register';
import Login from "./components/Login"
function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState("");
  // const currentUser="babu";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewplace] = useState(null); 
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [viewport, setViewport] = useState({
    longitude: 48,
    latitude: 17,
    zoom: 7
  });  
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getPins();
  }, []);

  const handleMarker = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long
    });
    console.log(viewport);
  }
  const handleAddClick = (event) => {
    console.log(event)
    const {lat,lng} = event.lngLat;
    setNewplace({
      lat:lat,
      long:lng
    })
  };  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPin = {
      username:currentUser,
      title,
      desc, rating,
      lat:newPlace.lat,
      long:newPlace.long
    }
    try{
      if(currentUser===""){ alert("Please login to add your review");
      setShowLogin(true);
      return ;
    }

      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewplace(null);
    }catch(err){
      console.log(err);
    }
  }
  const handleLogout = ()=>{
    myStorage.removeItem("user");
    setCurrentUser("")
  }
  return (
    <div className='App'>
    { showRegister&& (<Register setShowRegister={setShowRegister} />)}
    { showLogin&& (<Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>)}
    <Map
      mapboxAccessToken={process.env.REACT_APP_TOKEN}
      initialViewState={viewport}
      onViewportChange={setViewport}
      style={{ width: "100%", height: "100vh" , overflowBlock: true}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
      transitionDuration="8000"
    >
      {pins.map(p => (
        <Marker key={p._id} longitude={p.long} latitude={p.lat} offsetLeft={ -viewport.zoom*3.5} offsetTop={ -viewport.zoom*3.5}>
          <LocationOnIcon
            style={{ color: p.username===currentUser ? "blue" : "red", fontSize: viewport.zoom*7, cursor: 'pointer' }} 
            onClick={() => handleMarker(p._id, p.lat, p.long)}
          />
          {console.log(p._id, currentPlaceId)}
          {p._id === currentPlaceId && (
            <Popup 
              longitude={p.long} 
              latitude={p.lat} 
              anchor="left" 
              closeButton={true} 
              closeOnClick ={false}
              onClose={()=> setCurrentPlaceId(null)}  >
              <div className='Card'>
                <label>Place: </label>
                <h4 className='place'>{p.title}</h4>
                <label>Rating: </label>
                <div className='stars'>
                  {Array(p.rating).fill(
                    <StarIcon className='star'/>
                  )}
                </div>
                <label>Review: </label>
                <p className='review'>{p.desc}</p>
                <label>Information: </label>
                <div className='user-details'>
                  <span className='username'>Created By <b>{p.username}</b></span> <br />
                  <span className='date'><b>{format(p.createdAt)}</b></span>
                </div>
              </div>
            </Popup>
          )}
          {newPlace && (
            <Popup 
              longitude={newPlace.long} 
              latitude={newPlace.lat} 
              anchor="left" 
              closeButton={true} 
              closeOnClick={false}
              onClose={() => setNewplace(null)}>
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Title </label>
                    <input name='title' placeholder='Enter a Title'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Review </label>
                    <textarea name='desc' placeholder='Say us something about this place..'
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label>Rating</label>
                    <select onChange={(e) => setRating(e.target.value)}>
                      <option value="0"></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button className='submitButton' type='submit'>Add review</button>
                  </form>
                </div>
            </Popup>
          )}
          
        </Marker>
      ))}
      {currentUser ? (<button className='button logout' onClick={handleLogout}>LogOut</button>) : 
      (
        <div className='buttons'>
          <button className='button login' onClick={()=> setShowLogin(true)}>Login</button>
          <button className='button signup' onClick={()=> setShowRegister(true)}>Register</button>
        </div>
      )}
      
    </Map>
    </div>
  );
}

export default App;