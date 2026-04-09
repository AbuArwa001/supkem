import api from "@/lib/api";
import { RegisterFormData } from "./types";

export async function registerUserApi(data: RegisterFormData): Promise<void> {
  await api.post("/users/users/", data);
}
