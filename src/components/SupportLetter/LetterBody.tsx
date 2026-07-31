import type { PilgrimDetails } from "@/components/SupportLetter/types";

interface LetterBodyProps {
  details: PilgrimDetails;
}

/** Subject heading and the main paragraphs of the support letter. */
export function LetterBody({ details }: LetterBodyProps) {
  const travelDate = new Date(details.expected_travel_date).toLocaleDateString(undefined, {
    dateStyle: "long",
  });

  return (
    <>
      <div className="pt-4">
        <h2 className="text-xl font-bold uppercase underline decoration-primary decoration-2 underline-offset-8 text-center italic">
          RE: RECOMMENDATION AND SUPPORT FOR {details.trip_type.toUpperCase()} PILGRIMAGE
        </h2>
      </div>

      <div className="space-y-6 text-base text-justify">
        <p>
          This is to certify and confirm that <strong>{details.full_name}</strong>, a citizen of{" "}
          <strong>{details.nationality}</strong> holding Passport Number{" "}
          <strong>{details.passport_number}</strong>, is a recognized and registered pilgrim under
          the Supreme Council of Kenya Muslims (SUPKEM) facilitation program.
        </p>

        <p>
          The applicant intends to perform the sacred <strong>{details.trip_type}</strong> pilgrimage
          in the Kingdom of Saudi Arabia, with an expected departure date around{" "}
          <strong>{travelDate}</strong>.
        </p>

        {details.travel_agent_name && (
          <p>
            We further confirm that the pilgrim has successfully connected with{" "}
            <strong>{details.travel_agent_name}</strong>, who are among the licensed and approved
            facilitators recognized by our Council.
          </p>
        )}

        <p>
          We kindly request your esteemed office to grant the applicant the necessary visa and
          travel facilitation to enable them to fulfill this significant religious obligation. The
          Supreme Council of Kenya Muslims vouches for the applicant&apos;s intent and compliance
          with the pilgrimage requirements.
        </p>
      </div>
    </>
  );
}
