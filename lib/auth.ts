
 
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db/drizzle"; 
import { schema } from "@/app/db/schema";
import { nextCookies } from "better-auth/next-js";

 
export const auth = betterAuth({

    emailAndPassword: { 
    enabled: true,
    requireEmailVerification:true 
  }, 
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema:schema
    }),
    plugins:[nextCookies()]
   
    
 
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
export type Session=typeof auth.$Infer.Session