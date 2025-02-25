import React from "react";
import "./Login.css";

import LogoArgus from "@assets/img/Argus-Logo.svg";

export type LoginProps = {};

const Login: React.FC<LoginProps> = ({}) => {
  return (
    <section className="login">
      <article className="login__form">
        <form action="">
          <div className="form__header">
            <img src={LogoArgus} alt="" />
          </div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="" id="password" />
          <button type="button">Ingresar</button>
        </form>
      </article>
      <article className="login--banner">
        <img src="" alt="" />
      </article>
    </section>
  );
};

export default Login;
