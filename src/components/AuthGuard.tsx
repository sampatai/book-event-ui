import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

  useEffect(() => {
    if (
      !auth.isLoading &&
      !auth.isAuthenticated &&
      !auth.error &&
      !auth.activeNavigator
    ) {
      auth.signinRedirect();
    }
  }, [
    auth,
    auth.isLoading,
    auth.isAuthenticated,
    auth.error,
    auth.activeNavigator,
  ]);

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
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium">Redirecting to login...</p>
        </div>
      </CenterLayout>
    );
  }

  return <>{children}</>;
}
