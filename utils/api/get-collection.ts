import clientPromise from "@/lib/mongodb";

export const getDbCollection = async (collectionName: string) => {
  const client = await clientPromise;
  const db = client.db("config-editor");

  return db.collection(collectionName);
};
