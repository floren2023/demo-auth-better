
 
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db/drizzle"; 
import { schema } from "@/app/db/schema";
import { nextCookies } from "better-auth/next-js";
import {openAPI} from "better-auth/plugins"

import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);


 
export const auth = betterAuth({
  
    emailAndPassword: {     
    enabled: true,
    autoSignIn: false,
    requireEmailVerification:true,

      sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `Click the link to reset your password: ${url}`,
      });
    },
  },
   
 session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    // BUG: Prob a bug with updateAge method. It throws an error - Argument `where` of type SessionWhereUniqueInput needs at least one of `id` arguments. 
    // As a workaround, set updateAge to a large value for now.
    updateAge: 60 * 60 * 24 * 7, // 7 days (every 7 days the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },
    
  


  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
emailVerification: {
    sendOnSignUp: true, // Automatically sends a verification email at signup
    autoSignInAfterVerification: true, // Automatically signIn the user after verification
       expiresIn: 60 * 60,
  
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");
        // const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // You could add your custom domain
        to: user.email, // email of the user to want to end
        subject: "Email Verification", // Main subject of the email
        html: `Click the link to verify your email: ${link}`, // Content of the email
        // you could also use "React:" option for sending the email template and there content to user
      });
    },
  },
    
  

    database: drizzleAdapter(db, {
        provider: "pg", 
        schema:schema
    }),
  

    plugins:[nextCookies(),openAPI()]
   
    
 
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
export type Session=typeof auth.$Infer.Session