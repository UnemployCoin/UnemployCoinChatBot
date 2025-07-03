document.getElementById("sendBtn").addEventListener("click", handleMessage);
document.getElementById("message").addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleMessage();
});

async function handleMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  addBotMessage("⏳ Thinking...");

  try {
    const reply = await generateResponse(text);
    const chat = document.getElementById("chat");
    chat.lastChild.textContent = reply;
  } catch (error) {
    console.error("❌ AI error:", error);
    const chat = document.getElementById("chat");
    chat.lastChild.textContent = "⚠️ AI error: " + error.message;
  }
}

function addUserMessage(text) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = "user-message";
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function addBotMessage(text) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = "bot-message";
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// 🧠 Talk to your secure backend
async function generateResponse(input) {
  const response = await fetch("https://unemploycoinchatbot-api.onrender.com/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "🤖 No response from AI.";
}

const chatHistory = [];

async function generateResponse(input) {
  chatHistory.push({ role: "user", content: input });

  const payload = {
    messages: [
      { role: "system", content: "...your system prompt..." },
      ...chatHistory
    ],
    model: "deepseek/deepseek-chat-v3-0324:free"
  };

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "🤖 No response from AI.";
  chatHistory.push({ role: "assistant", content: reply });

  return reply;
}
