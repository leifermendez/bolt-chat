import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Contexto para manejar la conversación, incluyendo preguntas y mensajes.
 * @interface ConversationContextType
 */
interface ConversationContextType {
    questions: string[];
    messages: { role: string; content: string }[];
    addMessage: (role: string, content: string) => void;
    setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

/**
 * Proveedor del contexto de conversación.
 * @param {ReactNode} children - Los componentes hijos que se renderizarán dentro del proveedor.
 * @returns {JSX.Element} El proveedor de contexto.
 */
export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [questions, setQuestions] = useState<string[]>([
        "¿Alguna vez has sentido que no mereces tus logros?",
        "¿Te preocupa que otros descubran que no eres tan competente como piensan?",
        "¿Atribuyes tus éxitos a la suerte o a factores externos?"
    ]);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

    /**
     * Agrega un mensaje al estado de mensajes.
     * @param {string} role - El rol del mensaje (ej. 'user', 'bot').
     * @param {string} content - El contenido del mensaje.
     */
    const addMessage = (role: string, content: string) => {
        setMessages(prevMessages => [...prevMessages, { role, content }]);
    };

    return (
        <ConversationContext.Provider value={{ questions, messages, addMessage, setQuestions }}>
            {children}
        </ConversationContext.Provider>
    );
};

/**
 * Hook para acceder al contexto de conversación.
 * @returns {ConversationContextType} El contexto de conversación.
 * @throws {Error} Si se usa fuera de un ConversationProvider.
 */
export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (context === undefined) {
        throw new Error('useConversation must be used within a ConversationProvider');
    }
    return context;
};