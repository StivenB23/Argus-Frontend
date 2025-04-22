export interface role {
  id?: number;
  name?: string;
  status?: string;
}

export type roleViewSelect = Pick<role, "id" | "name">;
