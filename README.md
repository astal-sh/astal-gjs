# Astal.js

Starter project to get you started with gjs+libastal

## dependencies

- [libastal](https://github.com/astal-sh/libastal)
- gjs, as the runtime
- node, for running esbuild
- npm, for getting packages

```bash
git clone https://github.com/astal-sh/astal-gjs.git
cd astal-gjs
npm i
npm run types # this might take a while
```

Transpiling and running

```bash
npm run build
gjs -m dist/astal.js
```
