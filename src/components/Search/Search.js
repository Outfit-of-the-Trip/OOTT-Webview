import React, { useState, useEffect, useRef } from 'react';
import { Map, MapMarker} from 'react-kakao-maps-sdk';

const { kakao } = window;

const Search = () => {
    document.addEventListener('message',(e) => {alert(e.data);setSearch(e.data)});
    const sendToRN = (loc) => {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify( {data:loc} )
            );
        } else {
          console.log("ERROR : Cannot Send Data to App")
        }
    };

    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
    const [search, setSearch] = useState("")
  
    useEffect(() => {
      if (!map) return
      const ps = new kakao.maps.services.Places()
  
      ps.keywordSearch(search, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
  
          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)
  
          map.setBounds(bounds)
        }
      })
    }, [search])
  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{ width: '100vw', height: '100vh'  }} 
      level={5}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
}

export default Search;