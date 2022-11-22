import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  minHeight:100,
  bgcolor: "#181818",
  color: "white",
  boxShadow: 24,
  p: 0,
};

export default function BasicModal({ item, open, setOpen }) {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    handleGetItem();
  }, [item]);
  const handleGetItem = async () => {
    await fetch(`https://uadeflix-cms.up.railway.app/api/contenidos/${item.id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  };

  const handleClose = () => {
    setData();
    setOpen(false)
  };
  const handleRedirect = async (id) => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://intap-suscripciones.herokuapp.com/public/api/canViewFilm/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let status = JSON.parse(result);
        if (status.puede_ver) {
          localStorage.setItem('pelicula', JSON.stringify(data))
          localStorage.setItem('maturityRating', data?.maturityRating?.description)
          localStorage.setItem("url", data?.urlVideo);
          navigate(`/screen`);
        } else {
          alert(
            "La pelicula no esta disponible para su tipo de plan, agregue un nuevo plan para ver la pelicula"
          );
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {loading ? (
              <div style={{paddingTop:10}}>
                <ClipLoader
                  color={"#ffffff"}
                  loading={loading}
                  cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <>
                <div
                  style={{
                    backgroundImage: `url(${data?.urlImage})`,
                    backgroundPosition: "top center",
                    width: "100%",
                    height: 300,
                    backgroundSize: `100% 300px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                  >
                    {data?.title}
                  </Typography>
                </div>
                <div>
                  <button
                    style={{
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "black",
                      width: 150,
                      height: 42,
                      borderRadius: 5,
                      fontWeight: "bold",
                      margin: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => handleRedirect(data?.id)}
                  >
                    <PlayArrowIcon />
                    Reproducir
                  </button>
                </div>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  style={{ padding: 10 }}
                >
                  <div>
                    <p>
                      {data?.year} - {data?.duration} minutos
                    </p>
                  </div>
                  <h4>{data?.description}</h4>
                  <p>Director: {data?.director}</p>
                  <p>Escritor: {data?.writer}</p>
                  <p>Cast: {data?.cast}</p>
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}
