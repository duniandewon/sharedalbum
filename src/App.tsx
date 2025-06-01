import {ThemeProvider} from "@/presentation/components/theme-provider.tsx";
import {AppRoutes} from "@/presentation/routes/AppRoutes.tsx";
import {AuthProvider} from "@/presentation/context/authContext.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="sharedalbum-ui-theme">
            <AuthProvider>
                <AppRoutes/>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
