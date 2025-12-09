// --- PANTALLA 3: SETTINGS ---
import React, {useContext, useEffect, useState} from "react";
import THEME from "../theme.ts";
import {ArrowLeft, Save, Trash2} from "lucide-react";
import DifficultyLevel from "./DifficultyLevel.tsx";
import {GameContext} from "../context/GameContext.ts";

const useGame = () => useContext(GameContext);

const SettingsScreen = ({onBack}) => {
    const {data, saveData, resetData} = useGame();
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
            <div
                className="flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50 flex-shrink-0">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition"><ArrowLeft
                    size={24}/></button>
                <span
                    className="font-bold tracking-widest text-sm sm:text-lg text-yellow-500 uppercase">Configuración</span>
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
                        <div
                            className="bg-gray-900 border border-gray-800 rounded-lg p-2 flex-1 flex flex-col shadow-inner">
                            <p className="text-xs text-gray-500 mb-2 px-2 pt-2 uppercase tracking-wide flex-shrink-0">Código
                                JSON:</p>
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
                                <Save size={20}/> GUARDAR
                            </button>

                            <button
                                onClick={handleRestore}
                                className="w-full py-4 bg-gray-800 text-red-400 font-bold rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-700 active:bg-gray-600 transition touch-manipulation border border-red-900/30"
                            >
                                <Trash2 size={18}/> RESTAURAR
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 pb-10">
                        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-green-500 shadow-lg">
                            <h3 className="font-bold text-xl text-white">Resumen</h3>
                            <p className="text-gray-400 text-base mt-2">
                                Filtros activos: <span
                                className="text-white font-mono">{data?.lucky_people?.length}</span>
                            </p>
                            <p className="text-gray-400 text-base">
                                Retos activos: <span className="text-white font-mono">{data?.challenges?.length}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-full">
                                <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mt-4 mb-4">Lista
                                    de Retos</h4>
                            </div>
                            {data?.challenges?.map((c, i) => (
                                <div key={i}
                                     className="p-4 bg-white/5 rounded-lg border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-bold text-gray-200">{c.name}</span>
                                        <DifficultyLevel level={c.level}/>
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

export default SettingsScreen;