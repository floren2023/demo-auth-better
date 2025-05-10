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

import useToast from "react-hook-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const toast = useToast();

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
    const form = new FormData();
    form.append("email", values.email);
    form.append("password", values.password);
    setPending(true);
    const res = await SignIn(form);
    if(res.message!=="OK"){
    
      
      toast({
        title:"Missing email or pass",        
        type: "error",
        interval: 2000,
        // type: "error"
        // type: "warrning"
      });
    } else {
      router.push("/dashboard");
      router.refresh();
    }

    setPending(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto  p-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
        <Link href="/">Forgot password?</Link>
      </CardContent>
    </Card>
  );
}
