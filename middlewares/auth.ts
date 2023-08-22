import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WithAuthType<R = any> = (
  next: (
    params: { token: string },
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<R> | Promise<GetServerSidePropsResult<R>>
) => GetServerSideProps;

export const getAuthToken = (ctx: GetServerSidePropsContext) => {
  if (ctx.req.url === "/logout" || ctx.req.url === "/login") {
    return null;
  }
  return ctx.req.cookies.token;
};

export const withAuthOnServer: WithAuthType = (next) => async (ctx) => {
  const loginRedirectResult = {
    redirect: {
      statusCode: 302,
      destination: `/login?redirect=${encodeURIComponent(ctx.req.url || "/")}`,
    },
  } as const;
  const token = getAuthToken(ctx);
  if (token) {
    return next({ token }, ctx);
  }
  return loginRedirectResult;
};

export const protectedGetServerSideProps = withAuthOnServer(async () => ({ props: {} }));
