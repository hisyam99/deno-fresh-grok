// Mendefinisikan interface untuk pesan
export interface Message {
  role: "user" | "assistant"; // Peran pesan, bisa "user" atau "assistant"
  content: string; // Konten pesan
  timestamp: Date; // Waktu pesan dikirim
}

// Mendefinisikan interface untuk pengaturan
export interface Settings {
  baseUrl: string; // URL dasar untuk API
}
