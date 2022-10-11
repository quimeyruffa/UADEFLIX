import React from "react";
import {
  ButtonSigned,
  Card,
  CardPlanes,
  Center,
  CenterContainer,
  Input,
  P,
} from "../components/components";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const steps = ["", ""];

const Register = () => {
  const [step, setStep] = React.useState(0);
  const [planes, setPlanes] = React.useState([]);

  //   name
  let reg = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [validName, setValidName] = React.useState(true);
  const [validLastname, setValidLastname] = React.useState(true);

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onChangeLastName(e) {
    setLastname(e.target.value);
  }

  const validateName = () => {
    if (!reg.test(name)) {
      setValidName(false);
    } else {
      setValidName(true);
    }
    return validName;
  };

  const validateLastName = () => {
    if (!reg.test(lastname)) {
      setValidLastname(false);
    } else {
      setValidLastname(true);
    }
    return validLastname;
  };

  //   Email & Number
  const [number, setNumber] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [validNumber, setValidNumber] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  const validateEmail = () => {
    if (!regex.test(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    return validEmail;
  };

  function onChangeNumber(e) {
    setNumber(e.target.value);
  }
  const validateNumber = () => {
    if (number.length < 10) {
      setValidNumber(false);
    } else {
      setValidNumber(true);
    }
    return validNumber;
  };

  //   Password
  const [valid, setValid] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const isValidPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  const validatePassword = () => {
    if (!isValidPasswordRegex.test(inputValue)) {
      setValid(false);
    } else {
      setValid(true);
    }
    return valid;
  };

  function onChange(e) {
    setInputValue(e.target.value);
  }

  React.useEffect(() => {
    handleGetPlans();
  }, []);
  const handleGetPlans = async () => {
    await fetch("http://intap-backoffice.herokuapp.com/public/api/paquetes")
      .then((response) => response.json())
      .then((data) => {
        setPlanes(data);
      });
  };

  const handleStep = () => {
    if (name && email && number && inputValue && lastname) {
      setStep(1);
    } else {
      alert("completa los campos");
    }
  };
  const handleRegister = async () => {
    if (validName && validEmail && validNumber && valid && validLastname) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: inputValue,
          telefono: number,
          tenant: "Web_Mobile",
          nombre: name,
          apellido: lastname,
          admin: false,
        }),
      };
      fetch("https://ssog2.herokuapp.com/auth/register", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "User Created") {
            window.location.href ='/login'
        }else{
            alert(data.error)
        }
        });
      // 
    }
  };

  const handlePageRegister = () => {
    switch (step) {
      case 1:
        return (
          <CenterContainer>
            <p>2nd step - Plan Information</p>
            <CardPlanes style={{ background: "#F95959" }}>
              <h2 style={{ margin: 0 }}>{planes[0].nombre}</h2>
              <span>${planes[0].precio}</span>
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

            <ButtonSigned
              style={{ width: "420px", marginTop: 40 }}
              onClick={handleRegister}
            >
              Sign Up{" "}
            </ButtonSigned>
          </CenterContainer>
        );
      default:
        return (
          <CenterContainer>
            <p>1st step - Personal Information</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ height: "90px" }}>
                <Input
                  type="text"
                  placeholder="Name"
                  style={{ width: "170px" }}
                  value={name}
                  onChange={onChangeName}
                  onBlur={validateName}
                />
                {!validName && (
                  <P
                    style={{
                      position: "relative",
                      color: "#F05454",
                      fontSize: "12px",
                      top: "-16px",
                      left: "20px",
                      width: "170px",
                    }}
                  >
                    Invalid name
                  </P>
                )}
              </div>
              <div style={{ height: "90px" }}>
                <Input
                  type="text"
                  placeholder="Last Name"
                  style={{ width: "170px" }}
                  value={lastname}
                  onChange={onChangeLastName}
                  onBlur={validateLastName}
                />
                {!validLastname && (
                  <P
                    style={{
                      position: "relative",
                      color: "#F05454",
                      fontSize: "12px",
                      top: "-16px",
                      left: "20px",
                      width: "170px",
                    }}
                  >
                    Invalid last name
                  </P>
                )}
              </div>
            </div>
            <div style={{ height: "90px" }}>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={onChangeEmail}
                onBlur={validateEmail}
              />
              {!validEmail && (
                <P
                  style={{
                    position: "relative",
                    color: "#F05454",
                    fontSize: "12px",
                    top: "-16px",
                    left: "20px",
                  }}
                >
                  Invalid email
                </P>
              )}
            </div>
            <div style={{ height: "90px" }}>
              <Input
                type="number"
                placeholder="Phone"
                value={number}
                onChange={onChangeNumber}
                onBlur={validateNumber}
              />
              {!validNumber && (
                <P
                  style={{
                    position: "relative",
                    color: "#F05454",
                    fontSize: "12px",
                    top: "-16px",
                    left: "20px",
                  }}
                >
                  Invalid phone number
                </P>
              )}
            </div>

            <div style={{ height: "90px" }}>
              <Input
                type="password"
                placeholder="Password"
                value={inputValue}
                onChange={onChange}
                onBlur={validatePassword}
              />
              {!valid && (
                <P
                  style={{
                    color: "#F05454",
                    position: "relative",
                    fontSize: "12px",
                    top: "-16px",
                    left: "20px",
                  }}
                >
                  Minimum eight characters, at least one uppercase letter, one
                  lowercase letter, one number and one special character
                </P>
              )}
            </div>
            <ButtonSigned
              style={{ width: "420px", marginTop: 50, cursor: "pointer" }}
              onClick={handleStep}
            >
              Step 2 <ArrowForwardIcon />
            </ButtonSigned>
          </CenterContainer>
        );
    }
  };
  return (
    <Center>
      <Card>
        <div style={{ width: "100%" }}>
          <h1 style={{ fontSize: "50px", marginLeft: "60px" }}>Sign Up</h1>
        </div>

        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handlePageRegister()}
        </Box>
      </Card>
    </Center>
  );
};

export default Register;
