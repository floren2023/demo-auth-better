import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
 
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	else{
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
 
	
}
 
export const config = {
	matcher: ["/dashboard"], // Specify the routes the middleware applies to
};