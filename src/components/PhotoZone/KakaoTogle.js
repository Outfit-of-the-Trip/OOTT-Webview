import React, {useEffect} from 'react';

import './togle.css'

const KakaoTogle = (props) => {
  return(
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: 316,
      height: 575,
      position: "relative",
      overflow: "hidden",
      gap: 14,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 18,
      paddingBottom: 10,
      background: "#948ed9",
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 28,
    }}
  >
    <p
      style={{
        alignSelf: "stretch",
        flexGrow: 0,
        flexShrink: 0,
        width: 296,
        height: 55,
        fontSize: 24,
        textAlign: "center",
        color: "#fff",
      }}
    >
      {props.loc.title}
    </p>
    <img
      src={props.loc.image}
      style={{
        flexGrow: 0,
        flexShrink: 0,
        width: 299,
        height: 325,
        borderRadius: 28,
        objectFit: "cover",
      }}
    />
    <p
      style={{
        flexGrow: 0,
        flexShrink: 0,
        width: 303,
        height: 48,
        fontSize: 24,
        textAlign: "left",
        color: "#fff",
      }}
    >
      ㅇㄴㄹㅁ
    </p>
  </div>
  )
}

export default KakaoTogle;

