import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { registerUserApi } from "./services";
import { RegisterFormData, FieldErrors } from "./types";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";
import { toast } from "sonner";

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
    phone_number: "",
    location: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter();

  const clearFieldError = (field: keyof RegisterFormData) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
    if (field === "password" || field === "confirm_password") {
      clearFieldError("password");
      clearFieldError("confirm_password");
    }
  };

  const validate = (): boolean => {
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

    setFieldErrors(newErrors);

    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      scrollToFirstError(newErrors, {
        customMessage: "Please correct highlighted enrollment fields",
      });
      return false;
    }

    return true;
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
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: any) {
      console.error("Registration failed", err);

      // Handle potential field errors from backend
      if (err.response?.data && typeof err.response.data === "object" && !err.response.data.detail) {
        const apiErrors: FieldErrors = {};
        Object.keys(err.response.data).forEach((key) => {
          apiErrors[key as keyof RegisterFormData] =
            err.response.data[key][0] || err.response.data[key];
        });
        setFieldErrors(apiErrors);
        setError("Please correct the errors in the form.");
        scrollToFirstError(apiErrors, {
          customMessage: "Validation error returned from server",
        });
      } else {
        const msg =
          err.response?.data?.detail ||
          "Registration failed. Please check your details and try again.";
        setError(msg);
        toast.error(msg);
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
    updateField,
    clearFieldError,
    handleSubmit,
  };
}
