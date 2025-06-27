import {Route, Routes} from "react-router";

import {ProtectedRoute} from "@/presentation/components/layout/ProtectedRoute.tsx";
import {BottomNavLayout} from "@/presentation/components/layout/bottom-nav-layout.tsx";

import {Home} from "@/presentation/screens/home";
import {EventsHistory} from "@/presentation/screens/events";
import {SingIn} from "@/presentation/screens/singin";
import {EditEvent} from "@/presentation/screens/edit-event";
import {CurrentEvent} from "@/presentation/screens/current-event";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<SingIn/>}/>
            <Route element={<CurrentEvent/>} path="event/:eventShareId"/>
            <Route element={<ProtectedRoute/>}>
                <Route element={<BottomNavLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="events-history" element={<EventsHistory/>}/>
                </Route>
                <Route path="edit-event" element={<EditEvent/>}/>
            </Route>
        </Routes>
    )
}