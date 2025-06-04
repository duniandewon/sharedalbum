import {NavLink, Outlet} from "react-router";
import {cn} from "@/core/utils/cn.ts";
import {buttonVariants} from "@/presentation/components/ui/button.tsx";
import {CalendarDays, House} from "lucide-react";

const routes = [
    {
        to: "/",
        icon: House
    },
    {
        to: "/events",
        icon: CalendarDays
    }
]

export function BottomNavLayout() {
    return (
        <div className="h-screen w-screen grid grid-rows-[1fr_auto] overflow-hidden">
            <main>
                <Outlet/>
            </main>
            <nav className="flex justify-between px-8 py-4 bg-secondary">
                {
                    routes.map(({icon, to}) => {
                            const Icon = icon
                            return (
                                <NavLink key={to} to={to} className={({isActive}) => cn(buttonVariants({
                                    variant: isActive ? "default" : "outline",
                                    size: "icon"
                                }))}>
                                    <Icon/>
                                </NavLink>
                            )
                        }
                    )
                }
            </nav>
        </div>
    )
}