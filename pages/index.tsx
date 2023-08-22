import Layout from "@/components/layout";
import { withAuthOnServer } from "@/middlewares/auth";
import { getServerConfig } from "@/utils/api/get-config";
import { Input, Typography } from "antd";
import { NextPage } from "next";

type HomePageProps = {
  config: string;
};

export const getServerSideProps = withAuthOnServer(async () => {
  try {
    const config = await getServerConfig();

    return {
      props: {
        config: JSON.stringify(config, null, 2),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
});

const Home: NextPage<HomePageProps> = ({ config }) => (
  <Layout>
    <Typography.Title>Server config</Typography.Title>
    <Input.TextArea
      style={{ height: "70vh", resize: "none" }}
      readOnly
      defaultValue={config}
    />
  </Layout>
);

export default Home;
