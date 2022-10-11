import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BasicModal from "./Modal";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
  
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 7, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 7, // optional, default to 1.
  },
};
const Carrousels = () => {
  const [content, setCarrousel] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState();
  let [loading, setLoading] = React.useState(true);
  let [color, setColor] = React.useState("#ffffff");

  React.useEffect(() => {
    getData();
    getDataCarrusel();
  }, []);
  const getData = async () => {
    await fetch("https://uade-ia-cms.herokuapp.com/api/contenidos").then(
      (res) => res.json()
    );
  };

  const getDataCarrusel = async () => {
    await fetch("https://uade-ia-cms.herokuapp.com/api/carruseles")
      .then((res) => res.json())
      .then((res) => {
        setCarrousel(res.results);
        setLoading(false);
      });
  };

  const handleItem = (item) => {
    setItem(item);
    setOpen(true);
  };

  const colors = ["#FF884B", "#5F9DF7", "#1746A2", "#FFF7E9"];
  return (
    <>
      {loading ? (
        <div style={{paddingTop:250}}>

            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        </div>
      ) : (
        <div style={{ marginTop: 40 }}>
          {item ? <BasicModal item={item} open={open} setOpen={setOpen} /> : ""}
          {content.map((items, index) => (
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
                {items.contenidos.map((item, index) => (
                  <div
                    style={{
                      background: colors[index],
                      height: 200,
                      width: 497,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#06283D",
                    }}
                    key={index}
                    onClick={() => handleItem(item)}
                  >
                    <h3>{item.title}</h3>
                  </div>
                ))}
              </Carousel>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Carrousels;
