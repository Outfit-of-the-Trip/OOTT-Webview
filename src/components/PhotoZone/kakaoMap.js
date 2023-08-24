import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import axios from 'axios';

import KakaoTogle from './KakaoTogle';
import locations from './location'

const KakaoMap = () => {

  const [openWindow, setOpenWindow] = useState(false)

  const handleMarkerClick = (index) => {
    if(openWindow !== index) setOpenWindow(index)
    else setOpenWindow(null)
  };

  const [lat, setLat] = useState(33.450705)
  const [lng, setLng] = useState(126.570677)

  return (
    <>
   <Map center={{ lat: lat, lng: lng }} 
         style={{ width: '100vw', height: '100vh', margin: '0 auto', justifyContent: 'center', alignItems: 'center'  }} 
         level={4}
    >
      {locations.map((loc, idx) => (
        <MapMarker
            key={`${loc.title}-${loc.latlng.lat}`}
            position={loc.latlng}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: { width: 20, height: 30 },
            }}
            title={loc.title}
            clickable={true}

            onClick={ () => {
              handleMarkerClick(idx);
              setLat(loc.latlng.lat);
              setLng(loc.latlng.lng);
            } }
        >

          {openWindow === idx && (
            <KakaoTogle loc={loc} />
          )}

        </MapMarker>
      ))}
    </Map>    
  </>
  );
}

export default KakaoMap;