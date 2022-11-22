import React from "react";
import ReactPlayer from "react-player";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Screen = () => {
  const navigate = useNavigate();
  const [url, setUrl] = React.useState("second");
  const [text, setText] = React.useState("second");
  const [state, setState] = React.useState({
    open: false,
  });
  let vertical = "top";
  let horizontal = "left";
  const { open } = state;

  React.useEffect(() => {
    setText(localStorage.getItem("maturityRating"));
    setUrl(localStorage.getItem("url"));
    handleShowData();
  }, []);

  const handleShowData = () => {
    setState({ open: true });
    setTimeout(function () {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleAlert = (texts) => {
    setText(texts)
    handleShowData()
  };
  return (
    
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>

      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing
        volume="1"
        onPlay={() => {
          handleAlert("Video On Play");
        }}
        onPause={() => {
          handleAlert("Video On Pause");
        }}
        onEnded={()=>navigate(`/recomendations`)}
      />
    </div> 
  );
};

export default Screen;
