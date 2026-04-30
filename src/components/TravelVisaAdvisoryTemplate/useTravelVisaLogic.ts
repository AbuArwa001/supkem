import { useMemo } from "react";

export function useTravelVisaLogic(certificate: any) {
    const { application_detail } = certificate;
    const { travel_visa_details } = application_detail || {};

    const today = useMemo(() => {
        return new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }, []);

    return {
        travel_visa_details,
        today
    };
}
