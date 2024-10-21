import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingProvider } from './contexts/LoadingContext';
import { ConversationProvider } from './contexts/ConversationContext';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { Questions } from './components/Questions';
import { useQuestionHandler } from './hooks/useQuestionHandler';

export const QuestionsExpanded = ({ isExpanded, input, setInput }: { isExpanded: boolean, input: string, setInput: React.Dispatch<React.SetStateAction<string>> }) => {
  const { handleQuestionSubmit, loading, partialResponse, question, endedResponse } = useQuestionHandler();
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-60px)] md:h-auto">
      {isExpanded && <Questions
        question={question}
        handleQuestionSubmit={handleQuestionSubmit}
        loading={loading}
        partialResponse={partialResponse}
        endedResponse={endedResponse}
      />}
      <InputArea
        loading={loading}
        handleQuestionSubmit={handleQuestionSubmit}
        input={input}
        setInput={setInput}
      />
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
          className="min-h-screen flex md:items-center justify-center p-0 md:p-4 animated-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white md:rounded-3xl shadow-xl w-full max-w-lg overflow-hidden"
            initial={{ height: "200px" }}
            animate={{ height: isExpanded ? "auto" : "200px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Header />
            <QuestionsExpanded isExpanded={isExpanded} input={input} setInput={setInput} />
          </motion.div>
        </motion.div>
      </ConversationProvider>
    </LoadingProvider>
  );
}

export default App;