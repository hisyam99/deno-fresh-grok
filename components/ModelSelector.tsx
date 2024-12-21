// Interface untuk props komponen ModelSelector
interface ModelSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

// Komponen ModelSelector
export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
    // Daftar model AI yang tersedia
    const models = [
        { id: "grok-2-1212", name: "Grok 2 1212" },
        { id: "grok-2-vision-1212", name: "Grok 2 Vision" },
        { id: "grok-beta", name: "Grok Beta" },
        { id: "grok-vision-beta", name: "Grok Vision Beta" },
    ];

    // Fungsi untuk menangani perubahan pilihan model
    const handleChange = (e: Event) => {
        const select = e.target as HTMLSelectElement;
        onChange(select.value);
    };

    // Render komponen
    return (
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Select AI Model
            </label>
            <select
                value={value}
                onChange={handleChange}
                class="w-full p-2 border rounded-lg"
            >
                {models.map((model) => ( // Memetakan model untuk ditampilkan dalam opsi
                    <option key={model.id} value={model.id}>
                        {model.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
