import { useLocation } from "react-router-dom"
import { AppContext } from "../components/AppProvider"
import { useContext } from "react";

export const useAppLocation = () => {
    const ctx = useContext(AppContext)
    const location = useLocation()

    if (ctx.inAppContext) {
        return ctx.location
    } else {
        return location
    }
}