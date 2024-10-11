import { AnimatePresence, motion } from "framer-motion";
import { useConversation } from "../contexts/ConversationContext";
import { BubbleCircle } from "./BubbleCircle";
import { QuestionButton } from "./QuestionButton";
/**
 * Questions component that displays a list of predefined questions.
 * Uses Framer Motion for animations.
 *
 * @component
 * @returns {JSX.Element} The rendered Questions component.
 */
export const Questions = ({ handleQuestionSubmit, loading, partialResponse, question, endedResponse }: { question: string, handleQuestionSubmit: (question: string) => void, loading: boolean, partialResponse: string, endedResponse: boolean }) => {
    const { questions, messages } = useConversation();
    return (
        <AnimatePresence>
            <motion.div
                className="p-6 overflow-y-auto flex flex-col items-center justify-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
            >
                <BubbleCircle ended={endedResponse} partialResponse={partialResponse} mode={loading ? 'strong' : 'smooth'} text={question} />
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
                        className="text-center min-h-[300px]"
                        layout
                    >
                        <motion.p
                            className="text-gray-800 text-xl font-medium"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {partialResponse}
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

