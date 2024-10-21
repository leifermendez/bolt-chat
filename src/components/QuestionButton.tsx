import { motion } from "framer-motion";
import React from "react";

export const QuestionButton: React.FC<{ question: string; onClick: () => void; disabled: boolean }> = ({ question, onClick, disabled }) => (
    <motion.button
        className={`bg-white font-semibold text-gray-700 px-4 py-2 rounded-full text-sm  shadow-sm hover:bg-gray-50 transition duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        disabled={disabled}
    >
        {disabled ? 'Cargando...' : question}
    </motion.button>
);