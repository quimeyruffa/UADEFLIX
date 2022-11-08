import React from "react";
import ReactPlayer from "react-player";

const Screen = ({ url }) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <ReactPlayer
        url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
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
