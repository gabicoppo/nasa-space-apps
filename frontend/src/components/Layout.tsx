import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      {/* As camadas do background vivem aqui */}
      <div className="stars" aria-hidden="true" />
      <div className="twinkling" aria-hidden="true" />
      <div className="planet-earth" aria-hidden="true" />

      {/* Renderiza o conteúdo da página atual (HomePage, TelaInicial, etc.) */}
      <Outlet />
    </>
  );
};

export default Layout;