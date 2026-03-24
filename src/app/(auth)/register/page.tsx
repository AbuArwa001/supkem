"use client";

import { motion } from "framer-motion";
import { RegisterSuccess } from "./_components/RegisterSuccess";
import { RegisterHeader } from "./_components/RegisterHeader";
import { RegisterForm } from "./_components/RegisterForm";
import { useRegisterLogic } from "./_components/useRegisterLogic";

export default function RegisterPage() {
  const {
    loading,
    success,
    error,
    formData,
    setFormData,
    handleSubmit
  } = useRegisterLogic();

  if (success) {
    return <RegisterSuccess />;
  }

  return (
    <div className="min-h-screen py-20 px-6 bg-primary/[0.02] relative overflow-hidden flex items-center justify-center">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-10"
      >
        <RegisterHeader />
        
        <RegisterForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </motion.div>
    </div>
  );
}
