import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessages = [...response, { role: "user", content: prompt }];

    setResponse(newMessages);
    setPrompt(""); // Clear the input field after submission
    setLoading(true);

    try {
      // Send the prompt to the FastAPI backend
      // originally: fetch("http://localhost:8000/chat"
      // right now using host.docker.internal to access the backend from the frontend container on docker
      // as a workaround for Docker networking issues
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
          messages: newMessages,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      console.log("Response from backend:", data);
      const assistantResponse = data.choices[0].message.content;

      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
      setResponse((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (err) {
      setResponse((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err.message || "Error communicating with backend",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🧳 Travel Assistant</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
        <input
          className="w-full p-3 rounded border text-black border-gray-300 focus:outline-blue-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Where do you want to go next?"
        />
        <button className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">
          Ask Agent
        </button>
      </form>
      {loading && (
        <div className="p-3 rounded-lg bg-gray-200 text-black text-left italic animate-pulse">
          Assistant is typing...
        </div>
      )}

      {response.length > 0 && (
        <div className="mt-8 w-full max-w-xl space-y-4">
          {response.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 text-black text-left"
                  : "bg-gray-100 text-black text-left"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
