// --- PANTALLA 2: REVELACIÓN ---

import {useContext, useEffect, useState} from "react";
import {GameContext} from "../context/GameContext.ts";
import THEME from "../theme.ts";
import {ArrowDown, ArrowLeft, RotateCw, Target, User} from "lucide-react";
import DifficultyLevel from "./DifficultyLevel.tsx";

const useGame = () => useContext(GameContext);
const RevealScreen = ({onBack}) => {
    const {data} = useGame();
    const [state, setState] = useState({actor: '', target: '', challenge: null});
    const [animating, setAnimating] = useState(true);

    // Lógica para elegir una carta
    const pickCard = () => {
        if (!data) return;
        const {lucky_people, challenges} = data;
        if (!lucky_people?.length || !challenges?.length) return;

        const challenge = challenges[Math.floor(Math.random() * challenges.length)];
        const hasVictim = challenge.victim;

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
        setState({actor, target, challenge});
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
                <button onClick={onBack}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 transition backdrop-blur-sm">
                    <ArrowLeft className="text-gray-300" size={24}/>
                </button>
            </div>

            {/* Contenedor con scroll para pantallas pequeñas, centrado en grandes */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center min-h-0">

                <div
                    className={`text-sm sm:text-base lg:text-xl tracking-[0.3em] font-bold ${THEME.colors.textSec} mb-8 uppercase flex-shrink-0 text-center`}>
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
                    <div
                        className={`border border-yellow-600/50 rounded-lg p-6 sm:p-10 flex flex-col items-center gap-6 sm:gap-8`}>

                        {/* ACTOR */}
                        <div className="flex flex-col items-center w-full">
                            <div className="flex items-center gap-2 mb-3 opacity-80">
                                <User size={16} className="text-yellow-500"/>
                                <span className={`text-xs sm:text-sm font-bold tracking-widest ${THEME.colors.accent}`}>THE CHOSEN ONE</span>
                            </div>
                            <h3 className="font-serif text-xl sm:text-3xl italic text-center text-white font-medium leading-tight">
                                {state.actor}
                            </h3>
                        </div>

                        <ArrowDown size={24} className="text-gray-600 opacity-50 flex-shrink-0"/>

                        {/* RETO */}
                        <div
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-6 text-center shadow-inner">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <span
                    className={`text-xs sm:text-sm font-black tracking-widest uppercase ${THEME.colors.primary} truncate pr-2 text-left`}>
                  {state.challenge.name}
                </span>
                                <DifficultyLevel level={state.challenge.level}/>
                            </div>
                            <p className={`text-lg sm:text-2xl font-medium leading-relaxed ${THEME.colors.accent}`}>
                                {state.challenge.challenge}
                            </p>
                        </div>

                        {/* VÍCTIMA */}
                        {state.challenge.victim && (
                            <>
                                <ArrowDown size={24} className="text-gray-600 opacity-50 flex-shrink-0"/>
                                <div className="flex flex-col items-center w-full">
                                    <div className="flex items-center gap-2 mb-3 opacity-80">
                                        <span
                                            className={`text-xs sm:text-sm font-bold tracking-widest ${THEME.colors.accent}`}>THE VICTIM</span>
                                        <Target size={16} className="text-red-500"/>
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
            <div
                className="p-6 sm:p-10 w-full flex justify-center bg-gradient-to-t from-black via-black/80 to-transparent z-10 flex-shrink-0">
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
                    {animating ? 'BARAJANDO...' : 'SIGUIENTE'} <RotateCw size={20}
                                                                         className={animating ? "animate-spin" : ""}/>
                </button>
            </div>
        </div>
    );
};

export default RevealScreen;