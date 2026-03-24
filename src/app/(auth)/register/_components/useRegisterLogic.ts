import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUserApi } from "./services";
import { RegisterFormData } from "./types";

export function useRegisterLogic() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await registerUserApi(formData);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      console.error("Registration failed", err);
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    error,
    formData,
    setFormData,
    handleSubmit
  };
}
