import {
  HomeOutlined, EditOutlined, GroupOutlined, SendOutlined, WalletOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function SideMenu() {
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link href="/">View full config</Link>,
    }, {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit config",
      children: [{
        key: "groups",
        label: <Link href="/groups">Server groups</Link>,
        icon: <GroupOutlined />,
      }, {
        key: "addresses",
        label: <Link href="/addresses">Server addresses</Link>,
        icon: <SendOutlined />,
      }, {
        key: "wallet-addresses",
        label: <Link href="/wallet-addresses">Wallet link addresses</Link>,
        icon: <WalletOutlined />,
      }],
    }];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[router.pathname.substring(1) || "home"]}
      defaultOpenKeys={["edit"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
    />
  );
}
export default SideMenu;
