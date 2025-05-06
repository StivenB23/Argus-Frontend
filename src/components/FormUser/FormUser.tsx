import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./FormUser.css";
import { getRoles } from "../../services/role.service";
import {
  createUser,
  getUserByIdTemplateService,
  getUserPhotoService,
} from "../../services/UserService";
import { WebCam } from "../WebCam";
import { WebCamHandle } from "../WebCam/WebCam";
import { base64ToBlob, blobToBase64 } from "../../utils/fileUtils";
import {
  getTemplatesBackgroundService,
  getTemplatesService,
} from "../../services/template.service";
import { GenerateCarneBuilder } from "../../services/carne_manage/generateCarne";
import { TemplateViewSelect } from "../../services/models/template.model";
import { roleViewSelect } from "../../services/models/role.model";

export type FormUserProps = {};

export type FormValues = {
  first_name: string;
  position: string;
  last_name: string;
  email: string;
  document_type: string;
  template_id: number;
  document_number: string;
  password: string;
  photo: string;
  role_id: number;
};

const FormUser: React.FC<FormUserProps> = () => {
  const [roles, setRoles] = useState<roleViewSelect[]>();
  const [templates, setTemplates] = useState<TemplateViewSelect[]>();
  const [previewPhoto, setPreviewPhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");
  const webcamRef = useRef<WebCamHandle>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getRoles();
        const responseTemplates = await getTemplatesService();
        setRoles(response);
        setTemplates(responseTemplates);
      } catch (error) {}
    };
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (photo == "") {
      throw new Error("Photo is missing");
    }
    const photoBlob = base64ToBlob(photo, "image/jpeg");
    const file = new File([photoBlob], "photo.jpg", { type: "image/jpeg" });
    data.photo = "";
    await createUser(data, file);
  };

  const handleCapture = (image: string) => {
    setPhoto(image);
  };

  const capture = () => {
    webcamRef.current?.capture();
    setPreviewPhoto(true);
  };

  const resetCapture = () => {
    setPreviewPhoto(false);
  };

  const generateCard = async () => {
    const data = await getUserByIdTemplateService();
    console.log(data);

    const backgroundTemplate = await getTemplatesBackgroundService(
      data?.identity_card?.template?.background
    );
    const photoUser = await getUserPhotoService(data.photo);
    const file = await blobToBase64(backgroundTemplate);
    const urlPhoto = await blobToBase64(photoUser);
    const generateCarneBuilder = new GenerateCarneBuilder({
      height: data.identity_card.template.height,
      width: data.identity_card.template.width,
      unit: data.identity_card.template.unit,
    });

    await generateCarneBuilder
      .setBackground(file)
      .setUserImage({
        imageUrl: urlPhoto,
        position_x: data.identity_card.template.photo_x,
        position_y: data.identity_card.template.photo_x,
        width:data.identity_card.template.photo_width,
        height:data.identity_card.template.photo_height
      })
      .setCode({
        value: data.identity_card.uuid,
        position_x: data.identity_card.template.code_type_x || 0,
        position_y: data.identity_card.template.code_type_y || 0,
      })
      .buildAndSave(`${data.document_number}.pdf`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
      <div className="">
        <h2>Photo</h2>
        <div className="container-photo">
          {previewPhoto ? (
            <>
              <img src={photo} alt="" />
              <div className="">
                <button type="button" onClick={resetCapture}>
                  Resetear
                </button>
              </div>
            </>
          ) : (
            <>
              <WebCam ref={webcamRef} onCapture={handleCapture} />
              <div className="">
                <button type="button" onClick={capture}>
                  Capturar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="">
        <h2>Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Nombres:</label>
            <input {...register("first_name", { required: true })} />
            {errors.first_name && (
              <span className="error">This field is required</span>
            )}
          </div>

          <div className="form-group">
            <label>Apellidos:</label>
            <input
              {...register("last_name", {
                required: true,
                minLength: 2,
                maxLength: 255,
              })}
            />
            {errors.last_name && (
              <span className="error">
                It must have between 2 and 255 characters
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Documento:</label>
            <select {...register("document_type", { required: true })}>
              <option value="">Select...</option>
              <option value="CC">Cedula de Ciudadania</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cedula de Extranjeria</option>
              <option value="PA">Pasaporte</option>
            </select>
            {errors.document_type && (
              <span className="error">Please select a document type</span>
            )}
          </div>

          <div className="form-group">
            <label>Número Documento:</label>
            <input
              {...register("document_number", {
                required: true,
                minLength: 5,
                maxLength: 20,
              })}
            />
            {errors.document_number && (
              <span className="error">
                It must have between 5 and 20 characters
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Plantilla de Carne:</label>
            <select {...register("template_id", { required: true })}>
              <option value="">Select...</option>
              {templates?.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.template_name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <span className="error">
                Selecciona el tipo de plantilla, por favor
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Rol:</label>
            <select {...register("role_id", { required: true })}>
              <option value="">Select...</option>
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <span className="error">Please select a role</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Position:</label>
            <input
              type="text"
              {...register("position", {
                required: true,
                minLength: 8,
                maxLength: 255,
              })}
            />
            {errors.position && (
              <span className="error">It must have at least 8 characters</span>
            )}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && (
              <span className="error">Please enter a valid email</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 255,
              })}
            />
            {errors.password && (
              <span className="error">It must have at least 8 characters</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Crear Usuario</button>
          {/* <button type="button" onClick={generateCard}>
            Generar Carne
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default FormUser;
