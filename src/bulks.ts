import { Collection } from "mongodb";

export const bulktest = async (collection:Collection) => {
  const queries = [
    // nameがKickBoardのドキュメントを追加
    {
      insertOne: {
        document: {
          name: "KickBoard",
          colors: ["silver", "black"],
          like: false,
        },
      },
    },
    // nameがCarのlikeプロパティをtrueに更新
    {
      updateOne: {
        filter: { name: "Car" },
        update: { $set: { like: true } },
      },
    },
    // colorsプロパティにblueを持つドキュメントについてaonanokaプロパティ(true)を追加
    {
      updateMany: {
        filter: { colors: "blue" },
        update: { $set: { aonanoka: true } },
      },
    },
  ];
  await collection.bulkWrite(queries);
};