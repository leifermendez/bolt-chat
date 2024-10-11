import { useState, useCallback } from 'react';
import { API_URL } from '../config';
/**
 * Function to fetch audio stream from the server.
 * @param {string} text - The text to be converted to audio.
 * @returns {Promise<Blob>} A promise that resolves to a Blob containing the audio stream.
 */
export const fetchAudioStream = async (text: string, mode: 'woman' | 'man'): Promise<Blob> => {
    const response = await fetch(`${API_URL}/audio/stream`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({ text, mode }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.blob();
};

/**
 * Hook for submitting text and handling audio streaming responses.
 * @returns {Object} An object containing loading state, error state, audio URL, and methods for submitting text.
 */
const useAudioSubmit = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const submitText = useCallback(async (text: string, mode: 'woman' | 'man'): Promise<void> => {
        setLoading(true);
        setError(null);
        setAudioUrl(null);

        try {
            const blob = await fetchAudioStream(text, mode);
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    return { submitText, loading, error, audioUrl };
};

export default useAudioSubmit;