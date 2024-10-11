import { useState, useEffect } from 'react';
import { MessageCircle, Send, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useQuestionSubmit from './hooks/useQuestionSubmit';
import { LoadingProvider } from './contexts/LoadingContext';
import { useLoading } from './contexts/LoadingContext';
import { ConversationProvider, useConversation } from './contexts/ConversationContext';

/**
 * @typedef {Object} HeaderProps
 * @property {React.ReactNode} [children] - Optional child elements to render within the header.
 */

/**
 * Header component for the AI Assist application.
 * Displays the application logo and title.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 */
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="text-green-500">
      <MessageCircle size={24} />
    </div>
    <h1 className="text-gray-800 text-xl font-semibold">AI Assist</h1>
  </div>
);

const Header = () => (
  <div className="p-4 flex items-center justify-between">
    <Logo />
  </div>
);

/**
 * @typedef {Object} QuestionsProps
 * @property {string[]} [questions] - Optional array of questions to display.
 */

/**
 * Questions component that displays a list of predefined questions.
 * Uses Framer Motion for animations.
 *
 * @component
 * @returns {JSX.Element} The rendered Questions component.
 */
const useQuestionHandler = () => {
  const { submitQuestion } = useQuestionSubmit();
  const { loading, setLoading } = useLoading();
  const { addMessage } = useConversation();

  const handleQuestionSubmit = async (question: string) => {
    setLoading(true);
    const response = await submitQuestion(question);
    addMessage('user', question);
    addMessage('assistant', response);
    setLoading(false);
  };

  return { handleQuestionSubmit, loading };
};

const QuestionButton: React.FC<{ question: string; onClick: () => void; disabled: boolean }> = ({ question, onClick, disabled }) => (
  <motion.button
    className={`bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 transition duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
  >
    {disabled ? 'Cargando...' : question}
  </motion.button>
);

const Questions = () => {
  const { questions, messages } = useConversation();
  const { handleQuestionSubmit, loading } = useQuestionHandler();

  return (
    <AnimatePresence>
      <motion.div
        className="p-6 overflow-y-auto flex flex-col items-center justify-center"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-center items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full"></div>
          </div>
        </div>
        <div>{messages.length}</div>
        {messages.length === 0 ? (
          <>
            <p className="text-gray-600 text-center text-lg mb-4">¿Qué quieres saber sobre el Síndrome del Impostor?</p>
            <div className="space-y-2 flex flex-col items-center">
              {questions.map((question, index) => (
                <QuestionButton
                  key={index}
                  question={question}
                  onClick={() => !loading && handleQuestionSubmit(question)}
                  disabled={loading}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >

            <p className="text-gray-600 text-lg mb-4">{messages[messages.length - 2].content}</p>
            <p className="text-gray-800 text-xl font-medium">{messages[messages.length - 1].content}</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * @typedef {Object} InputAreaProps
 * @property {string} input - The current input value.
 * @property {React.Dispatch<React.SetStateAction<string>>} setInput - Function to update the input value.
 * @property {() => void} handleSend - Function to handle sending the input.
 */
interface InputAreaProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * InputArea component for user input and interaction.
 *
 * @component
 * @param {InputAreaProps} props - The component props.
 * @returns {JSX.Element} The rendered InputArea component.
 */
const InputArea: React.FC<InputAreaProps> = ({ input, setInput }) => {
  const placeholders = [
    "Hazme una pregunta...",
    "Escribe tu consulta aquí...",
    "¿Qué te gustaría preguntar?"
  ];

  const [placeholder, setPlaceholder] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { submitQuestion } = useQuestionSubmit();
  const { loading, setLoading } = useLoading();
  const { addMessage } = useConversation();

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
      setLoading(true);
      const response = await submitQuestion(input);
      addMessage('user', input);
      addMessage('assistant', response);
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
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
      <div className="mt-4 flex justify-between items-center">
        <button className="text-green-500 text-sm font-medium flex items-center space-x-1 hover:text-green-600 transition duration-300">
          <span>Topics</span>
          <ChevronDown size={16} />
        </button>
        <button className="text-gray-400 text-sm hover:text-gray-600 transition duration-300">
          Show more
        </button>
      </div>
    </div>
  );
};

/**
 * Main application component that combines all other components.
 * Manages state for messages, input, and expansion status.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [input, setInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    setIsExpanded(true);
  }, []);

  return (
    <LoadingProvider>
      <ConversationProvider>
        <motion.div
          className="min-h-screen flex items-center justify-center p-4 animated-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden"
            initial={{ height: "200px" }}
            animate={{ height: isExpanded ? "auto" : "200px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Header />
            {isExpanded && <Questions />}
            <InputArea input={input} setInput={setInput} />
          </motion.div>
        </motion.div>
      </ConversationProvider>
    </LoadingProvider>
  );
}

export default App;