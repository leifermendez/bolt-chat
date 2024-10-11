import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

/**
 * Contexto para manejar la conversación, incluyendo preguntas y mensajes.
 * @interface ConversationContextType
 */
interface ConversationContextType {
    messages: Message[];
    addMessage: (role: 'user' | 'assistant', content: string) => void;
    questions: string[];
    partialResponse: string;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

/**
 * Proveedor del contexto de conversación.
 * @param {ReactNode} children - Los componentes hijos que se renderizarán dentro del proveedor.
 * @returns {JSX.Element} El proveedor de contexto.
 */
export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [questions] = useState<string[]>([
        "¿Qué es el Síndrome del Impostor?",
        "¿Cómo afecta el Síndrome del Impostor en el trabajo?",
        "¿Cuáles son algunas estrategias para superar el Síndrome del Impostor?"
    ]);

    /**
     * Agrega un mensaje al estado de mensajes.
     * @param {string} role - El rol del mensaje (ej. 'user', 'bot').
     * @param {string} content - El contenido del mensaje.
     */
    const addMessage = (role: 'user' | 'assistant', content: string) => {
        setMessages(prevMessages => [...prevMessages, { role, content }]);
    };

    return (
        <ConversationContext.Provider value={{ messages, addMessage, questions }}>
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