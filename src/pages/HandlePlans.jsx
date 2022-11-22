import React from "react";
import { Card, Center, CenterContainer } from "../components/components";
import Planes from "./Planes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HandlePlans = () => {
  const [userPlans, setUserPlans] = React.useState(true);
const [tab, setTab] = React.useState(1)
  const handlePage = (value) => {
    setUserPlans(value);
  };

  return (
    <Center>
      <Card>
        <p
          style={{
            paddingTop: 2,
            paddingLeft: 5,
            alignItems: "center",
            display: "flex",
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/moviePage")}
        >
          {" "}
          <ArrowBackIcon />
          Volver
        </p>
        <div style={{ width: "100%" }}>
          <h1
            style={{
              fontSize: "40px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Planes Disponibles
          </h1>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
                setTab(1)
                handlePage(true)}}
            style={{
              backgroundColor:"transparent",
              cursor: "pointer",
              color:  tab == 1? "white" : 'gray' ,
              fontSize: 20,
              border: "none",
              borderBottom: "1px solid white",
              marginRight: "15px"
            }}
          >
            Editar Tus Planes
          </button>
          <button
            onClick={() => {
                setTab(2)
                handlePage(false)}}
            style={{
              backgroundColor: "transparent",
              cursor: "pointer",
              color:  tab == 2? "white" : 'gray' ,
              fontSize: 20,
              border: "none",
              borderBottom: "1px solid white",
            }}
          >
            {" "}
            Agregar Planes
          </button>
        </div>
        <CenterContainer>
          <Planes
            button={"Save"}
            filter={true}
            showUserPlans={userPlans}
            move={false}
          />
        </CenterContainer>
      </Card>
    </Center>
  );
};

export default HandlePlans;
