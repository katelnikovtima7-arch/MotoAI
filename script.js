const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");
const messages = document.getElementById("messages");

const placeholders = [
    "Чем я могу помочь?",
    "Задайте вопрос о мототехнике...",
    "Хотите подобрать мотоцикл?",
    "Напишите свой вопрос...",
    "Спросите MotoAI...",
    "Что вас интересует сегодня?",
    "Нужна помощь с ремонтом?",
    "О чём вы хотите узнать?",
    "Помочь выбрать запчасти?",
    "Загрузите фото или задайте вопрос..."
];

let index = 0;

setInterval(() => {
    index++;
    if (index >= placeholders.length) index = 0;
    input.placeholder = placeholders[index];
}, 3500);

function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    const user = document.createElement("div");
    user.className = "userMessage";
    user.textContent = text;

    messages.appendChild(user);

    input.value = "";

    setTimeout(() => {

        const ai = document.createElement("div");
        ai.className = "aiMessage";
        ai.textContent = "Скоро здесь будет отвечать MotoAI 🤖";

        messages.appendChild(ai);

        messages.scrollTop = messages.scrollHeight;

    }, 700);

}

button.onclick = sendMessage;

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});
