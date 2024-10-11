/**
 * @typedef {Object} QuestionsProps
 * @property {string[]} [questions] - Optional array of questions to display.
 */

import { useConversation } from "../contexts/ConversationContext";
import { useLoading } from "../contexts/LoadingContext";
import useQuestionSubmit from "./useQuestionSubmit";

/**
 * Questions component that displays a list of predefined questions.
 * Uses Framer Motion for animations.
 *
 * @component
 * @returns {JSX.Element} The rendered Questions component.
 */
export const useQuestionHandler = () => {
    const { submitQuestion, partialResponse, question, endedResponse } = useQuestionSubmit();
    const { loading, setLoading } = useLoading();
    const { addMessage } = useConversation();

    const handleQuestionSubmit = async (question: string) => {
        setLoading(true);
        addMessage('user', question);
        await submitQuestion(question);
        setLoading(false);
    };

    return { handleQuestionSubmit, loading, partialResponse, question, endedResponse };
};

