import { EntitiesUri } from "@/components/forms/edit";
import { EditPage } from "@/components/pages/edit";
import clientPromise from "@/lib/mongodb";
import { withAuthOnServer } from "@/middlewares/auth";
import { NextPage } from "next";
import { ServerGroup } from "./api/serverGroups";

type ServerGroupsProps = {
  serverGroups: ServerGroup[];
};

export const getServerSideProps = withAuthOnServer(async () => {
  try {
    const client = await clientPromise;
    const serverGroups = (await client.db("config-editor")
      .collection(EntitiesUri.serverGroups)
      .find<ServerGroup>({})
      .toArray())
      .map((el) => ({ ...el, _id: el._id?.toString() }));

    return ({
      props: { serverGroups },
    });
  } catch (error) {
    console.log(error);
    return ({
      props: { serverGroups: [] },
    });
  }
});

const ServerGroups: NextPage<ServerGroupsProps> = ({ serverGroups }) => (
  <EditPage
    entitiesProps={serverGroups}
    entitiesUri={EntitiesUri.serverGroups}
    entityName="server group"
    title="Server groups"
  />
);

export default ServerGroups;
