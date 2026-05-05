import type { EducationDetails } from "@/components/StudyAbroadLetter/types";

interface LetterBodyProps {
  details: EducationDetails;
}

/** Subject heading and all recommendation paragraphs. */
export function LetterBody({ details }: LetterBodyProps) {
  return (
    <>
      <div className="pt-4">
        <h2 className="text-xl font-bold uppercase underline decoration-primary decoration-2 underline-offset-8 text-center italic">
          RE: RECOMMENDATION AND ENDORSEMENT FOR {details.full_name?.toUpperCase()}
        </h2>
      </div>

      <div className="space-y-6 text-base text-justify">
        <p>
          It is with great pleasure that the Supreme Council of Kenya Muslims (SUPKEM) issues this
          official recommendation letter for <strong>{details.full_name}</strong>, holder of
          Passport Number <strong>{details.passport_number}</strong>.
        </p>

        <p>
          The applicant is a recognized member of the Muslim Ummah in Kenya and has expressed a
          profound interest in pursuing <strong>{details.course_of_study}</strong> at{" "}
          <strong>{details.institution_name}</strong> in{" "}
          <strong>{details.country}</strong>.
        </p>

        <p>
          SUPKEM has reviewed the applicant&apos;s academic aspirations and finds them aligned with
          our mission to empower Muslim youth through quality education. We affirm the
          applicant&apos;s commitment and endorse their application for admission and relevant
          travel documentation.
        </p>

        {details.scholarship_details && (
          <div className="p-4 bg-slate-50 border-l-4 border-primary italic text-sm">
            <p className="font-bold mb-1">Scholarship/Specific Purpose:</p>
            <p>{details.scholarship_details}</p>
          </div>
        )}

        <p>
          We kindly request your esteemed office to grant <strong>{details.full_name}</strong> the
          necessary visas, study permits, or admissions facilitation to enable them to achieve
          their educational goals. The Council vouches for the integrity and character of the
          applicant.
        </p>
      </div>
    </>
  );
}
