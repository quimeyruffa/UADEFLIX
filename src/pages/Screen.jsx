import React from "react";
import ReactPlayer from "react-player";
const Screen = () => {
 const [url, setUrl] = React.useState('second')
  React.useEffect(()=>{
    setUrl(localStorage.getItem("url"))
  },[])
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing
        volume="1"
        // onPlay={""}
        // onPause={""}
        // onEnded={''}
      />
    </div>
  );
};

export default Screen;
