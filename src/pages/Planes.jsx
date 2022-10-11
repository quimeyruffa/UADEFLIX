import React from "react";
import {
  Card,
  CardPlanes,
  Center,
  CenterContainer,
} from "../components/components";

const Planes = () => {
  const [planes, setPlanes] = React.useState();

  React.useEffect(() => {
    handleGetPlans();
  }, []);
  const handleGetPlans = async () => {
    await fetch("https://intap-backoffice.herokuapp.com/public/api/paquetes")
      .then((response) => response.json())
      .then((data) => {
        setPlanes(data);
      });
  };
  return (
    <Center>
      <Card style={{ height: "568px" }}>
        <CenterContainer>
          <h1>Plan Information</h1>
          {planes && (
            <>
              <CardPlanes style={{ background: "#F95959" }}>
                <h2 style={{ margin: 0 }}>{planes[0].nombre}</h2>
                <span>${planes[0]?.precio}</span>
                <span style={{ fontSize: 12 }}>{planes[0].descripcion}</span>
              </CardPlanes>
              <CardPlanes style={{ background: "#FACF5A", color: "black" }}>
                <h2 style={{ margin: 0 }}>{planes[1].nombre}</h2>
                <span>${planes[1].precio}</span>
                <span style={{ fontSize: 12 }}>{planes[1].descripcion}</span>
              </CardPlanes>
              <CardPlanes style={{ background: "#455D7A" }}>
                <h2 style={{ margin: 0 }}>{planes[2].nombre}</h2>
                <span>${planes[2].precio}</span>
                <span style={{ fontSize: 12 }}>{planes[2].descripcion}</span>
              </CardPlanes>
            </>
          )}
        </CenterContainer>
      </Card>
    </Center>
  );
};

export default Planes;
