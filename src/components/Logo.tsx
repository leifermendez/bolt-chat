import { MessageCircle } from 'lucide-react';
/**
 * Header component for the AI Assist application.
 * Displays the application logo and title.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 */
export const Logo = () => (
    <div className="flex items-center space-x-2">
        <div className="text-green-500">
            <MessageCircle size={24} />
        </div>
        <h1 className="text-gray-800 text-xl font-semibold">AI Assist</h1>
    </div>
);