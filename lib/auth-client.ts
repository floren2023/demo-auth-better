import { createAuthClient } from "better-auth/react"



export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    
    baseURL: process.env.NEXT_PUBLIC_APP_URL,

})

export const SignOut=async()=>{
    await authClient.signOut({
  
});
}
const signInGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google"
    })
}

export const {
  signIn,
  signUp,  
  signOut,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  
} = authClient;