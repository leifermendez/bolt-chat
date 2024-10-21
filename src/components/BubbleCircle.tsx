/**
 * BubbleCircle component that displays a circular bubble with a gradient background.
 * Play a mp3 sound when the bubble is displayed.
 *
 * @component
 * @returns {JSX.Element} The rendered BubbleCircle component.
 */

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import useAudioSubmit from "../hooks/useAudioSubmitcopy";

interface BubbleCircleProps {
    mode: 'smooth' | 'strong';
    text: string;
    ended: boolean;
    partialResponse: string;
}
/**
 * BubbleCircle component that displays a circular bubble with a gradient background.
 * Play a mp3 sound when the bubble is displayed.
 *
 * @component
 * @returns {JSX.Element} The rendered BubbleCircle component.
 */
export const BubbleCircle: React.FC<BubbleCircleProps> = ({ mode, text, ended, partialResponse }) => {
    const controls = useAnimation();
    const { submitText, error, audioUrl } = useAudioSubmit();
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (mode === 'strong') {
            const glitchInterval = setInterval(() => {
                controls.start({
                    x: [0, -5, 5, -5, 5, 0],
                    y: [0, 5, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                });
            }, 50);

            submitText(text, 'man');

            return () => clearInterval(glitchInterval);
        }
    }, [controls, mode, submitText, text]);

    useEffect(() => {
        if (ended) {
            submitText(partialResponse, 'woman');
        }
    }, [ended, submitText, partialResponse]);

    useEffect(() => {
        if (audioUrl) {
            if (audio) {
                // Detener el audio si está reproduciendo
                if (isPlaying) {
                    audio.pause();
                    setIsPlaying(false);
                }
                // Actualizar el src del objeto Audio existente
                audio.src = audioUrl;
            } else {
                // Crear un nuevo objeto Audio si no existe
                const newAudio = new Audio(audioUrl);
                setAudio(newAudio);
            }

            // Reproducir el audio
            audio?.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    }, [audioUrl, audio]);

    useEffect(() => {
        if (audio) {
            audio.onended = () => setIsPlaying(false);
        }
    }, [audio]);

    return (
        <>
            <div className="mb-8 flex justify-center items-center">
                <div className="relative">
                    <motion.div
                        className="w-24 h-24 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center overflow-hidden"
                        animate={{
                            scale: mode === 'smooth' ? [1, 1.05, 1] : [1, 1.1, 1],
                            opacity: mode === 'smooth' ? [1, 0.9, 1] : [1, 0.8, 1],
                        }}
                        transition={{
                            duration: mode === 'smooth' ? 2 : 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            // Add these lines
                            type: "tween",
                            times: [0, 0.5, 1],
                        }}
                    >
                        <motion.div
                            className="w-20 h-20 bg-white rounded-full"
                            animate={mode === 'strong' ? controls : { scale: [1, 0.95, 1] }}
                            initial={{ scale: 1 }}
                            style={{ originX: 0.5, originY: 0.5 }}
                            transition={mode === 'smooth' ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                // Add these lines
                                type: "tween",
                                times: [0, 0.5, 1],
                            } : undefined}
                        >
                            <motion.div
                                className="w-full h-full bg-white rounded-full"
                                animate={{
                                    scale: mode === 'smooth' ? [1, 0.95, 1] : [1, 0.9, 1],
                                }}
                                transition={{
                                    duration: mode === 'smooth' ? 2 : 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    // Add these lines
                                    type: "tween",
                                    times: [0, 0.5, 1],
                                }}
                            />
                        </motion.div>
                    </motion.div>
                    {isPlaying && (
                        <motion.div
                            className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    )}
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </>
    );
};
