import { useState } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/app/(public)/contact/_actions/sendContactEmail";

export function useContactLogic() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formData = new FormData(form);
            const result = await sendContactEmail(formData);
            
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Your message has been sent successfully!");
                form.reset();
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        handleSubmit,
    };
}
