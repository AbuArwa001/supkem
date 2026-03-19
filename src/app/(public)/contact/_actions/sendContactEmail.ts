"use server";

export async function sendContactEmail(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!name || !email || !subject || !message) {
            return { error: "All fields are required." };
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "SUPKEM Portal <noreply@supkem.co.ke>",
                to: "info@supkem.org",
                bcc: email,
                reply_to: email,
                subject: `New Contact Form Submission: ${subject}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
                        <h2 style="color: #333;">New Contact Form Submission</h2>
                        <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <hr style="border: 1px solid #eee; margin: 20px 0;" />
                        <p style="white-space: pre-wrap; font-size: 16px; line-height: 1.5; color: #555;">${message.replace(/\n/g, '<br>')
                    }</p>
                    </div>
                `,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            return { error: errorData?.message || "Failed to send email via Resend." };
        }

        return { success: true };
    } catch (error) {
        return { error: "Something went wrong while sending the email." };
    }
}
