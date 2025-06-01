import {useEffect} from "react"

import {useAuthContext} from "@/presentation/context/authContext.tsx";
import {useLocation, useNavigate} from "react-router";

export function useSingIn() {
    const {signInWithGoogle, isAuthenticated, isLoadingAuthOp, authError, isAuthInitialized} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isAuthInitialized && isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, isAuthInitialized, navigate, from]);

    const handleSignIn = async () => {
        await signInWithGoogle();
    };

    return {
        handleSignIn,
        isLoadingAuthOp,
        isAuthInitialized,
        authError
    }
}
