import React from "react";
import {
  Card,
  CardPlanes,
  Center,
  CenterContainer,
} from "../components/components";
const color = ["#F95959", "#F49D1A", "#455D7A"];

const MuestraPlanes = () => {
  const [planes, setPlanes] = React.useState([]);
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
      <Card style={{height:600, display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center',}}>
        <CenterContainer>
          {planes?.map((item, index) => (
            <CardPlanes
              key={index}
              style={{
                background:
                  color[index > color.length ? color.length - 1 : index],
              }}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: 5,
                  display: "flex",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
              ></div>
             <h2 style={{ margin: 0, display:"flex", alignItems:'center'}}> <img alt="." src={item?.full_image_path} style={{width:30, height:30}}/> {item.nombre}</h2>
              <span>${item?.precio}</span>
              <span style={{ fontSize: 12 }}>{item?.descripcion}</span>
            </CardPlanes>
          ))}
        </CenterContainer>
      </Card>
    </Center>
  );
};

export default MuestraPlanes;
