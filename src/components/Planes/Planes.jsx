import React from "react";

const Planes = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", paddingTop:100, width:'100%', justifyContent: 'center'}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin:10,
          background:'white',
          borderRadius:5,
          height:600,
          width:500
        }}
      >
        <h2 style={{height:150}}>$1000</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop:'10px',
            background:'#002E94',
            height:750
          }}
        >
          <p>Estándar</p>
          <span>
            Con este paquete podrás visualizar 5 peliculas del listado premium
            en solamente una pantalla.
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin:10,
          background:'white',
          borderRadius:5,
          height:600,
          width:500
        }}
      >
        <h2 style={{height:150}}>$2000</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop:'10px',
            background:'#0A81AB',
            height:750
          }}
        >
          <p>Platinum</p>
          <span>
            Podrás visualizar todas las películas disponibles en la plataforma.
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin:10,
          background:'white',
          borderRadius:5,
          height:600,
          width:500
        }}
      >
        <h2 style={{height:150}}>$1500</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop:'10px',
            background:'#083AA9',
            height:750
          }}
        >
          <p>Gold</p>
          <span>
            Podrás disfrutas de 10 peliculas premium en mas de 2 pantallas.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Planes;
