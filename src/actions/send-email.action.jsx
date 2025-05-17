 "use server";

import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(to,subject,meta) {
   const devFrom = "dev@localhost.com";
 
  

  try {
    const { data, error } = await resend.emails.send({
    //    from: "acme <onboarding@resend.dev>",
     from:devFrom,
      to: [to],
      subject: {subject},
      text:meta.description,
      react: (<>Reset password {meta.link}
       </>
      ),
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
