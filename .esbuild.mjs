import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/main'],
    bundle: true,
    outdir: "dist",
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
