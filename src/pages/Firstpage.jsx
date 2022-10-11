import React from "react";
import { Img,WelcomeMsg } from "../components/components";
import Planes from "../components/Planes/Planes";
import ImgUrl from "../img/portada.png";

const Firstpage = () => {
  const [page, setPage] = React.useState(0);
  

 

  const handleShowData = () => {
    switch (page) {
      case 1:
        return <Planes />;
      default:
        return (
          <>
            <Img src={ImgUrl} alt="portada" />
            <div>
              <WelcomeMsg>
                <h1>Watch best exclusive movies, TV series and TV shows</h1>
                <p>
                  Smart TVs,Playstation,Xbox,Chromecast, Apple TV,Blu-ray
                  players and more.
                </p>
                <button onClick={""}>Ver Planes</button>
              </WelcomeMsg>
            </div>
          </>
        );
    }
  };

  return (
    <div>
      {handleShowData()}
    </div>
  );
};

export default Firstpage;