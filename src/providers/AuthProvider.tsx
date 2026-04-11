import React from "react";
import { AuthProvider as OIDCAuthProvider } from "react-oidc-context";
import { User } from "oidc-client-ts";
import TokenService from "@/lib/token.service";

const oidcConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  scope: import.meta.env.VITE_OIDC_SCOPE || "openid profile react-app",
  response_type: "code",
  onSigninCallback: (user: User | void) => {
    globalThis.window.history.replaceState({}, document.title, "/");
    if (user?.access_token) {
      TokenService.setUser({
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
      });
    }
  },
  onRemoveUser: () => {
    TokenService.removeUser();
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <OIDCAuthProvider {...oidcConfig}>{children}</OIDCAuthProvider>;
};
