#!/usr/bin/env node

const program = require("commander");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const compress = require("graphql-query-compress");
const uuid = require("uuid/v4");

let sourcePath = "";
let destinationPath = "";

program
  .version("1.0.0", "-v, --version")
  .arguments("<src> <dst>")
  .action((src, dst) => {
    sourcePath = src;
    destinationPath = dst;
  })
  .parse(process.argv);

if (!sourcePath || !fs.existsSync(sourcePath)) {
  console.error("no source path given!");
  process.exit(1);
}

if (!destinationPath || !fs.existsSync(destinationPath)) {
  console.error("no destination path given!");
  process.exit(1);
}

const filePathList = glob.sync("**/*.graphql", {
  cwd: sourcePath,
  absolute: true
});

let queryMap = {};

for (let i = 0; i < filePathList.length; i++) {
  const filePath = filePathList[i];
  const content = fs.readFileSync(filePath, {
    encoding: "utf-8"
  });
  const query = compress(content);
  queryMap[query] = uuid();
}

let writePath = destinationPath;
if (fs.lstatSync(writePath).isDirectory()) {
  writePath = path.join(writePath, "output.json");
}

const writeContent = JSON.stringify(queryMap);
fs.writeFileSync(writePath, writeContent);
