import { getDbCollection } from "@/utils/api/get-collection";
import { BSON, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const collection = await getDbCollection("walletLinkAddresses");
    const { method } = req;
    const { id } = req.query;
    if (!id || Array.isArray(id)) {
      res.status(400).json({ message: "Bad wallet link address id" });
      return;
    }
    const walletLinkAddressId = new ObjectId(id);

    switch (method) {
      case "GET": {
        const walletLinkAddress = await collection.findOne({ _id: walletLinkAddressId });
        if (!walletLinkAddress) {
          res.status(404).json({ message: "Wallet link address not found" });
        } else {
          res.status(200).json(walletLinkAddress);
        }
        break;
      }
      case "PUT": {
        const { _id, ...body } = JSON.parse(req.body);
        const result = await collection.updateOne({ _id: walletLinkAddressId }, { $set: body });
        res.status(201).json(result);
        break;
      }
      case "DELETE": {
        const result = await collection.deleteOne({ _id: walletLinkAddressId });
        res.status(200).json(result);
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof BSON.BSONError) {
      res.status(400).json({ message: "Bad wallet link address id" });
    }
    res.status(500).send("Internal error");
  }
};
