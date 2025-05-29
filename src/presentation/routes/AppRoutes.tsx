import {Route, Routes} from "react-router";

import {BottomNavLayout} from "@/presentation/components/layout/bottom-nav-layout.tsx";

import {Home} from "@/presentation/screens/home";
import {Events} from "@/presentation/screens/events";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<BottomNavLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="events" element={<Events/>}/>
            </Route>
        </Routes>
    )
}