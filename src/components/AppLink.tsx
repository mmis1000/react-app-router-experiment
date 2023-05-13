import { Link, useLocation } from "react-router-dom";


export function AppLink (props: Parameters<typeof Link>[0]) {
    const currentLocation = useLocation()

    if (props.replace === true) {
        const overrides = {
            state: {
                ...currentLocation.state,
                ...(props.state ? props.state : {})
            }
        }
        return <Link {...props} {...overrides} />
    } else {
        // disable the dumb 'replace if same path behavior'
        const overrides = {
            replace: false
        }
        return <Link {...props} {...overrides} />
    }
}