var {lookup} = require("..");
lookup({
    root: __dirname,
    type:"dir"
}).then(console.log)