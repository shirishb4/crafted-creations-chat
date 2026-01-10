import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send notification email to store owner
    const notificationEmail = await resend.emails.send({
      from: "Handmade Stories <onboarding@resend.dev>",
      to: ["shinishb4@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          Reply directly to this email to respond to ${name}.
        </p>
      `,
      reply_to: email,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to the customer
    const confirmationEmail = await resend.emails.send({
      from: "Handmade Stories <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message! ✨",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #e8a87c; text-align: center;">Thank You, ${name}! 🎨</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            We've received your message and we're so excited to hear from you!
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Our team will get back to you within 24-48 hours. In the meantime, feel free to browse our latest creations!
          </p>
          <div style="background: #fef6e4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0 0; font-size: 14px; color: #666;">${message.replace(/\n/g, "<br />")}</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">
            With creativity and love,<br />
            <strong>The Handmade Stories Team</strong>
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);