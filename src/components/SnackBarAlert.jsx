import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SnackBarAlert = ({ text, open, handleClose }) => {
  const navigate = useNavigate();
  let vertical = "top";
  let horizontal = "center";
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert severity="info" sx={{ width: "100%" }}>
        {text}
        {text ===
          "La pelicula no esta disponible para su tipo de plan, agregue un nuevo plan para ver la pelicula" && (
            <Button variant="contained" color="success" onClick={()=>navigate(`/verPlanes`)} style={{marginLeft: 10}}> Ver planes </Button>
        )}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarAlert;
