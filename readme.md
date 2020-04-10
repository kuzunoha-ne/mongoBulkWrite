# QuickStart

```
$ docker-compose up -d
$ npm run build
$ npm run start
```

## 公式ドキュメントはこちら

#### MongoDB本体のドキュメント
https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/

#### NodeのMongoDBドライバーのドキュメント
http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#bulkWrite

## version
packageのversionはこんな感じです。
```json
{
  "dependencies": {
    "mongodb": "^3.5.5"
  },
  "devDependencies": {
    "typescript": "^3.8.3",
    "@types/mongodb": "^3.5.5"
  }
}
```

docker-compose.ymlはこちら
```yml
version: "3"
services: 
    mongo:
        image: mongo:4.2.2-bionic
        ports:
          - 27017:27017
```

## Bulk Writeって日本語でそもそもどんな意味なのだろう
Googleの翻訳結果では以下のようになりました。

`Bulk Write` => `一括書き込み`

一括書き込み…そのまんまの意味だなぁ。

すなわち、同じコレクション内で複数の処理をMongoDBに依頼出来るということになるみたいです。

https://translate.google.co.jp/?hl=ja#view=home&op=translate&sl=en&tl=ja&text=Bulk%20Write

## さっそく使ってみる
今回は事前にこのようなデータを入れてみる。
```typescript
[
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
```

これらのドキュメントを以下のように変更しようと思います。

1. nameがKickBoardのドキュメントを追加
1. nameがCarのlikeプロパティをtrueに更新
1. colorsプロパティにblueを持つドキュメントについてaonanokaプロパティ(true)を追加

これらをBulkWriteで書き込むことが出来ます。上記の変更を行うようなそれぞれのクエリを書き、それらクエリを配列に入れて`bulkwrite`メソッドに渡せばよいのです。

```typescript
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
await collection.bulkWrite(queries);;
```
最終的にはこのコレクションはこのようになります。`_id`はMongoDBが勝手に発番する一意な番号です。

https://docs.mongodb.com/manual/reference/method/ObjectId/

```typescript
[
  {
    _id: 5e9095000d4f3b2309188f89,
    name: 'MoterCycle',
    colors: [ 'red', 'blue', 'green', 'three' ],
    like: true,
    aonanoka: true
  },
  {
    _id: 5e9095000d4f3b2309188f8a,
    name: 'Car',
    colors: [ 'blue', 'red', 'silver' ],
    like: true,
    aonanoka: true
  },
  {
    _id: 5e9095000d4f3b2309188f8b,
    name: 'Bike',
    colors: [ 'yellow', 'white', 'silver' ],
    like: false
  },
  {
    _id: 5e9095000d4f3b2309188f8c,
    name: 'KickBoard',
    colors: [ 'silver', 'black' ],
    like: false
  }
]
```

思ったとおり、やりたいことが出来たかとおもいます。