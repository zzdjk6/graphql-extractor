# graphql-extractor

## Overview

This is a command line tool to scan your ".graphql" files, and then build a `map` json file from compressed `query` to `uuid`, which can be used as `persisted query` later on.

## How to use?

```bash
npm install -g graphql-extractor

graphql-extract ./tests/fixtures/ ./tests/output/a.json
```

## Example

see "tests/fixtures" for examaple ".graphql" files and "tests/output" for example `output.json`.