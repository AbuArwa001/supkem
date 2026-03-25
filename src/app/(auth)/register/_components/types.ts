export interface RegisterFormData {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password?: string;
}

export type FieldErrors = Partial<Record<keyof RegisterFormData, string>>;
