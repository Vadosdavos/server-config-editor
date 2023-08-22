import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const Layout = styled.div({
  display: "flex",
  width: "100%",
});

const Content = styled.div({
  margin: "0 auto",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

function ErrorPageLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
}

export default ErrorPageLayout;
