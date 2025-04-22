import { identityCardTemplate } from "./identity_card.model";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  document_type: string;
  document_number: string;
  role: string;
  photo: string;
};

export type userIdentityCardTemplate = User & {
  identity_card: identityCardTemplate;
};
