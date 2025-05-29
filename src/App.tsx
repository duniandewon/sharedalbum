import {ThemeProvider} from "@/presentation/shared/components/theme-provider.tsx";
import {AppRoutes} from "@/presentation/routes/AppRoutes.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="sharedalbum-ui-theme">
            <AppRoutes/>
        </ThemeProvider>
    )
}

export default App
