export interface MarriageDetails {
  marriage_entry_no: string;
  date_of_marriage: string;
  husband_name: string;
  husband_id_passport: string;
  husband_age: number;
  husband_marital_status: string;
  husband_occupation: string;
  husband_residence_county: string;
  husband_residence_sub_county: string;
  wife_name: string;
  wife_id_passport: string;
  wife_age: number;
  wife_marital_status: string;
  wife_occupation: string;
  wife_residence_county: string;
  wife_residence_sub_county: string;
  wife_waliyy_name: string;
  wife_waliyy_relationship: string;
  agreed_mahr: string;
  paid_mahr_and_deferred: string;
  particulars_of_gifts: string;
  place_of_marriage: string;
  county_of_marriage: string;
  witness_1_name: string;
  witness_1_id: string;
  witness_2_name: string;
  witness_2_id: string;
  marriage_officer_name: string;
  date_of_issuance: string;
}

export interface MarriageCertificateTemplateProps {
  certificate: {
    serial_number?: string;
    application_detail?: {
      marriage_details?: MarriageDetails;
    };
  };
}
