import React, { useState } from 'react';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import locations from './location'

const { kakao } = window;

const KakaoMap = () => {

  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  function calcDistance(loc) {
    const earthRadiusKm = 6371; // 지구 반지름 (단위: km)
    var lat1 = loc.latlng.lat
    var lat2 = state.center.lat 
    var lon1 = loc.latlng.lng
    var lon2 = state.center.lng
  
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadiusKm * c; // 두 지점 간의 거리 (단위: km)
    if(distance > 10) return false;
    else return true;
  }

  
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
        (calcDistance(loc)) && (
        <MapMarker
            key={`${loc.title}-${loc.latlng.lat}`}
            position={loc.latlng}
            image={{
              src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkLHA6%2Fbtsr9RBWrGm%2FKh2kmCuC37g5a3rgMvasK0%2Fimg.png",
              size: { width: 30, height: 40 },
            }}
            clickable={true}

            onClick={ () => {
              sendToRN(loc)
              setState({
                center: { lat: loc.latlng.lat, lng: loc.latlng.lng },
                isPanto: true,
              })
            } }
        />)
      ))}
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />

      </Map>  
     
    </>
  );
}

export default KakaoMap;