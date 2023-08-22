/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
