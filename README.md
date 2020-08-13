# `node-fse-walk`

> fs-extra readDir walker

## Usage

```js
const { lookup } = require("node-fse-walk");

lookup({
    root: __dirname+"/folder",
    type:"dir" // or 'file'
})
.then((p, stats)=>{
    console.log(p, stats.isDirectory())
});

```

```js
const { Walk } = require("node-fse-walk");

const fileList = [];
const dirList = [];

Walk.go(__dirname)
.filter(p => /^(?!(__))/.test(p)) // ignore file name start with __
.on("file", p => fileList.push(p))
.on("dir", p => dirList.push(p))
.on('error', function(err){
    console.error(err.message)
})
.on('end', function(){
    console.log(fileList, dirList);
})

```
