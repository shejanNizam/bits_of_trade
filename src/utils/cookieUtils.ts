// Sets auth cookie so middleware can read it
export const setAuthCookie = (token: string) => {
  const isProduction = process.env.NODE_ENV === "production";
  document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${isProduction ? "; Secure" : ""}`;
};

export const clearAuthCookie = () => {
  document.cookie = "auth-token=; path=/; max-age=0; SameSite=Lax";
};
