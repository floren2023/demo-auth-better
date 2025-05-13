"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";

import { Card, CardContent } from "@/app/components/ui/card";

import LoadingButton from "./LoadingButton";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "./GoogleAuthButton";
import { authClient } from "../../../lib/auth-client";

const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
   form.reset()
    await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    },
      {
        onRequest:()=>{
          setPending(true)
        },
        onSuccess:()=>{
          toast.success(
            "Account created.Check your email for confirmation",
          );
          console.log("success")
          router.push("/sign-in");
          router.refresh();
        
        },
        onError: (ctx) => {
          console.log("error",ctx)
          toast( `something went wrong ${ ctx.error.message}`)
           console.log("success")
          router.push("/");
          router.refresh();
        
          console.log("error",ctx.error.message)
      },

    })
    setPending(false)
  };

  return (
    <Card className="w-full max-w-md mx-auto  p-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton pending={pending}>Sign Up</LoadingButton>
          </form>
        </Form>
         <div className="flex flex-col  gap-5">
          <GoogleAuthButton action="signup"
           buttonText="SignUp with Google" redirectTo="/dashboard"/>
        
        <Link href="/sign-in" className="flex items-center justify-center text-center text-sm text-violet-700">
          You already have an account? <span className="text-sm text-red-700 pl-2">Click here</span>
        </Link>
        </div>
      </CardContent>
    </Card>
  );
}
