import React from "react";
import { useAuth } from "react-oidc-context";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CenterLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 md:p-8">
    {children}
  </div>
);

export function AuthGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return (
        <CenterLayout>
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Signing you in silently...</p>
          </div>
        </CenterLayout>
      );
    case "signoutRedirect":
      return (
        <CenterLayout>
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Signing you out...</p>
          </div>
        </CenterLayout>
      );
  }

  if (auth.isLoading) {
    return (
      <CenterLayout>
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium">Verifying authentication...</p>
        </div>
      </CenterLayout>
    );
  }

  if (auth.error) {
    return (
      <CenterLayout>
        <Card className="w-full max-w-md border-destructive/50">
          <CardHeader className="flex flex-col items-center pb-4 text-center">
            <div className="mb-4 rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold text-destructive">
              Authentication Error
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>{auth.error.message}</p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => globalThis.location.reload()}
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </CenterLayout>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <CenterLayout>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex flex-col items-center pb-2 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base">
              You need to log in to access your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6 pt-4 text-center text-sm text-muted-foreground">
            Securely log in to manage your events, bookings, and resources.
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              size="lg"
              onClick={() => auth.signinRedirect()}
            >
              Log In with SSO
            </Button>
          </CardFooter>
        </Card>
      </CenterLayout>
    );
  }

  return <>{children}</>;
}
