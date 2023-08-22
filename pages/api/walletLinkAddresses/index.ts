import { getDbCollection } from "@/utils/api/get-collection";
import type { NextApiRequest, NextApiResponse } from "next";

export type WalletLinkAddress = {
  _id: string;
  label: string;
  buildNumber: number;
  tag: string;
  walletLinkTag: string;
  serverUnderMaintenance: boolean;
  serverIds: string[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const collection = await getDbCollection("walletLinkAddresses");
    const { method } = req;

    switch (method) {
      case "GET": {
        const walletLinkAddresses = await collection.find({}).toArray();
        res.status(200).json(walletLinkAddresses);
        break;
      }
      case "POST": {
        const result = await collection.insertOne(JSON.parse(req.body));
        res.status(201).json(result);
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};
