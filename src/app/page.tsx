import Image from "next/image";
import { SignIn,SignUp } from "../../server/users";
import SignOutComponent from "./signout"
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session=await auth.api.getSession(
    { headers:await headers(),
      

    }

  )
  return (
    <main className="text-xl p-10 flex mr-20 gap-10 justify-end ">
      <button onClick={SignIn}>Sign In</button>
       <button onClick={SignUp}>Sign Up</button>
         <SignOutComponent/>
         <div>
     
     { !session?"Not authenticated":session.user.name}
         </div>
    </main>
  );
}
