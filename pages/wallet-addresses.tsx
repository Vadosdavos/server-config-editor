import { EntitiesUri } from "@/components/forms/edit";
import { EditPage } from "@/components/pages/edit";
import clientPromise from "@/lib/mongodb";
import { withAuthOnServer } from "@/middlewares/auth";
import { NextPage } from "next";
import { WalletLinkAddress } from "./api/walletLinkAddresses";

type WalletLinkAddressesProps = {
  walletLinkAddress: WalletLinkAddress[];
};

export const getServerSideProps = withAuthOnServer(async () => {
  try {
    const client = await clientPromise;
    const walletLinkAddress = (await client.db("config-editor")
      .collection(EntitiesUri.walletLinkAddresses)
      .find<WalletLinkAddress>({})
      .toArray())
      .map((el) => ({ ...el, _id: el._id?.toString() }));

    return ({
      props: { walletLinkAddress },
    });
  } catch (error) {
    console.log(error);
    return ({
      props: { walletLinkAddress: [] },
    });
  }
});

const WalletLinkAddresses: NextPage<WalletLinkAddressesProps> = ({ walletLinkAddress }) => (
  <EditPage
    entitiesProps={walletLinkAddress}
    entitiesUri={EntitiesUri.walletLinkAddresses}
    entityName="wallet link address"
    title="Wallet link addresses"
  />
);

export default WalletLinkAddresses;
