import {useState} from 'react';
import {GameProvider} from "./provider/GameProvider.tsx";
import HomeScreen from "./components/HomeScreen.tsx";
import RevealScreen from "./components/RevealScreen.tsx";
import SettingsScreen from "./components/SettingsScreen.tsx";


// --- APP MAIN LAYOUT ---
const AppContent = () => {
    const [view, setView] = useState('home');

    return (
        // CONTENEDOR PRINCIPAL: Fullscreen real (100dvh para móviles)
        <div className="fixed inset-0 w-full h-[100dvh] bg-gray-950 font-sans text-white overflow-hidden">
            {view === 'home' && (
                <HomeScreen
                    onOpen={() => setView('game')}
                    onSettings={() => setView('settings')}
                />
            )}
            {view === 'game' && (
                <RevealScreen onBack={() => setView('home')}/>
            )}
            {view === 'settings' && (
                <SettingsScreen onBack={() => setView('home')}/>
            )}
        </div>
    );
};

export default function App() {
    return (
        <GameProvider>
            <AppContent/>
        </GameProvider>
    );
}