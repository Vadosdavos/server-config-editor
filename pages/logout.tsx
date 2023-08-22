import { serialize } from "cookie";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Set-Cookie", serialize("token", "", {
    maxAge: -1,
    path: "/",
  }));
  return {
    redirect: {
      destination: "/login",
      statusCode: 302,
    },
  };
};

function LogoutPage() {
  return <div>Loading...</div>;
}
export default LogoutPage;
