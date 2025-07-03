const OPENROUTER_API_KEY = "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";

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

async function generateResponse(input) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://unemploycoin.com",
      "X-Title": "UnemployCoinChatBot"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are the UnemployCoin assistant. Be helpful, clear, and sometimes funny."
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "🤖 No reply.";
}
