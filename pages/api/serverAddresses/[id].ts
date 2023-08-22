import { getDbCollection } from "@/utils/api/get-collection";
import { BSON, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const collection = await getDbCollection("serverAddresses");
    const { method } = req;
    const { id } = req.query;
    if (!id || Array.isArray(id)) {
      res.status(400).json({ message: "Bad server address id" });
      return;
    }
    const serversAdressId = new ObjectId(id);

    switch (method) {
      case "GET": {
        const serversAdress = await collection.findOne({ _id: serversAdressId });
        if (!serversAdress) {
          res.status(404).json({ message: "Server adress not found" });
        } else {
          res.status(200).json(serversAdress);
        }
        break;
      }
      case "PUT": {
        const { _id, ...body } = JSON.parse(req.body);
        const result = await collection.updateOne({ _id: serversAdressId }, { $set: body });
        res.status(201).json(result);
        break;
      }
      case "DELETE": {
        const result = await collection.deleteOne({ _id: serversAdressId });
        res.status(200).json(result);
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof BSON.BSONError) {
      res.status(400).json({ message: "Bad server address id" });
    }
    res.status(500).send("Internal error");
  }
};
