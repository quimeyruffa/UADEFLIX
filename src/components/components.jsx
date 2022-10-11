import styled from "styled-components";
const Center = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const P = styled.p`
  color: red;
  width: 400px;
  margin: 0px;
`;
const CenterContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  width: 556px;
  height: 758px;
  background: #133345;
  flex-direction: column;
  display: flex;
`;
const Input = styled.input`
  height: 36px;
  width: 400px;
  font-size: 20px;
  border: none;
  background: #585555;
  padding: 0.5em;
  margin: 1em;
  color: white;
  &::placeholder {
    color: white;
  }
  ,
  &:focus {
    outline: none;
  }
`;
const Navbar = styled.div`
  width: 90vw;
  position: absolute;
  top: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a {
    text-decoration: none;
    color: white;
    margin: 30px 20px;
  }
  a.login {
    margin-left: 60px;
  }
`;
const Img = styled.img`
  width: 40vw;
  height: 90vh;
  position: absolute;
  right: 0;
  bottom: 0;
`;
const WelcomeMsg = styled.div`
  width: 55vw;
  height: 90vh;
  position: absolute;
  left: 0;
  bottom: 0;
  justify-content: flex-end;
  padding-left: 50px;
  h1 {
    font-size: 75px;
    color: white;
    padding-top: 10vh;
  }
  p {
    color: #ffffff;
    font-size: 25px;
    text-transform: uppercase;
    font-weight: lighter;
  }
  button {
    background: #133345;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    width: 250px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    margin-left: calc(50% - 250px);
  }
`;

const ButtonSigned = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 400px;
  border: none;
  color: white;
  background: #5086a5;
  font-size: 20px;
`;

const CardPlanes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 108px;
  width: 420px;
  margin: 10px;
  border: none;
  color: white;
  padding:0.5em;
  font-size: 20px;
`;

export {
  Navbar,
  Img,
  WelcomeMsg,
  Center,
  Card,
  Input,
  P,
  CenterContainer,
  ButtonSigned,
  CardPlanes,
};
