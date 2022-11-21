import React from "react";
import Carrousels from "../components/Carrousel/Carrousel";
import { Input } from "../components/components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
const MoviePage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = useState("Search...");
  const [name, setName] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    let users = localStorage.getItem("user");
    setName(JSON.parse(users));
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 5,
          backgroundColor: "#133345",
        }}
      >
        <h2 style={{color:'white', paddingLeft:30, fontWeight:'lighter', fontSize:25}}>UADEFLIX</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            type="text"
            style={{
              width: 400,
              background: "white",
              borderRadius: "30px 0px 0px 30px",
              color: "black",
              padding: 5,
              border: "none",
              height: 40,
              margin: 0,
              paddingLeft: 10,
            }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <SearchIcon
            style={{
              height: 40,
              width: 40,
              color: "#133345",
              cursor: "pointer",
              backgroundColor: "white",
              padding: 5,
              borderRadius: "0px 30px 30px 0px",
            }}
          />
        </div>

        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon
              style={{ height: 40, width: 40, color: "white" }}
            />
          </Button>
            <span style={{color: "white", margin:10}}>{name?.nombre} {name?.apellido}</span>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Ver Planes</MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </div>
      </div>



      <Carrousels />
    </div>
  );
};

export default MoviePage;
