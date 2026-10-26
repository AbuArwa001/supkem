import { RegisterFormData, FieldErrors } from "./types";

export function validateRegisterForm(formData: RegisterFormData): FieldErrors {
  const newErrors: FieldErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.first_name.trim()) {
    newErrors.first_name = "First name is required.";
  } else if (formData.first_name.length < 2) {
    newErrors.first_name = "First name must be at least 2 characters.";
  }

  if (!formData.last_name.trim()) {
    newErrors.last_name = "Last name is required.";
  } else if (formData.last_name.length < 2) {
    newErrors.last_name = "Last name must be at least 2 characters.";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email address is required.";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Please enter a valid email format.";
  }

  if (!formData.phone_number.trim()) {
    newErrors.phone_number = "Phone number is required.";
  }

  if (!formData.location.trim()) {
    newErrors.location = "Please select your county / region.";
  }

  if (!formData.password) {
    newErrors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters.";
  }

  if (formData.password !== formData.confirm_password) {
    newErrors.confirm_password = "Passwords do not match.";
  }

  return newErrors;
}
