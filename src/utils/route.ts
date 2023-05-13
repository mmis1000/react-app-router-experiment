export interface AppRouteParam {
    state: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string | number]: any
    }
}

export const PAGE_STATE_MARKER = {}

export const DEFAULT_APP_ROUTE_PARAM: AppRouteParam = {
    state: PAGE_STATE_MARKER
}