import styled, { } from "@emotion/styled";
import {
  Layout as LayoutAntd, SiderProps,
  LayoutProps,
} from "antd";
import Head from "next/head";
import Header from "./header";
import SideMenu from "./side-menu";

const Sider = styled((props: SiderProps) => <LayoutAntd.Sider width="230px" {...props} />)({});

const MainLayout = styled(LayoutAntd)({
  minHeight: "calc(100vh - 64px)",
});
const ContentLayout = styled(LayoutAntd)({ padding: "24px" });

function Layout(
  { children, contentProps, ...props }: LayoutProps & { contentProps?: LayoutProps },
) {
  return (
    <>
      <Head>
        <title>Chimeras server config editor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/img/favicon.png" />
      </Head>
      <LayoutAntd {...props}>
        <Header />
        <MainLayout>
          <Sider>
            <SideMenu />
          </Sider>
          <ContentLayout {...contentProps}>
            <LayoutAntd.Content>{children}</LayoutAntd.Content>
          </ContentLayout>
        </MainLayout>
      </LayoutAntd>

    </>
  );
}

export default Layout;
