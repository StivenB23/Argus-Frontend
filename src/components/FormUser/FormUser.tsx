"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './FormUser.css';
import { getRoles } from '../../services/role.service';

export type FormUserProps = {};

type FormValues = {
    nombre: string;
    apellido: string;
    correo: string;
    tipo_documento: string;
    num_documento: string;
    clave: string;
    rol_id: number;
};

type Rol = {
    id: number;
    nombre: string;
};

const FormUser: React.FC<FormUserProps> = () => {

	const [roles, setroles] = useState<Rol[]>()

	useEffect(() => {
	  const getData = async () =>{
		try {
		const response = await getRoles();
		setroles(response);
		} catch (error) {
			
		}
	  }
	  getData()
	}, [])
	

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    
    const onSubmit = (data: FormValues) => {
        console.log(data);
    };
    
    return (
        <div className='formuser'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Nombre:</label>
                <input {...register("nombre", { required: true })} />
                {errors.nombre && <span>Este campo es obligatorio</span>}

                <label>Apellido:</label>
                <input {...register("apellido", { required: true, minLength: 2, maxLength: 255 })} />
                {errors.apellido && <span>Debe tener entre 2 y 255 caracteres</span>}

                <label>Correo:</label>
                <input type="email" {...register("correo", { required: true })} />
                {errors.correo && <span>Ingrese un correo válido</span>}

                <label>Tipo de Documento:</label>
                <select {...register("tipo_documento", { required: true })}>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="CE">Cédula de Extranjería</option>
                </select>
                {errors.tipo_documento && <span>Seleccione un tipo de documento</span>}

                <label>Número de Documento:</label>
                <input {...register("num_documento", { required: true, minLength: 5, maxLength: 20 })} />
                {errors.num_documento && <span>Debe tener entre 5 y 20 caracteres</span>}

                <label>Contraseña:</label>
                <input type="password" {...register("clave", { required: true, minLength: 8, maxLength: 255 })} />
                {errors.clave && <span>Debe tener al menos 8 caracteres</span>}

                <label>Rol:</label>
                <select {...register("rol_id", { required: true })}>
					{roles?.map((role)=>(<option value={role?.id}>{role?.nombre}</option>))}
                </select>
                {errors.rol_id && <span>Seleccione un rol</span>}

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default FormUser;
