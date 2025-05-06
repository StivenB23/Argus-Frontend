export interface Template {
  id?: number;
  template_name: string;
  unit: string;
  width: number;
  labels?: string;
  height: number;
  photo_width: number;
  photo_height: number;
  photo_x: number;
  photo_y: number;
  background: string;
  code_type?: string | null;
  code_type_y?: number;
  code_type_x?: number;
}

export type TemplateViewSelect = Pick<Template, "id" | "template_name">;

export type TemplateCreate = Omit<Template, "id">;

