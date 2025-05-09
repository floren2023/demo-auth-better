
"use client"
import {authClient} from "../../lib/auth-client"
export default function SignOutComponent(){
    return(
        <div>
        <button onClick={()=>authClient.signOut()}>Sign Out</button>
        </div>
    )
}