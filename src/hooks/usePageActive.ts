import { AppContext } from "../components/AppProvider"
import { useContext } from "react";

export const usePageActive = () => {
    const ctx = useContext(AppContext)

    return ctx.active
}