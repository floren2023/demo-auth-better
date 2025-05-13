import { headers } from "next/headers";
import { auth } from "../../../lib/auth";

export default async function Dashboard(){
    const session = await auth.api.getSession({ headers: await headers() });
    return (
        <div>
            Welcome to {session?.user.name} dashboard

        </div>
    )
}