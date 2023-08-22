import { EntitiesUri } from "@/components/forms/edit";
import { EditPage } from "@/components/pages/edit";
import clientPromise from "@/lib/mongodb";
import { withAuthOnServer } from "@/middlewares/auth";
import { NextPage } from "next";
import { ServerAddress } from "./api/serverAddresses";

type ServerAddressesProps = {
  serverAddresses: ServerAddress[];
};

export const getServerSideProps = withAuthOnServer(async () => {
  try {
    const client = await clientPromise;
    const serverAddresses = (await client.db("config-editor")
      .collection(EntitiesUri.serverAddresses)
      .find<ServerAddress>({})
      .toArray())
      .map((el) => ({ ...el, _id: el._id?.toString() }));

    return ({
      props: { serverAddresses },
    });
  } catch (error) {
    console.log(error);
    return ({
      props: { serverAddresses: [] },
    });
  }
});

const ServerAddresses: NextPage<ServerAddressesProps> = ({ serverAddresses }) => (
  <EditPage
    entitiesProps={serverAddresses}
    entitiesUri={EntitiesUri.serverAddresses}
    entityName="server address"
    title="Server addresses"
  />
);

export default ServerAddresses;
