"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignIn } from "../../../server/users";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleAuthButton from "./GoogleAuthButton";
import LoadingButton from "./LoadingButton";
import { authClient } from "../../../lib/auth-client";


const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type FormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  

  const router = useRouter();
  const [pending, setPending] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
     form.reset();
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          console.log("error", ctx);
          toast.error(`something went wrong ${ctx.error.message}`)
          router.push("/");
        },
      },
    );
    setPending(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto  p-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton pending={pending}>Sign In</LoadingButton>
            
          </form>
        </Form>
        

        <div className="flex flex-col gap-5">
          <GoogleAuthButton action="signin"
           buttonText="SignIn with Google" redirectTo="/dashboard"/>
        
        <Link href="/forgot-password"  className="text-red-700 text-sm text-center">Forgot password?</Link>
        </div>
      </CardContent>
    </Card>
  );
}
