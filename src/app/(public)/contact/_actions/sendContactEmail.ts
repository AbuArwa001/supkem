import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!name || !email || !subject || !message) {
            return { error: "All fields are required." };
        }

        const { data, error } = await resend.emails.send({
            from: "SUPKEM Portal <noreply@supkem.co.ke>",
            to: ["info@supkem.org"],
            // bcc: [email],
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #0c4a6e;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <div style="white-space: pre-wrap; font-size: 16px; line-height: 1.6; color: #334155;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #94a3b8;">This message was sent from the SUPKEM Portal contact form.</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return { error: error.message || "Failed to send email." };
        }

        return { success: true, data };
    } catch (error: any) {
        console.error("Contact Form Server Action Error:", error);
        return { error: "Something went wrong while sending the email. Please try again later." };
    }
}
