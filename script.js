const PROXY_URL = 'https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions';
let isProcessing = false;

document.getElementById('sendButton'); addEventListener('click', sendMessage);

async function sendMessage() {
    if (isProcessing) return;

    chatbox.innerHTML += `<div class="user-message">You: ${message}</div>`;
    userInput.value = "";

    const message = document.getElementById('userInput').value.trim();
    if (!message) return;

    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div class="user-message">You: ${message}</div>`;
    document.getElementById('userInput').value = '';
    try {
        isProcessing = true;
        toggleLoading(true);

        const response = await fetch(PROXY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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` /// get new key from sophia and put it here
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are a friendly pediatrician explaining medicines to children. Use simple words, analogies to toys or candy, and emojis. Keep responses under 3 sentences."
                }, {
                    role: "user",
                    content: message
                }],
                temperature: 0.7,
                max_tokens: 150
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const reply = data.choices[0].message.content;

        chatbox.innerHTML += `<div class="bot-message">PillPal: ${botReply}</div>`;
    } catch (error) {
        console.error("Error:", error);
        chatbox.innerHTML += `<div class="bot-message">Bot: Oops! Something went wrong! Can you try again?</div>`;
    }
}

function showConfetti() {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['💊', '🩹', '🌟', '🎉'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear`;
        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 2000);
    }
}

function toggleLoading(show) {
    const button = document.getElementById('sendButton');
    const buttonText = document.getElementById('buttonText');

    if (show) {
        button.disabled = true;
        buttonText.innerHTML = `<span class="loader"></span> Thinking...`;
    } else {
        button.disabled = false;
        buttonText.textContent = 'Ask';
    }
}
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
document.head.insertAdjacentHTML('beforeend', `
    <style>
    @keyframes confettiFall {
        0% { top: -10vh; transform: rotate(0deg); }
        100% { top: 100vh; transform: rotate(360deg); }
    }
    </style>
`);
