import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#181818",
  color: "white",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ item, open, setOpen }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              height:150,
              padding: 5,
              display:'flex',
              justifyContent:'center',
              alignItems: 'center',
              background: "linear-gradient(0deg,#181818,transparent 50%)",
             
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {item.title}
            </Typography>
          </div>
          <div>
            <button
              style={{
                background: "white",
                display: "flex",
                alignItems:'center',
                justifyContent:'center',
                color: "black",
                width: 150,
                height: 42,
                borderRadius: 5,
                fontWeight:'bold'
              }}
            >
                <PlayArrowIcon />
              Reproducir
            </button>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
            <p>{item.year} - {item.duration} minutos</p>

            </div>
            <h4>{item.description}</h4>
            <p>Director: {item.director}</p>
            <p>Escritor: {item.writer}</p>
            <p>Cast: {item.cast}</p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
