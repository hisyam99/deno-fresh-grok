import { Handlers } from "$fresh/server.ts"; // Mengimpor Handlers dari modul $fresh/server.ts
import { OpenAI } from "@openai/openai"; // Mengimpor kelas OpenAI dari modul @openai/openai
import { Message } from "../../types/chat.ts";

// Mendapatkan kunci API dan URL dasar dari variabel lingkungan
const GROK_API_KEY = Deno.env.get("GROK_API_KEY") || "";
const GROK_BASE_URL = Deno.env.get("GROK_BASE_URL");

// Membuat instance OpenAI dengan kunci API dan URL dasar yang telah diatur
const openai = new OpenAI({
  apiKey: GROK_API_KEY,
  baseURL: GROK_BASE_URL,
});

// Mengekspor objek handler yang berisi metode POST
export const handler: Handlers = {
  async POST(req) { // Metode POST yang akan dipanggil saat permintaan POST diterima
    try {
      // Mendapatkan data JSON dari permintaan
      const { message, model, history, baseUrl }: {
        message: string;
        model: string;
        history: Message[];
        baseUrl?: string;
      } = await req.json();

      // Membuat instance baru jika baseUrl khusus disediakan
      const client = baseUrl
        ? new OpenAI({
          apiKey: GROK_API_KEY,
          baseURL: baseUrl,
        })
        : openai;

      // Membuat permintaan ke API OpenAI untuk mendapatkan jawaban
      const completion = await client.chat.completions.create({
        model: model,
        messages: [
          // Mengubah riwayat pesan menjadi format yang sesuai
          ...history.map((msg: Message) => ({
            role: msg.role,
            content: msg.content,
          })),
          // Menambahkan pesan pengguna terbaru
          { role: "user", content: message },
        ],
      });

      // Mengembalikan respons JSON dengan pesan dari AI
      return new Response(
        JSON.stringify({
          message: completion.choices[0].message.content,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      // Menangani kesalahan dan mengembalikan respons dengan pesan kesalahan
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
