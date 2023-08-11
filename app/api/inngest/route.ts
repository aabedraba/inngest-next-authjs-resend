import { serve } from "inngest/next";
import { inngest } from "@/app/lib/inngest";
import { resend } from "@/app/lib/resend";
import { prisma } from "@/prisma";

const userSignIn = inngest.createFunction(
  "User singin",
  {
    event: "user/registered",
  },
  async ({ event, step }) => {
    await step.run("send email", async () => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: event.data.email,
        subject: "Hello World",
        html: `<p>Congrats on sending your <strong>${event.data.name}</strong>!</p>`,
      });
    });
  }
);

export const { GET, POST, PUT } = serve(inngest, [
  userSignIn, // <-- This is where you'll always add your new functions
]);
