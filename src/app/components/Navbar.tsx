import Link from "next/link";
import React from "react";

import { Button } from "@/app/components/ui/button";
import {Session} from "../../../lib/auth"
import SignOutButton from "./SignOutButton";


async function Navbar({session}:{session:Session|null}) {
  
  return (
    <nav className="text-xl p-4 flex mr-20 gap-10 p-x-20 justify-between">
        <Link href="/"><div className="text-2xl text-violet-700 items-start pl-10">Better auth</div></Link>
      {!session ? "" : "Hello " + session.user.name}
      {!session ? (
        <div className="flex gap-10">
          <Link href="/sign-in">
            <Button variant="default">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default">Sign Up</Button>
          </Link>
        </div>
      ) : (
        <SignOutButton />
      )}

     
    </nav>
  );
}

export default Navbar;
