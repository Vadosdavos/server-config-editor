import clientPromise from "@/lib/mongodb";

export const getServerConfig = async () => {
  const client = await clientPromise;
  const db = client.db("config-editor");
  const collections = (await db.collections())
    .map((collection) => collection.collectionName).filter((item) => item !== "admins");

  const config = (await Promise.all(collections
    .map((collectionName) => db.collection(collectionName).find({}).toArray())))
    .reduce((acc, document, index) => ({
      ...acc,
      [collections[index]]: document,
    }), {});

  return config;
};
