import {Button} from "@/presentation/shared/components/ui/button.tsx";
import {Input} from "@/presentation/shared/components/ui/input.tsx";
import {ThemeProvider} from "@/presentation/shared/components/theme-provider.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="sharedalbum-ui-theme">
            <form onSubmit={e => e.preventDefault()} className="grid gap-4">
                <Input type="text"/>
                <Button>Click Me!</Button>
            </form>
        </ThemeProvider>
    )
}

export default App
