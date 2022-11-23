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
const colors = ["#F95959", "#F49D1A", "#455D7A"];
const Carrousels = ({ getDataCarrusel, content, loading, filter }) => {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState();
  let [color, setColor] = React.useState("#ffffff");

  React.useEffect(() => {
    if (!filter) {
      getDataCarrusel();
    }
  }, [filter]);

  const handleItem = (item) => {
    setItem(item);
    setOpen(true);
  };

  return (
    <>
      {loading ? (
        <div style={{ paddingTop: 250 }}>
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

          {!filter ? (
            <>
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
                          fontSize:14
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
            </>
          ) : (
            <>
                <Carousel responsive={responsive} key={'carousel-search'}>
              {content.map((items, index) => (
                  <div
                    style={{
                      backgroundImage: `url(${items.urlImage})`,
                      backgroundPosition: "top center",
                      backgroundSize: `497px 200px`,
                      height: 200,
                      width: 477,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#06283D",
                      cursor: "pointer",
                      fontSize:14
                    }}
                    key={index}
                    onClick={() => handleItem(items)}
                  >
                    <h3>{items.title}</h3>
                  </div>
              ))}
              </Carousel>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Carrousels;
