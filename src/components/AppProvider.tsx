import { ReactNode, createContext, useContext, useMemo } from "react";
import { Outlet, RouteObject, matchRoutes, useLocation } from "react-router-dom";

interface AppContextData {
    active: boolean,
    inAppContext: boolean,
    routes:  NonNullable<ReturnType<typeof matchRoutes<RouteObject>>>,
    location: ReturnType<typeof useLocation>
}
/**
 * Don't use it directly in page, just don't
 * @internal
 */
export const AppContext = createContext<AppContextData>({
    inAppContext: false,
    active: true,
    routes: [],
    location: {
        key: 'default',
        state: {},
        pathname: '/',
        search: '',
        hash: ''
    }
})

/**
 * Don't use it directly in page, use AppOutlet instead
 * @internal
 */
export const AppProvider = ({
    active,
    routes,
    location,
    children
}: {
    active: boolean,
    routes: AppContextData['routes'],
    location: AppContextData['location'],
    children: ReactNode
}) => {
    const context = useMemo(() => ({
        inAppContext: true,
        active,
        routes,
        location
    }), [
        active,
        routes,
        location
    ])
    return <AppContext.Provider value={context}>
        {children}
    </AppContext.Provider>
}

export const AppOutlet = () => {
    const ctx = useContext(AppContext)
    // routes[0] is current, routes[1] is the child
    const componentToRender = ctx.routes[1]?.route?.element

    const childRoutes = useMemo(() => ctx.routes.slice(1), [ctx])

    if (ctx.inAppContext) {
        if (componentToRender) {
            return <AppProvider active={ctx.active} routes={childRoutes} location={ctx.location}>
                {componentToRender}
            </AppProvider>
        } else {
            return null
        }
    } else {
        return <Outlet />
    }
}
