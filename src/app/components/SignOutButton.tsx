
"use client"
import { SignOut} from "../../../lib/auth-client"
import { useState } from "react"
import LoadingButton from "./LoadingButton"
import {useRouter} from "next/navigation"



export default function SignOutButton(){
    const router=useRouter()
    const [pending,setPending]=useState(false)
  
    const handleSignOut=async()=>{
         
        setPending(true)
        await SignOut()
        setPending(false)
        router.push("/")
        router.refresh()
           

        
      }
     

    



    return(
        <div>
        {/* <Button onClick={()=>authClient.signOut()}>Sign Out</Button> */}
        <LoadingButton pending={false} onClick={handleSignOut}>Sign Out</LoadingButton>
        </div>
    )
}