import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUserApi } from "./services";
import { RegisterFormData, FieldErrors } from "./types";

export function useRegisterLogic() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter();

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    else if (formData.first_name.length < 2) newErrors.first_name = "First name must be at least 2 characters.";

    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
    else if (formData.last_name.length < 2) newErrors.last_name = "Last name must be at least 2 characters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    
    try {
      // Remove confirm_password before sending to API
      const { confirm_password, ...payload } = formData;
      await registerUserApi(payload);
      
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      console.error("Registration failed", err);
      
      // Handle potential field errors from backend
      if (err.response?.data && typeof err.response.data === 'object' && !err.response.data.detail) {
          const apiErrors: FieldErrors = {};
          Object.keys(err.response.data).forEach(key => {
              apiErrors[key as keyof RegisterFormData] = err.response.data[key][0] || err.response.data[key];
          });
          setFieldErrors(apiErrors);
          setError("Please correct the errors in the form.");
      } else {
          setError(
            err.response?.data?.detail ||
            "Registration failed. Please check your details and try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    error,
    fieldErrors,
    formData,
    setFormData,
    handleSubmit
  };
}
