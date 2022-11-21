import React from "react";
import { Card, Center, CenterContainer } from "../components/components";
import Planes from "./Planes";


const HandlePlans = () => {
  const [userPlans, setUserPlans] = React.useState(true);

  const handlePage = (value) => {
      setUserPlans(value);
  };

  return (
    <Center>
      <Card>
        <div style={{ width: "100%" }}>
          <h1 style={{ fontSize: "50px", marginLeft: "60px" }}>
            Planes Disponibles
          </h1>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <button onClick={() => handlePage(true)}>Editar Tus Planes</button>
          <button onClick={() => handlePage(false)}> Agregar Planes</button>
        </div>
        <CenterContainer>
          
            <Planes button={"Save"} filter={true} showUserPlans={userPlans} />
          
        </CenterContainer>
      </Card>
    </Center>
  );
};

export default HandlePlans;
