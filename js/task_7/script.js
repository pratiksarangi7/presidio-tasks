const chatList = document.getElementById('chatlist');
const sendBtn = document.getElementById('send');
const input = document.getElementById('input')
setInterval(() => {
    const dummyMessages = [
        "Hello! How are you doing today?",
        "I'm just testing out this new chat interface.",
        "That sounds like a great idea!",
        "Can you help me with a coding problem?",
        "Wait, I think I found the bug in my CSS.",
        "Do you prefer light mode or dark mode?",
        "I'll be back in five minutes, don't go anywhere!",
        "The weather is actually quite nice today.",
        "Is this message being sent in real-time?",
        "Check out this cool new feature I just added!"
    ];
    const index = Math.floor(Math.random() * 10);
    const receivedMsg = document.createElement('div');
    receivedMsg.classList.add('received-message');
    receivedMsg.innerText = dummyMessages[index];
    chatList.appendChild(receivedMsg);
}, 5000);

function sendMessage() {
    const sentMsg = document.createElement('div');
    sentMsg.classList.add('sent-message');
    sentMsg.innerText = input.value.trim();
    input.value = "";
    chatList.appendChild(sentMsg);
}

sendBtn.addEventListener('click', sendMessage);