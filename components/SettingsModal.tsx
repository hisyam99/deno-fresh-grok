import { useState } from "preact/hooks"; // Mengimpor useState dari preact/hooks
import { Settings } from "../types/chat.ts"; // Mengimpor tipe Settings

// Interface untuk props komponen SettingsModal
interface SettingsModalProps {
    settings: Settings;
    onSave: (settings: Settings) => void;
    onClose: () => void;
}

// Komponen SettingsModal
export default function SettingsModal(
    { settings, onSave, onClose }: SettingsModalProps,
) {
    // State untuk menyimpan baseUrl
    const [baseUrl, setBaseUrl] = useState(settings.baseUrl);

    // Fungsi untuk menangani pengiriman formulir
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onSave({ baseUrl }); // Menyimpan pengaturan baru
        onClose(); // Menutup modal
    };

    // Render komponen
    return (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-bold mb-4">Settings</h2>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            OpenAI API Base URL
                        </label>
                        <input
                            type="text"
                            value={baseUrl}
                            onChange={(e) =>
                                setBaseUrl(
                                    (e.target as HTMLInputElement).value,
                                )}
                            class="w-full p-2 border rounded-lg"
                            placeholder="https://api.openai.com/v1"
                        />
                    </div>
                    <div class="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            class="px-4 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
