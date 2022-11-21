import React from "react";
import { useState } from "react";
import {
  Card,
  Center,
  Input,
  P,
  CenterContainer,
  ButtonSigned,
} from "../components/components";
import jwt from 'jsonwebtoken';
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [searchParams] = useSearchParams();
  
  React.useEffect(() => {
    handleTokenParams();
  }, [searchParams]);

  const handleTokenParams = async () => {
    let token = searchParams.get('token')
    if (token) {
      await requireToken(token);
    }
  };
  const handleLoginUser = (e) => {
    e.preventDefault();
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
      fetch("https://ssog2.herokuapp.com/auth/login", requestOptions)
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

  const requireToken = async (t) => {
    const decoded = jwt.decode(t, process.env.REACT_APP_JWT_PUBLIC_CLIENT, { algorithm: ['RS256'] });
    if (!decoded) {
      alert(
        "El token con el que intentaste ingresar no es válido, probá logeándote"
      );
    } else {
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(decoded));
      window.location.href = "/moviePage";
    }
  };

  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

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
  return (
    <Center>
      <Card>
        <div style={{ width: "100%" }}>
          <h1 style={{ fontSize: "50px", marginLeft: "60px" }}>Sign In</h1>
        </div>
        <CenterContainer style={{ marginTop: 30 }}>
          <div style={{ height: "90px" }}>
            <Input
              type="email"
              placeholder="Email"
              onChange={onChangeEmail}
              onBlur={validateEmail}
              value={email}
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
              className={`${valid ? "success" : "error"}`}
              type="password"
              placeholder="Password"
              onChange={onChange}
              onBlur={validatePassword}
              value={inputValue}
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
            style={{ marginTop: 50, cursor: "pointer" }}
            onClick={handleLoginUser}
          >
            Sign In
          </ButtonSigned>
          <div style={{ width: "400px", display: "flex", padding: "0.5rem" }}>
            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" />{" "}
              Remember me
            </label>
          </div>

          <div
            style={{
              width: "400px",
              display: "flex",
              padding: "0.5rem",
              fontSize: "20px",
              marginTop: 100,
            }}
          >
            <span style={{ marginRight: 20 }}>New to UADEFLIX?</span>{" "}
            <b
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = "/register")}
            >
              {" "}
              Sign up now{" "}
            </b>
          </div>

          <div
            style={{
              width: "400px",
              display: "flex",
              padding: "0.5rem",
              fontSize: "14px",
              marginTop: 5,
              fontWeight: "lighter",
              bottom: "0px",
            }}
          >
            <span>This page is protected by Google reCaptcha. </span>{" "}
            <a style={{ color: "lightblue", marginLeft: 10 }} href="/#">
              {" "}
              Learn more.
            </a>
          </div>
        </CenterContainer>
      </Card>
    </Center>
  );
};

export default Login;
