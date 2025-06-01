import {Navigate, Outlet, useLocation} from "react-router";
import {useAuthContext} from "@/presentation/context/authContext.tsx";

export function ProtectedRoute() {
    const { isAuthenticated } = useAuthContext();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return <Outlet />;
}