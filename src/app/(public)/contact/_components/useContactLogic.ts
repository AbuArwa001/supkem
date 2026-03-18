import { useState } from "react";

export function useContactLogic() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulating an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        // Add actual toast or state logic here upon success
        alert("Message simulated as sent!");
    };

    return {
        isSubmitting,
        handleSubmit,
    };
}
