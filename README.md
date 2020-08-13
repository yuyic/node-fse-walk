# `node-merge-json`

> merge json file

## Usage

```
const mergeJson = require("node-merge-json");

mergeJson({
    target:__dirname + "a.json",
    dest: __dirname + "output.json",
    deepMerge: true,
    sources: [
        __dirname + "b.json",
        __dirname + "c.json",
        __dirname + "d.json"
    ]
})

```
