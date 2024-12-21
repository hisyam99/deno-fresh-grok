import { Message } from "../types/chat.ts"; // Mengimpor tipe Message

// Interface untuk props komponen ChatMessage
interface ChatMessageProps {
    message: Message;
}

// Komponen ChatMessage
export default function ChatMessage({ message }: ChatMessageProps) {
    // Menentukan apakah pesan dari pengguna atau AI
    const isUser = message.role === "user";

    // Render pesan
    return (
        <div class={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div
                class={`max-w-[80%] p-3 rounded-lg ${
                    isUser
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 rounded-bl-none"
                }`}
            >
                <p class="whitespace-pre-wrap">{message.content}</p>
                <span class="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
}
