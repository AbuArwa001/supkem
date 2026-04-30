export const AdvisoryLetterBody = ({ 
    travel_visa_details, 
    serial_number, 
    today 
}: { 
    travel_visa_details: any; 
    serial_number: string; 
    today: string; 
}) => {
    return (
        <>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold">Ref: SUPKEM/VISA/{serial_number}</p>
                    <p className="font-bold">Date: {today}</p>
                </div>
                <div className="text-right">
                    <p className="font-black uppercase tracking-wider text-primary">To the Embassy / High Commission</p>
                    <p className="text-sm font-medium">Department of Visas & Consular Affairs</p>
                </div>
            </div>

            <div className="pt-4">
                <h2 className="text-xl font-bold uppercase underline decoration-secondary decoration-2 underline-offset-8 text-center italic">
                    RE: TRAVEL ADVISORY AND SUPPORT FOR {travel_visa_details.full_name?.toUpperCase()}
                </h2>
            </div>

            <div className="space-y-6 text-base text-justify">
                <p>
                    This is to certify that <strong>{travel_visa_details.full_name}</strong>, holder of Passport Number <strong>{travel_visa_details.passport_number}</strong>,
                    has sought Travel Advisory services from the Supreme Council of Kenya Muslims (SUPKEM) regarding their upcoming travel to
                    <strong> {travel_visa_details.destination_country}</strong>.
                </p>

                <p>
                    The Council has reviewed the applicant’s travel request and confirms that the purpose of travel is
                    <strong> {travel_visa_details.trip_purpose?.toUpperCase()}</strong>. Based on our verification, the applicant is
                    a bona-fide member of the Muslim community in Kenya traveling for the stated purpose.
                </p>

                <p>
                    The applicant is scheduled to travel on or about
                    <strong> {new Date(travel_visa_details.expected_travel_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</strong>.
                </p>

                <p>
                    We kindly request your esteemed office to facilitate the applicant with the necessary visa and travel authorization to
                    ensure a smooth and successful journey. SUPKEM stands ready to provide further verification should it be required
                    by your consular department.
                </p>
            </div>
        </>
    );
};
