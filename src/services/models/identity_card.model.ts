import { TemplateCreate } from "./template.model";

export type identity = {
    uuid: string;
    status: string;
    issue_date: string; 
};

export type identityCardTemplate = identity & {
    template:TemplateCreate
};
