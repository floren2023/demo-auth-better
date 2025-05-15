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
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleAuthButton from "./GoogleAuthButton";
import LoadingButton from "./LoadingButton";
import { authClient } from "../../../lib/auth-client";


const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;


export default function ForgotPasswordForm() {
  

  const router = useRouter();
  const [pending, setPending] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
      
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
     form.reset();
    await authClient.forgetPassword(
      {
        email: values.email,
        redirectTo:"/reset-password"
        
        
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
            toast.success("If an account exists with this email, you will receive a password link")
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
        <h2 className="text-2xl font-semibold mb-4">Password reset</h2>
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

            
            
            <LoadingButton pending={pending}>Forgot Password</LoadingButton>
            
          </form>
        </Form>
        

        
      </CardContent>
    </Card>
  );
}
