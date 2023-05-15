import { AppOutlet } from "../components/AppProvider";
import { useAppLocation } from "../hooks/useAppLocation";

export function PageWrap () {
    const location = useAppLocation()
    const state = location.state
    return <div style={{ border: '1px solid black' }}>
        <h1>Wrap</h1>
        <p>
            This is a wrapper page for {location.pathname} with state {JSON.stringify(state)}
        </p>
        <AppOutlet />
    </div>
}