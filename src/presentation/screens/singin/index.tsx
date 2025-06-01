import {Button} from "@/presentation/components/ui/button.tsx";
import {useSingIn} from "@/presentation/screens/singin/useSingIn.ts";

export function SingIn() {
    const {isAuthInitialized, isLoadingAuthOp, handleSignIn} = useSingIn()

    if (!isAuthInitialized) {
        return <div>Loading authentication status...</div>; // Or a spinner
    }

    return (
        <div className="h-screen w-screen overflow-hidden relative grid items-end">
            <div className="grid gap-8 place-items-center">
                <h2 className="text-center max-w-52 font-bold">Capture Events from multiple perspectives</h2>
                <Button onClick={handleSignIn} disabled={isLoadingAuthOp}>Sign in with Google</Button>
            </div>
        </div>
    )
}