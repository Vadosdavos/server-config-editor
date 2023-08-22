import getConfig from "next/config";
import { serialize, CookieSerializeOptions } from "cookie";

export const getAuthCookieOptions = (remember: boolean) => {
  // Get cookie options
  const { serverRuntimeConfig } = getConfig();
  const cookieTimeOptions: CookieSerializeOptions | undefined = remember ? {
    maxAge: serverRuntimeConfig.tokenCookieMaxAge,
    expires: new Date(Date.now() + serverRuntimeConfig.tokenCookieMaxAge),
  } : undefined;
  const cookieOptions: CookieSerializeOptions = {
    path: "/",
    httpOnly: true,
    ...cookieTimeOptions,
  };
  return cookieOptions;
};

export const createAuthCookie = (accessToken: string, remember: boolean) => {
  const cookieOptions = getAuthCookieOptions(remember);
  const tokenCookie = serialize("token", accessToken, cookieOptions);
  return tokenCookie;
};
