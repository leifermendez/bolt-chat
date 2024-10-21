import { Loader2, Send } from "lucide-react";
import { useState, useEffect } from "react";


/**
 * @typedef {Object} InputAreaProps
 * @property {string} input - The current input value.
 * @property {React.Dispatch<React.SetStateAction<string>>} setInput - Function to update the input value.
 * @property {() => void} handleSend - Function to handle sending the input.
 */
interface InputAreaProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleQuestionSubmit: (question: string) => void;
    loading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ input, setInput, handleQuestionSubmit, loading }) => {
    const placeholders = [
        "Hazme una pregunta...",
        "Escribe tu consulta aquí...",
        "¿Qué te gustaría preguntar?"
    ];

    const [placeholder, setPlaceholder] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(false);


    useEffect(() => {
        const typingEffect = () => {
            if (isTyping) return;
            setIsTyping(true);
            let currentPlaceholder = placeholders[currentIndex];
            let charIndex = 0;

            const interval = setInterval(() => {
                if (charIndex <= currentPlaceholder.length) {
                    setPlaceholder(currentPlaceholder.slice(0, charIndex));
                    charIndex++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
                        setPlaceholder('');
                        setIsTyping(false);
                    }, 10000);
                }
            }, 50);

            return () => clearInterval(interval);
        };

        typingEffect();
    }, [currentIndex, isTyping, placeholders]);

    const handleSubmit = async () => {
        if (input.trim()) {
            await handleQuestionSubmit(input);
            setInput('');
        }
    };

    return (
        <div className="p-4  border-t border-gray-200">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow p-2 bg-transparent focus:outline-none text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-white text-green-500 p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                </button>
            </div>
            <div className="mt-4 flex justify-start items-center">
                <img src="/mariana.jpg" alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                <a target="_blank" href="https://www.linkedin.com/in/mariannarolfo/" className="text-gray-400 text-sm hover:text-gray-600 transition duration-300">
                    @MarianaRolfo
                </a>
            </div>
        </div>
    );
};
