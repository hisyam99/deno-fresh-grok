import { Head } from "$fresh/runtime.ts";
import Chat from "../islands/Chat.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Chat App</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">AI Chat Assistant</h1>
        <Chat />
      </div>
    </>
  );
}
