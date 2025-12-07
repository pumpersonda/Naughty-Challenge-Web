import React, { useState, useEffect, createContext, useContext } from 'react';
import { Settings, ArrowLeft, Save, Trash2, User, ArrowDown, Target, Flame, ArrowRight, RotateCw } from 'lucide-react';

// --- TEMA Y CONFIGURACIÓN ---
const THEME = {
    colors: {
        bg: 'bg-gray-950',
        card: 'bg-gray-900',
        primary: 'text-red-600',
        primaryBg: 'bg-red-600',
        accent: 'text-yellow-500',
        accentBorder: 'border-yellow-500',
        text: 'text-gray-100',
        textSec: 'text-gray-400',
    }
};

const DEFAULT_DATA = {
    lucky_people: [
        "La persona con los calcetines más coloridos",
        "Quien tenga menos batería",
        "La persona más alta",
        "Alguien que tenga lentes",
        "El dueño de la casa"
    ],
    challenges: [
        { name: "Baile Prohibido", challenge: "Baila 30 segundos pegado a la pared.", level: 2, victim: false },
        { name: "Verdad Incómoda", challenge: "Confiesa tu peor cita.", level: 3, victim: false },
        { name: "Cosquillas", challenge: "Hazle cosquillas por 10 segundos a...", level: 1, victim: true },
        { name: "Intercambio", challenge: "Cambia una prenda con...", level: 4, victim: true },
    ]
};

// --- CONTEXTO (GAME ENGINE) ---
const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('NAUGHTY_GAME_DATA');
            if (stored) {
                setData(JSON.parse(stored));
            } else {
                setData(DEFAULT_DATA);
            }
        } catch (e) {
            console.error("Error loading local storage", e);
            setData(DEFAULT_DATA);
        }
    }, []);

    const saveData = (newData) => {
        try {
            localStorage.setItem('NAUGHTY_GAME_DATA', JSON.stringify(newData));
            setData(newData);
            return true;
        } catch (e) {
            alert("Error guardando datos");
            return false;
        }
    };

    const resetData = () => {
        localStorage.removeItem('NAUGHTY_GAME_DATA');
        setData(DEFAULT_DATA);
    };

    return (
        <GameContext.Provider value={{ data, saveData, resetData }}>
            {children}
        </GameContext.Provider>
    );
};

const useGame = () => useContext(GameContext);

// --- COMPONENTE: DIFICULTAD ---
const DifficultyLevel = ({ level }) => (
    <div className="flex space-x-0.5">
        {[...Array(5)].map((_, i) => (
            <Flame
                key={i}
                size={14}
                className={i < level ? "text-red-500 fill-red-500" : "text-gray-700"}
            />
        ))}
    </div>
);

// --- PANTALLA 1: HOME (REGALO) ---
const HomeScreen = ({ onOpen, onSettings }) => {
    return (
        <div className={`flex flex-col h-full w-full items-center justify-between py-10 px-6 ${THEME.colors.bg} relative overflow-hidden`}>
            {/* Botón Configuración */}
            <div className="absolute top-6 right-6 z-20">
                <button onClick={onSettings} className="p-3 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 transition backdrop-blur-sm">
                    <Settings className="text-gray-300" size={28} />
                </button>
            </div>

            {/* Título - Centrado en la parte superior */}
            <div className="text-center mt-12 sm:mt-16 lg:mt-20 animate-fade-in-down z-10 flex-shrink-0">
                <h1 className={`text-5xl sm:text-6xl md:text-8xl font-serif font-bold tracking-[0.2em] ${THEME.colors.accent} drop-shadow-lg`}>
                    NAUGHTY
                </h1>
                <h2 className={`text-lg sm:text-xl md:text-3xl font-serif font-light tracking-widest ${THEME.colors.text} mt-4 opacity-90`}>
                    GIFT CHALLENGE
                </h2>
            </div>

            {/* Regalo CSS - Ocupa el espacio central flexiblemente */}
            <div className="flex-1 flex items-center justify-center w-full my-8">
                <div
                    onClick={onOpen}
                    className="cursor-pointer group relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center transition-transform transform active:scale-95 z-10 select-none touch-manipulation"
                >
                    {/* Glow de fondo */}
                    <div className="absolute inset-0 bg-red-900/30 blur-[60px] sm:blur-[80px] rounded-full scale-75 animate-pulse"></div>

                    {/* Caja - Dimensiones relativas al contenedor */}
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 transition-all duration-300 group-hover:scale-105">
                        {/* Cuerpo Caja */}
                        <div className="absolute bottom-0 w-full h-[80%] bg-red-800 border-2 border-red-950 rounded-sm shadow-2xl flex justify-center items-center overflow-hidden">
                            <div className="w-[20%] h-full bg-yellow-500/90 shadow-sm"></div>
                        </div>
                        {/* Tapa Caja */}
                        <div className="absolute top-[10%] -left-[5%] w-[110%] h-[25%] bg-red-700 border-2 border-red-950 rounded-sm shadow-lg flex justify-center items-center z-10 transform md:group-hover:-translate-y-4 transition-transform duration-500">
                            <div className="w-[20%] h-full bg-yellow-500 shadow-sm"></div>
                        </div>
                        {/* Lazo */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[20%] z-20 flex justify-center pointer-events-none">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-yellow-500 rounded-full absolute -top-[50%] rotate-45 rounded-tl-none rounded-br-none bg-yellow-500/20"></div>
                            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-yellow-500 rounded-full absolute -top-[50%] -rotate-45 rounded-tr-none rounded-bl-none bg-yellow-500/20"></div>
                            <div className="w-4 h-3 sm:w-6 sm:h-4 lg:w-8 lg:h-5 bg-yellow-500 absolute -top-1 rounded shadow-md z-30"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / CTA - Pegado al fondo pero con espacio seguro */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0 mb-8 sm:mb-12">
                <p className={`text-sm sm:text-base lg:text-lg uppercase tracking-[0.2em] ${THEME.colors.textSec} animate-pulse font-medium text-center`}>
                    Toca el regalo para abrir
                </p>

                <div className="text-xs text-gray-600 tracking-widest font-mono">
                    WEB EDITION • 2025
                </div>
            </div>
        </div>
    );
};

// --- PANTALLA 2: REVELACIÓN ---
const RevealScreen = ({ onBack }) => {
    const { data } = useGame();
    const [state, setState] = useState({ actor: '', target: '', challenge: null });
    const [animating, setAnimating] = useState(true);

    // Lógica para elegir una carta
    const pickCard = () => {
        if (!data) return;
        const { lucky_people, challenges } = data;
        if (!lucky_people?.length || !challenges?.length) return;

        const challenge = challenges[Math.floor(Math.random() * challenges.length)];
        const hasVictim = challenge.victim === true;

        const idx1 = Math.floor(Math.random() * lucky_people.length);
        const actor = lucky_people[idx1];

        let target = '';
        if (hasVictim) {
            let idx2 = Math.floor(Math.random() * lucky_people.length);
            if (lucky_people.length > 1) {
                let attempts = 0;
                while (idx2 === idx1 && attempts < 10) {
                    idx2 = Math.floor(Math.random() * lucky_people.length);
                    attempts++;
                }
            }
            target = lucky_people[idx2];
        }
        setState({ actor, target, challenge });
    };

    // Carga inicial
    useEffect(() => {
        pickCard();
        setTimeout(() => setAnimating(false), 100);
    }, [data]);

    // Manejador del botón "Siguiente"
    const handleNext = () => {
        // 1. Iniciar animación de salida
        setAnimating(true);

        // 2. Esperar que termine la transición y cambiar datos
        setTimeout(() => {
            pickCard();
            // 3. Iniciar animación de entrada
            setTimeout(() => setAnimating(false), 50);
        }, 500); // 500ms debe coincidir con duration-500 de Tailwind
    };

    if (!state.challenge) return null;

    return (
        <div className={`flex flex-col h-full w-full ${THEME.colors.bg} overflow-hidden`}>
            {/* Header con botón de Salir (Home) */}
            <div className="absolute top-6 left-6 z-20">
                <button onClick={onBack} className="p-3 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 transition backdrop-blur-sm">
                    <ArrowLeft className="text-gray-300" size={24} />
                </button>
            </div>

            {/* Contenedor con scroll para pantallas pequeñas, centrado en grandes */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center min-h-0">

                <div className={`text-sm sm:text-base lg:text-xl tracking-[0.3em] font-bold ${THEME.colors.textSec} mb-8 uppercase flex-shrink-0 text-center`}>
                    La Misión Es...
                </div>

                {/* TARJETA CON ANIMACIÓN */}
                <div
                    className={`
            w-full max-w-sm sm:max-w-md lg:max-w-lg ${THEME.colors.card} rounded-xl shadow-2xl p-1 relative flex-shrink-0
            transition-all duration-500 ease-in-out transform
            ${animating ? 'opacity-0 scale-90 translate-x-10 blur-sm' : 'opacity-100 scale-100 translate-x-0 blur-0'}
          `}
                >
                    <div className={`border border-yellow-600/50 rounded-lg p-6 sm:p-10 flex flex-col items-center gap-6 sm:gap-8`}>

                        {/* ACTOR */}
                        <div className="flex flex-col items-center w-full">
                            <div className="flex items-center gap-2 mb-3 opacity-80">
                                <User size={16} className="text-yellow-500" />
                                <span className={`text-xs sm:text-sm font-bold tracking-widest ${THEME.colors.accent}`}>THE CHOSEN ONE</span>
                            </div>
                            <h3 className="font-serif text-xl sm:text-3xl italic text-center text-white font-medium leading-tight">
                                {state.actor}
                            </h3>
                        </div>

                        <ArrowDown size={24} className="text-gray-600 opacity-50 flex-shrink-0" />

                        {/* RETO */}
                        <div className="w-full bg-white/5 border border-white/10 rounded-lg p-6 text-center shadow-inner">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <span className={`text-xs sm:text-sm font-black tracking-widest uppercase ${THEME.colors.primary} truncate pr-2 text-left`}>
                  {state.challenge.name}
                </span>
                                <DifficultyLevel level={state.challenge.level} />
                            </div>
                            <p className={`text-lg sm:text-2xl font-medium leading-relaxed ${THEME.colors.accent}`}>
                                {state.challenge.challenge}
                            </p>
                        </div>

                        {/* VÍCTIMA */}
                        {state.challenge.victim && (
                            <>
                                <ArrowDown size={24} className="text-gray-600 opacity-50 flex-shrink-0" />
                                <div className="flex flex-col items-center w-full">
                                    <div className="flex items-center gap-2 mb-3 opacity-80">
                                        <span className={`text-xs sm:text-sm font-bold tracking-widest ${THEME.colors.accent}`}>THE VICTIM</span>
                                        <Target size={16} className="text-red-500" />
                                    </div>
                                    <h3 className="font-serif text-xl sm:text-3xl italic text-center text-white font-medium leading-tight">
                                        {state.target}
                                    </h3>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* BOTÓN SIGUIENTE (Fixed Footer) */}
            <div className="p-6 sm:p-10 w-full flex justify-center bg-gradient-to-t from-black via-black/80 to-transparent z-10 flex-shrink-0">
                <button
                    onClick={handleNext}
                    disabled={animating}
                    className={`
            w-full max-w-sm sm:max-w-md py-4 sm:py-5 rounded-full border border-yellow-600/50 bg-gray-900/90 backdrop-blur-sm
            flex items-center justify-center gap-3 text-yellow-500 font-bold tracking-widest text-sm sm:text-base
            hover:bg-yellow-500/10 hover:scale-105 active:scale-95 transition-all touch-manipulation shadow-lg
            ${animating ? 'opacity-50 cursor-wait' : 'opacity-100'}
          `}
                >
                    {animating ? 'BARAJANDO...' : 'SIGUIENTE'} <RotateCw size={20} className={animating ? "animate-spin" : ""} />
                </button>
            </div>
        </div>
    );
};

// --- PANTALLA 3: SETTINGS ---
const SettingsScreen = ({ onBack }) => {
    const { data, saveData, resetData } = useGame();
    const [jsonText, setJsonText] = useState('');
    const [mode, setMode] = useState('edit');

    useEffect(() => {
        if (data) setJsonText(JSON.stringify(data, null, 2));
    }, [data]);

    const handleSave = () => {
        try {
            const parsed = JSON.parse(jsonText);
            if (!parsed.lucky_people || !parsed.challenges) throw new Error("Formato inválido: Faltan llaves principales");
            if (saveData(parsed)) alert("¡Guardado correctamente!");
        } catch (e) {
            alert("Error en el JSON: " + e.message);
        }
    };

    const handleRestore = () => {
        if (confirm("¿Borrar todo y restaurar defecto?")) resetData();
    };

    return (
        <div className={`flex flex-col h-full w-full ${THEME.colors.bg} text-white`}>
            {/* Navbar */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50 flex-shrink-0">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition"><ArrowLeft size={24} /></button>
                <span className="font-bold tracking-widest text-sm sm:text-lg text-yellow-500 uppercase">Configuración</span>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 w-full max-w-4xl mx-auto flex flex-col">
                {/* Tabs */}
                <div className="flex bg-gray-900 rounded-lg p-1 mb-6 border border-white/5 flex-shrink-0">
                    <button
                        onClick={() => setMode('edit')}
                        className={`flex-1 py-3 text-sm font-bold rounded-md transition ${mode === 'edit' ? 'bg-gray-800 text-white shadow' : 'text-gray-500'}`}
                    >
                        EDITAR
                    </button>
                    <button
                        onClick={() => setMode('preview')}
                        className={`flex-1 py-3 text-sm font-bold rounded-md transition ${mode === 'preview' ? 'bg-gray-800 text-white shadow' : 'text-gray-500'}`}
                    >
                        PREVIEW
                    </button>
                </div>

                {mode === 'edit' ? (
                    <div className="flex-1 flex flex-col min-h-0 space-y-6">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-2 flex-1 flex flex-col shadow-inner">
                            <p className="text-xs text-gray-500 mb-2 px-2 pt-2 uppercase tracking-wide flex-shrink-0">Código JSON:</p>
                            {/* Textarea flexible que ocupa todo el espacio restante */}
                            <textarea
                                value={jsonText}
                                onChange={(e) => setJsonText(e.target.value)}
                                className="w-full flex-1 bg-black/30 text-sm font-mono text-green-400 p-4 rounded outline-none border border-transparent focus:border-yellow-600/50 resize-none min-h-[300px]"
                                spellCheck="false"
                                autoCapitalize="none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-shrink-0 pb-4">
                            <button
                                onClick={handleSave}
                                className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 text-black font-bold rounded-lg flex items-center justify-center gap-2 transition touch-manipulation shadow-lg"
                            >
                                <Save size={20} /> GUARDAR
                            </button>

                            <button
                                onClick={handleRestore}
                                className="w-full py-4 bg-gray-800 text-red-400 font-bold rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-700 active:bg-gray-600 transition touch-manipulation border border-red-900/30"
                            >
                                <Trash2 size={18} /> RESTAURAR
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 pb-10">
                        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-green-500 shadow-lg">
                            <h3 className="font-bold text-xl text-white">Resumen</h3>
                            <p className="text-gray-400 text-base mt-2">
                                Filtros activos: <span className="text-white font-mono">{data?.lucky_people?.length}</span>
                            </p>
                            <p className="text-gray-400 text-base">
                                Retos activos: <span className="text-white font-mono">{data?.challenges?.length}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-full">
                                <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mt-4 mb-4">Lista de Retos</h4>
                            </div>
                            {data?.challenges?.map((c, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-bold text-gray-200">{c.name}</span>
                                        <DifficultyLevel level={c.level} />
                                    </div>
                                    <span className="text-sm text-gray-400">{c.challenge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

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
                <RevealScreen onBack={() => setView('home')} />
            )}
            {view === 'settings' && (
                <SettingsScreen onBack={() => setView('home')} />
            )}
        </div>
    );
};

export default function App() {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
}