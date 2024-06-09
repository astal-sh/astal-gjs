import { Variable } from "astal"

// the source is bundled with esbuild, `src` will point to the root of the project
export const src = "/" + import.meta.url.split("/").slice(3, -1).join("/")

export const date = Variable("").poll(1000, 'date "+%H:%M:%S %b %e."')
