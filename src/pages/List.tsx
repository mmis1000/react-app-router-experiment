import { AppLink } from "../components/AppLink";
import { useAppLocation } from "../hooks/useAppLocation";
import { usePageActive } from "../hooks/usePageActive";

export function List () {
    const location = useAppLocation()
    const active = usePageActive()
    return <div>
        <h1>List</h1>
        <p>
            Current tab: {location.state.tab} <br />  
            This page is {active ? 'activated' : 'deactivated' }. <br />
            <AppLink to="/list" state={{ tab: 1}}>List</AppLink> <br />
            <AppLink to="/list1" state={{ tab: 1}}>List1</AppLink><br />
            <AppLink to="/list" state={{ tab: 2}} replace>To tab 2</AppLink>
            <AppLink to="/list" state={{ tab: 1}} replace>To tab 1</AppLink>
        </p>
    </div>
}