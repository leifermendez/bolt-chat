import { useState } from 'react';

interface QuestionResponse {
    success: boolean;
    answer: string;
}

const useQuestionSubmit = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Envía una pregunta al servidor y devuelve la respuesta.
     * @param {string} question - La pregunta a enviar.
     * @returns {Promise<string>} - La respuesta del servidor o un mensaje de error.
     * @throws {Error} - Lanza un error si la solicitud falla o si la respuesta no es exitosa.
     */
    const submitQuestion = async (question: string): Promise<string> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/question', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data: QuestionResponse = await response.json();
            if (data.success) {
                return data.answer;
            } else {
                throw new Error('Respuesta no exitosa');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error al enviar la pregunta:', errorMessage);
            return 'Lo siento, hubo un error al procesar tu pregunta.';
        } finally {
            setLoading(false);
        }
    };

    return { submitQuestion, loading, error };
};

export default useQuestionSubmit;