import { useState } from "react";
import { sendContactEmail } from "@/app/(public)/contact/_actions/sendContactEmail";

export function useContactLogic() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formData = new FormData(e.currentTarget);
            const result = await sendContactEmail(formData);
            
            if (result.error) {
                alert(result.error);
            } else {
                alert("Your message has been sent successfully!");
                e.currentTarget.reset();
            }
        } catch (error) {
            alert("Failed to send message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        handleSubmit,
    };
}
