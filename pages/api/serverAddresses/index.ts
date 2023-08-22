import { getDbCollection } from "@/utils/api/get-collection";
import type { NextApiRequest, NextApiResponse } from "next";

export type ServerAddress = {
  _id: string;
  id: string;
  ipv4Address: string;
  ipv6Address: string;
  port: number;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const collection = await getDbCollection("serverAddresses");
    const { method } = req;

    switch (method) {
      case "GET": {
        const serversAdresses = await collection.find({}).toArray();
        res.status(200).json(serversAdresses);
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
