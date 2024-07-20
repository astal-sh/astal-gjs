import { Variable } from "astal"

export const date = Variable("").poll(1000, 'date "+%H:%M:%S %b %e."')
