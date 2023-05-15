import { AppLink } from "../components/AppLink";
import { usePageActive } from "../hooks/usePageActive";

export function Index () {
    console.log('index run')
    const active = usePageActive()
    return <div>
        <h1>Index</h1>
        <p>
            This page is {active ? 'activated' : 'deactivated' }. <br />
            <AppLink to="/list" state={{ tab: 1}}>List</AppLink><br />
            <AppLink to="/list1" state={{ tab: 1}}>List1</AppLink>
        </p>
    </div>
}