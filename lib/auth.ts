
 
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
    requireEmailVerification:true,

      sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password",
        meta: {description:`Click the link to reset your password:`,
               link:`${url}`
        
      },
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
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
               description:"Click the link to verify your email:",
                link:verificationUrl
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