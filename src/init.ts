import { Collection } from "mongodb";

export const initDatasInsert = async (collection:Collection) => {

  const testDatas = [
    {
      name: "MoterCycle",
      colors: ["red", "blue", "green", "three"],
      like: true,
    },
    {
      name: "Car",
      colors: ["blue", "red", "silver"],
      like: false,
    },
    {
      name: "Bike",
      colors: ["yellow", "white", "silver"],
      like: false,
    },
  ];
  await collection.insertMany(testDatas);
};