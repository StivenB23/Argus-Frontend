// import { userIdentityCardTemplate } from "@services/models/user.model";
import { blobToBase64 } from "../../utils/fileUtils";
import { getTemplatesBackgroundService } from "../template.service";
import {
  getUserByIdTemplateService,
  getUserPhotoService,
} from "../UserService";
import { GenerateCarneBuilder } from "./generateCarne";

export const generateCard = async (id: number) => {
  const data = await getUserByIdTemplateService(id);
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
      position_y: data.identity_card.template.photo_y,
      width: data.identity_card.template.photo_width,
      height: data.identity_card.template.photo_height,
    })
    .setCode({
      value: data.identity_card.uuid,
      type: data.identity_card.template.code_type || "",
      position_x: data.identity_card.template.code_type_x || 0,
      position_y: data.identity_card.template.code_type_y || 0,
    })
    .setLabels(JSON.parse(data.identity_card.template.labels || ""))
    .setUserData({
      first_name: data.first_name,
      last_name: data.last_name,
      document: data.document_number,
      TD: data.document_type,
    })
    .buildAndSave(`${data.document_number}.pdf`);
};
