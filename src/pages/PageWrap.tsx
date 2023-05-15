import { AppOutlet } from "../components/AppProvider";
import { useAppLocation } from "../hooks/useAppLocation";
import { usePageActive } from "../hooks/usePageActive";

export function PageWrap () {
    const location = useAppLocation()
    const state = location.state
    const active = usePageActive()
    return <div style={{ border: active ? '1px solid green' : '1px solid grey', opacity: active ? '1' : '0.5' }}>
        <h1>Wrap</h1>
        <p>
            This is a wrapper page for {location.pathname} with state {JSON.stringify(state)}
        </p>
        <AppOutlet />
    </div>
}