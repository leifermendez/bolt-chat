import { useState, useCallback } from 'react';
import { API_URL } from '../config';
/**
 * Hook for submitting questions and handling responses.
 * @returns {Object} An object containing loading state, error state, partial response, and methods for submitting questions.
 */
const useQuestionSubmit = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [question, setQuestion] = useState<string>('');
    const [partialResponse, setPartialResponse] = useState<string>('');
    const [endedResponse, setEndedResponse] = useState<boolean>(false);

    const submitQuestion = useCallback((question: string): Promise<void> => {
        setLoading(true);
        setError(null);
        setPartialResponse('');
        setEndedResponse(false);
        setQuestion(question);

        return new Promise<void>((resolve) => {
            // Updated URL to match the new API format
            const eventSource = new EventSource(`${API_URL}/question/stream?question=${encodeURIComponent(question)}`);

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Datos recibidos:', data);
                if (data?.token) {
                    setPartialResponse((prev) => prev + data.token);
                }
                if (data?.type && data.type === 'end') {
                    setEndedResponse(true);
                    resolve();
                }
            };

            eventSource.onerror = () => {
                eventSource.close();
            };

            eventSource.onopen = () => {
                console.log('Conexión SSE abierta');
            };

            eventSource.addEventListener('done', () => {
                console.log('Transmisión SSE completada');
                setLoading(false);
                eventSource.close();
                resolve();
            });
        });
    }, []);

    return { submitQuestion, loading, error, partialResponse, endedResponse, question };
};

export default useQuestionSubmit;