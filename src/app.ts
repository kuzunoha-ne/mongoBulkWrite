import { MongoClient, Collection } from "mongodb";

import { initDatasInsert } from "./init";
import { bulktest } from "./bulks";

const uri = 'mongodb://127.0.0.1:27017';
const dbName = '__test__';
const collectionName = 'sandboxCollection';

(async () => {
  const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection: Collection = db.collection(collectionName);

  await initDatasInsert(collection);
  await bulktest(collection);
  console.log(await (collection.find()).toArray());

  await collection.drop();
  await client.close();
})();
