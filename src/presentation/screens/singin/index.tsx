import {Button} from "@/presentation/components/ui/button.tsx";
import {useSingIn} from "@/presentation/screens/singin/useSingIn.ts";
import {Loader2Icon} from "lucide-react";

export function SingIn() {
    const {isAuthInitialized, isLoadingAuthOp, handleSignIn} = useSingIn()

    if (!isAuthInitialized) {
        return <div>Loading authentication status...</div>;
    }

    return (
        <div className="h-dvh overflow-hidden relative grid items-center">
            <div className="grid gap-8 place-items-center">
                <h2 className="text-center max-w-52 font-bold">Capture Events from multiple perspectives</h2>
                <Button onClick={handleSignIn} disabled={isLoadingAuthOp}>
                    {isLoadingAuthOp && <Loader2Icon className="animate-spin"/>}
                    Sign in
                    with Google</Button>
            </div>
        </div>
    )
}