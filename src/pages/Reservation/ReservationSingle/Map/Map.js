import React, { useState, useEffect, useRef } from 'react';

const Map = ({ city, street, number }) => {
  const [coordinates, setCoordinates] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    const address = `${number} ${street}, ${city}`;

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        setCoordinates({ lat: location.lat(), lng: location.lng() });
      }
    });
  }, [city, street, number]);

  useEffect(() => {
    if (coordinates && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: coordinates,
        map: map,
      });
    }
  }, [coordinates]);

  return (
    <div className="map-page" style={{ width: '100%', height: '600px' }}>
      <div ref={mapRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
};

export default Map;