// --- CONTEXTO (GAME ENGINE) ---
import {createContext} from "react";
import DEFAULT_DATA, {type DefaultData} from "../data/data.ts";

export const GameContext = createContext({
    data: {
        ...DEFAULT_DATA
    } as DefaultData,
    saveData: (newData: DefaultData) => false,
    resetData: () => {}
});
