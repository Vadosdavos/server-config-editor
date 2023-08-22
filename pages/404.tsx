import { Typography } from "antd";
import ErrorPageLayout from "components/layout/error-page";

function Page404() {
  return (
    <ErrorPageLayout>
      <Typography.Title>404 Page not found</Typography.Title>
    </ErrorPageLayout>
  );
}

export default Page404;
