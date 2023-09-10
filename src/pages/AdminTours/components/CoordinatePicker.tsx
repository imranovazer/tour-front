import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function CoordinatePicker() {
  const [coordinates, setCoordinates] = useState([]);
  const [newCoordinate, setNewCoordinate] = useState({
    lat: 0,
    lng: 0,
    name: "",
  });

  const handleMapClick = (e) => {
    setNewCoordinate({ lat: e.latlng.lat, lng: e.latlng.lng, name: "" });
  };

  const handleNameChange = (e) => {
    setNewCoordinate({ ...newCoordinate, name: e.target.value });
  };

  const handleAddCoordinate = () => {
    if (newCoordinate.lat !== 0 && newCoordinate.lng !== 0) {
      setCoordinates([...coordinates, newCoordinate]);
      setNewCoordinate({ lat: 0, lng: 0, name: "" });
    }
  };

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coordinate, index) => (
          <Marker key={index} position={[coordinate.lat, coordinate.lng]}>
            <Popup>{coordinate.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newCoordinate.name}
          onChange={handleNameChange}
        />
        <button onClick={handleAddCoordinate}>Add Coordinate</button>
      </div>
      <ul>
        {coordinates.map((coordinate, index) => (
          <li key={index}>
            {coordinate.name} - Lat: {coordinate.lat}, Lng: {coordinate.lng}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoordinatePicker;
