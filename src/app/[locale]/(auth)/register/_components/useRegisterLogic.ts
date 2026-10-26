import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { registerUserApi } from "./services";
import { RegisterFormData, FieldErrors } from "./types";
import { validateRegisterForm } from "./registerValidator";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";
import { toast } from "sonner";

export function useRegisterLogic() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "", middle_name: "", last_name: "", email: "",
    phone_number: "", location: "", password: "", confirm_password: "",
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
    const newErrors = validateRegisterForm(formData);
    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors, { customMessage: "Please correct highlighted enrollment fields" });
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
      const { confirm_password, ...payload } = formData;
      await registerUserApi(payload);
      setSuccess(true);
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: any) {
      if (err.response?.data && typeof err.response.data === "object" && !err.response.data.detail) {
        const apiErrors: FieldErrors = {};
        Object.keys(err.response.data).forEach((key) => {
          apiErrors[key as keyof RegisterFormData] = err.response.data[key][0] || err.response.data[key];
        });
        setFieldErrors(apiErrors);
        setError("Please correct the errors in the form.");
        scrollToFirstError(apiErrors, { customMessage: "Validation error returned from server" });
      } else {
        const msg = err.response?.data?.detail || "Registration failed. Please check your details and try again.";
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, fieldErrors, formData, setFormData, updateField, clearFieldError, handleSubmit };
}
