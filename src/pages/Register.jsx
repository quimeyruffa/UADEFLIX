import React from "react";
import {
  ButtonSigned,
  Card,
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
import Planes from "./Planes";
import jwt from 'jsonwebtoken';
const steps = ["", ""];

const Register = () => {
  const [step, setStep] = React.useState(0);

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
  const [number, setNumber] = React.useState();
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


  const handleLoginUser = async () => {
    if (valid && validEmail) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: inputValue,
          tenant: "Web_Mobile",
        }),
      };
      await fetch("https://ssog2.herokuapp.com/auth/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            requireToken(data.token);
          } else {
            alert("El usuario no existe.");
          }
        });
    }
  };

  const requireToken = (t) => {
    const decoded = jwt.decode(t, process.env.REACT_APP_JWT_PUBLIC_CLIENT, { algorithm: ['RS256'] });
    if (!decoded) {
      alert(
        "El token con el que intentaste ingresar no es válido, probá logeándote"
      );
    } else {
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(decoded));
    }
  };
  const handleStep = () => {
    if (name && email && number && inputValue && lastname &&validName && validEmail && validNumber && valid && validLastname) {
      handleRegister()
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
            handleLoginUser()
            setStep(1);
          } else {
            alert(data.error);
          }
        });
      
    }
  };

  const handlePageRegister = () => {
    switch (step) {
      case 1:
        return (
          <CenterContainer>
            <p>2nd step - Plan Information</p>
            <Planes button={'Sign Up'} filter={false} showUserPlans={false} move={true}/>
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
