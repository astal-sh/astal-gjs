import esbuild from 'esbuild'

const target = "dist/astal.js"

await esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: target,
    format: "esm",
    external: [
        "console",
        "system",
        "cairo",
        "gettext",
        "file://*",
        "gi://*",
        "resource://*",
    ]
})
