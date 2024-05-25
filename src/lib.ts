// the source is bundled with esbuild, `src` will point to the root of the project
export const src = "/" + import.meta.url.split("/").slice(3, -1).join("/")

