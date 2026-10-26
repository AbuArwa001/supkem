export interface DetailsGridProps {
  application: {
    id: string;
    service_name: string;
    service_category?: string;
    service_document_type?: string;
    organization_name?: string;
    user_name: string;
    submitted_at: string;
    updated_at: string;
    payment?: {
      status: string;
      amount: string;
      receipt_number?: string;
    };
    certification?: { id: string; serial_number: string } | null;
    letter?: { id: string; serial_number: string } | null;
    marriage_details?: any;
    pilgrim_details?: any;
    education_details?: any;
    travel_visa_details?: any;
    employment_details?: any;
  };
}
