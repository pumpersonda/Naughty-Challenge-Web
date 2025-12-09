// --- PANTALLA 1: HOME (REGALO) ---
import THEME from "../theme.ts";
import {Settings} from "lucide-react";

interface HomeScreenProps {
    onOpen: () => void;
    onSettings: () => void;
}

const HomeScreen = ({onOpen, onSettings}: HomeScreenProps) => {
    return (
        <div
            className={`flex flex-col h-full w-full items-center justify-between py-10 px-6 ${THEME.colors.bg} relative overflow-hidden`}>
            {/* Botón Configuración */}
            <div className="absolute top-6 right-6 z-20">
                <button onClick={onSettings}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 transition backdrop-blur-sm">
                    <Settings className="text-gray-300" size={28}/>
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
                    <div
                        className="absolute inset-0 bg-red-900/30 blur-[60px] sm:blur-[80px] rounded-full scale-75 animate-pulse"></div>

                    {/* Caja - Dimensiones relativas al contenedor */}
                    <div
                        className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 transition-all duration-300 group-hover:scale-105">
                        {/* Cuerpo Caja */}
                        <div
                            className="absolute bottom-0 w-full h-[80%] bg-red-800 border-2 border-red-950 rounded-sm shadow-2xl flex justify-center items-center overflow-hidden">
                            <div className="w-[20%] h-full bg-yellow-500/90 shadow-sm"></div>
                        </div>
                        {/* Tapa Caja */}
                        <div
                            className="absolute top-[10%] -left-[5%] w-[110%] h-[25%] bg-red-700 border-2 border-red-950 rounded-sm shadow-lg flex justify-center items-center z-10 transform md:group-hover:-translate-y-4 transition-transform duration-500">
                            <div className="w-[20%] h-full bg-yellow-500 shadow-sm"></div>
                        </div>
                        {/* Lazo */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[20%] z-20 flex justify-center pointer-events-none">
                            <div
                                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-yellow-500 rounded-full absolute -top-[50%] rotate-45 rounded-tl-none rounded-br-none bg-yellow-500/20"></div>
                            <div
                                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-yellow-500 rounded-full absolute -top-[50%] -rotate-45 rounded-tr-none rounded-bl-none bg-yellow-500/20"></div>
                            <div
                                className="w-4 h-3 sm:w-6 sm:h-4 lg:w-8 lg:h-5 bg-yellow-500 absolute -top-1 rounded shadow-md z-30"></div>
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


export default HomeScreen;