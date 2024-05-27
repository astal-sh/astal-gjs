# Astal.js

Starter project to get you started with gjs+libastal

## dependencies

- [libastal](https://github.com/astal-sh/libastal)
- gjs, as the runtime
- node, for running esbuild
- npm, for getting packages

## Arch

```bash
yay libastal-git npm gjs

```

## NixOS

There is flake included

```bash
nix develop
```

## developing

```bash
git clone https://github.com/astal-sh/astal-gjs.git
cd astal-gjs
npm i
npm run types # this might take a while
```

Transpiling and running

```bash
npm run build
gjs -m dist/main.js
```

> [!NOTE]
> You don't have to use ts or jsx, you can still use plain js
> by calling the widget function just like in ags
