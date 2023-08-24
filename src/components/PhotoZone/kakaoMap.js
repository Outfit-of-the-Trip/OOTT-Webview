import React, { useRef, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import axios from 'axios';
import locations from './location'

const { kakao } = window;

const KakaoMap = () => {

  
  const [state, setState] = useState({
    center: { lat: 33.452613, lng: 126.570888 },
    isPanto: false,
  })

  const sendToRN = (loc) => {
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
            JSON.stringify( {data:loc} )
        );
    } else {
      console.log("ERROR : Cannot Send Data to App")
    }
};
  return (
    <>
      <Map
          center={state.center}
          isPanto={state.isPanto}
          style={{ width: '100vw', height: '100vh'  }} 
          level={4}
      > 
      {locations.map((loc, idx) => (
        <MapMarker
            key={`${loc.title}-${loc.latlng.lat}`}
            position={loc.latlng}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
              size: { width: 64, height: 69 },
            }}
            clickable={true}

            onClick={ () => {
              sendToRN(loc)
              setState({
                center: { lat: loc.latlng.lat, lng: loc.latlng.lng },
                isPanto: true,
              })
            } }
        >
        </MapMarker>
      ))}
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />

      </Map>  
     
    </>
  );
}

export default KakaoMap;