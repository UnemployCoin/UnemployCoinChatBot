document.getElementById("sendBtn").addEventListener("click", handleMessage);
document.getElementById("message").addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleMessage();
});

function handleMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  const reply = generateResponse(text);
  addBotMessage(reply);
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

// 🧠 Safe local fallback logic
function generateResponse(input) {
  input = input.toLowerCase();
  for (const item of unemploycoinKnowledge) {
    if (item.keywords.some(keyword => input.includes(keyword))) {
      return item.response;
    }
  }
  return "🤖 I'm your UnemployCoin assistant. Type !help to see what I can answer.";
}
