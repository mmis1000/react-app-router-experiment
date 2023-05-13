import { AppLink } from "../components/AppLink";
import { AppRouteParam } from "../utils/route";

export function List (params: AppRouteParam) {
    return <div>
        <h1>List</h1>
        <p>
            Current tab: {params.state.tab} <br />  
            <AppLink to="/list" state={{ tab: 1}}>List</AppLink> <br />
            <AppLink to="/list1" state={{ tab: 1}}>List1</AppLink><br />
            <AppLink to="/list" state={{ tab: 2}} replace>To tab 2</AppLink>
        </p>
    </div>
}