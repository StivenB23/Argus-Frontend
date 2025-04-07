import React from "react";
import "./Login.css";

import LogoArgus from "@assets/img/Argus-Logo.svg";
import { useAuth } from "../../hook/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";

export type LoginProps = {};

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = ({}) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await login(data.email, data.password);
    console.log(response?.access_token);
    
  };

  console.log(watch("email"));

  return (
    <section className="login">
      <article className="login__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__header">
            <img src={LogoArgus} alt="" />
          </div>
          <label htmlFor="email">Email</label>
          {errors.email?.message && <span>{errors.email.message}</span>}
          <input
            type="text"
            id="email"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          <label htmlFor="password">Contraseña</label>
          {errors.password?.message && <span>{errors.password.message}</span>}
          <input
            type="password"
            id="password"
            {...register("password", { required: "Este campo es obligatorio" })}
          />
          <button type="submit">Ingresar</button>
        </form>
      </article>
      <article className="login--banner">
        <img src="" alt="" />
      </article>
    </section>
  );
};

export default Login;
