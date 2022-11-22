import React from "react";
import BasicModal from "../components/Carrousel/Modal";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
    slidesToSlide: 7, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 7, // optional, default to 1.
  },
};
const Recomendations = () => {
  const navigate = useNavigate();
  const [content, setContent] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState();
  const [pelicula, setPelicula] = React.useState();
  const handleItem = (item) => {
    setItem(item);
    setOpen(true);
  };
  React.useEffect(() => {
    let peli = JSON.parse(localStorage.getItem("pelicula"));
    setPelicula(peli);
    handleChange();
  }, []);
  const handleChange = async () => {
    await fetch(`https://uadeflix-cms.up.railway.app/api/carruseles/5`)
      .then((res) => res.json())
      .then((res) => {
        setContent([res]);
      });
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <p
          onClick={() => {
            navigate("/moviePage");
          }}
          style={{
            color: "white",
            fontSize: "20px",
            padding: 10,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowBackIcon />
          Volver al inicio{" "}
        </p>
        {item ? <BasicModal item={item} open={open} setOpen={setOpen} /> : ""}
        <>
          <h2
            style={{
              color: "white",
              margin: 15,
              paddingLeft: 5,
              fontWeight: "lighter",
            }}
          >
            Volver a ver
          </h2>
          <Carousel responsive={responsive} key={"volverAverCarrousel"}>
            <div
              style={{
                backgroundImage: `url(${pelicula?.urlImage})`,
                backgroundPosition: "top center",
                backgroundSize: `497px 200px`,
                height: 200,
                width: 477,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#06283D",
                cursor: "pointer",
                fontSize: 14,
              }}
              key={"peliculaSave"}
              onClick={() => handleItem(pelicula)}
            >
              <h3>{pelicula?.title}</h3>
            </div>
          </Carousel>
        </>
        {content?.map((items, index) => (
          <>
            <h2
              style={{
                color: "white",
                margin: 15,
                paddingLeft: 5,
                fontWeight: "lighter",
              }}
            >
              {items.title}
            </h2>
            <Carousel responsive={responsive} key={index}>
              {items?.contents?.map((item, index) => (
                <div
                  style={{
                    backgroundImage: `url(${item.urlImage})`,
                    backgroundPosition: "top center",
                    backgroundSize: `497px 200px`,
                    height: 200,
                    width: 477,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#06283D",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                  key={index}
                  onClick={() => handleItem(item)}
                >
                  <h3>{item.title}</h3>
                </div>
              ))}
            </Carousel>
          </>
        ))}{" "}
      </div>
    </>
  );
};

export default Recomendations;
