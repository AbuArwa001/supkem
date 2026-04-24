"use client";

import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useUserFormLogic } from "./useUserFormLogic";
import { PersonalInfoFields } from "./_components/PersonalInfoFields";
import { ContactAuthFields } from "./_components/ContactAuthFields";
import { SystemRoleFields } from "./_components/SystemRoleFields";
import type { UserFormProps } from "./types";

export function UserForm({ onSuccess, user }: UserFormProps) {
    const { formData, updateField, roles, isSaving, handleSubmit } = useUserFormLogic(user, onSuccess);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalInfoFields formData={formData} onChange={updateField} />
            <ContactAuthFields formData={formData} onChange={updateField} isEditing={!!user} />
            <SystemRoleFields formData={formData} onChange={updateField} roles={roles} />

            <Button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-xl font-black shadow-lg shadow-primary/25 h-14 bg-primary text-white hover:bg-primary/90"
            >
                {isSaving ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <Save className="mr-2 h-5 w-5" />
                )}
                {user ? "UPDATE ACCOUNT" : "CREATE ACCOUNT"}
            </Button>
        </form>
    );
}
