import React from "react";
import { ButtonSigned } from "../components/components";
import Plan from "../components/Planes/Plan";
import ClipLoader from "react-spinners/ClipLoader";
import SnackBarAlert from "../components/SnackBarAlert";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
const color = ["#F95959", "#F49D1A", "#455D7A"];
const Planes = ({ button, filter, showUserPlans, move }) => {
  const [planes, setPlanes] = React.useState();
  const [userPlanes, setUserPlanes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [Delete, setDelete] = React.useState([]);
  const [text, setText] = React.useState("");
  const [state, setState] = React.useState({
    open: false,
  });
  const { open } = state;

  const handleShowData = () => {
    setState({ open: true });
    setTimeout(function () {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setState({ open: false });
  };
  React.useEffect(() => {
    handleGetPlans();
  }, [showUserPlans]);
  const handleGetPlans = async () => {
    setLoading(true);
    await fetch("https://intap-backoffice.herokuapp.com/public/api/paquetes")
      .then((response) => response.json())
      .then((data) => {
        setPlanes(data);
        if (filter) {
          handleGetPlansUser(data);
        } else {
          setLoading(false);
        }
      });
  };
  const handleSubscribePlans = async () => {
    let token = localStorage.getItem("token");

    if (userPlanes.length > 1) {
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        paquetes_ids: userPlanes,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://intap-suscripciones.herokuapp.com/public/api/suscribirseMultiple",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setUserPlanes([]);
      handleGetPlans();
      if (move) {
        window.location.href = "/moviePage";
      }
    } else if (userPlanes.length == 1) {
      const requestOptions2 = {
        method: "POST",
        headers: { token: token },
      };
      await fetch(
        `https://intap-suscripciones.herokuapp.com/public/api/suscribirse/${userPlanes[0]}`,
        requestOptions2
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setUserPlanes([]);
      handleGetPlans();
      if (move) {
        window.location.href = "/moviePage";
      }
    } else {
      setText("Elige un plan para continuar");
      handleShowData();
    }
  };

  const handleGetPlansUser = async (array) => {
    let token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: { token: token },
    };
    if (token) {
      await fetch(
        "https://intap-suscripciones.herokuapp.com/public/api/paquetesDelUsuario",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (!showUserPlans) {
            const r = array.filter(
              (elem) => !data?.paquetes.find(({ id }) => elem.id === id)
            );
            setPlanes(r);
          } else {
            const r = array.filter((elem) =>
              data?.paquetes.find(({ id }) => elem.id === id)
            );
            setPlanes(r);
          }
        });
      setLoading(false);
    }
  };

  const handleDeletePlan = async () => {
    let token = localStorage.getItem("token");
    if (Delete.length > 1 && planes.length !== Delete.length) {
      console.log(Delete);
      var myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        paquetes_ids: Delete,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://intap-suscripciones.herokuapp.com/public/api/desuscribirseMultiple",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      setDelete([]);
      handleGetPlans();
    } else if (Delete.length == 1 && planes.length !== 1) {
      const requestOptions = {
        method: "POST",
        headers: { token: token },
      };
      await fetch(
        `https://intap-suscripciones.herokuapp.com/public/api/desuscribirse/${Delete[0]}`,
        requestOptions
      ).then((response) => {
        console.log(response.json());
        setDelete([]);
        handleGetPlans();
      });
    } else if (planes.length === Delete.length) {
      setDelete([]);
      setText("Debe tener al menos un plan activo para usar la plataforma");
      handleShowData();
    }
  };
  return (
    <>
      <SnackBarAlert text={text} open={open} handleClose={handleClose} />
      {loading ? (
        <div style={{ paddingTop: 250 }}>
          <ClipLoader
            color={"#ffffff"}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : planes ? (
        <>
          {planes.map((item, index) => (
            <Plan
              item={item}
              index={index}
              color={color[index > color.length ? color.length - 1 : index]}
              setUserPlanes={setUserPlanes}
              userPlanes={userPlanes}
              showUserPlans={showUserPlans}
              Delete={Delete}
              setDelete={setDelete}
            />
          ))}
          <ButtonSigned
            style={{ width: "420px", marginTop: 40, cursor: "pointer" }}
            onClick={() => {
              if (showUserPlans) {
                handleDeletePlan();
              } else {
                handleSubscribePlans();
              }
            }}
          >
            {button}
          </ButtonSigned>
        </>
      ) : null}
    </>
  );
};

export default Planes;
