const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chat = document.getElementById("chat");

const placeholders = [
    "Чем я могу помочь?",
    "Спросите MotoAI...",
    "Какое масло выбрать?",
    "Какой мотоцикл купить?",
    "Опишите проблему...",
    "Задайте любой вопрос...",
    "О чём вы хотите узнать?",
    "Нужна помощь с ремонтом?",
    "Хотите подобрать запчасти?",
    "Чем помочь сегодня?"
];

let currentPlaceholder = 0;

function changePlaceholder() {

    input.style.opacity = "0";

    setTimeout(() => {

        currentPlaceholder++;

        if (currentPlaceholder >= placeholders.length) {
            currentPlaceholder = 0;
        }

        input.placeholder = placeholders[currentPlaceholder];

        input.style.opacity = "1";

    }, 250);

}

setInterval(changePlaceholder, 3500);

function createMessage(text, type) {

    const message = document.createElement("div");

    message.className = "message " + type;

    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

}

const endings = [

"Кстати, я лучше всего разбираюсь в мотоциклах, скутерах, питбайках и другой мототехнике.",
"Если захотите, можем перейти к вопросам о мототехнике.",
"Также могу помочь с ремонтом, диагностикой или выбором техники.",
"Но моя основная специализация — мототехника.",
"Лучше всего я разбираюсь именно в двухколёсной технике."

];

function aiAnswer(question){

    const q = question.toLowerCase();

    const motoWords = [

    "мото",
    "скут",
    "альфа",
    "пит",
    "двиг",
    "карб",
    "цеп",
    "масл",
    "свеч",
    "ремонт",
    "колес",
    "техник"

    ];

    let moto = false;

    motoWords.forEach(word=>{

        if(q.includes(word)) moto = true;

    });

    if(moto){

        return "Спасибо за вопрос! Совсем скоро здесь будет настоящий MotoAI с искусственным интеллектом Groq, который сможет подробно отвечать на вопросы о мототехнике.";

    }

    const random = endings[Math.floor(Math.random()*endings.length)];

    return "Это интересный вопрос. После подключения настоящего ИИ я смогу отвечать на такие вопросы намного подробнее.\n\n" + random;

}

function sendMessage(){

    const text = input.value.trim();

    if(text==="") return;

    createMessage(text,"user");

    input.value="";

    setTimeout(()=>{

        createMessage(aiAnswer(text),"ai");

    },700);

}

sendButton.onclick = sendMessage;

input.addEventListener("keydown",e=>{

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});

input.addEventListener("input",()=>{

    input.style.height="28px";

    input.style.height=input.scrollHeight+"px";

});
