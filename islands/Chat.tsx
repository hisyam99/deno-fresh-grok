import { useState } from "preact/hooks"; // Mengimpor useState dari preact/hooks
import ModelSelector from "../components/ModelSelector.tsx"; // Mengimpor komponen ModelSelector
import ChatMessage from "../components/ChatMessage.tsx"; // Mengimpor komponen ChatMessage
import SettingsModal from "../components/SettingsModal.tsx"; // Mengimpor komponen SettingsModal
import { type Message, type Settings } from "../types/chat.ts"; // Mengimpor tipe Message dan Settings

// Komponen utama Chat
export default function Chat() {
    // State untuk menyimpan pesan
    const [messages, setMessages] = useState<Message[]>([]);
    // State untuk input pengguna
    const [input, setInput] = useState("");
    // State untuk model AI yang digunakan
    const [model, setModel] = useState("gpt-4-turbo-preview");
    // State untuk menunjukkan apakah sedang memuat
    const [loading, setLoading] = useState(false);
    // State untuk menunjukkan apakah modal pengaturan ditampilkan
    const [showSettings, setShowSettings] = useState(false);
    // State untuk pengaturan
    const [settings, setSettings] = useState<Settings>({
        baseUrl: "",
    });

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        setInput(input.value);
    };

    // Fungsi untuk mengirim pesan
    const sendMessage = async (e: Event) => {
        e.preventDefault(); // Mencegah pengiriman formulir default
        if (!input.trim()) return; // Tidak melanjutkan jika input kosong

        // Menambahkan pesan pengguna ke daftar pesan
        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput(""); // Mengosongkan input
        setLoading(true); // Mengatur status loading menjadi true

        try {
            // Mengirim permintaan ke API chat
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: input,
                    model: model,
                    history: messages,
                    baseUrl: settings.baseUrl,
                }),
            });
            const data = await response.json();

            // Menambahkan pesan dari AI ke daftar pesan
            const assistantMessage: Message = {
                role: "assistant",
                content: data.message,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error:", error); // Menangani kesalahan dan mencetak ke konsol
        } finally {
            setLoading(false); // Mengatur status loading menjadi false setelah selesai
        }
    };

    // Render komponen
    return (
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-4">
                <ModelSelector value={model} onChange={setModel} />{" "}
                {/* // Komponen untuk memilih model AI */}
                <button
                    onClick={() => setShowSettings(true)} // Tombol untuk menampilkan modal pengaturan
                    class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    Settings
                </button>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 mb-4 h-[600px] overflow-y-auto">
                {messages.map((message, index) => ( // Memetakan pesan untuk ditampilkan
                    <ChatMessage key={index} message={message} />
                ))}
                {loading && <div class="text-gray-500">AI is thinking...</div>}
                {" "}
                {/* // Menampilkan pesan loading jika sedang memuat */}
            </div>
            <form onSubmit={sendMessage} class="flex gap-4">
                {/* // Formulir untuk mengirim pesan */}
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    class="flex-1 p-2 border rounded-lg"
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    disabled={loading}
                    class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    Send
                </button>
            </form>
            {showSettings && ( 
                <SettingsModal
                    settings={settings}
                    onSave={setSettings}
                    onClose={() => setShowSettings(false)}
                />
            )}
        </div>
    );
}
