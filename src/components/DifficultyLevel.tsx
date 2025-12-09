import {Flame} from 'lucide-react';

// --- COMPONENTE: DIFICULTAD ---

interface DifficultyLevelProps {
    level: number;
}

const DifficultyLevel = ({level}: DifficultyLevelProps) => (
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

export default DifficultyLevel;