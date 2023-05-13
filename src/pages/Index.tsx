import { AppLink } from "../components/AppLink";

export function Index () {
    return <div>
        <h1>Index</h1>
        <p>
            <AppLink to="/list" state={{ tab: 1}}>List</AppLink><br />
            <AppLink to="/list1" state={{ tab: 1}}>List1</AppLink>
        </p>
    </div>
}