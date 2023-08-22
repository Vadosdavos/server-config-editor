import { getServerConfig } from "@/utils/api/get-config";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const config = await getServerConfig();

    res.status(200).json(config);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
};
