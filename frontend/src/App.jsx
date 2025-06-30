import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse(err.message || "An error occurred");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🧳 Travel Assistant</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
        <input
          className="w-full p-3 rounded border border-gray-300 focus:outline-blue-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Where do you want to go next?"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ask Agent
        </button>
      </form>

      {response && (
        <div className="mt-8 w-full max-w-xl bg-white shadow p-4 rounded border">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
