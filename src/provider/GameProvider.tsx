import {useEffect, useState} from "react";
import DEFAULT_DATA, {type DefaultData} from "../data/data.ts";
import { GameContext } from "../context/GameContext.ts";


export const GameProvider = ({children}) => {
    const [data, setData] = useState<DefaultData>({
        lucky_people: [],
        challenges: []
    });

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

    const saveData = (newData: DefaultData) => {
        try {
            localStorage.setItem('NAUGHTY_GAME_DATA', JSON.stringify(newData));
            setData(newData);
            return true;
        } catch (e) {
            console.error("Error loading local storage", e);
            alert("Error guardando datos");
            return false;
        }
    };

    const resetData = () => {
        localStorage.removeItem('NAUGHTY_GAME_DATA');
        setData(DEFAULT_DATA);
    };

    return (
        <GameContext.Provider value={{data, saveData, resetData}}>
            {children}
        </GameContext.Provider>
    );
};
