import { Location, matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from 'react'
import { routes as routeMap } from "./routes";
import { ReactElement } from "react";
import { Fragment } from "react";
import { PAGE_STATE_MARKER } from "./utils/route";

export function Layout () {
    const currentLocation = useLocation()
    const currentLiveHistoryIndex: number | undefined = currentLocation.state?.index

    const routes = matchRoutes(routeMap, currentLocation)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const currentLiveRoute = routes?.[1]!.route.element as ReactElement

    const maxHistoryIndex = useRef<number>()
    const lastRenderedIndex = useRef<number>()

    if (maxHistoryIndex.current == null) {
        if (currentLiveHistoryIndex != null) {
            maxHistoryIndex.current = currentLiveHistoryIndex
        }
    }

    interface StackFrame {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state: { [k: string]: any },
        component: ReactElement
    }

    const [pageStack, setPageStack] = useState<StackFrame[]>()
    const renderedStack = useRef<StackFrame[]>()
    const navigate = useNavigate();

    const lastRanLocation = useRef<Location>()
    useLayoutEffect(() => {
        if (lastRanLocation.current === currentLocation) {
            return
        }
        lastRanLocation.current = currentLocation

        if (currentLiveHistoryIndex == null) {
            if (maxHistoryIndex.current != null) {
                navigate({...currentLocation}, {replace: true, state: {...currentLocation.state, index: maxHistoryIndex.current + 1 }})
                console.log('set maxHistoryIndex to ' + (maxHistoryIndex.current + 1), currentLocation.state)
                maxHistoryIndex.current += 1
            } else {
                navigate({...currentLocation}, {replace: true, state: {...currentLocation.state, index: 1 }})
                navigate(0)
                console.log('set maxHistoryIndex to 1')
                maxHistoryIndex.current = 1
            }
            return
        }

        if (maxHistoryIndex.current != null && currentLiveHistoryIndex > maxHistoryIndex.current) {
            maxHistoryIndex.current = currentLiveHistoryIndex
        }

        if (lastRenderedIndex.current == null || currentLiveHistoryIndex === lastRenderedIndex.current) {
            if (renderedStack.current == null) {
                console.log('== init ==' + ` ${currentLiveHistoryIndex}`)
                const stack = [
                    {
                        state: currentLocation.state,
                        component: currentLiveRoute
                    }
                ]
                setPageStack(stack)
                renderedStack.current = stack
            } else {
                console.log('== repl ==' + ` ${currentLiveHistoryIndex}`)
                const patchedStack = renderedStack.current.slice(0, renderedStack.current.length - 1).concat([
                    {
                        state: currentLocation.state,
                        component: currentLiveRoute
                    }
                ])
                setPageStack(patchedStack)
                renderedStack.current = patchedStack
            }
        } else if (currentLiveHistoryIndex > lastRenderedIndex.current) {
            console.log('== next ==' + ` ${lastRenderedIndex.current} -> ${currentLiveHistoryIndex}`)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const patchedStack = renderedStack.current!.concat([
                {
                    state: currentLocation.state,
                    component: currentLiveRoute
                }
            ])
            setPageStack(patchedStack)
            renderedStack.current = patchedStack
        } else {
            console.log('== prev ==' + ` ${lastRenderedIndex.current} -> ${currentLiveHistoryIndex}`)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const patchedStack = renderedStack.current!.slice(0, renderedStack.current!.length - 1)
            if (patchedStack.length === 0) {
                const initialStack = [
                    {
                        state: currentLocation.state,
                        component: currentLiveRoute
                    }
                ]
                setPageStack(initialStack)
                renderedStack.current = initialStack
                lastRenderedIndex.current = currentLiveHistoryIndex
                return
            }
            setPageStack(patchedStack)
            renderedStack.current = patchedStack
        }
        lastRenderedIndex.current = currentLiveHistoryIndex
    }, [currentLiveHistoryIndex, currentLiveRoute, currentLocation, navigate])

    console.log(renderedStack)
    return <>
        <div id="detail">
            {
                pageStack?.map((frame, index) => {
                    const testFor = frame.component.props.state
                    if (testFor === PAGE_STATE_MARKER) {
                        const patched = {
                            ...frame.component,
                            props: {
                                ...frame.component.props,
                                state: frame.state
                            }
                        }
                        return <Fragment key={index}>{patched}</Fragment>
                    } else {
                        return <Fragment key={index}>{frame.component}</Fragment>
                    }
                })
            }
        </div>
    </>
}