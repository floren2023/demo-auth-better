import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "../../../lib/auth-client";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface GoogleAuthButtonProps {
  action: "signin" | "signup";
  redirectTo?: string;
  buttonText?: string;
}

function GoogleAuthButton({
  action = "signin",
  redirectTo = "/dashboard",
  buttonText = "Continue with Google",
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });

      if (action === "signin") {
        toast.success("Logged in successfully");
      } else {
        toast.success("Signed up successfully");
      }
    } catch (error) {
      if (action === "signin") {
        toast.error("Error signing in");
      } else {
        toast.error("Error signining up");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleAuth}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <div className="flex gap-2 text-sm text-violet-800">
          
          <span>{buttonText}</span><FcGoogle className="w-4 h-4" />
        </div>
      )}
    </Button>
  );
}

export default GoogleAuthButton;
