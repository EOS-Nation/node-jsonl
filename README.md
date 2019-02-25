# `node-jsonl`

> NodeJS Iterate over JSONL [Line Delimited JSON](https://en.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON)

## Install

Using Yarn:

```bash
yarn add node-jsonl
```

or using NPM:

```bash
npm install --save node-jsonl
```

## Import Module

**CommonJS**

```js
const jsonl = require("node-jsonl");
```

**Typescript (ES6)**

```js
import * as jsonl from "node-jsonl";
```

## Quickstart

**example.jsonl**

```json
{"name":"joe"}
{"name":"bob"}
{"name":"frank"}
{"name":"marie"}
```

### Read JSONL one line at a time

```ts
const rl = jsonl.readlines<T>(filepath)

while (true) {
    const {value, done} = await rl.next()
    if (done) break;
    console.log(value); // value => T
}
```

### Read JSONL multiple lines at a time

```ts
const rl = jsonl.readlinesChunk<T>(filepath, maxlines)

while (true) {
    const {value, done} = await rl.next()
    if (done) break;
    console.log(value); // value => Array<T>
}
```
