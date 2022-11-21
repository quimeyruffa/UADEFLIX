import React from "react";
import { CardPlanes } from "../components";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const Plan = ({ item, index, color, setUserPlanes, userPlanes, showUserPlans, Delete, setDelete }) => {
  const [add, setAdd] = React.useState(showUserPlans);
 
  const handleAddPlan = () => {
    if(!showUserPlans){
      if (add) {
        const result = userPlanes.filter((id) => id !== item.id);
        setUserPlanes(result);
      } else {
        userPlanes.push(item.id);
        setUserPlanes(userPlanes);
      }
      setAdd(!add);
    }else{
      if (!add) {
        
        const result = Delete.filter((id) => id !== item.id);
        setDelete(result);
      } else {
        Delete.push(item.id);
        setDelete(Delete);
      }
      setAdd(!add);
    }
  };
  return (
    <CardPlanes
      key={index}
      style={{
        background: color,
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
      >
        {add ? (
            <CheckBoxIcon onClick={handleAddPlan} />
          ) : (
            <IndeterminateCheckBoxIcon onClick={handleAddPlan} />
          )}
      </div>
      <h2 style={{ margin: 0 }}>{item.nombre}</h2>
      <span>${item?.precio}</span>
      <span style={{ fontSize: 12 }}>{item?.descripcion}</span>
    </CardPlanes>
  );
};

export default Plan;
