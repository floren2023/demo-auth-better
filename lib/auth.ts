
 
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db/drizzle"; 
import { schema } from "@/app/db/schema";
import { nextCookies } from "better-auth/next-js";
import {  } from "./nodemailer";
import { sendEmailAction } from "@/actions/send-email.action";


 
export const auth = betterAuth({

    emailAndPassword: { 
    enabled: true,
    requireEmailVerification:true 
  }, 

  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

    emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/(auth)/verify-email");

      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link: String(link),
        },
      });
    },
  }, 
  

    database: drizzleAdapter(db, {
        provider: "pg", 
        schema:schema
    }),
    plugins:[nextCookies()]
   
    
 
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
export type Session=typeof auth.$Infer.Session