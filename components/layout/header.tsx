import styled from "@emotion/styled";
import { Button, ButtonProps, Layout as LayoutAntd } from "antd";
import Image from "next/image";
import Link from "next/link";

const Layout = styled(LayoutAntd.Header, {})({
  height: "64px",
  backgroundColor: "#001529",
  padding: "0 12px",
  display: "flex",
});

const Logo = () => (
  <div style={{
    margin: "4px", float: "left", display: "flex", alignItems: "center",
  }}
  >
    <Image src="/img/top-logo.png" width={69} height={40} alt="" />
  </div>
);

const RightMenu = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flex: 1,
  gap: "22px",
});

const ProfileIcon = styled(() => (
  <Image
    style={{ cursor: "pointer" }}
    src="/img/profile-icon.png"
    width={32}
    height={32}
    alt=""
  />
))({
  cursor: "pointer",
});

const ProfileLink = styled.a({ display: "flex" });

const LogoutButton = styled((props: ButtonProps) => <Button type="primary" {...props} />)({
  height: "24px",
  padding: "1px 12px",
});

function Header() {
  return (
    <Layout>
      <Link href="/" passHref legacyBehavior>
        <a style={{ display: "flex", alignItems: "center" }}>
          <Logo />
        </a>
      </Link>
      <RightMenu>
        <Link href="/" passHref legacyBehavior>
          <ProfileLink>
            <ProfileIcon />
          </ProfileLink>
        </Link>
        <Link href="/logout" passHref legacyBehavior>
          <a>
            <LogoutButton>Log out</LogoutButton>
          </a>
        </Link>
      </RightMenu>
    </Layout>
  );
}
export default Header;
